// app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { EmployeeProfile } from "@/lib/allowed-employees";

// Componentes modulares
import LanguageSelector from "@/components/admin/LanguageSelector";
import HobbySelector from "@/components/admin/HobbySelector";
import ProfilePreviewCard from "@/components/admin/ProfilePreviewCard";
import BioGeneratorButton from "@/components/admin/BioGeneratorButton";

export default function EmployeeDashboard() {
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Estados del Formulario
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [photoInput, setPhotoInput] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin");
        return;
      }

      const docRef = doc(db, "employees", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as EmployeeProfile;
        setProfile(data);
        setFullName(data.fullName || "");
        setBio(data.bio || "");
        setLanguages(data.languages || []);
        setHobbies(data.hobbies || []);
        setPhotos(data.galleryPhotos || []);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleAddPhoto = () => {
    if (photoInput.trim() && !photos.includes(photoInput.trim())) {
      setPhotos([...photos, photoInput.trim()]);
      setPhotoInput("");
    }
  };

  const handleRemovePhoto = (url: string) => {
    setPhotos(photos.filter((p) => p !== url));
  };

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const docRef = doc(db, "employees", profile.uid);
      await updateDoc(docRef, {
        fullName,
        bio,
        languages,
        hobbies,
        galleryPhotos: photos,
        updatedAt: new Date().toISOString(),
      });
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Corporativo */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/logo-viven-remax-black-red.png"
              alt="Viven Inmobiliaria"
              width={100}
              height={30}
              className="h-12 w-auto"
            />
            <span className="text-xs text-slate-400 font-medium ml-2 hidden sm:inline">
              | Portal de gestión
            </span>
          </div>

          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Banner de Bienvenida */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full mb-3 border border-red-100">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              Equipo Viven
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              ¡Hola, {fullName || "compañero/a"}! 👋
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Edita tu información personal, idiomas y aficiones para completar
              tu perfil corporativo.
            </p>
          </div>

          {saveSuccess && (
            <div className="px-4 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <span>✓</span> ¡Perfil guardado correctamente!
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Form (2 Columna izquierda) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-8">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full" />
                Edición de Perfil
              </h2>

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
                  placeholder="Escribe tu presentación o haz clic en 'Generar borrador con IA'..."
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

              {/* Galería de fotos */}
              <div className="space-y-4 pt-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Fotos para compartir (URL de la imagen)
                </label>

                <div className="flex gap-2">
                  <input
                    type="url"
                    className="flex-1 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition"
                  >
                    Añadir
                  </button>
                </div>

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
            email={profile?.email || ""}
            bio={bio}
            languages={languages}
            hobbies={hobbies}
            photosCount={photos.length}
          />
        </div>
      </main>
    </div>
  );
}
