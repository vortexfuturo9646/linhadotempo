import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message }) => {
  const cleanedPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
  
  const handleRedirect = () => {
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <button
      onClick={handleRedirect}
      className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-500/40 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border border-violet-400/50"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="white" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      Continuar no WhatsApp
    </button>
  );
};

export default WhatsAppButton;