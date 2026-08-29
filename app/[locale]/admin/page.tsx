'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { isEmailAllowed } from '@/lib/allowed-employees';

export default function AdminAuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      if (isSignUp) {
        if (!isEmailAllowed(cleanEmail)) {
          throw new Error('Este correo electrónico no está autorizado para registrarse como empleado de Viven.');
        }

        const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'employees', user.uid), {
          uid: user.uid,
          email: cleanEmail,
          fullName: fullName,
          bio: '',
          languages: [],
          hobbies: [],
          galleryPhotos: [],
          updatedAt: new Date().toISOString(),
        });
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
      }

      router.push('/admin/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Por favor, inicia sesión.');
      } else {
        setError(err.message || 'Ocurrió un error al procesar tu solicitud.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* Columna Izquierda: Hero Inmobiliario (Oculta en móviles muy pequeños) */}
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
            Bienvenido al portal interno para el equipo de Viven. Mantén tu perfil actualizado para colaborar y conectar con nuestros clientes.
          </p>
        </div>
      </div>

      {/* Columna Derecha: Formulario Limpio en Blanco, Azul y Rojo */}
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
              Portal empleados
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {isSignUp 
                ? 'Introduce tu correo corporativo para darte de alta.' 
                : 'Accede a tu panel para actualizar tu información.'}
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <span className="text-red-600 text-sm">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Nombre y Apellidos
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  placeholder="Ej. Ana García"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                placeholder="tu.nombre@viven.es"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition duration-200 shadow-md shadow-blue-600/20 disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block animate-pulse">Cargando...</span>
              ) : isSignUp ? (
                'Registrarme'
              ) : (
                'Entrar al Dashboard'
              )}
            </button>
          </form>

          {/* Toggle Switch */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-xs text-slate-600 hover:text-slate-900 transition"
            >
              {isSignUp ? (
                <>¿Ya tienes cuenta? <span className="text-red-600 font-semibold underline underline-offset-4">Inicia sesión</span></>
              ) : (
                <>¿Primera vez aquí? <span className="text-red-600 font-semibold underline underline-offset-4">Crea tu cuenta</span></>
              )}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}