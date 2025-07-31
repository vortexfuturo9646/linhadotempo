import React from 'react';
import { useState, useEffect } from 'react';
import OraclePage from './pages/OraclePage';
import NumerologyPage from './pages/NumerologyPage';
import RevelationPage from './pages/RevelationPage';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  
  // Listen for navigation changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Navigation function to be passed to child components
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(new URL(path, window.location.origin).pathname);
    setSearchParams(new URLSearchParams(new URL(path, window.location.origin).search));
  };
  
  if (currentPath === '/revelacao') {
    const name = searchParams.get('nome') || 'Visitante';
    const birthDate = searchParams.get('data') || '01/01/2000';
    return <RevelationPage name={name} birthDate={birthDate} />;
  }
  
  if (currentPath === '/numerologia') {
    const name = searchParams.get('nome') || 'Visitante';
    const birthDate = searchParams.get('data') || '01/01/2000';
    return <NumerologyPage name={name} birthDate={birthDate} />;
  }
  
  if (currentPath === '/obrigado') {
    const name = searchParams.get('nome') || 'Visitante';
    return <ThankYouPage name={name} />;
  }
  
  return <OraclePage navigate={navigate} />;
}

export default App;