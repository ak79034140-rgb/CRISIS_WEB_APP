import { Siren } from 'lucide-react';

interface SosFooterProps {
  label: string;
  onSos: () => void;
  active: boolean;
}

export function SosFooter({ label, onSos, active }: SosFooterProps) {
  return (
    <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-slate-900 border-t-4 border-red-600 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.2)]">
      <button
        onClick={onSos}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold text-lg transition-all focus:outline-none focus:ring-4 ${
          active
            ? 'bg-red-800 focus:ring-red-300 scale-[0.98]'
            : 'bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-300'
        }`}
        aria-label={label}
      >
        <Siren className="w-6 h-6" strokeWidth={2.5} />
        {label}
      </button>
    </footer>
  );
}
