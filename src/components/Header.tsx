import { useState, useRef, useEffect } from 'react';
import { ShieldAlert, Globe, Check, ChevronDown } from 'lucide-react';
import { LANGUAGES, type Language } from '@/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  appName: string;
}

export function Header({ language, onLanguageChange, appName }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LANGUAGES.find((l) => l.code === language)!;

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b-4 border-red-600 shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-7 h-7 text-red-500" strokeWidth={2.5} />
          <span className="text-xl font-bold text-white tracking-tight">{appName}</span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-slate-600 bg-slate-800 text-white font-semibold text-sm hover:border-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Select language"
            aria-expanded={open}
          >
            <Globe className="w-4 h-4 text-slate-300" />
            <span className="min-w-[64px] text-left">{current.native}</span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <ul className="absolute right-0 mt-1 w-44 bg-white border-2 border-slate-300 rounded-lg shadow-xl overflow-hidden z-50">
              {LANGUAGES.map((lang) => (
                <li key={lang.code}>
                  <button
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium transition-colors ${
                      language === lang.code
                        ? 'bg-red-50 text-red-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{lang.native}</span>
                    {language === lang.code && <Check className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
