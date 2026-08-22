// components/admin/BioGeneratorButton.tsx
'use client';

import { useState, useEffect } from 'react';

interface BioGeneratorButtonProps {
  fullName: string;
  languages: string[];
  hobbies: string[];
  onBioGenerated: (bioText: string) => void;
}

export default function BioGeneratorButton({
  fullName,
  languages,
  hobbies,
  onBioGenerated,
}: BioGeneratorButtonProps) {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Temporizador en vivo durante la generación
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      setSeconds(0);
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          languages,
          hobbies,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al generar el borrador.');
      }

      if (data.bio) {
        onBioGenerated(data.bio);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Ocurrió un error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition shadow-xs ${
          loading 
            ? 'bg-blue-50 text-blue-700 border border-blue-200 cursor-wait' 
            : 'bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 active:scale-95'
        }`}
      >
        <span className={loading ? 'animate-spin' : ''}>✨</span>
        <span>
          {loading ? `Redactando con IA... (${seconds}s)` : 'Generar bio con IA'}
        </span>
      </button>

      {/* Mensaje de espera amigable */}
      {loading && (
        <span className="text-[10px] text-slate-400 font-medium animate-pulse">
          ⏳ Esto tardará aproximadamente un minuto...
        </span>
      )}

      {errorMessage && (
        <span className="text-[10px] text-red-500 font-semibold">{errorMessage}</span>
      )}
    </div>
  );
}