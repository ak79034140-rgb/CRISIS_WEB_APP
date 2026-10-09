export type Language = 'en' | 'fr' | 'ja';

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
];

export interface Translation {
  appName: string;
  mapPlaceholder: string;
  alertsTitle: string;
  alert1Title: string;
  alert1Instruction: string;
  alert2Title: string;
  alert2Instruction: string;
  sosButton: string;
  languageLabel: string;
}

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    appName: 'SafeRoute',
    mapPlaceholder: 'Interactive Hazard Map Goes Here',
    alertsTitle: 'Emergency Alerts',
    alert1Title: 'Flash Flood Warning',
    alert1Instruction: 'Move to higher ground immediately. Do not cross flooded roads or bridges.',
    alert2Title: 'Severe Thunderstorm Alert',
    alert2Instruction: 'Seek shelter indoors away from windows. Avoid open areas and tall trees.',
    sosButton: 'SOS / Generate Location Ping',
    languageLabel: 'Language',
  },
  fr: {
    appName: 'SafeRoute',
    mapPlaceholder: 'Carte Interactive des Risques',
    alertsTitle: 'Alertes d\'Urgence',
    alert1Title: 'Avertissement de Crue Éclair',
    alert1Instruction: 'Rendez-vous immédiatement en hauteur. Ne traversez pas les routes ou ponts inondés.',
    alert2Title: 'Alerte Orage Violent',
    alert2Instruction: 'Mettez-vous à l\'abri à l\'intérieur, loin des fenêtres. Évitez les zones dégagées et les grands arbres.',
    sosButton: 'SOS / Envoyer Ma Position',
    languageLabel: 'Langue',
  },
  ja: {
    appName: 'SafeRoute',
    mapPlaceholder: 'インタラクティブ危険マップ',
    alertsTitle: '緊急警報',
    alert1Title: '鉄砲水警報',
    alert1Instruction: 'すぐに高所に避難してください。浸水した道路や橋を渡らないでください。',
    alert2Title: '激しい雷雨警報',
    alert2Instruction: '窓から離れて屋内に避難してください。開けた場所や高い木を避けてください。',
    sosButton: 'SOS / 位置情報を送信',
    languageLabel: '言語',
  },
};
