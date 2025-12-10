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
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  image: string;
  spotifyUrl: string;
  date: string;
}

export interface MultimediaConfig {
  liveUrl: string;
  isLiveNow: boolean;
  liveTitle: string;
  podcastUrl: string; // Main channel link (Spotify/Apple)
  latestPodcasts: PodcastEpisode[];
}

export interface BankInfo {
  bank: string;
  agency: string;
  account: string;
  favored: string;
  cnpj: string;
  pixKey: string;
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
    welcomeMessage: string;
    verse: string;
    verseReference: string;
  };
  contact: ContactInfo;
  social: SocialMedia;
  bank: BankInfo;
  history: string; // HTML or Markdown string
  sermons: Sermon[];
  multimedia: MultimediaConfig;
}