import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  date: string;
  thumbnail: string;
  duration: string;
  videoUrl: string; // New field for the video link
}

export interface Service {
  id: string; // Added ID for editability
  day: string;
  time: string;
  name: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  image: string;
  description: string;
  tag?: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export interface MultimediaConfig {
  liveUrl: string;
  isLiveNow: boolean;
  liveTitle: string;
}

export interface BankInfo {
  bank: string;
  agency: string;
  account: string;
  favored: string;
  cnpj: string;
  pixKey: string;
  pixCode?: string; // Novo campo para o código PIX completo (BR Code)
}

export interface ContactInfo {
  address: string;
  cityState: string;
  whatsapp: string;
  email: string;
  phone: string; // Added phone field
  mapUrl?: string; // Optional embedded map URL
}

export interface SocialMedia {
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface ChurchData {
  version: number; // Database version for migrations
  general: {
    churchName: string;
    pastorName: string;
    pastorImage?: string; // Optional custom image for Pastor
    heroImage?: string; // Fallback image (The Lion)
    heroVideo?: string; // Background Video URL
    backgroundAudioUrl?: string; // New field for background music URL
    welcomeMessage: string;
    verse: string;
    verseReference: string;
  };
  contact: ContactInfo;
  social: SocialMedia;
  bank: BankInfo;
  history: string; // HTML or Markdown string
  sermons: Sermon[];
  services: Service[]; // New field
  events: Event[]; // New field
  gallery: GalleryImage[]; // New field
  multimedia: MultimediaConfig;
}