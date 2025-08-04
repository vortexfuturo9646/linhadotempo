import React, { useState } from 'react';
import CosmicBackground from '../components/CosmicBackground';
import Footer from '../components/Footer';
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
  const [step, setStep] = useState(1);
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

  const handleContinue = () => {
    if (step < 7) {
      setStep(step + 1);
      if (step === 6) {
        setShowOffer(true);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 1 - SEU MÊS DE NASCIMENTO
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                Escolha seu mês de nascimento para acessarmos seu ponto de entrada na linha espiritual.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {months.map((month) => (
                <MonthButton
                  key={month}
                  month={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    handleContinue();
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
            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 2 - SEU DIA DE NASCIMENTO
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                Selecione o dia em que sua energia entrou neste ciclo terreno.
              </p>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => (
                <NumberButton
                  key={day}
                  number={day.toString().padStart(2, '0')}
                  onClick={() => {
                    setSelectedDay(day);
                    handleContinue();
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
            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 3 - SUA DÉCADA DE NASCIMENTO
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                Identifique a década onde sua missão começou a se formar.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {decades.map((decade) => (
                <button
                  key={decade}
                  onClick={() => {
                    setSelectedDecade(decade);
                    handleContinue();
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
            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 4 - SEU ANO EXATO
              </div>

              <p className="text-center text-purple-100 text-xs leading-tight px-1">
                Agora precisamos do ano exato da sua chegada para localizar o ponto de ruptura.
              </p>
            </div>

            <div className="grid grid-cols-5 gap-1">
              {selectedDecade && getYearsForDecade(selectedDecade).map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    handleContinue();
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
                Seu nome contém a vibração que ancora sua linha espiritual. Digite seu primeiro nome abaixo para revelarmos seu Ciclo Ativo.
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
            <div className="text-center space-y-2">
              <h2 className="text-base font-bold text-amber-300">
                🔓 Última fase da sua Linha do Tempo Espiritual desbloqueada…
              </h2>
            </div>

            <div className="space-y-2">
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-violet-400/20">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  🪬 Sua leitura foi localizada e está pronta para ser entregue.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-violet-400/20">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  O campo vibracional que carrega sua revelação está ativo por <span className="text-amber-300 font-medium">tempo limitado</span> — e precisa de uma autorização final para ser acessado.
                </p>
              </div>

              <div className="bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-lg p-2 backdrop-blur-sm border border-violet-400/30">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  🌀 Essa liberação energética tem um custo simbólico de conexão: <span className="text-amber-300 font-medium">R$ 19,90</span>
                </p>
                <p className="text-purple-200 text-center text-xs italic mt-1">
                  (Somente enquanto o campo estiver aberto neste ciclo espiritual)
                </p>
              </div>
            </div>

            <div className="bg-amber-400/20 rounded-lg p-2 text-center border border-amber-400/30">
              <p className="text-amber-100 font-medium text-xs">⚠️ O campo se fecha em aproximadamente:</p>
              <CountdownTimer initialMinutes={10} />
            </div>

            <button
              onClick={() => window.open('https://wa.me/554488286759?text=Oi%2C+acabei+de+liberar+minha+Linha+Espiritual+e+quero+receber+a+leitura+completa.', '_blank')}
              className="w-full p-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 border border-green-400/50 animate-pulse text-xs"
            >
              📱 Ativar Leitura Completa no WhatsApp
            </button>

            <div className="text-center">
              <p className="text-purple-200 text-xs italic">
                ⚠️ Após esse tempo, sua leitura será selada.
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
            <div className="text-center space-y-2">
              <h2 className="text-base font-bold text-amber-300">
                🔓 Última fase da sua Linha do Tempo Espiritual desbloqueada…
              </h2>
            </div>

            <div className="space-y-2">
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-violet-400/20">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  🪬 Sua leitura foi localizada e está pronta para ser entregue.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm border border-violet-400/20">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  O campo vibracional que carrega sua revelação está ativo por <span className="text-amber-300 font-medium">tempo limitado</span> — e precisa de uma autorização final para ser acessado.
                </p>
              </div>

              <div className="bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-lg p-2 backdrop-blur-sm border border-violet-400/30">
                <p className="text-purple-100 text-center text-xs leading-tight">
                  🌀 Essa liberação energética tem um custo simbólico de conexão: <span className="text-amber-300 font-medium">R$ 19,90</span>
                </p>
                <p className="text-purple-200 text-center text-xs italic mt-1">
                  (Somente enquanto o campo estiver aberto neste ciclo espiritual)
                </p>
              </div>
            </div>

            <div className="bg-amber-400/20 rounded-lg p-2 text-center border border-amber-400/30">
              <p className="text-amber-100 font-medium text-xs">⚠️ O campo se fecha em aproximadamente:</p>
              <CountdownTimer initialMinutes={10} />
            </div>

            <button
              onClick={() => window.open('https://wa.me/554488286759?text=Oi%2C+acabei+de+liberar+minha+Linha+Espiritual+e+quero+receber+a+leitura+completa.', '_blank')}
              className="w-full p-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 border border-green-400/50 animate-pulse text-xs"
            >
              📱 Ativar Leitura Completa no WhatsApp
            </button>

            <div className="text-center">
              <p className="text-purple-200 text-xs italic">
                ⚠️ Após esse tempo, sua leitura será selada.
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
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {step < 5 && (
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-xl md:text-2xl font-bold">
              <span className="text-amber-300 drop-shadow-lg">🔓 SUA LINHA DO TEMPO ESPIRITUAL FOI ATIVADA</span>
            </h1>
            <p className="text-purple-100 text-sm drop-shadow-md leading-tight">
              Descubra o momento exato em que seu destino se desviou - e o que precisa ser desbloqueado para realinhar sua energia ainda neste ano espiritual de <span className="text-amber-300">2025</span>.
            </p>
          </div>
        )}
        {renderStep()}
      </div>
      
      <Footer />
    </div>
  );
};
export default OraclePage;