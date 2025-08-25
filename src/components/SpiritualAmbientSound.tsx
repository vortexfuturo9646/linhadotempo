import React, { useEffect, useRef, useState } from 'react';

interface SpiritualAmbientSoundProps {
  autoPlay?: boolean;
  volume?: number;
  onSoundEffect?: (effectType: string) => void;
}

const SpiritualAmbientSound: React.FC<SpiritualAmbientSoundProps> = ({ 
  autoPlay = true, 
  volume = 0.25,
  onSoundEffect
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const effectsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Criar efeitos sonoros
  useEffect(() => {
    // Criar áudios de efeitos usando Web Audio API para sons sintéticos
    const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    };

    // Função para tocar efeitos
    const playEffect = (effectType: string) => {
      try {
        switch (effectType) {
          case 'step':
            // Som cristalino - sino tibetano
            createTone(523.25, 0.8); // C5
            setTimeout(() => createTone(659.25, 0.6), 100); // E5
            break;
          case 'revelation':
            // Som profundo e misterioso
            createTone(110, 1.5, 'triangle'); // A2
            setTimeout(() => createTone(146.83, 1.2, 'triangle'), 200); // D3
            break;
          case 'offer':
            // Som mais intenso - urgência
            createTone(261.63, 0.4); // C4
            setTimeout(() => createTone(329.63, 0.4), 150); // E4
            setTimeout(() => createTone(392, 0.6), 300); // G4
            break;
        }
      } catch (error) {
        console.log('Efeito sonoro não suportado neste navegador');
      }
    };

    // Expor função globalmente para uso nos componentes
    (window as any).playSpiritualEffect = playEffect;

    return () => {
      delete (window as any).playSpiritualEffect;
    };
  }, []);

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
        {/* Música ambiente espiritual principal */}
        <source src="/sounds/spiritual-ambient.mp3" type="audio/mpeg" />
        
        {/* Backup - 432Hz MÚSICA PARA DORMIR */}
        <source src="/sounds/432hz-chakra-healing-sleep-music.mp3" type="audio/mpeg" />
        
        {/* Backup - Frequência 432Hz com tigelas tibetanas */}
        <source src="/sounds/frequency-432hz-tibetan-bowls.mp3" type="audio/mpeg" />
        
        {/* Backup - Sons da natureza */}
        <source src="/sounds/nature-sounds.mp3" type="audio/mpeg" />
        
        {/* Fallback - Som de sino tibetano */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT" type="audio/wav" />
        
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Indicador visual discreto quando tocando */}
      {isPlaying && (
        <div className="fixed bottom-4 left-4 z-50">
          <div className="bg-purple-900/80 backdrop-blur-sm rounded-full p-2 border border-purple-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Som ambiente ativo"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpiritualAmbientSound;