import React from 'react';
import { GalleryImage } from '../types';
import { Image as ImageIcon } from 'lucide-react';

interface FullPhotoGalleryProps {
  images: GalleryImage[];
}

const FullPhotoGallery: React.FC<FullPhotoGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return (
      <div className="bg-zinc-900 p-8 rounded-2xl border border-white/5 text-center text-gray-500">
        <ImageIcon size={32} className="mx-auto mb-3" />
        <p>Nenhuma foto na galeria ainda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <div key={image.id} className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-white/5 group">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Nome do Evento</p>
            <h3 className="text-white font-bold text-lg line-clamp-2">{image.alt || 'Sem nome de evento'}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FullPhotoGallery;