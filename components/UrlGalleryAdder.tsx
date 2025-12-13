import React, { useState } from 'react';
import { Link, Image as ImageIcon, Plus } from 'lucide-react';
import Button from './Button';
import { GalleryImage } from '../types';
import { showSuccess, showError } from '../utils/toast';

interface UrlGalleryAdderProps {
  onNewImageAdded: (newImage: GalleryImage) => void;
}

const UrlGalleryAdder: React.FC<UrlGalleryAdderProps> = ({ onNewImageAdded }) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const inputClass = "w-full p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white text-base focus:ring-2 focus:ring-church-red focus:border-church-red outline-none transition-all placeholder-zinc-600";
  const labelClass = "block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide ml-1";

  const handleAdd = () => {
    if (!url.trim()) {
      showError('A URL da imagem é obrigatória.');
      return;
    }
    
    setIsAdding(true);
    
    try {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        url: url.trim(),
        alt: alt.trim() || 'Foto da Galeria (Link Externo)',
      };

      onNewImageAdded(newImage);
      showSuccess('Imagem adicionada localmente! Clique em SALVAR no painel para confirmar.');
      
      setUrl('');
      setAlt('');
    } catch (error) {
      showError('Erro ao adicionar imagem. Verifique a URL.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl shadow-lg space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Link size={20} className="text-blue-400" /> Adicionar por Link (URL)
      </h3>
      
      <div>
        <label className={labelClass}>URL da Imagem</label>
        <input
          type="url"
          className={inputClass}
          placeholder="https://exemplo.com/sua-foto.jpg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isAdding}
        />
      </div>
      
      <div>
        <label className={labelClass}>Descrição / Nome do Evento</label>
        <input
          type="text"
          className={inputClass}
          placeholder="Culto de Avivamento 2024"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          disabled={isAdding}
        />
      </div>
      
      <Button
        type="button"
        onClick={handleAdd}
        disabled={isAdding || !url.trim()}
        variant="secondary"
        className="w-full h-12 bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
      >
        <Plus size={18} className="mr-2" /> Adicionar Imagem por Link
      </Button>
      
      {url && (
        <div className="mt-4 w-full h-32 bg-black rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0">
          <img src={url} alt="Pré-visualização" className="w-full h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default UrlGalleryAdder;