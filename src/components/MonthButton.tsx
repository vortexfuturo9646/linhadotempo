import React from 'react';

interface MonthButtonProps {
  month: string;
  onClick: () => void;
  isSelected: boolean;
}

const MonthButton: React.FC<MonthButtonProps> = ({ month, onClick, isSelected }) => (
  <button
    onClick={onClick}
    className={`
      w-full py-3 px-4 rounded-lg transition-all duration-300 font-medium text-center
      ${isSelected 
        ? 'bg-[#C23AC7] text-white shadow-lg shadow-[#C23AC7]/30 scale-[1.02] border border-white/20' 
        : 'bg-[#C23AC7]/80 text-white hover:bg-[#C23AC7] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#C23AC7]/20 border border-white/10'}
    `}
  >
    {month}
  </button>
);

export default MonthButton;