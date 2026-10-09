// mockData.js
// Mock data for a Leaflet extreme-weather app around Kancheepuram and Melakottaiyur, Tamil Nadu.
// Coordinates are [lat, lng] pairs, which is the order Leaflet expects.
// `radius` is in metres, ready for <Circle radius={...} />.
// `severity` is on a 1-5 scale (1 = low, 5 = critical).

export const hazards = [
  {
    id: "h1",
    type: "Flash Flood",
    severity: 5,
    radius: 600,
    position: [12.8342, 79.7036], // Kancheepuram town centre
    description: "Rapid water rise near the Vegavathi river bank. Avoid low-lying streets.",
  },
  {
    id: "h2",
    type: "Fallen Tree",
    severity: 2,
    radius: 80,
    position: [12.8185, 79.6947], // Near Kancheepuram railway station
    description: "Large tree blocking the road after strong winds.",
  },
  {
    id: "h3",
    type: "Waterlogging",
    severity: 3,
    radius: 350,
    position: [12.8451, 79.7189], // Kancheepuram outskirts
    description: "Knee-deep standing water on the main road; two-wheelers stalled.",
  },
  {
    id: "h4",
    type: "Flash Flood",
    severity: 4,
    radius: 500,
    position: [12.8465, 80.0753], // Melakottaiyur
    description: "Lake overflow flooding residential lanes near Melakottaiyur.",
  },
  {
    id: "h5",
    type: "Power Line Down",
    severity: 4,
    radius: 120,
    position: [12.8392, 80.0689], // Near Melakottaiyur main road
    description: "Live electrical cable fallen across the road. Stay clear.",
  },
];

export const safeZones = [
  {
    id: "s1",
    name: "Kancheepuram Government Arts College Relief Shelter",
    position: [12.8399, 79.6921],
    capacity: 800,
  },
  {
    id: "s2",
    name: "Melakottaiyur Community Hall Shelter",
    position: [12.8478, 80.0791],
    capacity: 400,
  },
  {
    id: "s3",
    name: "Vandalur Higher Secondary School Evacuation Centre",
    position: [12.8923, 80.0815],
    capacity: 600,
  },
];

const mockData = { hazards, safeZones };

export default mockData;