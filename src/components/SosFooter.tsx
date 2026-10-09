import { useState } from 'react';

export function SosFooter({ label, onSos, active }: any) {
  const [location, setLocation] = useState<string | null>(null);

  const handleSosClick = () => {
    // 1. Trigger the banner in App.tsx
    onSos(); 
    
    // 2. Grab the actual GPS coordinates
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        },
        (error) => {
          setLocation("Location access denied by user.");
        }
      );
    }
  };

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t-2 border-gray-200 p-4 z-50">
      <button 
        onClick={handleSosClick}
        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${
          active ? 'bg-red-800 scale-95' : 'bg-red-600 animate-pulse hover:bg-red-700'
        }`}
      >
        🚨 {label}
      </button>
      
      {/* Show the coordinates below the button after clicking */}
      {location && (
        <div className="mt-2 p-2 bg-slate-100 text-center text-xs font-mono text-slate-800 rounded">
          {location}
        </div>
      )}
    </div>
  );
}