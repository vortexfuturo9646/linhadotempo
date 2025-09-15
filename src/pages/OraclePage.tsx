import React, { useState } from 'react';
import CosmicBackground from '../components/CosmicBackground';
import Footer from '../components/Footer';
import SpiritualAmbientSound from '../components/SpiritualAmbientSound';
import { Sparkles } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';

interface MonthButtonProps {
  month: string;
  onClick: () => void;
  isSelected: boolean;
}

const MonthButton: React.FC<MonthButtonProps> = ({ month, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`w-full p-2 rounded-lg backdrop-blur-sm transition-all duration-300 text-xs ${
      isSelected 
        ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40 scale-[1.02] border border-violet-400/50' 
        : 'bg-white/20 text-purple-100 hover:bg-white/30 hover:scale-[1.02] border border-white/20 hover:border-violet-400/50'
    }`}
  >
    {month}
  </button>
);

const NumberButton: React.FC<{ 
  number: number | string; 
  onClick: () => void;
  isSelected: boolean;
}> = ({ number, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`aspect-square rounded-full p-1.5 backdrop-blur-sm transition-all duration-300 text-xs ${
      isSelected 
        ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40 scale-[1.02] border border-violet-400/50' 
        : 'bg-white/20 text-purple-100 hover:bg-white/30 hover:scale-[1.02] border border-white/20 hover:border-violet-400/50'
    }`}
  >
    {number}
  </button>
);

interface OraclePageProps {
  navigate?: (path: string) => void;
}

