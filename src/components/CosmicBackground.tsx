import React from 'react';

const CosmicBackground: React.FC = () => {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        backgroundImage: 'url(/bg2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay para melhorar legibilidade do texto */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default CosmicBackground;