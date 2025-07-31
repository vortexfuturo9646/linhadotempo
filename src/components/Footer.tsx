import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-900/95 backdrop-blur-md border-t border-violet-400/30 mt-12">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Links Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a 
            href="/contato" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-sm"
          >
            Contato
          </a>
          <a 
            href="/afiliados" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-sm"
          >
            Afiliados
          </a>
          <a 
            href="/politica-privacidade" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-sm"
          >
            Política de Privacidade
          </a>
          <a 
            href="/termos-uso" 
            className="text-purple-200 hover:text-amber-300 transition-colors text-sm"
          >
            Termos de Uso
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center space-y-3">
          <p className="text-purple-100 font-medium text-sm">
            © 2025 Vortex Futuro.
          </p>
          <p className="text-purple-100 font-medium text-sm">
            Todos os direitos reservados.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-purple-200 text-xs leading-relaxed">
              Todo o conteúdo deste site incluindo textos, imagens, logotipos, gráficos, elementos visuais e funcionalidades é protegido por leis de direitos autorais aplicáveis.
            </p>
            <p className="text-purple-200 text-xs leading-relaxed mt-2">
              A reprodução, distribuição ou qualquer uso não autorizado deste material é expressamente proibida e pode resultar em medidas legais conforme a legislação vigente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;