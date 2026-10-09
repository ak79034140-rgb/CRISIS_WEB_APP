import { AlertTriangle, Clock } from 'lucide-react';
import type { Translation } from '@/translations';

interface AlertsFeedProps {
  t: Translation;
}

const ALERTS = [
  { titleKey: 'alert1Title', instructionKey: 'alert1Instruction', timestamp: '14:23' },
  { titleKey: 'alert2Title', instructionKey: 'alert2Instruction', timestamp: '13:45' },
] as const;

export function AlertsFeed({ t }: AlertsFeedProps) {
  return (
    <section className="px-4 mt-6" aria-label={t.alertsTitle}>
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        {t.alertsTitle}
      </h2>

      <div className="space-y-3 max-h-[420px] overflow-y-auto pb-2">
        {ALERTS.map((alert, i) => (
          <article
            key={i}
            className="bg-red-100 border-4 border-red-900 rounded-xl p-4 shadow-md"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-red-900 leading-snug">
                  {t[alert.titleKey]}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-red-700 text-xs font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <time>{alert.timestamp}</time>
                </div>
                <p className="text-sm text-red-800 mt-2 leading-relaxed">
                  {t[alert.instructionKey]}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
