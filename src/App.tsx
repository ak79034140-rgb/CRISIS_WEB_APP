import { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { Header } from '@/components/Header';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { AlertsFeed } from '@/components/AlertsFeed';
import { SosFooter } from '@/components/SosFooter';
import { TRANSLATIONS, type Language } from '@/translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [sosActive, setSosActive] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (sosActive) {
      setShowBanner(true);
      const timer = setTimeout(() => setSosActive(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [sosActive]);

  return (
    <div className="min-h-screen bg-slate-300">
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-xl">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          appName={t.appName}
        />

        <MapPlaceholder label={t.mapPlaceholder} />

        <AlertsFeed t={t} />

        {/* spacer for fixed footer */}
        <div className="h-24" />

        <SosFooter
          label={t.sosButton}
          onSos={() => setSosActive(true)}
          active={sosActive}
        />

        {/* SOS confirmation banner */}
        {showBanner && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
            <div className="bg-green-600 text-white rounded-xl p-3 shadow-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold flex-1">
                {language === 'fr' && 'Position envoyée — les secours sont alertés.'}
                {language === 'ja' && '位置情報を送信しました — 救助隊に通知されました。'}
                {language === 'en' && 'Location ping sent — emergency services notified.'}
              </span>
              <button
                onClick={() => setShowBanner(false)}
                className="text-white/80 hover:text-white"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
