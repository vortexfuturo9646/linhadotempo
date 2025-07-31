import React from 'react';
import { CheckCircle, Sparkles, Heart } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import CosmicBackground from '../components/CosmicBackground';

const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <CosmicBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          
          {/* Success Icon */}
          <div className="text-center">
            <div className="relative inline-block">
              <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-pulse" />
              <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-bounce" />
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-white leading-tight">
              🌙 Conexão Confirmada
            </h1>
            <p className="text-purple-100 text-xs leading-tight">
              🌙 Sua conexão foi recebida. Sua revelação está sendo preparada.
            </p>
          </div>

          {/* Mystical Card */}
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-purple-200 font-semibold text-sm">Próximo Passo</span>
              <Heart className="w-4 h-4 text-pink-400" />
            </div>
            
            <p className="text-purple-100 text-center text-xs leading-tight">
              Sua revelação completa está sendo canalizada e será entregue através do WhatsApp. 
              O campo energético está aberto para receber sua leitura personalizada.
            </p>
            
            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-lg p-2 border border-emerald-400/30 mt-3">
              <p className="text-emerald-200 text-center text-xs leading-tight font-medium">
                ✨ Sua liberação foi recebida com sucesso. A leitura está sendo canalizada neste momento. Respire fundo e prepare-se para receber o que antes estava bloqueado.
              </p>
            </div>
          </div>

          {/* WhatsApp Button */}
          <div className="pt-3">
            <WhatsAppButton 
              phoneNumber="5511999999999"
              message="✨ Olá! Minha liberação espiritual foi confirmada e estou pronta(o) para receber minha revelação da Linha do Tempo que estava bloqueada."
            />
          </div>

          {/* Mystical Quote */}
          <div className="text-center space-y-2 pt-3">
            <p className="text-purple-300 text-xs italic">
              "Sua energia está alinhada. A revelação chegará no momento certo."
            </p>
            <p className="text-violet-200 text-xs font-medium">
              Mãe Marlene
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;