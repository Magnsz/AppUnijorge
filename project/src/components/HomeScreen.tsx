import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';
import { AlertTriangle, FileText, User, Settings, Zap } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { user, isGuest, navigateToProfile } = useAuth();
  const [showPanicConfirm, setShowPanicConfirm] = useState(false);

  const handleMakeDenuncia = () => {
    // Aqui será implementada a navegação para a tela de denúncia
    alert('Funcionalidade em desenvolvimento: Fazer Denúncia');
  };

  const handleViewDenuncias = () => {
    // Aqui será implementada a navegação para a tela de visualização de denúncias
    alert('Funcionalidade em desenvolvimento: Ver Minhas Denúncias');
  };

  const handlePanicButton = () => {
    setShowPanicConfirm(true);
  };

  const handlePanicConfirm = () => {
    // Aqui seria implementada a funcionalidade de pânico
    // Por exemplo: enviar localização, ligar para emergência, etc.
    alert('PÂNICO ATIVADO!\n\nEm uma situação real:\n- Sua localização seria enviada\n- Contatos de emergência seriam notificados\n- Autoridades seriam acionadas');
    setShowPanicConfirm(false);
  };

  const getUserGreeting = () => {
    if (user) {
      return `Olá, ambulante!`;
    }
    return 'Olá, visitante!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{getUserGreeting()}</p>
              <p className="text-sm text-gray-600">
                {isGuest ? 'Acesso como visitante' : 'Usuário logado'}
              </p>
            </div>
          </div>
          <button
            onClick={navigateToProfile}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6 space-y-8">
        {/* Welcome Message */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Carnaval Salvador 2025
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Está com algum problema com ambulantes? Faça sua denúncia de forma rápida e segura.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Panic Button */}
          {!showPanicConfirm ? (
            <Button
              variant="danger"
              onClick={handlePanicButton}
              className="w-full flex items-center justify-center gap-3 animate-pulse"
            >
              <Zap className="w-6 h-6" />
              BOTÃO DE PÂNICO
            </Button>
          ) : (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 space-y-4">
              <div className="text-center">
                <Zap className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  ATIVAR PÂNICO?
                </h3>
                <p className="text-red-800 text-sm mb-4">
                  Isso irá notificar as autoridades e seus contatos de emergência imediatamente.
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPanicConfirm(false)}
                  className="flex-1"
                  size="md"
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={handlePanicConfirm}
                  className="flex-1"
                  size="md"
                >
                  CONFIRMAR PÂNICO
                </Button>
              </div>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleMakeDenuncia}
            className="w-full flex items-center justify-center gap-3"
          >
            <AlertTriangle className="w-6 h-6" />
            Fazer Denúncia
          </Button>

          {user && (
            <Button
              variant="outline"
              onClick={handleViewDenuncias}
              className="w-full flex items-center justify-center gap-3"
            >
              <FileText className="w-5 h-5" />
              Ver minhas denúncias
            </Button>
          )}
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2">Dica importante</h3>
            <p className="text-orange-800 text-sm">
              Suas denúncias são anônimas e tratadas com total sigilo. 
              Forneça o máximo de detalhes possível para uma resolução mais eficaz.
            </p>
          </div>

          {isGuest && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Acesso limitado</h3>
              <p className="text-yellow-800 text-sm">
                Como visitante, você pode fazer denúncias, mas não poderá acompanhar o status. 
                Faça login para ter acesso completo.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};