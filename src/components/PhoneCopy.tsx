import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface PhoneCopyProps {
  phoneNumber: string;
}

const PhoneCopy: React.FC<PhoneCopyProps> = ({ phoneNumber }) => {
  const [copied, setCopied] = useState(false);
  const formattedPhone = phoneNumber.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
  
  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="mt-4 text-center">
      <p className="text-white/70 text-sm">
        Ou se preferir, copie nosso número:
      </p>
      <div 
        className="flex items-center justify-center gap-2 bg-white/10 rounded-lg py-2 px-4 mt-2 backdrop-blur-sm cursor-pointer hover:bg-white/15 transition-colors"
        onClick={handleCopy}
      >
        <span className="text-white font-medium">{formattedPhone}</span>
        {copied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} className="text-white/70" />
        )}
      </div>
      {copied && (
        <p className="text-green-400 text-xs mt-1 animate-fade-in">
          Número copiado!
        </p>
      )}
    </div>
  );
};

export default PhoneCopy;