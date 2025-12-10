import React from 'react';
import { Facebook, Instagram, Youtube, LucideIcon } from 'lucide-react';

interface SocialLiveButtonProps {
  platform: 'youtube' | 'facebook' | 'instagram';
  url: string;
  isLive: boolean;
}

const platformConfig: { [key: string]: { icon: LucideIcon, label: string, color: string, hover: string } } = {
  youtube: { icon: Youtube, label: 'YouTube', color: 'bg-red-600', hover: 'hover:bg-red-700' },
  facebook: { icon: Facebook, label: 'Facebook', color: 'bg-blue-600', hover: 'hover:bg-blue-700' },
  instagram: { icon: Instagram, label: 'Instagram', color: 'bg-pink-600', hover: 'hover:bg-pink-700' },
};

const SocialLiveButton: React.FC<SocialLiveButtonProps> = ({ platform, url, isLive }) => {
  const config = platformConfig[platform];
  const Icon = config.icon;

  if (!url) return null;

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`
        ${config.color} ${config.hover} text-white px-6 py-3 rounded-full font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-transform duration-300 
        ${isLive ? 'shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]' : 'opacity-80 hover:opacity-100'}
      `}
    >
      <Icon fill="currentColor" size={18} /> 
      {config.label}
    </a>
  );
};

export default SocialLiveButton;