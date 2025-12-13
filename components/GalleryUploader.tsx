import React, { useState, useCallback } from 'react';
import { Upload, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { showLoading, showSuccess, showError, dismissToast } from '../utils/toast';
import { GalleryImage } from '../types';
import Button from './Button';

interface GalleryUploaderProps {
  onNewImageAdded: (newImage: GalleryImage) => void;
}

const GalleryUploader: React.FC<GalleryUploaderProps> = ({ onNewImageAdded }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Converte FileList para Array e adiciona ao estado
      setFiles(Array.from(e.target.files));
    }
  };
  
  const handleRemoveFile = (fileName: string) => {
    setFiles(prev => prev.filter(file => file.name !== fileName));
  };

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      showError('Selecione pelo menos um arquivo.');
      return;
    }

    setIsUploading(true);
    const totalFiles = files.length;
    let successfulUploads = 0;
    
    const toastId = showLoading(`Iniciando upload de ${totalFiles} arquivo(s)...`);

    try {
      for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        
        showLoading(`Enviando: ${file.name} (${i + 1}/${totalFiles})`, toastId);

        // 1. Extrai a extensão
        const fileExt = file.name.split('.').pop();
        
        // 2. CRIA NOME SEGURO: Apenas timestamp e índice para evitar problemas com caracteres especiais
        const fileName = `gallery/${Date.now()}-${i}.${fileExt}`;
        
        const { error } = await supabase.storage
          .from('images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          showError(`Falha ao enviar ${file.name}: ${error.message}`);
          console.error(`Supabase Upload Error for ${file.name}:`, error);
          continue;
        }

        // Obter URL pública
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        if (publicUrlData.publicUrl) {
          const newImage: GalleryImage = {
            id: Date.now().toString() + i,
            url: publicUrlData.publicUrl,
            // Mantém o nome original para o 'alt' (descrição)
            alt: file.name.split('.').slice(0, -1).join('.') || 'Foto da Galeria',
          };
          onNewImageAdded(newImage);
          successfulUploads++;
        }
      }

      dismissToast(toastId);
      if (successfulUploads > 0) {
        showSuccess(`${successfulUploads} imagem(ns) enviada(s) com sucesso! Clique em SALVAR no painel.`);
      } else {
        showError('Nenhuma imagem foi enviada com sucesso.');
      }
      setFiles([]);

    } catch (error: any) {
      dismissToast(toastId);
      showError(`Erro crítico no upload: ${error.message || 'Tente novamente.'}`);
      console.error('Upload Error:', error);
    } finally {
      setIsUploading(false);
    }
  }, [files, onNewImageAdded]);

  return (
    <div className="p-6 bg-zinc-900 border border-white/10 rounded-2xl shadow-lg space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Upload size={20} className="text-church-red" /> Upload de Arquivos (JPEG/PNG)
      </h3>
      
      <input
        type="file"
        accept="image/jpeg, image/png"
        multiple
        onChange={handleFileChange}
        className="hidden"
        id="gallery-file-upload"
        disabled={isUploading}
      />
      
      <label 
        htmlFor="gallery-file-upload"
        className={`w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-bold cursor-pointer transition-colors duration-200 border-2 border-dashed ${
          files.length > 0 ? 'bg-church-red/20 text-church-red border-church-red/50' : 'bg-zinc-800 text-gray-400 border-zinc-700 hover:bg-zinc-700'
        }`}
      >
        <ImageIcon size={18} className="mr-2" />
        {files.length > 0 ? `${files.length} arquivo(s) selecionado(s)` : 'Selecionar Imagens (Max 5MB por arquivo)'}
      </label>

      {files.length > 0 && (
        <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-zinc-800 rounded-lg border border-zinc-700">
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center text-xs text-gray-400 bg-zinc-900 p-2 rounded">
              <span className="truncate">{file.name}</span>
              <button onClick={() => handleRemoveFile(file.name)} className="text-red-500 hover:text-red-400 ml-2 flex-shrink-0">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        type="button"
        onClick={handleUpload}
        disabled={isUploading || files.length === 0}
        variant="primary"
        fullWidth
        className="h-12"
      >
        {isUploading ? <Loader2 size={18} className="animate-spin mr-2" /> : <Upload size={18} className="mr-2" />}
        {isUploading ? 'Enviando...' : `Fazer Upload (${files.length})`}
      </Button>
    </div>
  );
};

export default GalleryUploader;