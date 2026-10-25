'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { EmployeeProfile, hashPassword } from '@/lib/allowed-employees';
import { KeyRound, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminAuthPage() {
  const [loginMode, setLoginMode] = useState<'password' | 'magiclink'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(false);
  const router = useRouter();

  // Verificar si el usuario viene desde un Magic Link en la URL (?magic_token=...&uid=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const magicToken = params.get('magic_token');
    const uid = params.get('uid');

    if (!magicToken || !uid) return;

    const verifyMagicLink = async () => {
      setVerifyingToken(true);
      setError(null);
      try {
        const empRef = doc(db, 'employees', uid);
        const empSnap = await getDoc(empRef);

        if (!empSnap.exists()) {
          throw new Error('El usuario asociado a este enlace no existe en el sistema.');
        }

        const data = empSnap.data() as EmployeeProfile;

        if (!data.magicToken || data.magicToken !== magicToken) {
          throw new Error('Este enlace mágico ya ha sido utilizado o no es válido.');
        }

        if (
          data.magicTokenExpiresAt &&
          new Date(data.magicTokenExpiresAt).getTime() < Date.now()
        ) {
          throw new Error('El enlace de acceso ha caducado (validez de 30 minutos). Solicita uno nuevo.');
        }

        // Invalidar el token para que sea de un solo uso
        await updateDoc(empRef, {
          magicToken: '',
          magicTokenExpiresAt: '',
          updatedAt: new Date().toISOString(),
        });

        // Guardar sesión de Backoffice en localStorage
        localStorage.setItem(
          'viven_bo_session',
          JSON.stringify({
            uid: empSnap.id,
            email: data.email,
            loginAt: new Date().toISOString(),
          })
        );

        router.push('/admin/dashboard');
      } catch (err: any) {
        setError(err.message || 'No se pudo verificar el enlace mágico de acceso.');
        setVerifyingToken(false);
      }
    };

    verifyMagicLink();
  }, [router]);

  const findEmployeeByEmail = async (cleanEmail: string): Promise<EmployeeProfile | null> => {
    const empSnap = await getDocs(collection(db, 'employees'));
    for (const d of empSnap.docs) {
      const data = d.data() as EmployeeProfile;
      if (data.email && data.email.trim().toLowerCase() === cleanEmail) {
        return { ...data, uid: d.id };
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMagicLinkSent(false);
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (loginMode === 'magiclink') {
        // 1. Verificar que el correo existe en la colección `employees` de Firestore
        const matchedEmployee = await findEmployeeByEmail(cleanEmail);

        if (!matchedEmployee) {
          throw new Error(
            'Este correo electrónico no está registrado en Viven. Solicita a un administrador que te dé de alta en el Backoffice.'
          );
        }

        // 2. Generar token único con validez de 30 minutos
        const token =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).slice(2) + Date.now().toString(36);
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

        // 3. Guardar token en el documento del empleado en Firestore
        await updateDoc(doc(db, 'employees', matchedEmployee.uid), {
          magicToken: token,
          magicTokenExpiresAt: expiresAt,
        });

        // 4. Construir el Magic Link y enviarlo mediante EmailJS
        const magicLinkUrl = `${window.location.origin}${window.location.pathname}?magic_token=${encodeURIComponent(
          token
        )}&uid=${encodeURIComponent(matchedEmployee.uid)}`;

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId =
          process.env.NEXT_PUBLIC_EMAILJS_MAGICLINK_TEMPLATE_ID ||
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
          throw new Error(
            'Faltan las variables de entorno de EmailJS (NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_MAGICLINK_TEMPLATE_ID o NEXT_PUBLIC_EMAILJS_PUBLIC_KEY).'
          );
        }

        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: cleanEmail,
            email: cleanEmail,
            user_email: cleanEmail,
            from_email: cleanEmail,
            to_name: matchedEmployee.fullName || 'Compañero/a de Viven',
            name: matchedEmployee.fullName || 'Compañero/a de Viven',
            from_name: 'Viven Backoffice',
            magic_link: magicLinkUrl,
            subject: 'Tu enlace de acceso al Backoffice de Viven',
            message: `Hola ${
              matchedEmployee.fullName || ''
            }, pulsa en el siguiente enlace para acceder directamente a tu Backoffice de Viven sin contraseña (válido durante 30 minutos): ${magicLinkUrl}`,
          },
          publicKey
        );

        setMagicLinkSent(true);
      } else {
        // Modo Contraseña (verificación en Firestore y/o Firebase Auth)
        const matchedEmployee = await findEmployeeByEmail(cleanEmail);
        if (!matchedEmployee) {
          throw new Error(
            'Este correo no figura como usuario activo en el Backoffice. Contacta con un administrador.'
          );
        }

        const enteredHash = await hashPassword(password);
        const matchesFirestorePassword =
          Boolean(matchedEmployee.passwordHash) &&
          matchedEmployee.passwordHash === enteredHash;

        if (matchesFirestorePassword) {
          // Intentar sincronizar sesión de Firebase Auth en segundo plano si existe
          await signInWithEmailAndPassword(auth, cleanEmail, password).catch(
            () => null
          );
        } else {
          await signInWithEmailAndPassword(auth, cleanEmail, password);
        }

        localStorage.setItem(
          'viven_bo_session',
          JSON.stringify({
            uid: matchedEmployee.uid,
            email: matchedEmployee.email,
            loginAt: new Date().toISOString(),
          })
        );

        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/invalid-credential'
      ) {
        setError(
          'Credenciales incorrectas o aún no tienes contraseña configurada. Puedes usar "Acceder sin contraseña" para recibir un enlace en tu correo.'
        );
      } else {
        const detail =
          err?.text ||
          err?.message ||
          'Ocurrió un error al procesar tu solicitud.';
        setError(detail);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Columna Izquierda: Hero Inmobiliario */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden items-end p-12">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
          alt="Viven Real Estate Architecture"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="relative z-10 text-white space-y-4 max-w-lg">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/logo-viven-remax-white.png"
              alt="Viven Inmobiliaria"
              width={120}
              height={40}
              className="h-20 w-auto"
            />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-white">
            Diseñando espacios únicos y conectando a las mejores personas.
          </h2>
          <p className="text-sm text-slate-300">
            Portal privado y exclusivo para el equipo de Viven. El alta de nuevos miembros es gestionada directamente por Dirección.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Formulario de Acceso */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-100">
          {/* Header Marca */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-1.5">
              <Image
                src="/logos/logo-viven-remax-black-blue.png"
                alt="Viven Inmobiliaria"
                width={100}
                height={30}
                className="h-12 w-auto"
              />
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold text-xs rounded-full border border-blue-100">
              Acceso Privado BO
            </span>
          </div>

          {verifyingToken ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <h2 className="text-lg font-bold text-slate-900">
                Verificando tu enlace mágico...
              </h2>
              <p className="text-xs text-slate-500">
                Estamos validando tu acceso en Firestore. Entrarás al Backoffice en unos segundos.
              </p>
            </div>
          ) : (
            <>
              {/* Selector de Modo de Acceso */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-6 border border-slate-200/70">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('password');
                    setError(null);
                    setMagicLinkSent(false);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
                    loginMode === 'password'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <KeyRound size={14} />
                  <span>Con contraseña</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode('magiclink');
                    setError(null);
                    setMagicLinkSent(false);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold transition ${
                    loginMode === 'magiclink'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>Sin contraseña</span>
                </button>
              </div>

              <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-900">
                  {loginMode === 'magiclink'
                    ? 'Acceder sin contraseña'
                    : 'Iniciar Sesión'}
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {loginMode === 'magiclink'
                    ? 'Introduce tu correo corporativo. Si estás dado de alta en Viven, te enviaremos un enlace mágico a tu email para entrar directamente.'
                    : 'Accede a tu panel con tu correo corporativo y contraseña.'}
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <span className="text-red-600 text-sm">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Confirmación de Magic Link enviado */}
              {magicLinkSent ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-sm font-bold">
                    ¡Enlace mágico enviado a tu correo!
                  </h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Hemos enviado un correo a <strong>{email}</strong> con un enlace de acceso directo. Haz clic en él para entrar al Backoffice (caduca en 30 minutos).
                  </p>
                  <button
                    type="button"
                    onClick={() => setMagicLinkSent(false)}
                    className="text-xs font-bold text-emerald-700 underline underline-offset-4 pt-2"
                  >
                    Enviar de nuevo o cambiar correo
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Correo Electrónico Corporativo
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                      placeholder="tu.nombre@remax.es"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {loginMode === 'password' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition duration-200 shadow-md shadow-blue-600/20 disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block animate-pulse">
                        {loginMode === 'magiclink'
                          ? 'Verificando y enviando enlace...'
                          : 'Entrando...'}
                      </span>
                    ) : loginMode === 'magiclink' ? (
                      <>
                        <Mail size={16} />
                        <span>Enviar Magic Link a mi correo</span>
                      </>
                    ) : (
                      'Entrar al Dashboard'
                    )}
                  </button>
                </form>
              )}

              {/* Switch inferior rápido */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-center space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMode(loginMode === 'password' ? 'magiclink' : 'password');
                    setError(null);
                    setMagicLinkSent(false);
                  }}
                  className="text-xs text-slate-600 hover:text-slate-900 transition"
                >
                  {loginMode === 'password' ? (
                    <>
                      ¿No tienes contraseña o prefieres acceso directo?{' '}
                      <span className="text-blue-600 font-semibold underline underline-offset-4">
                        Acceder sin contraseña (Magic Link)
                      </span>
                    </>
                  ) : (
                    <>
                      ¿Prefieres usar tu clave habitual?{' '}
                      <span className="text-blue-600 font-semibold underline underline-offset-4">
                        Iniciar sesión con contraseña
                      </span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400">
                  Acceso restringido únicamente a usuarios dados de alta por un Administrador.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
