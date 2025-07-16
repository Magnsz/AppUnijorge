import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  cpf: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  currentScreen: 'home' | 'profile' | 'login' | 'register';
  showSplash: boolean;
  login: (cpf: string, password: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
  navigateToProfile: () => void;
  navigateToHome: () => void;
  navigateToLogin: () => void;
  navigateToRegister: () => void;
  completeSplash: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'profile' | 'login' | 'register'>('login');
  const [showSplash, setShowSplash] = useState(true);

  const login = async (cpf: string, password: string): Promise<boolean> => {
    // Simulação de login - em produção, faria chamada para API
    if (cpf && password) {
      setUser({
        cpf,
        name: 'Ambulante'
      });
      setIsGuest(false);
      return true;
    }
    return false;
  };

  const loginAsGuest = () => {
    setIsGuest(true);
    setUser(null);
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    setCurrentScreen('login');
  };

  const navigateToProfile = () => {
    setCurrentScreen('profile');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };

  const navigateToRegister = () => {
    setCurrentScreen('register');
  };

  const completeSplash = () => {
    setShowSplash(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isGuest, 
      currentScreen, 
      showSplash,
      login, 
      loginAsGuest, 
      logout, 
      navigateToProfile, 
      navigateToHome,
      navigateToLogin,
      navigateToRegister,
      completeSplash
    }}>
      {children}
    </AuthContext.Provider>
  );
};