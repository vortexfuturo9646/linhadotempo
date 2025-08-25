import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpiritualAmbientSoundProps {
  autoPlay?: boolean;
  volume?: number;
}

const SpiritualAmbientSound: React.FC<SpiritualAmbientSoundProps> = ({ 
  autoPlay = true, 
  volume = 0.3 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Simulação de sons espirituais (você pode substituir por arquivos reais)
  const spiritualSounds = [
    {
      name: "Tibetan Bowls Meditation",
      description: "Sons de tigelas tibetanas para meditação profunda",
      // URL de exemplo - substitua por seu arquivo de áudio
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    },
    {
      name: "Shamanic Drums with Flute",
      description: "Tambores xamânicos com flauta em ritmo lento",
      // URL de exemplo - substitua por seu arquivo de áudio  
      url: "https://www.soundjay.com/misc/sounds/wind-chimes-1.wav"
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    if (autoPlay) {
      // Tentar reproduzir automaticamente (pode ser bloqueado pelo navegador)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay foi bloqueado
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [autoPlay, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        console.log('Não foi possível reproduzir o áudio');
      });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-slate-900/80 backdrop-blur-md rounded-full p-2 border border-violet-400/30 shadow-lg">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-violet-600/20 hover:bg-violet-600/40 transition-all duration-300 border border-violet-400/30"
            title={isPlaying ? "Pausar sons espirituais" : "Reproduzir sons espirituais"}
          >
            {isPlaying ? (
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-1 h-3 bg-violet-300 rounded-sm mr-0.5"></div>
                <div className="w-1 h-3 bg-violet-300 rounded-sm"></div>
              </div>
            ) : (
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] border-l-violet-300 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
              </div>
            )}
          </button>

          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-violet-600/20 hover:bg-violet-600/40 transition-all duration-300 border border-violet-400/30"
            title={isMuted ? "Ativar som" : "Silenciar"}
          >
            {isMuted ? (
              <VolumeX className="text-violet-300" size={16} />
            ) : (
              <Volume2 className="text-violet-300" size={16} />
            )}
          </button>
        </div>
      </div>

      {/* Indicador visual quando está tocando */}
      {isPlaying && !isMuted && (
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-emerald-400 rounded-full animate-pulse border-2 border-slate-900"></div>
      )}

      {/* Áudio oculto */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
      >
        {/* Você pode adicionar múltiplas fontes para compatibilidade */}
        <source src="/sounds/tibetan-bowls-meditation.mp3" type="audio/mpeg" />
        <source src="/sounds/shamanic-drums-flute.mp3" type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>

      {/* Tooltip informativo */}
      <div className="absolute bottom-full left-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-slate-800 text-purple-100 text-xs px-2 py-1 rounded whitespace-nowrap border border-violet-400/30">
          🔮 Sons Espirituais
        </div>
      </div>
    </div>
  );
};

export default SpiritualAmbientSound;