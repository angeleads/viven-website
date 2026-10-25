// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { EmployeeProfile, hashPassword } from "@/lib/allowed-employees";

// Componentes modulares
import LanguageSelector from "@/components/admin/language-selector";
import HobbySelector from "@/components/admin/hobby-selector";
import ProfilePreviewCard from "@/components/admin/profile-preview-card";
import BioGeneratorButton from "@/components/admin/bio-generator-button";
import DirectorPanel from "@/components/admin/director-panel";
import ImageDropzone from "@/components/admin/image-dropzone";
import {
  ShieldCheck,
  UserCircle,
  UserCheck,
  ArrowLeft,
  KeyRound,
  X,
} from "lucide-react";

export default function EmployeeDashboard() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [impersonatedProfile, setImpersonatedProfile] =
    useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [viewMode, setViewMode] = useState<"director" | "profile">("profile");

  // Estados del Formulario
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);

  // Estados Modal Cambiar / Establecer Contraseña
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  const router = useRouter();

  const loadFormFromProfile = (target: EmployeeProfile) => {
    setFullName(target.fullName || "");
    setAvatarUrl(target.avatarUrl || "");
    setBio(target.bio || "");
    setLanguages(target.languages || []);
    setHobbies(target.hobbies || []);
    setPhotos(target.galleryPhotos || []);
  };

  useEffect(() => {
    const loadEmployeeSession = async (firebaseUser: any) => {
      try {
        let loadedProfile: EmployeeProfile | null = null;

        // 1. Comprobar primero si hay sesión activa (Magic Link o Login BO) en localStorage
        if (typeof window !== "undefined") {
          const rawSession = localStorage.getItem("viven_bo_session");
          if (rawSession) {
            try {
              const parsed = JSON.parse(rawSession);
              if (parsed?.uid) {
                const snap = await getDoc(doc(db, "employees", parsed.uid));
                if (snap.exists()) {
                  loadedProfile = {
                    ...(snap.data() as EmployeeProfile),
                    uid: snap.id,
                  };
                }
              }
            } catch {
              localStorage.removeItem("viven_bo_session");
            }
          }
        }

        // 2. Si no se cargó por localStorage pero hay usuario en Firebase Auth, buscar por UID o por Email
        if (!loadedProfile && firebaseUser) {
          const directSnap = await getDoc(doc(db, "employees", firebaseUser.uid));
          if (directSnap.exists()) {
            loadedProfile = {
              ...(directSnap.data() as EmployeeProfile),
              uid: directSnap.id,
            };
          } else if (firebaseUser.email) {
            const cleanAuthEmail = firebaseUser.email.trim().toLowerCase();
            const empSnap = await getDocs(collection(db, "employees"));
            for (const d of empSnap.docs) {
              const data = d.data() as EmployeeProfile;
              if (data.email && data.email.trim().toLowerCase() === cleanAuthEmail) {
                loadedProfile = { ...data, uid: d.id };
                break;
              }
            }
          }
        }

        if (!loadedProfile) {
          router.push("/admin");
          return;
        }

        setProfile(loadedProfile);
        loadFormFromProfile(loadedProfile);
        if (loadedProfile.role === "admin") {
          setViewMode("director");
        }
      } catch (err) {
        console.error(
          "Error leyendo perfil en Firestore (revisa Firestore Rules):",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      loadEmployeeSession(user);
    });

    return () => unsubscribe();
  }, [router]);

  // Bloquear scroll del body cuando el modal de contraseña está abierto
  useEffect(() => {
    if (showPasswordModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPasswordModal]);

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetUser = impersonatedProfile || profile;
    if (!targetUser) return;

    setPasswordError(null);

    if (newPassword.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    setSavingPassword(true);
    try {
      const hashed = await hashPassword(newPassword);

      // 1. Guardar hash de la contraseña en Firestore para que pueda iniciar sesión siempre en /admin
      await updateDoc(doc(db, "employees", targetUser.uid), {
        passwordHash: hashed,
        updatedAt: new Date().toISOString(),
      });

      // 2. Sincronizar también con Firebase Auth si aplica (cuando el usuario entra por primera vez con Magic Link o ya tiene sesión)
      if (!impersonatedProfile && targetUser.email) {
        const cleanEmail = targetUser.email.trim().toLowerCase();
        if (
          auth.currentUser &&
          auth.currentUser.email?.toLowerCase() === cleanEmail
        ) {
          await updatePassword(auth.currentUser, newPassword).catch(() => null);
        } else {
          await createUserWithEmailAndPassword(
            auth,
            cleanEmail,
            newPassword
          ).catch(() => null);
        }
      }

      if (impersonatedProfile) {
        setImpersonatedProfile({ ...impersonatedProfile, passwordHash: hashed });
      } else if (profile) {
        setProfile({ ...profile, passwordHash: hashed });
      }

      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordModal(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Error guardando contraseña:", err);
      setPasswordError("No se pudo guardar la contraseña. Inténtalo de nuevo.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("viven_bo_session");
    }
    try {
      await signOut(auth);
    } catch {
      // Ignorar si estaba logueado solo con Magic Link
    }
    router.push("/admin");
  };

  const handleStartImpersonation = (targetEmployee: EmployeeProfile) => {
    setImpersonatedProfile(targetEmployee);
    loadFormFromProfile(targetEmployee);
    setSaveSuccess(false);
    setViewMode("profile");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStopImpersonation = (nextMode: "director" | "profile" = "director") => {
    setImpersonatedProfile(null);
    if (profile) {
      loadFormFromProfile(profile);
    }
    setSaveSuccess(false);
    setViewMode(nextMode);
  };

  const handleRemovePhoto = (url: string) => {
    setPhotos(photos.filter((p) => p !== url));
  };

  const activeProfile = impersonatedProfile || profile;

  const handleSave = async () => {
    if (!activeProfile) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const updatedFields = {
        fullName,
        avatarUrl,
        bio,
        languages,
        hobbies,
        galleryPhotos: photos,
        updatedAt: new Date().toISOString(),
      };
      const docRef = doc(db, "employees", activeProfile.uid);
      await updateDoc(docRef, updatedFields);

      if (impersonatedProfile) {
        setImpersonatedProfile({ ...impersonatedProfile, ...updatedFields });
      } else if (profile) {
        setProfile({ ...profile, ...updatedFields });
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("Ocurrió un error al guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-500 gap-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest font-semibold text-slate-600">
          Cargando perfil Viven...
        </p>
      </div>
    );
  }

  const isAdmin = profile?.role === "admin";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Corporativo */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/logo-viven-remax-black-red.png"
              alt="Viven Inmobiliaria"
              width={100}
              height={30}
              className="h-12 w-auto"
            />
            <span className="text-xs text-slate-400 font-medium ml-2 hidden sm:inline">
              | {isAdmin ? "Backoffice Dirección" : "Portal de gestión"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleStopImpersonation("director")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    viewMode === "director" && !impersonatedProfile
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <ShieldCheck size={14} />
                  <span>Vista Dirección</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStopImpersonation("profile")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    viewMode === "profile" && !impersonatedProfile
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <UserCircle size={14} />
                  <span>Mi Perfil</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setPasswordError(null);
                setNewPassword("");
                setConfirmPassword("");
                setShowPasswordModal(true);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition flex items-center gap-1.5"
              title="Establecer o cambiar contraseña de acceso"
            >
              <KeyRound size={14} />
              <span className="hidden sm:inline">Contraseña</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Barra superior de Impersonación Activa */}
        {impersonatedProfile && (
          <div className="bg-indigo-600 text-white px-6 py-2.5 shadow-sm">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-semibold">
                <UserCheck size={15} className="shrink-0" />
                <span>
                  Modo Impersonación activo: Estás viendo y editando el Backoffice como{" "}
                  <strong className="underline underline-offset-2">
                    {impersonatedProfile.fullName}
                  </strong>{" "}
                  ({impersonatedProfile.email})
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleStopImpersonation("director")}
                className="px-3 py-1 rounded-full bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs flex items-center gap-1 self-start sm:self-auto transition shrink-0"
              >
                <ArrowLeft size={13} />
                Salir y volver a Dirección
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Banner de Bienvenida */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full border border-red-100">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                Equipo Viven
              </div>
              {impersonatedProfile ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-200">
                  <UserCheck size={13} />
                  Impersonando a {impersonatedProfile.fullName}
                </div>
              ) : (
                isAdmin && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                    <ShieldCheck size={13} />
                    Administrador / Dirección
                  </div>
                )
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {impersonatedProfile
                ? `Panel de ${fullName || impersonatedProfile.fullName} 👤`
                : `¡Hola, ${fullName || "compañero/a"}! 👋`}
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              {impersonatedProfile
                ? `Cualquier cambio que guardes aquí actualizará directamente la ficha pública de ${impersonatedProfile.fullName}.`
                : isAdmin && viewMode === "director"
                ? "Gestiona el equipo, autoriza nuevos agentes, revisa las consultas de clientes y controla el escaparate web."
                : "Edita tu información personal, idiomas y aficiones para completar tu perfil corporativo."}
            </p>
          </div>

          {saveSuccess && (
            <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <span>✓</span> ¡Perfil guardado correctamente!
            </div>
          )}
        </div>

        {isAdmin && viewMode === "director" && profile && !impersonatedProfile ? (
          <DirectorPanel
            currentAdmin={profile}
            onImpersonate={handleStartImpersonation}
          />
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Form (2 Columna izquierda) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-8">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                Edición de Perfil
              </h2>

              {/* Foto de Perfil (Drag & Drop) */}
              <ImageDropzone
                label="Foto de Perfil / Avatar"
                multiple={false}
                maxDimension={800}
                currentSingleImage={avatarUrl}
                onClearSingleImage={() => setAvatarUrl("")}
                onImagesAdded={(imgs) => {
                  if (imgs[0]) setAvatarUrl(imgs[0]);
                }}
              />

              {/* Nombre completo */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Biografía */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Sobre mí / Biografía
                  </label>

                  {/* Generador por IA */}
                  <BioGeneratorButton
                    fullName={fullName}
                    languages={languages}
                    hobbies={hobbies}
                    onBioGenerated={(generatedText) => setBio(generatedText)}
                  />
                </div>

                <textarea
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                  placeholder="Escribe tu presentación..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {/* Componente Modular de Idiomas */}
              <LanguageSelector
                selectedLanguages={languages}
                onChange={setLanguages}
              />

              {/* Componente Modular de Aficiones */}
              <HobbySelector selectedHobbies={hobbies} onChange={setHobbies} />

              {/* Galería de fotos con Drag & Drop */}
              <div className="space-y-4 pt-2">
                <ImageDropzone
                  label="Fotos para compartir (Galería)"
                  multiple={true}
                  maxDimension={1000}
                  onImagesAdded={(newUrls) =>
                    setPhotos((prev) => [...prev, ...newUrls])
                  }
                />

                {photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {photos.map((url, idx) => (
                      <div
                        key={idx}
                        className="relative group rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-200"
                      >
                        <img
                          src={url}
                          alt="Galería"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(url)}
                          className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition shadow"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Guardar Perfil */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition shadow-md shadow-blue-600/20 disabled:opacity-50"
                >
                  {saving ? "Guardando..." : "Guardar Perfil"}
                </button>
              </div>
            </div>
          </div>

          {/* Componente Modular de Vista Previa (Columna Derecha) */}
          <ProfilePreviewCard
            fullName={fullName}
            email={activeProfile?.email || ""}
            bio={bio}
            languages={languages}
            hobbies={hobbies}
            photosCount={photos.length}
            avatarUrl={avatarUrl}
          />
        </div>
        )}
      </main>

      {/* Modal para Establecer o Cambiar Contraseña */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 border border-slate-200 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-100">
                  <KeyRound size={11} /> Seguridad de cuenta
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Establecer / Cambiar Contraseña
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Configura una contraseña para{" "}
                  <strong>{activeProfile?.email}</strong>. Así podrás iniciar
                  sesión tanto con contraseña como con Magic Link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 shrink-0"
              >
                <X size={15} />
              </button>
            </div>

            {passwordError && (
              <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs">
                ⚠️ {passwordError}
              </div>
            )}

            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Nueva Contraseña (mín. 6 caracteres)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md shadow-blue-600/20 disabled:opacity-50"
                >
                  {savingPassword ? "Guardando..." : "Guardar Contraseña"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}