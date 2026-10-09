import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  label: string;
}

export function MapPlaceholder({ label }: MapPlaceholderProps) {
  return (
    <div
      id="map-container"
      className="flex flex-col items-center justify-center bg-slate-100 border-2 border-slate-400 mx-4 mt-4 rounded-xl"
      style={{ minHeight: 300 }}
    >
      <MapPin className="w-10 h-10 text-slate-500 mb-2" />
      <p className="text-slate-600 font-bold text-sm text-center px-4">{label}</p>
    </div>
  );
}
