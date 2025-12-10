import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Pause, AlertTriangle } from 'lucide-react';

interface BackgroundAudioPlayerProps {
  audioUrl: string;
}

const BackgroundAudioPlayer: React.FC<BackgroundAudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Tenta iniciar a reprodução automaticamente (será bloqueado pelo navegador)
  useEffect(() => {
    setHasError(false); // Reset error on URL change
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volume baixo para música de fundo
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Autoplay blocked or failed:", error);
        setIsPlaying(false);
      });
    }
  }, [audioUrl]);

  // Listener para tentar tocar após a primeira interação do usuário
  useEffect(() => {
    const handleInteraction = () => {
      if (!userInteracted && audioRef.current && !isPlaying && !hasError) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setUserInteracted(true);
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
        }).catch(e => {
          console.log("Failed to play after interaction:", e);
        });
      }
    };

    // Adiciona listeners para interações comuns
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [isPlaying, userInteracted, hasError]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setUserInteracted(true);
      }
    }
  };
  
  const handleError = () => {
    console.error("Audio source error: The element has no supported sources.");
    setHasError(true);
    setIsPlaying(false);
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={audioUrl} 
        loop 
        preload="auto" 
        onError={handleError} // Adicionado handler de erro
      />
      
      {/* Botão de controle flutuante no canto inferior direito */}
      <button
        onClick={togglePlay}
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] p-3 rounded-full backdrop-blur text-white shadow-xl transition-all duration-300 border border-white/10 
          ${hasError ? 'bg-red-700 hover:bg-red-800' : 'bg-black/70 hover:bg-church-red'}
        `}
        title={hasError ? "Erro no Áudio" : (isPlaying ? "Pausar Música" : "Tocar Música")}
        disabled={hasError}
      >
        {hasError ? (
          <AlertTriangle size={24} />
        ) : isPlaying ? (
          <Pause size={24} />
        ) : (
          <Volume2 size={24} />
        )}
      </button>
    </>
  );
};

export default BackgroundAudioPlayer;