import React from 'react';
import { GalleryImage } from '../types';
import { Image as ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  images: GalleryImage[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5 text-center text-gray-500">
        <ImageIcon size={32} className="mx-auto mb-3" />
        <p>Nenhuma foto na galeria ainda.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="font-bold text-lg text-white mb-4 border-b border-white/10 pb-3">
        Momentos do Culto
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.slice(0, 6).map((image) => (
          <div key={image.id} className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg border border-white/5 group cursor-pointer">
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 text-center">Exibindo {Math.min(images.length, 6)} fotos recentes.</p>
    </div>
  );
};

export default PhotoGallery;