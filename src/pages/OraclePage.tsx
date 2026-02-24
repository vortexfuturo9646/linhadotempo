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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showCardReveal, setShowCardReveal] = useState(false);

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
                <h1 className="relative text-xl md:text-2xl font-bold">
                  <span className="text-amber-300 drop-shadow-lg">DIAGNÓSTICO DO BLOQUEIO AMOROSO</span>
                </h1>
              </div>
              <p className="text-purple-100 text-sm md:text-base drop-shadow-md leading-tight max-w-2xl mx-auto">
                Descubra o ponto exato onde sua energia no amor foi bloqueada — e por que você continua repetindo o mesmo padrão ou afastando quem você ama.
              </p>
              
              {/* Badge de Progresso */}
              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-full py-2 px-4 backdrop-blur-md border border-violet-400/40 inline-block mt-4">
                <p className="text-purple-100 text-sm font-medium">
                  💔 Etapa 1 de 7 - Mapeamento do Bloqueio...
                </p>
              </div>
              
              {/* CTA Principal */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] border border-violet-400/50"
                >
                  💔 Descobrir Meu Bloqueio
                </button>
                <p className="text-purple-200 text-sm italic">
                  Descubra em 2 minutos por que o amor não flui.
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
                💔 Etapa 1 de 7 - Localizando ruptura afetiva...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 1 – MOMENTO DA RUPTURA ENERGÉTICA
              </div>

              <p className="text-center text-purple-100 text-sm leading-tight px-1">
                O mês do seu nascimento marca quando sua energia afetiva se formou. Selecione para localizar o início do padrão que hoje bloqueia seu amor.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-sm font-medium">
                  💔 Ruptura energética localizada. Esse mês carrega a origem do seu padrão afetivo atual.
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
                    showMicroValidation('💔 Ruptura energética localizada. Esse mês carrega a origem do seu padrão afetivo atual.');
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
                💔 Etapa 2 de 7 - Mapeando intensidade do bloqueio...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 2 – INTENSIDADE DO BLOQUEIO AFETIVO
              </div>

              <p className="text-center text-purple-100 text-sm leading-tight px-1">
                O dia do seu nascimento define a intensidade com que você sente e se entrega no amor. Isso explica por que você ama mais do que recebe.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-sm font-medium">
                  💔 Intensidade mapeada. Esse número revela por que você se entrega demais e se machuca no amor.
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
                    showMicroValidation('💔 Intensidade mapeada. Esse número revela por que você se entrega demais e se machuca no amor.');
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
                💔 Etapa 3 de 7 - Identificando ciclo repetitivo...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 3 – CICLO REPETITIVO NO AMOR
              </div>

              <p className="text-center text-purple-100 text-sm leading-tight px-1">
                Sua década de nascimento marca quando o padrão afetivo se fixou. Isso explica por que você repete os mesmos erros no amor.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-sm font-medium">
                  💔 Ciclo identificado. Essa década explica por que você atrai sempre o mesmo tipo de situação amorosa.
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
                    showMicroValidation('💔 Ciclo identificado. Essa década explica por que você atrai sempre o mesmo tipo de situação amorosa.');
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
                💔 Etapa 4 de 7 - Localizando momento exato da ruptura...
              </p>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-xs border border-amber-400/30 shadow-lg">
                ETAPA 4 – MOMENTO EXATO DA RUPTURA AFETIVA
              </div>

              <p className="text-center text-purple-100 text-sm leading-tight px-1">
                O ano exato do seu nascimento marca quando sua capacidade de amar se definiu. Esse é o ponto onde tudo começou a se desalinhar.
              </p>
            </div>

            {/* Micro-validação */}
            {showValidation && (
              <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-3 border border-emerald-400/30 animate-fade-in">
                <p className="text-emerald-200 text-center text-sm font-medium">
                  💔 Momento da ruptura localizado. Esse ano marca quando sua energia afetiva começou a se desalinhar.
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
                    showMicroValidation('💔 Momento da ruptura localizado. Esse ano marca quando sua energia afetiva começou a se desalinhar.');
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
                💔 Etapa 5 de 7 - Calculando seu Padrão Afetivo...
              </p>
            </div>

            {/* Título Principal */}
            <div className="text-center space-y-2">
              <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-100 py-2 px-2 rounded-lg text-center font-medium text-sm border border-amber-400/30 shadow-lg">
                DIGITE SEU PRIMEIRO NOME E DESCUBRA SEU PADRÃO AFETIVO
              </div>
            </div>

            {/* Campo de Nome */}
            <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-xl p-4 backdrop-blur-md border border-violet-400/30 space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu primeiro nome..."
                  className="w-full p-4 rounded-xl bg-white/10 text-purple-100 placeholder-purple-300 backdrop-blur-sm border-2 border-violet-400/30 focus:border-amber-400 focus:outline-none transition-all text-center text-lg font-medium shadow-lg"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Sparkles className="text-violet-300 animate-pulse" size={20} />
                </div>
              </div>
            </div>

            {/* Área de Cálculo Animado */}
            <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl p-4 backdrop-blur-md border border-purple-400/30 space-y-4">
              <h3 className="text-center text-purple-100 font-semibold text-sm">
                💔 Calculando seu Padrão de Bloqueio Afetivo
              </h3>
              
              {/* Caixas de Cálculo */}
              <div className="flex items-center justify-center space-x-2">
                {/* Mês */}
                <div className="bg-violet-600/40 rounded-lg p-3 backdrop-blur-sm border border-violet-400/40 text-center min-w-[60px]">
                  <div className="text-amber-300 text-xs font-medium mb-1">Ruptura</div>
                  <div className="text-white font-bold text-sm">
                    {months.indexOf(selectedMonth) + 1 || '?'}
                  </div>
                  <div className="text-purple-200 text-xs mt-1">
                    = {months.indexOf(selectedMonth) + 1 > 9 
                      ? Math.floor((months.indexOf(selectedMonth) + 1) / 10) + ((months.indexOf(selectedMonth) + 1) % 10)
                      : months.indexOf(selectedMonth) + 1 || '?'}
                  </div>
                </div>
                
                {/* Seta */}
                <div className="text-amber-300 text-lg animate-pulse">→</div>
                
                {/* Dia */}
                <div className="bg-violet-600/40 rounded-lg p-3 backdrop-blur-sm border border-violet-400/40 text-center min-w-[60px]">
                  <div className="text-amber-300 text-xs font-medium mb-1">Intensidade</div>
                  <div className="text-white font-bold text-sm">
                    {selectedDay || '?'}
                  </div>
                  <div className="text-purple-200 text-xs mt-1">
                    = {selectedDay ? selectedDay.toString().split('').reduce((a, b) => a + parseInt(b), 0) : '?'}
                  </div>
                </div>
                
                {/* Seta */}
                <div className="text-amber-300 text-lg animate-pulse">→</div>
                
                {/* Ano */}
                <div className="bg-violet-600/40 rounded-lg p-3 backdrop-blur-sm border border-violet-400/40 text-center min-w-[60px]">
                  <div className="text-amber-300 text-xs font-medium mb-1">Ciclo</div>
                  <div className="text-white font-bold text-sm">
                    {selectedYear || '?'}
                  </div>
                  <div className="text-purple-200 text-xs mt-1">
                    = {selectedYear ? selectedYear.toString().split('').reduce((a, b) => a + parseInt(b), 0) : '?'}
                  </div>
                </div>
              </div>
              
              {/* Resultado Final */}
              {selectedMonth && selectedDay && selectedYear && (
                <div className="flex flex-col items-center space-y-2">
                  <div className="text-amber-300 text-sm animate-pulse">↓</div>
                  <div className="bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-xl p-4 backdrop-blur-md border-2 border-amber-400/50 shadow-lg shadow-amber-400/20">
                    <div className="text-center">
                      <div className="text-amber-300 text-xs font-medium mb-2">SEU PADRÃO AFETIVO</div>
                      <div className="text-4xl font-bold text-white animate-pulse drop-shadow-lg">
                        {(() => {
                          const monthSum = months.indexOf(selectedMonth) + 1 > 9 
                            ? Math.floor((months.indexOf(selectedMonth) + 1) / 10) + ((months.indexOf(selectedMonth) + 1) % 10)
                            : months.indexOf(selectedMonth) + 1;
                          const daySum = selectedDay.toString().split('').reduce((a, b) => a + parseInt(b), 0);
                          const yearSum = selectedYear.toString().split('').reduce((a, b) => a + parseInt(b), 0);
                          const total = monthSum + daySum + yearSum;
                          return total > 9 ? Math.floor(total / 10) + (total % 10) : total;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botão CTA */}
            <button
              onClick={() => {
                if (name.trim()) {
                  // Tracking GA4 + Pixel
                  if (typeof window !== 'undefined' && (window as any).etapa5) {
                    (window as any).etapa5(name.trim());
                  }
                  setStep(6);
                }
              }}
              disabled={!name.trim()}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                name.trim()
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-xl hover:shadow-violet-500/50 hover:scale-[1.02] border-2 border-violet-400/50 animate-pulse shadow-lg'
                  : 'bg-white/10 text-purple-300 cursor-not-allowed border border-violet-400/20'
              }`}
            >
              <span>💔 Descobrir Meu Bloqueio Afetivo</span>
              <Sparkles className="animate-spin" size={20} />
            </button>

            {/* Números Flutuantes de Fundo */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
              <div className="absolute top-2 left-4 text-purple-300/20 text-2xl animate-pulse">3</div>
              <div className="absolute top-8 right-6 text-amber-300/20 text-lg animate-bounce">7</div>
              <div className="absolute bottom-4 left-8 text-violet-300/20 text-xl animate-pulse">9</div>
              <div className="absolute bottom-8 right-4 text-purple-300/20 text-lg animate-bounce">1</div>
              <div className="absolute top-1/2 left-2 text-amber-300/20 text-sm animate-pulse">5</div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                💔 Etapa 6 de 7 - Diagnóstico Parcial...
              </p>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-amber-300">
                💔 Diagnóstico Parcial do Bloqueio
              </h2>
            </div>

            {/* Reforço de Autoridade */}
            <div className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-lg p-2 border border-amber-400/30">
              <p className="text-amber-100 text-center text-xs font-medium">
                💔 Diagnóstico calculado por mapeamento afetivo e padrões de bloqueio emocional.
              </p>
            </div>

            <div className="space-y-2">
              <div className="bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-lg p-3 backdrop-blur-sm border border-violet-400/30">
                <p className="text-purple-100 text-center text-sm leading-tight">
                  Existe um bloqueio emocional ativo no seu campo afetivo. Ele se originou em um momento específico da sua linha do tempo. Isso explica por que você sente que ama mais do que recebe, ou por que essa pessoa se afastou mesmo havendo sentimento.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg p-3 backdrop-blur-sm border border-red-400/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="text-red-300" size={16} />
                  <span className="text-red-100 font-medium text-sm">⚠️ Diagnóstico Parcial</span>
                </div>
                <p className="text-red-100 text-center text-sm leading-tight">
                  ⚠️ Esta é apenas uma parte do seu diagnóstico. O restante está protegido e só pode ser desbloqueado agora.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                // Tracking GA4 + Pixel
                if (typeof window !== 'undefined' && (window as any).etapa6) {
                  (window as any).etapa6();
                }
                setStep(7);
              }}
              className="w-full p-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 border border-violet-400/50 text-xs animate-pulse"
            >
              🔓 Liberar Diagnóstico Completo por R$19,90
            </button>
          </div>
        );

      case 7:
        return (
          <div className="bg-slate-900/70 backdrop-blur-md rounded-xl p-3 space-y-3 border border-violet-500/20 shadow-2xl shadow-violet-500/10">
            {/* Indicador de Progresso */}
            <div className="text-center">
              <p className="text-purple-200 text-xs font-medium">
                💔 Etapa 7 de 7 - Liberação Final...
              </p>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-lg font-bold text-amber-300">
                🔒 Libere Agora o Diagnóstico Completo do Seu Bloqueio Amoroso
              </h2>
              <p className="text-purple-100 text-sm">
                Descubra o que precisa ser realinhado para parar de perder quem você ama.
              </p>
            </div>

            <div className="space-y-2">
              <div className="bg-white/10 rounded-lg p-3 border border-violet-400/20">
                <p className="text-purple-100 text-sm leading-tight text-center">
                  O diagnóstico completo do seu bloqueio afetivo foi mapeado, mas está protegido. Se você não desbloquear agora, esse ciclo continuará ativo.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 border border-violet-400/20">
                <p className="text-purple-100 text-sm leading-tight text-center">
                  ⚠️ Muitas pessoas deixam esse momento passar e continuam perdendo quem amam pelos mesmos motivos.
                </p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-3 border border-violet-400/20">
                <p className="text-purple-100 text-sm leading-tight text-center">
                  Ao liberar seu diagnóstico, você receberá instruções claras para quebrar esse padrão e finalmente conseguir manter quem você ama.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-lg p-3 backdrop-blur-sm border border-violet-400/30">
                <p className="text-purple-100 text-sm leading-tight text-center">
                  Por apenas <span className="text-amber-300 font-bold">R$29,90</span> você pode liberar tudo e finalmente entender como parar de perder quem você ama.
                </p>
              </div>
            </div>

            {/* Contador de Urgência */}
            <div className="bg-amber-400/20 rounded-lg p-3 text-center border border-amber-400/30">
              <p className="text-amber-100 font-medium text-sm mb-2">⏳ Esse diagnóstico expira em:</p>
              <CountdownTimer initialMinutes={10} />
              <p className="text-amber-100 text-xs mt-2">
                Se não desbloquear agora, esse ciclo continuará ativo e você pode perder definitivamente quem ama.
              </p>
            </div>

            {/* Botão Final */}
            <button
              onClick={() => {
                // Tracking GA4 + Pixel
                if (typeof window !== 'undefined' && (window as any).etapa7) {
                  (window as any).etapa7();
                }
                window.open('https://go.pepperpay.com.br/ft9lq', '_blank');
              }}
              className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-violet-400/50 animate-pulse"
            >
              🔓 Liberar Meu Diagnóstico Completo por R$29,90
            </button>

            <div className="text-center">
              <p className="text-purple-200 text-xs italic">
                Seu desbloqueio garante acesso ao diagnóstico completo e mostra como quebrar o padrão que faz você perder quem ama.
              </p>
            </div>
          </div>
        );

      case 8:
        // Etapa 8 removida - agora termina na 7
        return null;

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
                <span className="text-amber-300 drop-shadow-lg">💔 DIAGNÓSTICO DO BLOQUEIO AMOROSO</span>
              </h1>
            </div>
            <p className="text-purple-100 text-sm drop-shadow-md leading-tight">
              Mapeando o ponto exato onde sua energia afetiva se bloqueou
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