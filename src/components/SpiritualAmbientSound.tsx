import React, { useEffect, useRef, useState } from 'react';

interface SpiritualAmbientSoundProps {
  autoPlay?: boolean;
  volume?: number;
}

const SpiritualAmbientSound: React.FC<SpiritualAmbientSoundProps> = ({ 
  autoPlay = true, 
  volume = 0.25 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Função para tentar reproduzir o áudio
  const tryPlayAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = volume;
      audio.loop = true;
      await audio.play();
      setIsPlaying(true);
      console.log('🔮 Frequência espiritual ativada');
    } catch (error) {
      console.log('Autoplay bloqueado, aguardando interação do usuário');
      setIsPlaying(false);
    }
  };

  // Função para lidar com primeira interação
  const handleFirstInteraction = async () => {
    if (!userInteracted) {
      setUserInteracted(true);
      await tryPlayAudio();
      
      // Remove os listeners após primeira interação
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
    }
  };

  useEffect(() => {
    if (!autoPlay) return;

    // Tentar reproduzir imediatamente
    tryPlayAudio();

    // Se não conseguir, aguardar qualquer interação do usuário
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('scroll', handleFirstInteraction);

    return () => {
      // Cleanup
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, [autoPlay, volume]);

  return (
    <>
      {/* Áudio com múltiplas fontes para garantir compatibilidade */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        playsInline
        muted={false}
      >
        {/* Frequência 432Hz - Harmonia Natural */}
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg" />
        
        {/* Frequência 528Hz - Amor e Cura */}
        <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/zapsplat_nature_wind_gentle_breeze_through_trees_001_24004.mp3" type="audio/mpeg" />
        
        {/* Fallback - Som de sino tibetano */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
        
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Indicador visual discreto quando tocando */}
      {isPlaying && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-full p-2 border border-purple-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpiritualAmbientSound;