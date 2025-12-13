import React, { useState, useCallback } from 'react';
import { Upload, Loader2, Image as ImageIcon, Plus } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { showLoading, showSuccess, showError, dismissToast } from '../utils/toast';
import Button from './Button';
import { ChurchData, GalleryImage } from '../types';

interface GalleryUploaderProps {
  onNewImageAdded: (newImage: GalleryImage) => void;
}

const GalleryUploader: React.FC<GalleryUploaderProps> = ({ onNewImageAdded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = useCallback(async () => {
    if (!file) {
      showError('Selecione um arquivo primeiro.');
      return;
    }

    setIsUploading(true);
    const toastId = showLoading(`Enviando ${file.name}...`);
    const folder = 'gallery';
    const newId = Date.now().toString();

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${newId}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      if (!publicUrlData.publicUrl) {
        throw new Error('Falha ao obter URL pública.');
      }

      dismissToast(toastId);
      showSuccess('Upload concluído! Clique em SALVAR no painel para finalizar.');
      
      // Adiciona a nova imagem à lista
      onNewImageAdded({
        id: newId,
        url: publicUrlData.publicUrl,
        alt: file.name.split('.').slice(0, -1).join('.') || 'Foto da Galeria',
      });
      
      setFile(null); // Limpa o arquivo após o sucesso

    } catch (error: any) {
      dismissToast(toastId);
      showError(`Erro no upload: ${error.message || 'Tente novamente.'}`);
      console.error('Upload Error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [file, onNewImageAdded]);

  return (
    <div className="p-6 bg-zinc-900 border border-church-red/30 rounded-2xl shadow-lg space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Plus size={20} className="text-church-red" /> Adicionar Nova Foto
      </h3>
      
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .webp, .heic" // Adicionado WEBP e HEIC
        onChange={handleFileChange}
        className="hidden"
        id="gallery-file-upload"
        disabled={isUploading}
      />
      
      <div className="flex flex-col sm:flex-row gap-3">
        <label 
          htmlFor="gallery-file-upload"
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-200 border ${
            file ? 'bg-church-red/20 text-church-red border-church-red/50' : 'bg-zinc-800 text-gray-400 border-zinc-700 hover:bg-zinc-700'
          }`}
        >
          <ImageIcon size={18} className="mr-2" />
          {file ? file.name : 'Selecionar Arquivo de Imagem'}
        </label>

        <Button
          type="button"
          onClick={handleUpload}
          disabled={isUploading || !file}
          variant="primary"
          className="min-w-[120px] h-12"
        >
          {isUploading ? <Loader2 size={18} className="animate-spin" /> : 'Fazer Upload'}
        </Button>
      </div>
      
      {file && !isUploading && (
        <p className="text-xs text-gray-500 mt-2">Clique em "Fazer Upload" para enviar a foto ao servidor.</p>
      )}
      <p className="text-[10px] text-gray-600 mt-2">Formatos aceitos: JPG, JPEG, PNG, WEBP, HEIC.</p>
      <p className="text-[10px] text-church-red font-bold">Se o erro persistir, por favor, use um compressor online para reduzir o tamanho do arquivo (idealmente abaixo de 1MB).</p>
    </div>
  );
};

export default GalleryUploader;