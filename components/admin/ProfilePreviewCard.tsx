// components/admin/ProfilePreviewCard.tsx
'use client';

interface ProfilePreviewCardProps {
  fullName: string;
  email: string;
  bio: string;
  languages: string[];
  hobbies: string[];
  photosCount: number;
}

export default function ProfilePreviewCard({
  fullName,
  email,
  bio,
  languages,
  hobbies,
  photosCount,
}: ProfilePreviewCardProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
        Vista previa de tu tarjeta
      </h3>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-sm relative overflow-hidden">
        
        {/* Cabecera Agente */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
            {fullName ? fullName.charAt(0).toUpperCase() : 'V'}
          </div>
          <div>
            <h4 className="text-lg font-extrabold text-slate-900">
              {fullName || 'Tu Nombre'}
            </h4>
            <p className="text-xs text-slate-400">{email}</p>
          </div>
        </div>

        {/* Biografía */}
        <div>
          <p className="text-xs text-slate-600 italic line-clamp-3 leading-relaxed">
            "{bio || 'Tu biografía destacada aparecerá aquí...'}"
          </p>
        </div>

        {/* Idiomas seleccionados */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Idiomas</span>
          <div className="flex flex-wrap gap-1.5">
            {languages.length > 0 ? (
              languages.map((lang, i) => (
                <span key={i} className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-semibold rounded-lg">
                  {lang}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">Ningún idioma seleccionado</span>
            )}
          </div>
        </div>

        {/* Aficiones seleccionadas */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Aficiones</span>
          <div className="flex flex-wrap gap-1.5">
            {hobbies.length > 0 ? (
              hobbies.map((hobby, i) => (
                <span key={i} className="px-2.5 py-1 bg-red-50 border border-red-100 text-red-600 text-[11px] font-semibold rounded-lg">
                  {hobby}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">Ninguna afición seleccionada</span>
            )}
          </div>
        </div>

        {/* Contador de Fotos */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Fotos en tu galería:</span>
          <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full text-[11px]">
            {photosCount}
          </span>
        </div>

      </div>
    </div>
  );
}