// components/admin/HobbySelector.tsx
'use client';

import { useState, KeyboardEvent } from 'react';
import { SUGGESTED_HOBBIES } from '@/lib/predefined-data';

interface HobbySelectorProps {
  selectedHobbies: string[];
  onChange: (hobbies: string[]) => void;
}

export default function HobbySelector({
  selectedHobbies,
  onChange,
}: HobbySelectorProps) {
  const [customInput, setCustomInput] = useState('');

  const addHobby = (hobby: string) => {
    const trimmed = hobby.trim();
    if (trimmed && !selectedHobbies.includes(trimmed)) {
      onChange([...selectedHobbies, trimmed]);
    }
  };

  const removeHobby = (hobbyToRemove: string) => {
    onChange(selectedHobbies.filter((h) => h !== hobbyToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (customInput) {
        addHobby(customInput);
        setCustomInput('');
      }
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        Aficiones & Pasiones
      </label>

      {/* Input para afición personalizada */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
          placeholder="Escribe una afición y pulsa Enter..."
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={() => {
            if (customInput) {
              addHobby(customInput);
              setCustomInput('');
            }
          }}
          className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition"
        >
          Añadir
        </button>
      </div>

      {/* Aficiones Seleccionadas */}
      {selectedHobbies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedHobbies.map((hobby, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 font-medium text-xs rounded-xl flex items-center gap-2 shadow-xs"
            >
              <span>{hobby}</span>
              <button
                type="button"
                onClick={() => removeHobby(hobby)}
                className="hover:text-red-800 font-bold text-xs"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Sugerencias Rápidas */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Sugerencias rápidas:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_HOBBIES.map((hobby) => {
            const isAdded = selectedHobbies.includes(hobby);
            return (
              <button
                key={hobby}
                type="button"
                onClick={() => (isAdded ? removeHobby(hobby) : addHobby(hobby))}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  isAdded
                    ? 'bg-red-600 text-white font-semibold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {isAdded ? `✓ ${hobby}` : `+ ${hobby}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}