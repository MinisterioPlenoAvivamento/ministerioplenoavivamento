import React from 'react';
import { GalleryImage } from '../types';
import { Image as ImageIcon, Download, Eye } from 'lucide-react';

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
        <div 
          key={image.id} 
          className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg border border-white/5 group block transition-all duration-300 hover:border-church-red/50 hover:shadow-red-900/20"
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />
            {/* Overlay de Ação */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
               {/* Botão de Visualizar (Abre em nova aba) */}
               <a 
                  href={image.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Visualizar em tela cheia"
                  className="p-3 bg-church-red text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
               >
                  <Eye size={20} />
               </a>
               {/* Botão de Download (Força o download) */}
               <a 
                  href={image.url} 
                  download={image.alt.replace(/\s/g, '_') + '.jpg'} // Nome do arquivo para download
                  title="Baixar Foto"
                  className="p-3 bg-white text-church-black rounded-full shadow-lg hover:bg-gray-200 transition-colors"
               >
                  <Download size={20} />
               </a>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase font-bold mb-1">Foto da Galeria</p>
            <h3 className="text-white font-bold text-lg line-clamp-2">{image.alt || 'Sem nome de evento'}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FullPhotoGallery;