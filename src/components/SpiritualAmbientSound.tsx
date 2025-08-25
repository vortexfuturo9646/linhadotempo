import React, { useEffect, useRef } from 'react';

interface SpiritualAmbientSoundProps {
  autoPlay?: boolean;
  volume?: number;
}

const SpiritualAmbientSound: React.FC<SpiritualAmbientSoundProps> = ({ 
  autoPlay = true, 
  volume = 0.3 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    if (autoPlay) {
      // Tentar reproduzir automaticamente
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('🔮 Frequência espiritual ativada');
          })
          .catch(() => {
            // Autoplay foi bloqueado pelo navegador
            console.log('Autoplay bloqueado - usuário precisa interagir primeiro');
            
            // Adicionar listener para primeira interação do usuário
            const enableAudio = () => {
              audio.play();
              document.removeEventListener('click', enableAudio);
              document.removeEventListener('touchstart', enableAudio);
            };
            
            document.addEventListener('click', enableAudio);
            document.addEventListener('touchstart', enableAudio);
          });
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [autoPlay, volume]);

  return (
    <>
      {/* Áudio oculto - reprodução automática */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
      >
        {/* Frequências espirituais - 432Hz ou 528Hz */}
        <source src="/sounds/frequency-432hz-tibetan-bowls.mp3" type="audio/mpeg" />
        <source src="/sounds/frequency-528hz-healing.mp3" type="audio/mpeg" />
        <source src="/sounds/spiritual-frequency.mp3" type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </>
  );
};

export default SpiritualAmbientSound;