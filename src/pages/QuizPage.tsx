import React, { useState } from 'react';
import CosmicBackground from '../components/CosmicBackground';
import Footer from '../components/Footer';
import { Sparkles, Coins } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "O que mais te incomoda atualmente?",
    options: [
      "Angústia silenciosa",
      "Sensação de ser observada",
      "Medo do futuro",
      "Tristeza sem explicação"
    ]
  },
  {
    id: 2,
    text: "Quando você pensa na sua vida amorosa, o que sente?",
    options: [
      "Sinto que fui esquecida",
      "Existe alguém entre nós",
      "Há um laço, mas está enfraquecido",
      "Foi cortado sem motivo"
    ]
  },
  {
    id: 3,
    text: "Como você se sente espiritualmente?",
    options: [
      "Travada",
      "Intuitiva",
      "Ferida",
      "Esperando algo que não chega"
    ]
  },
  {
    id: 4,
    text: "Escolha uma carta intuitivamente:",
    options: [
      "A Morte",
      "A Torre",
      "O Enforcado",
      "O Julgamento"
    ]
  }
];

const QuizPage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [mysticBalance, setMysticBalance] = useState(0);

  const calculateDiscount = () => {
    const originalPrice = 97;
    const discount = mysticBalance;
    return originalPrice - discount;
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    setMysticBalance(prev => prev + 12);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleCheckout = () => {
    // Implement Bolt checkout here
    console.log("Proceeding to checkout");
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      <CosmicBackground />
      
      {/* Mystical Balance Display */}
      <div className="fixed top-4 right-4 bg-slate-900/80 backdrop-blur-md rounded-full py-2 px-4 flex items-center gap-2 z-20 border border-violet-400/30">
        <Coins className="text-amber-400" size={20} />
        <span className="text-purple-100 font-medium">R$ {mysticBalance},00</span>
      </div>
      
      {/* Free Test Notice */}
      <div className="fixed top-4 left-4 bg-emerald-500/20 backdrop-blur-md rounded-full py-2 px-4 z-20 border border-emerald-500/30">
        <span className="text-emerald-100 text-sm">
          ✨ Teste Gratuito
        </span>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-purple-100 drop-shadow-lg">SEU CAMINHO REVELADO: </span>
          <span className="text-amber-300 drop-shadow-lg">TESTE NUMEROLÓGICO GRÁTIS</span>
        </h1>
        <p className="text-purple-100 text-xl drop-shadow-md">
          Deixe os Números Guiarem Você ao Sucesso em <span className="text-amber-300">2025</span>
        </p>
      </div>
        
        <div className="w-full max-w-lg mx-auto bg-[#1a2942]/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 z-10">
          <div className="w-full max-w-lg mx-auto bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-violet-400/30 z-10">
          {showResult ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500/70"></div>
                <Sparkles size={18} className="text-violet-400" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500/70"></div>
              </div>

              <h2 className="text-center text-purple-100 text-2xl md:text-3xl font-bold mb-6">
                Seu Mapa do Destino foi gerado
              </h2>

              <div className="bg-white/10 rounded-lg p-6 mb-6 backdrop-blur-sm border border-violet-400/20">
                <p className="text-purple-100 text-center mb-4">
                  As cartas revelam bloqueios, interferência externa e a necessidade de liberação espiritual imediata.
                </p>
                
                <div className="space-y-3 text-purple-100">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Interpretação de 3 cartas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Diagnóstico simbólico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>PDF personalizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>Desbloqueio inicial no WhatsApp</span>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-purple-200 mb-2">Investimento:</div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg text-purple-300 line-through">R$ 97,00</span>
                  <div className="text-3xl font-bold text-amber-300">
                    R$ {calculateDiscount()},00
                  </div>
                  <span className="text-sm text-emerald-400">
                    Você economizou R$ {mysticBalance},00!
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-violet-400/50"
              >
                Liberar minha leitura agora
              </button>
            </>
          ) : (
            <>
              <h1 className="text-center text-purple-100 text-2xl md:text-3xl font-bold mb-2">
                Mapa do Destino – Jornada Espiritual
              </h1>
              
              <p className="text-center text-purple-200 mb-8">
                Responda com calma. Suas respostas vão revelar o que está travando sua vida hoje.
              </p>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-violet-400/20">
                  <div className="text-center text-purple-100 text-sm">
                    Saldo Místico Acumulado: <span className="text-amber-400 font-medium">R$ {mysticBalance},00</span>
                  </div>
                </div>

                <div className="text-purple-100 text-lg mb-4 font-medium">
                  {questions[currentQuestion].text}
                </div>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-4 bg-violet-600/80 text-white rounded-lg backdrop-blur-sm transition-all duration-300 text-left hover:bg-violet-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/30 border border-violet-400/30"
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between items-center text-purple-300 text-sm">
                  <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
                  <div className="w-32 h-2 bg-violet-300/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuizPage;