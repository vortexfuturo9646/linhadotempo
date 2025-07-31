import React, { useState, useEffect, useRef } from 'react';
import CosmicBackground from '../components/CosmicBackground';
import DataSlideShow from '../components/DataSlideShow';
import Footer from '../components/Footer';
import { Play, Pause, Volume2, Upload, FileAudio } from 'lucide-react';

interface NumerologyPageProps {
  name?: string;
  birthDate?: string;
}

const NumerologyPage: React.FC<NumerologyPageProps> = ({ 
  name = "Maria", 
  birthDate = "28/01/2009" 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Parse birth date
  const [day, month, year] = birthDate.split('/').map(Number);
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const monthName = monthNames[month - 1];

  // Numerological calculations
  const daySum = Math.floor(day / 10) + (day % 10);
  const monthSum = month < 10 ? month : Math.floor(month / 10) + (month % 10);
  const yearSum = year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const finalSum = daySum + monthSum + yearSum;
  const masterNumber = finalSum > 9 ? Math.floor(finalSum / 10) + (finalSum % 10) : finalSum;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 8) {
        setCurrentStep(currentStep + 1);
      }
    }, currentStep === 0 ? 2000 : 3000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    // Auto-play audio when step 6 is reached and audio is available
    if (currentStep === 6 && audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentStep, audioUrl]);

  useEffect(() => {
    // Redirect after final message
    if (currentStep === 8) {
      const redirectTimer = setTimeout(() => {
        // Redirect to next page - you can change this URL
        window.location.href = '/proxima-etapa';
      }, 6000);

      return () => clearTimeout(redirectTimer);
    }
  }, [currentStep]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setAudioProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedAudio(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderCalculationStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              ✨ Análise da Linha do Tempo ✨
            </h1>
            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-3 backdrop-blur-md border border-purple-300/40 shadow-xl shadow-purple-500/20">
              <p className="text-lg text-yellow-300 font-medium mb-1">🌟 Nome:</p>
              <p className="text-xl text-white font-bold">{name}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-3 backdrop-blur-md border border-purple-300/40 shadow-xl shadow-purple-500/20">
              <p className="text-lg text-yellow-300 font-medium mb-1">🗓️ Data de Nascimento:</p>
              <p className="text-xl text-white font-bold">{birthDate}</p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-center space-y-6 animate-slide-up">
            <h2 className="text-xl text-amber-300 font-bold mb-4 drop-shadow-lg">
              🔮 Localizando Ponto de Entrada... 🔮
            </h2>
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 shadow-xl shadow-violet-500/20">
              <p className="text-base text-purple-100 mb-3 font-medium">Dia de Nascimento:</p>
              <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                <span className="text-purple-100 bg-violet-600/40 px-3 py-1.5 rounded-lg border border-violet-400/40">{day}</span>
                <span className="text-amber-300">→</span>
                <span className="text-purple-100 bg-violet-600/40 px-2 py-1.5 rounded-lg border border-violet-400/40">{Math.floor(day / 10)}</span>
                <span className="text-amber-300">+</span>
                <span className="text-purple-100 bg-violet-600/40 px-2 py-1.5 rounded-lg border border-violet-400/40">{day % 10}</span>
                <span className="text-amber-300">=</span>
                <span className="text-amber-300 bg-amber-300/20 px-3 py-1.5 rounded-lg font-bold border border-amber-400/40">{daySum}</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6 animate-slide-up">
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 shadow-xl shadow-violet-500/20">
              <p className="text-base text-purple-100 mb-3 font-medium">Mês de Nascimento:</p>
              <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                <span className="text-purple-100 bg-violet-600/40 px-3 py-1.5 rounded-lg border border-violet-400/40">{monthName}</span>
                <span className="text-amber-300">→</span>
                <span className="text-purple-100 bg-violet-600/40 px-3 py-1.5 rounded-lg border border-violet-400/40">{month}</span>
                <span className="text-amber-300">=</span>
                <span className="text-amber-300 bg-amber-300/20 px-3 py-1.5 rounded-lg font-bold border border-amber-400/40">{monthSum}</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6 animate-slide-up">
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 shadow-xl shadow-violet-500/20">
              <p className="text-base text-purple-100 mb-3 font-medium">Ano de Nascimento:</p>
              <div className="flex items-center justify-center gap-1.5 text-base flex-wrap mb-3">
                {year.toString().split('').map((digit, index) => (
                  <React.Fragment key={index}>
                    <span className="text-purple-100 bg-violet-600/40 px-2 py-1.5 rounded-lg border border-violet-400/40">{digit}</span>
                    {index < year.toString().length - 1 && <span className="text-amber-300">+</span>}
                  </React.Fragment>
                ))}
                <span className="text-amber-300">=</span>
                <span className="text-amber-300 bg-amber-300/20 px-3 py-1.5 rounded-lg font-bold border border-amber-400/40">{yearSum}</span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6 animate-slide-up">
            <h2 className="text-xl text-amber-300 font-bold mb-4 drop-shadow-lg">
              ⚡ Calculando Coordenada Temporal ⚡
            </h2>
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 shadow-xl shadow-violet-500/20">
              <div className="flex items-center justify-center gap-2 text-lg flex-wrap">
                <span className="text-amber-300 bg-amber-300/20 px-3 py-1.5 rounded-lg border border-amber-400/40">{daySum}</span>
                <span className="text-purple-100">+</span>
                <span className="text-amber-300 bg-amber-300/20 px-3 py-1.5 rounded-lg border border-amber-400/40">{monthSum}</span>
                <span className="text-purple-100">+</span>
                <span className="text-amber-300 bg-amber-300/20 px-3 py-1.5 rounded-lg border border-amber-400/40">{yearSum}</span>
                <span className="text-purple-100">=</span>
                <span className="text-purple-100 bg-violet-600/40 px-3 py-1.5 rounded-lg font-bold border border-violet-400/40">{finalSum}</span>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6 animate-slide-up">
            <h2 className="text-xl text-amber-300 font-bold mb-4 drop-shadow-lg">
              🌟 Ponto de Ruptura Localizado 🌟
            </h2>
            <div className="bg-gradient-to-r from-violet-600/40 to-purple-600/40 rounded-xl p-6 backdrop-blur-md border border-violet-400/50 shadow-2xl shadow-violet-500/30">
              <div className="text-5xl font-bold text-amber-300 mb-3 animate-pulse drop-shadow-2xl">
                {masterNumber}
              </div>
              <p className="text-base text-purple-100 font-medium">
                Coordenada da ruptura em sua linha temporal
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="text-xl text-amber-300 font-bold mb-4 drop-shadow-lg">
              🎵 Direcionamento Espiritual Canalizado 🎵
            </h2>
            
            {/* Audio Player */}
            {audioUrl ? (
              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 max-w-md mx-auto shadow-xl shadow-violet-500/20">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <button
                    onClick={toggleAudio}
                    className="bg-amber-300/20 hover:bg-amber-300/30 rounded-full p-2 transition-all duration-300 border border-amber-400/40"
                  >
                    {isPlaying ? (
                      <Pause className="text-amber-300" size={20} />
                    ) : (
                      <Play className="text-amber-300" size={20} />
                    )}
                  </button>
                  <Volume2 className="text-violet-300" size={16} />
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-violet-300/30 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-300 to-violet-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
                
                <p className="text-violet-200 text-xs mt-2">
                  {uploadedAudio?.name || 'Direcionamento da Linha do Tempo'}
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 max-w-md mx-auto shadow-xl shadow-violet-500/20">
                <div className="text-violet-200 mb-4">
                  <FileAudio size={32} className="mx-auto mb-2" />
                  <p className="text-xs">Aguardando áudio canalizado...</p>
                </div>
              </div>
            )}

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                preload="auto"
              />
            )}
          </div>
        );

      case 7:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-xl p-4 backdrop-blur-md border border-purple-300/50 shadow-2xl shadow-purple-500/30">
              <h2 className="text-xl text-yellow-300 font-bold mb-4">
                ✨ Linha do Tempo Mapeada ✨
              </h2>
              <p className="text-base text-white leading-tight">
                Sua ruptura temporal foi localizada.<br />
                Prepare-se para o realinhamento energético.
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600/40 to-pink-600/40 rounded-xl p-4 backdrop-blur-md border border-purple-300/50 shadow-2xl shadow-purple-500/30">
              <div className="animate-pulse">
                <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                  🔮 Ativando Portal de Realinhamento... 🔮
                </h2>
                <p className="text-base text-white">
                  Redirecionando para correção da linha temporal...
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <CosmicBackground />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl mx-auto z-10 space-y-4">
          {/* Data Slide Show Section */}
          <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl p-3 backdrop-blur-md border border-purple-300/30 shadow-2xl shadow-purple-500/20">
            <h3 className="text-base text-amber-300 font-bold mb-2 text-center">
              ✨ Coordenadas da Linha do Tempo ✨
            </h3>
            <div className="relative w-full" style={{ paddingBottom: '35%' }}>
              <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-br from-purple-700/50 to-indigo-800/50 backdrop-blur-sm border border-purple-300/20">
                <DataSlideShow 
                  name={name}
                  birthDate={birthDate}
                  day={day}
                  month={month}
                  year={year}
                  monthName={monthName}
                />
              </div>
            </div>
            <p className="text-purple-200 text-xs mt-1 text-center">
              Contemple suas coordenadas enquanto mapeamos sua linha temporal
            </p>
          </div>

          {/* Main Calculation Content */}
          <div className="w-full max-w-2xl mx-auto">
            {renderCalculationStep()}
          </div>

          {/* Audio Upload Section */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-3 backdrop-blur-md border border-purple-300/30 max-w-xl mx-auto shadow-xl shadow-purple-500/10">
            <h3 className="text-base text-amber-300 font-bold mb-2 text-center">
              Upload do Direcionamento Espiritual
            </h3>
            
            <div className="space-y-2">
              <div className="border-2 border-dashed border-purple-300/40 rounded-lg p-3 text-center hover:border-amber-300/60 transition-colors bg-purple-800/20">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 w-full"
                >
                  <Upload className="text-amber-300" size={24} />
                  <div className="text-purple-100">
                    <p className="text-xs font-medium">Clique para upload do áudio</p>
                    <p className="text-xs text-purple-200">MP3, WAV, M4A</p>
                  </div>
                </button>
              </div>

              {uploadedAudio && (
                <div className="bg-purple-800/30 rounded-lg p-2 flex items-center gap-2 border border-purple-300/20">
                  <FileAudio className="text-emerald-300" size={16} />
                  <div className="flex-1">
                    <p className="text-purple-100 font-medium text-xs">{uploadedAudio.name}</p>
                    <p className="text-purple-200 text-xs">
                      {(uploadedAudio.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="text-emerald-300 text-xs">✓ Carregado</div>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-amber-300 drop-shadow-lg">🔓 LINHA DO TEMPO ESPIRITUAL ATIVADA</span>
            </h1>
            <div className="absolute top-20 left-5 w-8 h-8 bg-amber-300/30 rounded-full blur-xl animate-pulse"></div>
            <p className="text-purple-100 text-sm drop-shadow-md leading-tight">
              Mapeando o momento da ruptura energética em sua linha de destino
            </p>
            <div className="absolute top-10 right-10 w-6 h-6 bg-indigo-400/30 rounded-full blur-lg animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NumerologyPage;