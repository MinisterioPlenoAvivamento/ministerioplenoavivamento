import React from 'react';
import { useChurchData } from '../context/ChurchContext';
import FullPhotoGallery from '../components/FullPhotoGallery';
import { Image as ImageIcon } from 'lucide-react';

const Gallery: React.FC = () => {
  const { data } = useChurchData();

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      {/* Header */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517486804500-be251219227a?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-church-black/80 via-church-black/90 to-church-black"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-church-red/20 rounded-full mb-6 border border-church-red/30 backdrop-blur-sm">
             <ImageIcon className="text-church-red" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Galeria de Fotos</h1>
          <p className="text-xl text-gray-400 font-light">Momentos especiais registrados em nossa jornada de fé.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FullPhotoGallery images={data.gallery} />
      </div>
    </div>
  );
};

export default Gallery;