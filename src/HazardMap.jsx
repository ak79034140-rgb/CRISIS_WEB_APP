// HazardMap.jsx
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import disasterData from "./mockData.js";

// Default Leaflet marker icons break under most bundlers, so we point to the CDN
// copies explicitly. The default Leaflet marker is blue, which is what we want.
const shelterIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Green "You Are Here" pin, drawn as inline SVG so no extra image files are needed.
const userIcon = L.divIcon({
  className: "", // remove Leaflet's default white box styling
  html: `
    <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 11.2 15 27 15 27s15-15.8 15-27C30 6.7 23.3 0 15 0z"
            fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>
      <circle cx="15" cy="15" r="6" fill="#fff"/>
    </svg>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38],
});

const KANCHEEPURAM_CENTER = [12.8342, 79.7036];

const severityLabel = (level) =>
  ({ 1: "Low", 2: "Minor", 3: "Moderate", 4: "High", 5: "Critical" }[level] ??
  "Unknown");

// Turns a GeolocationPositionError (or a missing API) into a friendly message.
const describeGeoError = (error) => {
  switch (error.code) {
    case 1: // PERMISSION_DENIED
      return "Location access was denied, so we can't show where you are. You can still view hazards and shelters on the map. To enable it, allow location for this site in your browser settings and reload.";
    case 2: // POSITION_UNAVAILABLE
      return "Your location is currently unavailable. Check your connection or GPS and try again.";
    case 3: // TIMEOUT
      return "Finding your location took too long. Please try again.";
    default:
      return "Something went wrong while getting your location.";
  }
};

// Child component of MapContainer: re-centers the map whenever the user's position is known.
function RecenterOnUser({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

export default function HazardMap() {
  const { hazards, safeZones } = disasterData;

  const [userPosition, setUserPosition] = useState(null); // [lat, lng] or null
  const [geoError, setGeoError] = useState(null); // string or null
  const [locating, setLocating] = useState(true);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setGeoError("Your browser doesn't support geolocation.");
      setLocating(false);
      return;
    }

    setLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      (error) => {
        setGeoError(describeGeoError(error));
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // Ask for the user's location once, when the component mounts.
  useEffect(() => {
    requestLocation();
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Status banner: shown while locating or when something goes wrong */}
      {(locating || geoError) && (
        <div
          role="status"
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000, // sits above Leaflet's panes
            maxWidth: 420,
            width: "calc(100% - 24px)",
            padding: "10px 14px",
            borderRadius: 8,
            background: geoError ? "#fef2f2" : "#f0f9ff",
            border: `1px solid ${geoError ? "#fca5a5" : "#7dd3fc"}`,
            color: "#1f2937",
            fontSize: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          {locating && !geoError && "Finding your location…"}
          {geoError && (
            <>
              <div>{geoError}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button onClick={requestLocation}>Try again</button>
                <button onClick={() => setGeoError(null)}>Dismiss</button>
              </div>
            </>
          )}
        </div>
      )}

      <MapContainer
        center={KANCHEEPURAM_CENTER}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterOnUser position={userPosition} />

        {/* User location: green pin */}
        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              <strong>You Are Here</strong>
            </Popup>
          </Marker>
        )}

        {/* Hazards: red circles sized by radius (metres) */}
        {hazards.map((hazard) => (
          <Circle
            key={hazard.id}
            center={hazard.position}
            radius={hazard.radius}
            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.35 }}
          >
            <Popup>
              <strong>{hazard.type}</strong>
              <br />
              Severity: {hazard.severity}/5 ({severityLabel(hazard.severity)})
              {hazard.description && (
                <>
                  <br />
                  {hazard.description}
                </>
              )}
            </Popup>
          </Circle>
        ))}

        {/* Safe zones: blue markers */}
        {safeZones.map((zone) => (
          <Marker key={zone.id} position={zone.position} icon={shelterIcon}>
            <Popup>
              <strong>{zone.name}</strong>
              <br />
              Safe evacuation shelter
              {zone.capacity && (
                <>
                  <br />
                  Capacity: {zone.capacity} people
                </>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
