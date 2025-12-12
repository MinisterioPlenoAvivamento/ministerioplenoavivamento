import React, { useState, useCallback } from 'react';
import { Upload, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { showLoading, showSuccess, showError, dismissToast } from '../utils/toast';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
  folder: string; // e.g., 'pastor', 'sermons', 'gallery'
  label: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess, currentImageUrl, folder, label }) => {
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

    try {
      const fileExt = file.name.split('.').pop();
      // Use a combinação de pasta e timestamp para garantir nomes únicos
      const fileName = `${folder}/${Date.now()}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('images') // Usando o bucket 'images'
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Obter URL pública
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      if (!publicUrlData.publicUrl) {
        throw new Error('Falha ao obter URL pública.');
      }

      dismissToast(toastId);
      showSuccess('Upload concluído!');
      onUploadSuccess(publicUrlData.publicUrl);
      setFile(null); // Limpa o arquivo após o sucesso

    } catch (error: any) {
      dismissToast(toastId);
      showError(`Erro no upload: ${error.message || 'Tente novamente.'}`);
      console.error('Upload Error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [file, onUploadSuccess, folder]);

  const handleCancel = () => {
    setFile(null);
  };

  return (
    <div className="space-y-3 p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide ml-1">{label}</label>
      
      {/* Pré-visualização da imagem atual (se houver) */}
      {currentImageUrl && !file && (
        <div className="w-full h-32 bg-black rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0 mb-3">
          <img src={currentImageUrl} alt="Pré-visualização" className="w-full h-full object-cover opacity-70" />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`file-upload-${folder}`}
          disabled={isUploading}
        />
        
        <label 
          htmlFor={`file-upload-${folder}`}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-200 ${
            file ? 'bg-church-red/20 text-church-red border border-church-red/50' : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
          }`}
        >
          <ImageIcon size={18} className="mr-2" />
          {file ? file.name : 'Selecionar Arquivo'}
        </label>

        {file && (
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`px-4 py-3 rounded-lg text-sm font-bold text-white transition-colors duration-200 flex items-center justify-center min-w-[100px] ${
              isUploading ? 'bg-blue-600 cursor-wait' : 'bg-church-red hover:bg-red-600'
            }`}
          >
            {isUploading ? <Loader2 size={18} className="animate-spin" /> : 'Upload'}
          </button>
        )}
        
        {file && !isUploading && (
          <button
            onClick={handleCancel}
            className="p-3 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
            title="Cancelar"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      {currentImageUrl && (
        <p className="text-[10px] text-gray-500 mt-2 truncate">URL Atual: {currentImageUrl}</p>
      )}
    </div>
  );
};

export default ImageUploader;