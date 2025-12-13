import React, { useState } from 'react';
import { useChurchData } from '../context/ChurchContext';
import { Image as ImageIcon, X, Search } from 'lucide-react';

const Gallery: React.FC = () => {
  const { data } = useChurchData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (url: string) => {
    setSelectedImage(url);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="pt-24 bg-church-black min-h-screen">
      {/* Header */}
      <div className="bg-church-black text-white py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">Galeria</h1>
            <p className="mt-2 text-gray-400">Momentos de fé, adoração e comunhão.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {data.gallery.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800 text-gray-500">
            <ImageIcon className="h-10 w-10 mx-auto mb-4" />
            <p>A galeria de fotos está vazia no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.gallery.map((image) => (
              <div 
                key={image.id} 
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-lg border border-white/5"
                onClick={() => handleImageClick(image.url)}
              >
                <img 
                  src={image.url} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-bold uppercase tracking-wider bg-black/70 backdrop-blur-sm px-2 py-1 rounded">
                        {image.alt}
                    </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Modal de Visualização */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <button 
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Visualização em tela cheia" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()} // Impede que o clique na imagem feche o modal
          />
        </div>
      )}
    </div>
  );
};

export default Gallery;