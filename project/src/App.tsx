import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegistrationScreen } from './components/RegistrationScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';

const AppContent: React.FC = () => {
  const { user, isGuest, currentScreen, showSplash, completeSplash } = useAuth();

  if (showSplash) {
    return <SplashScreen onComplete={completeSplash} />;
  }

  if (user || isGuest) {
    return currentScreen === 'profile' ? <ProfileScreen /> : <HomeScreen />;
  }

  if (currentScreen === 'register') {
    return <RegistrationScreen />;
  }

  return <LoginScreen />;
};

function App() {
  return (
    <AuthProvider>
      <div className="font-sans antialiased">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;