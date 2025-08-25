import React, { useState, useRef, useEffect } from 'react';
import CosmicBackground from '../components/CosmicBackground';
import CountdownTimer from '../components/CountdownTimer';
import Footer from '../components/Footer';
import { Play, Pause, Volume2, Upload, FileAudio, Sparkles } from 'lucide-react';

interface RevelationPageProps {
  name?: string;
  birthDate?: string;
}

const RevelationPage: React.FC<RevelationPageProps> = ({ 
  name = "Maria", 
  birthDate = "28/01/2009" 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputRef>(null);
  
  // Parse birth date and calculate numerology
  const [day, month, year] = birthDate.split('/').map(Number);
  const daySum = Math.floor(day / 10) + (day % 10);
  const monthSum = month < 10 ? month : Math.floor(month / 10) + (month % 10);
  const yearSum = year.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  const finalSum = daySum + monthSum + yearSum;
  const masterNumber = finalSum > 9 ? Math.floor(finalSum / 10) + (finalSum % 10) : finalSum;

  // Textos canalizados para cada número
  const channeledTexts = {
    1: "Você nasceu com a missão de liderar, tomar decisões e abrir caminhos. Mas quando essa força é bloqueada, surgem dúvidas, cansaço e isolamento. A espiritualidade mostra que alguém do passado ainda prende parte da sua energia.",
    2: "Você carrega uma sensibilidade rara e sente tudo o que o outro sente, mesmo em silêncio. Mas sua alma pede equilíbrio: você se doou demais e se perdeu nessa entrega. A reconexão começa quando você recupera seu centro.",
    3: "Você veio ao mundo para encantar, expressar e curar com sua presença. Só que nem sempre isso foi valorizado. O universo mostra que houve um rompimento que feriu sua autoestima amorosa. A cura começa agora.",
    4: "Você busca segurança, verdade e reciprocidade. Mas há um bloqueio espiritual vindo de promessas não cumpridas em vidas passadas. Esse ciclo pode ser quebrado com um ritual de alinhamento da alma.",
    5: "Você atrai movimento, paixão e experiências únicas. Mas quando seu coração vibra no medo da perda, os caminhos amorosos se desalinham. A espiritualidade revela: alguém ainda vibra por você, mas existe interferência oculta.",
    6: "Você nasceu para amar com profundidade. Mas sua energia foi desviada para curar os outros e se esqueceu de si. Seu destino revela reconexão emocional, mas exige um corte espiritual com o passado.",
    7: "Você sente antes de acontecer. E isso te fez se calar muitas vezes. Seu mapa mostra que há um elo não encerrado com alguém que te pensa em silêncio. A resposta está mais próxima do que imagina.",
    8: "Você veio para construir e prosperar, inclusive no amor. Mas seu poder assusta quem não está pronto. A energia mostra que seu destino está preso entre passado mal resolvido e medo de repetir erros.",
    9: "Você carrega a energia de finais e recomeços. É por isso que sempre parece que as coisas acabam quando você se entrega. Mas o ciclo muda agora, o universo mostra que você está pronta para receber o que antes não podia segurar."
  };

  const numberTitles = {
    1: "O Despertar",
    2: "A Sensitiva", 
    3: "O Comunicador",
    4: "A Guardiã",
    5: "A Alquimista",
    6: "A Curadora",
    7: "A Intuitiva",
    8: "A Realizadora",
    9: "A Transcendente"
  };

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

  const handleContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedAudio(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            {/* Título Principal */}
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-violet-400/20 rounded-full blur-xl"></div>
                <h1 className="relative text-lg md:text-xl font-bold text-amber-300 mb-2">
                  ✨ {name}, sua Linha do Tempo está sendo revelada...
                </h1>
              </div>
              <p className="text-purple-100 text-sm leading-tight">
                Nascida em {birthDate} • Número da Alma: {masterNumber}
              </p>
            </div>

            {/* Número da Alma */}
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 shadow-lg shadow-violet-500/20">
              <div className="text-center space-y-2">
                <div className="text-4xl font-bold text-amber-300 animate-pulse">
                  {masterNumber}
                </div>
                <h3 className="text-purple-100 font-semibold text-sm">
                  {numberTitles[masterNumber as keyof typeof numberTitles]}
                </h3>
              </div>
            </div>

            {/* Botão */}
            <button
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] border border-violet-400/50"
            >
              🔮 Começar Revelação
            </button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {/* Título Principal */}
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-violet-400/20 rounded-full blur-xl"></div>
                <h1 className="relative text-lg md:text-xl font-bold text-amber-300 mb-2">
                  🌟 Primeira Revelação
                </h1>
              </div>
            </div>

            {/* Texto Canalizado */}
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 shadow-lg shadow-violet-500/20">
              <p className="text-purple-100 text-sm leading-tight text-center">
                {channeledTexts[masterNumber as keyof typeof channeledTexts]}
              </p>
            </div>

            {/* Aviso de Revelação Parcial */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-3 backdrop-blur-sm border border-red-400/30 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="text-red-300" size={16} />
                <span className="text-red-100 font-medium text-sm">Revelação Parcial</span>
              </div>
              <p className="text-red-100 text-center text-sm italic leading-tight">
                Esta revelação é parcial. O restante está selado e só pode ser acessado com sua autorização energética.
              </p>
            </div>

            {/* Botão */}
            <button
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] border border-violet-400/50"
            >
              🔮 Prosseguir com a Revelação
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Título Principal */}
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-xl"></div>
                <h1 className="relative text-lg md:text-xl font-bold text-amber-300 mb-2">
                  🔒 Sua Leitura Está Selada
                </h1>
              </div>
            </div>

            {/* Texto Principal */}
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-md border border-violet-400/40 shadow-lg shadow-violet-500/20">
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-violet-400/20">
                  <p className="text-purple-100 text-sm leading-tight text-center">
                    O último fragmento da sua Linha do Tempo foi encontrado, mas só pode ser acessado pelo canal direto de revelação.
                  </p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-3 border border-violet-400/20">
                  <p className="text-purple-100 text-sm leading-tight text-center">
                    ⚠️ Atenção: esse campo não fica aberto por muito tempo. Se você não avançar agora, ele será fechado e a revelação ficará incompleta.
                  </p>
                </div>
              </div>
                <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-lg p-3 backdrop-blur-sm border border-amber-400/30">
                  <p className="text-amber-100 text-sm leading-tight text-center">
                    🌟 Para acessar sua revelação completa, é necessária uma autorização simbólica de desbloqueio espiritual que ativa o campo energético da sua leitura.
                  </p>
                </div>
            </div>

            {/* Contador de Urgência */}
            <div className="bg-amber-400/20 rounded-lg p-3 text-center border border-amber-400/30">
              <p className="text-amber-100 font-medium text-sm mb-2">⏳ O canal será bloqueado em poucos minutos</p>
              <CountdownTimer initialMinutes={10} />
              <p className="text-amber-100 text-xs mt-2">
                Após esse tempo, o campo energético será selado e sua revelação ficará inacessível.
              </p>
            </div>

            {/* Botão Final */}
            <button
              onClick={() => window.open('https://go.pepperpay.com.br/ft9lq', '_blank')}
              className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] border border-violet-400/50 animate-pulse"
            >
              🔓 Liberar Minha Revelação Completa Agora
            </button>

            <div className="text-center">
              <p className="text-purple-200 text-xs italic">
                🔮 Sua revelação completa será entregue após a autorização energética
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Título Principal */}
            <div className="text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-violet-400/20 rounded-full blur-xl"></div>
                <h1 className="relative text-lg md:text-xl font-bold text-amber-300 mb-2">
                  🎵 Áudio Canalizado para {name}
                </h1>
              </div>
              <p className="text-purple-100 text-sm">
                Faça upload do áudio personalizado para {name}
              </p>
            </div>

            {/* Audio Upload Section */}
            <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-xl p-6 backdrop-blur-md border border-violet-400/40 space-y-4">
              {audioUrl ? (
                <div className="space-y-4">
                  {/* Audio Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={toggleAudio}
                      className="bg-amber-300/20 hover:bg-amber-300/30 rounded-full p-4 transition-all duration-300 border border-amber-400/40"
                    >
                      {isPlaying ? (
                        <Pause className="text-amber-300" size={24} />
                      ) : (
                        <Play className="text-amber-300" size={24} />
                      )}
                    </button>
                    <Volume2 className="text-violet-300" size={20} />
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-violet-300/30 h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-amber-300 to-violet-400 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${audioProgress}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-violet-200 text-xs text-center">
                    {uploadedAudio?.name || 'Áudio Canalizado - Revelação Pessoal'}
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="text-violet-200">
                    <FileAudio size={48} className="mx-auto mb-2" />
                    <p className="text-sm">Aguardando áudio canalizado...</p>
                  </div>
                  
                  {/* Upload Section */}
                  <div className="border-2 border-dashed border-purple-300/40 rounded-lg p-4 hover:border-amber-300/60 transition-colors bg-purple-800/20">
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
                      <Upload className="text-amber-300" size={32} />
                      <div className="text-purple-100">
                        <p className="text-sm font-medium">Clique para upload do áudio</p>
                        <p className="text-xs text-purple-200">MP3, WAV, M4A</p>
                      </div>
                    </button>
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

            {uploadedAudio && (
              <div className="bg-purple-800/30 rounded-lg p-3 flex items-center gap-2 border border-purple-300/20">
                <FileAudio className="text-emerald-300" size={20} />
                <div className="flex-1">
                  <p className="text-purple-100 font-medium text-sm">{uploadedAudio.name}</p>
                  <p className="text-purple-200 text-xs">
                    {(uploadedAudio.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="text-emerald-300 text-xs">✓ Carregado</div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <CosmicBackground />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {/* Header - só mostra nas etapas 1-4 */}
        {currentStep <= 4 && (
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-lg md:text-xl font-bold">
              <span className="text-amber-300 drop-shadow-lg">🪬 LINHA DO TEMPO ESPIRITUAL</span>
            </h1>
            <p className="text-purple-100 text-sm drop-shadow-md leading-tight">
              Revelando o momento da ruptura energética
            </p>
          </div>
        )}
        
        {/* Main Content Container */}
        <div className="w-full max-w-lg mx-auto bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-violet-400/40 z-10">
          {renderStep()}
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-20 left-5 w-12 h-12 bg-violet-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-5 w-16 h-16 bg-purple-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-2 w-8 h-8 bg-amber-400/20 rounded-full blur-xl animate-pulse"></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RevelationPage;