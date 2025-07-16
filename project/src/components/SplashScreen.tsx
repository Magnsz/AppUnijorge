import React, { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500); // 2.5 segundos de duração

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {/* Logo centralizada */}
      <div className="text-center animate-fade-in">
        <img 
          src="/PMS.png" 
          alt="Prefeitura Municipal de Salvador" 
          className="h-24 w-auto object-contain mx-auto mb-8"
        />
        <h1 className="text-2xl font-light text-gray-900 tracking-wide">
          Carnaval Salvador
        </h1>
      </div>

      {/* CSS minimalista */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};