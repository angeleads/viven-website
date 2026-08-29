'use client';

import { PREDEFINED_LANGUAGES } from '@/lib/predefined-data';

interface LanguageSelectorProps {
  selectedLanguages: string[];
  onChange: (languages: string[]) => void;
}

export default function LanguageSelector({
  selectedLanguages,
  onChange,
}: LanguageSelectorProps) {
  const toggleLanguage = (langString: string) => {
    if (selectedLanguages.includes(langString)) {
      onChange(selectedLanguages.filter((l) => l !== langString));
    } else {
      onChange([...selectedLanguages, langString]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
        Idiomas que hablas
      </label>

      <div className="flex flex-wrap gap-2">
        {PREDEFINED_LANGUAGES.map((item) => {
          const langString = `${item.flag} ${item.label}`;
          const isSelected = selectedLanguages.includes(langString);

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => toggleLanguage(langString)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-150 border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span>{item.flag}</span>
              <span>{item.label}</span>
              {isSelected && <span className="ml-1 text-[10px]">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}