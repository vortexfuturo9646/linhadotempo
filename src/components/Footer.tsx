import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900/95 backdrop-blur-md border-t border-violet-400/30 mt-6">
      <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-3 md:mb-4">
          <a 
            href="/contato" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-xs md:text-sm"
          >
            Contato
          </a>
          <a 
            href="/afiliados" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-xs md:text-sm"
          >
            Afiliados
          </a>
          <a 
            href="/politica-privacidade" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-xs md:text-sm"
          >
            Política de Privacidade
          </a>
          <a 
            href="/termos-uso" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-xs md:text-sm"
          >
            Termos de Uso
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center space-y-2 md:space-y-3">
          <p className="text-purple-100 font-medium text-sm">
            © 2025 Vortex Futuro.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;