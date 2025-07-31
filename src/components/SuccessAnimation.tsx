import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const SuccessAnimation: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center mb-6">
      <div className={`relative rounded-full h-20 w-20 flex items-center justify-center bg-purple-700/30 backdrop-blur-sm transition-all duration-700 ${animate ? 'scale-100' : 'scale-0'}`}>
        <div className={`absolute rounded-full h-16 w-16 border-4 border-pink-500 flex items-center justify-center transition-all duration-700 ${animate ? 'scale-100' : 'scale-0'}`}>
          <Check 
            className={`text-white transition-all duration-700 ${animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} 
            size={32} 
            strokeWidth={3} 
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;