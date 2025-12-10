import React, { useEffect, useRef, useState } from 'react';

interface BackgroundAudioPlayerProps {
  audioUrl: string;
}

const BackgroundAudioPlayer: React.FC<BackgroundAudioPlayerProps> = ({ audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Tenta iniciar a reprodução automaticamente (será bloqueado pelo navegador)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Volume baixo para música de fundo
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Autoplay blocked. Waiting for user interaction.", error);
        setIsPlaying(false);
      });
    }
  }, [audioUrl]);

  // Listener para tentar tocar após a primeira interação do usuário
  useEffect(() => {
    const handleInteraction = () => {
      if (!userInteracted && audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setUserInteracted(true);
          document.removeEventListener('click', handleInteraction);
          document.removeEventListener('touchstart', handleInteraction);
        }).catch(e => {
          // Ainda pode falhar se o áudio não estiver pronto, mas é a melhor tentativa.
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
  }, [isPlaying, userInteracted]);

  // Botão de controle visível (opcional, mas recomendado)
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setUserInteracted(true); // Marca como interagido
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      
      {/* Botão de controle flutuante no canto inferior direito */}
      <button
        onClick={togglePlay}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] p-3 rounded-full bg-black/70 backdrop-blur text-white shadow-xl transition-all duration-300 hover:bg-church-red border border-white/10"
        title={isPlaying ? "Pausar Música" : "Tocar Música"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
        )}
      </button>
    </>
  );
};

export default BackgroundAudioPlayer;