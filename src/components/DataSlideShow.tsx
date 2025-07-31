import React, { useState, useEffect } from 'react';
import { Calendar, User, Hash, Star } from 'lucide-react';

interface DataSlideShowProps {
  name: string;
  birthDate: string;
  day: number;
  month: number;
  year: number;
  monthName: string;
}

const DataSlideShow: React.FC<DataSlideShowProps> = ({
  name,
  birthDate,
  day,
  month,
  year,
  monthName
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: <User className="text-yellow-300\" size={32} />,
      title: "Seu Nome Espiritual",
      content: name,
      subtitle: "A vibração da sua essência"
    },
    {
      icon: <Calendar className="text-pink-300" size={32} />,
      title: "Data de Nascimento",
      content: birthDate,
      subtitle: "O momento escolhido pela sua alma"
    },
    {
      icon: <Hash className="text-purple-300\" size={32} />,
      title: "Dia de Nascimento",
      content: day.toString(),
      subtitle: `Energia do dia ${day}`
    },
    {
      icon: <Star className="text-blue-300" size={32} />,
      title: "Mês Sagrado",
      content: monthName,
      subtitle: `${month}º mês do ciclo anual`
    },
    {
      icon: <Hash className="text-emerald-300\" size={32} />,
      title: "Ano de Manifestação",
      content: year.toString(),
      subtitle: "O ano que definiu seu destino"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in relative">
      {/* Mystical Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 rounded-lg"></div>
      <div className="absolute top-2 left-2 w-4 h-4 bg-yellow-300/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-purple-300/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute top-1/2 right-4 w-2 h-2 bg-pink-300/20 rounded-full blur-sm animate-pulse"></div>
      
      {/* Slide Content */}
      <div className="flex flex-col items-center space-y-2 relative z-10">
        <div className="animate-pulse">
          {currentSlideData.icon}
        </div>
        
        <h3 className="text-sm font-bold text-white drop-shadow-lg">
          {currentSlideData.title}
        </h3>
        
        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-lg px-4 py-2 backdrop-blur-md border border-purple-300/40 shadow-lg shadow-purple-500/20">
          <p className="text-base font-bold text-amber-300 drop-shadow-md">
            {currentSlideData.content}
          </p>
        </div>
        
        <p className="text-purple-100 text-xs drop-shadow-sm">
          {currentSlideData.subtitle}
        </p>
      </div>

      {/* Slide Indicators */}
      <div className="flex space-x-0.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-amber-300 scale-125 shadow-lg shadow-amber-300/50'
                : 'bg-purple-300/40 hover:bg-purple-300/60'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs bg-purple-300/30 h-0.5 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-amber-300 to-violet-400 h-0.5 rounded-full transition-all duration-300 shadow-sm"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default DataSlideShow;