const OraclePage: React.FC<OraclePageProps> = ({ navigate }) => {
  const [step, setStep] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  const [validationText, setValidationText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDecade, setSelectedDecade] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [showAudio, setShowAudio] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const decades = Array.from({ length: 11 }, (_, i) => 1910 + (i * 10));

  const getYearsForDecade = (decade: number) => {
    return Array.from({ length: 10 }, (_, i) => decade + i);
  };

  const showMicroValidation = (text: string) => {
    setValidationText(text);
    setShowValidation(true);
    
    // Tocar efeito sonoro de etapa
    if ((window as any).playSpiritualEffect) {
      (window as any).playSpiritualEffect('step');
    }
    
    setTimeout(() => {
      handleContinue();
    }, 2000);
  };

  const handleContinue = () => {
    setShowValidation(false);
    if (step < 7) {
      setStep(step + 1);
      if (step === 6) {
        setShowOffer(true);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-violet-400/20 rounded-full blur-xl"></div>
                <h1 className="relative text-2xl md:text-3xl font-bold">
                  <span className="text-amber-300 drop-shadow-lg">SUA LINHA DO TEMPO ESPIRITUAL FOI ATIVADA</span>
                </h1>
              </div>
              <p className="text-purple-100 text-base md:text-lg drop-shadow-md leading-tight max-w-2xl mx-auto">
                Descubra o ponto exato em que sua energia se desviou e o que precisa ser desbloqueado para realinhar seus caminhos ainda neste ciclo de <span className="text-amber-300 font-semibold">2025</span>.
              </p>
              
              {/* Badge de Progresso */}
              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-full py-2 px-4 backdrop-blur-md border border-violet-400/40 inline-block mt-4">
                <p className="text-purple-100 text-sm font-medium">
                  ⭐ Etapa 1 de 8 desbloqueada...
                </p>
              </div>
              
              {/* CTA Principal */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] border border-violet-400/50"
                >
                  🔮 Começar Revelação
                </button>
                <p className="text-purple-200 text-sm italic">
                  Leva menos de 2 minutos.
                </p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                ✨ Etapa 1 de 8 desbloqueada...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 1 – SEU MÊS DE NASCIMENTO
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                O mês em que você nasceu abre o primeiro portal da sua vibração. Selecione e veja como isso marca seu destino.
              </p>
              <p className="text-center text-purple-100 text-base leading-tight px-1">
                O mês em que você nasceu abre o primeiro portal da sua vibração. Selecione e veja como isso marca seu destino.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-xs font-medium">
                  {validationText}
                </p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-1.5">
              {months.map((month) => (
                <MonthButton
                  key={month}
                  month={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    // Tracking GA4 + Pixel
                    if (typeof window !== 'undefined' && (window as any).etapa1) {
                      (window as any).etapa1(month);
                    }
                    showMicroValidation('🔮 Sua escolha foi registrada. Esse portal carrega uma vibração única que influencia seu destino.');
                  }}
                  isSelected={selectedMonth === month}
                />
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                ✨ Etapa 2 de 8 desbloqueada...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 2 – SEU DIA DE NASCIMENTO
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                O dia exato define seu número de vibração — ele pode atrair oportunidades ou bloquear ciclos. Escolha o seu dia para revelar.
              </p>
              <p className="text-center text-purple-100 text-base leading-tight px-1">
                O dia exato define seu número de vibração — ele pode atrair oportunidades ou bloquear ciclos. Escolha o seu dia para revelar.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-xs font-medium">
                  {validationText}
                </p>
              </div>
            )}

            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => (
                <NumberButton
                  key={day}
                  number={day.toString().padStart(2, '0')}
                  onClick={() => {
                    setSelectedDay(day);
                    // Tracking GA4 + Pixel
                    if (typeof window !== 'undefined' && (window as any).etapa2) {
                      (window as any).etapa2(day.toString().padStart(2, '0'));
                    }
                    showMicroValidation('🔮 Número de vibração capturado. Essa frequência define como você atrai ou repele oportunidades.');
                  }}
                  isSelected={selectedDay === day}
                />
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                ✨ Etapa 3 de 8 desbloqueada...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 3 – SUA DÉCADA
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                Cada década inicia um ciclo terreno. Selecionar sua década ajuda a localizar padrões que seguem se repetindo.
              </p>
              <p className="text-center text-purple-100 text-base leading-tight px-1">
                Cada década inicia um ciclo terreno. Selecionar sua década ajuda a localizar padrões que seguem se repetindo.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-xs font-medium">
                  {validationText}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-1.5">
              {decades.map((decade) => (
                <button
                  key={decade}
                  onClick={() => {
                    setSelectedDecade(decade);
                    // Tracking GA4 + Pixel
                    if (typeof window !== 'undefined' && (window as any).etapa3) {
                      (window as any).etapa3(decade.toString());
                    }
                    showMicroValidation('🔮 Ciclo terreno identificado. Essa década carrega a missão espiritual que define seus desafios.');
                  }}
                  className={`p-2.5 rounded-lg backdrop-blur-sm transition-all duration-300 text-xs border ${
                    selectedDecade === decade
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40 scale-[1.02] border-violet-400/50'
                      : 'bg-white/20 text-purple-100 hover:bg-white/30 hover:scale-[1.02] border-white/20 hover:border-violet-400/50'
                  }`}
                >
                  {decade}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                ✨ Etapa 4 de 8 desbloqueada...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 4 – SEU ANO EXATO
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                O ano de chegada guarda a chave do seu ponto de ruptura — quando a energia começou a se desalinhavar. Selecione para revelar.
              </p>
              <p className="text-center text-purple-100 text-base leading-tight px-1">
                O ano de chegada guarda a chave do seu ponto de ruptura — quando a energia começou a se desalinhavar. Selecione para revelar.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-xs font-medium">
                  {validationText}
                </p>
              </div>
            )}

            <div className="grid grid-cols-5 gap-1">
              {selectedDecade && getYearsForDecade(selectedDecade).map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    // Tracking GA4 + Pixel
                    if (typeof window !== 'undefined' && (window as any).etapa4) {
                      (window as any).etapa4(year.toString());
                    }
                    showMicroValidation('🔮 Ponto de ruptura localizado. Esse ano marca quando sua energia começou a se desalinhar.');
                  }}
                  className={`p-1.5 rounded-lg backdrop-blur-sm transition-all duration-300 text-xs border ${
                    selectedYear === year
                      ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40 scale-[1.02] border-violet-400/50'
                      : 'bg-white/20 text-purple-100 hover:bg-white/30 hover:scale-[1.02] border-white/20 hover:border-violet-400/50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                ✨ Etapa 5 de 8 desbloqueada...
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-2 mb-2 border border-violet-400/20">
              <h3 className="text-purple-100 text-center font-medium mb-2 text-xs">
                Dados da Sua Consulta
              </h3>
              <div className="grid grid-cols-1 gap-1.5">
                <div className="bg-white/5 rounded-lg p-1.5 backdrop-blur-sm">
                  <p className="text-purple-100 text-xs text-center leading-tight">
                    <span className="text-amber-300 block font-medium">Data de Nascimento</span>
                    {selectedDay} de {selectedMonth} de {selectedYear}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-1.5 backdrop-blur-sm">
                  <p className="text-purple-100 text-xs text-center leading-tight">
                    <span className="text-amber-300 block font-medium">Número do Dia</span>
                    {selectedDay} → {selectedDay.toString().split('').reduce((a, b) => a + parseInt(b), 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 5 - SEU PRIMEIRO NOME
              </div>
              
              <p className="text-purple-100 text-xs px-1 leading-tight">
                Seu primeiro nome é um selo energético. Ele guarda a vibração que ancora sua alma e revela porque você atrai certos padrões. Digite abaixo para desbloquear sua Linha Atual.
              </p>
              <p className="text-purple-100 text-base px-1 leading-tight">
                Seu primeiro nome é um selo energético. Ele guarda a vibração que ancora sua alma e revela porque você atrai certos padrões. Digite abaixo para desbloquear sua Linha Atual.
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-2 space-y-2 border border-violet-400/20">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu primeiro nome..."
                  className="w-full p-2.5 pl-8 rounded-lg bg-white/10 text-purple-100 placeholder-purple-300 backdrop-blur-sm border border-violet-400/30 focus:border-amber-400 focus:outline-none transition-all text-center text-sm"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Sparkles className="text-violet-300" size={14} />
                </div>
              </div>

              <button
                onClick={() => {
                  if (name.trim()) {
                    // Tracking GA4 + Pixel
                    if (typeof window !== 'undefined' && (window as any).etapa5) {
                      (window as any).etapa5(name.trim());
                    }
                    const birthDate = `${selectedDay.toString().padStart(2, '0')}/${months.indexOf(selectedMonth) + 1}/${selectedYear}`;
                    const url = `/revelacao?nome=${encodeURIComponent(name.trim())}&data=${encodeURIComponent(birthDate)}`;
                    // Use internal navigation for instant transition
                    if (navigate) {
                      navigate(url);
                    } else {
                      window.location.replace(url);
                    }
                  }
                }}
                disabled={!name.trim()}
                className={`w-full p-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  name.trim()
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/40 hover:scale-[1.02] border border-violet-400/50 animate-pulse'
                    : 'bg-white/10 text-purple-300 cursor-not-allowed border border-violet-400/20'
                }`}
              >
                <span className="text-sm">🔍 Revelar Linha Atual</span>
                <span className="text-lg">✨</span>
              </button>
            </div>

            <div className="bg-white/5 rounded-lg p-2 border border-violet-400/20">
              <h3 className="text-purple-100 text-center font-medium mb-2 text-xs">
                A Ciência dos Números
              </h3>
              <div className="grid grid-cols-1 gap-1.5">
                <div className="bg-white/5 rounded-lg p-1.5 backdrop-blur-sm">
                  <p className="text-purple-100 text-xs text-center leading-tight">
                    <span className="text-amber-300 block text-xs mb-1">1️⃣</span>
                    Nome ancora Linha Espiritual
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-1.5 backdrop-blur-sm">
                  <p className="text-purple-100 text-xs text-center leading-tight">
                    <span className="text-amber-300 block text-xs mb-1">2️⃣</span>
                    Data localiza Ponto de Ruptura
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-1.5 backdrop-blur-sm">
                  <p className="text-purple-100 text-xs text-center leading-tight">
                    <span className="text-amber-300 block text-xs mb-1">3️⃣</span>
                    União revela Ciclo de Realinhamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                ✨ Etapa 6 de 8 desbloqueada...
              </p>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-amber-300">
                🔓 Primeira Revelação
              </h2>
            </div>

            {/* Reforço de Autoridade */}
            <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-lg p-2 border border-amber-400/30">
              <p className="text-amber-100 text-center text-xs font-medium">
                ⚡ Revelação calculada por alinhamento energético e numerologia sagrada.
              </p>
            </div>

            <div className="space-y-2">

              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-lg p-3 backdrop-blur-sm border border-violet-400/30">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  Vejo que você tem uma sensibilidade rara e sente o que os outros sentem, mesmo em silêncio. Mas essa entrega exagerada fez você se perder no equilíbrio. É por isso que sente bloqueios no amor, desgaste nas finanças e até cansaço na alma.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-3 backdrop-blur-sm border border-red-400/30">
                <p className="text-red-100 text-center text-xs leading-tight">
                  Essa é apenas uma parte da sua revelação — o restante está selado e só pode ser aberto com sua autorização energética.
                </p>
              </div>
            </div>


            <button
              onClick={() => {
                // Tracking GA4 + Pixel
                if (typeof window !== 'undefined' && (window as any).etapa8) {
                  (window as any).etapa8();
                }
                setStep(8);
              }}
              className="w-full p-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 border border-violet-400/50 text-xs"
            >
              🔮 Prosseguir com a Revelação
            </button>

          </div>
        );

      case 8:
        return (
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                ✨ Etapa 7 de 8 desbloqueada...
              </p>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-amber-300">
                🔓 Liberar Minha Revelação
              </h2>
            </div>

            <div className="space-y-2">

              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-lg p-3 backdrop-blur-sm border border-violet-400/30">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  O último fragmento da sua Linha do Tempo foi encontrado, mas ele está protegido. Se você não desbloquear agora, esse campo será selado e as respostas ficarão inacessíveis.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-3 backdrop-blur-sm border border-red-400/30">
                <p className="text-red-100 text-center text-xs leading-tight">
                  ⚠️ Muitas pessoas deixam esse momento passar e continuam presas nos mesmos ciclos negativos. Por apenas <span className="text-amber-300 font-bold">R$19,90</span> você pode liberar tudo e finalmente entender como realinhar seu caminho.
                </p>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 backdrop-blur-sm border border-emerald-400/30">
                <p className="text-emerald-100 text-center text-xs leading-tight">
                  Ao liberar sua revelação, você receberá instruções claras para alinhar amor, prosperidade e equilíbrio ainda em 2025.
                </p>
              </div>
            </div>

            <div className="bg-amber-400/20 rounded-lg p-2 text-center border border-amber-400/30">
              <p className="text-amber-100 font-medium text-xs">⏳ Seu canal espiritual se fecha em:</p>
              <CountdownTimer initialMinutes={10} />
            </div>

            <button
              onClick={() => {
                // Tracking GA4 + Pixel
                if (typeof window !== 'undefined' && (window as any).etapa8) {
                  (window as any).etapa8();
                }
                window.open('https://go.pepperpay.com.br/ft9lq', '_blank');
              }}
              className="w-full p-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 border border-violet-400/50 animate-pulse text-xs"
            >
              🔓 Liberar Minha Revelação Completa por R$19,90
            </button>

            <div className="text-center">
              <p className="text-purple-200 text-xs italic">
                Você está a um passo de destravar sua Linha do Tempo Espiritual.
              </p>
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
      <SpiritualAmbientSound autoPlay={true} volume={0.25} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {step >= 5 && step < 8 && (
          <div className="text-center space-y-2 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-violet-400/20 rounded-full blur-xl"></div>
              <h1 className="relative text-xl md:text-2xl font-bold">
                <span className="text-amber-300 drop-shadow-lg">🪬 LINHA DO TEMPO ESPIRITUAL</span>
              </h1>
            </div>
            <p className="text-purple-100 text-sm drop-shadow-md leading-tight">
              Revelando o momento da ruptura energética
            </p>
          </div>
        )}
        <div className="w-full max-w-lg mx-auto bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-violet-400/40 z-10">{renderStep()}</div>
      </div>
      
      <Footer />
    </div>
  );
};
export default OraclePage;