import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';
import { ArrowLeft, User, Shield, Bell, HelpCircle, Phone, AlertTriangle } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { user, isGuest, logout, navigateToHome } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  const handleEmergencyContact = () => {
    // Aqui seria implementada a funcionalidade de contato de emergência
    alert('Funcionalidade em desenvolvimento: Contato de Emergência');
  };

  const handleHelp = () => {
    // Aqui seria implementada a tela de ajuda
    alert('Funcionalidade em desenvolvimento: Central de Ajuda');
  };

  const handleNotifications = () => {
    // Aqui seria implementada as configurações de notificação
    alert('Funcionalidade em desenvolvimento: Configurações de Notificação');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={navigateToHome}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Perfil</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {isGuest ? 'Visitante' : 'Ambulante'}
              </h2>
              {user && (
                <p className="text-gray-600">CPF: {user.cpf}</p>
              )}
              <p className="text-sm text-gray-500">
                {isGuest ? 'Acesso limitado' : 'Usuário verificado'}
              </p>
            </div>
          </div>
          
          {isGuest && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Dica:</strong> Faça login para ter acesso completo às funcionalidades e acompanhar suas denúncias.
              </p>
            </div>
          )}
        </div>

        {/* Menu Options */}
        <div className="space-y-3">
          {/* Emergency Contact */}
          <button
            onClick={handleEmergencyContact}
            className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Contatos de Emergência</h3>
              <p className="text-sm text-gray-600">Números importantes do carnaval</p>
            </div>
          </button>

          {/* Notifications */}
          <button
            onClick={handleNotifications}
            className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Notificações</h3>
              <p className="text-sm text-gray-600">Configurar alertas e avisos</p>
            </div>
          </button>

          {/* Security */}
          <button
            className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Segurança</h3>
              <p className="text-sm text-gray-600">Privacidade e proteção de dados</p>
            </div>
          </button>

          {/* Help */}
          <button
            onClick={handleHelp}
            className="w-full bg-white rounded-xl shadow-md p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Central de Ajuda</h3>
              <p className="text-sm text-gray-600">Dúvidas e suporte</p>
            </div>
          </button>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">Carnaval Salvador 2025</h3>
          <p className="text-sm text-gray-600">
            Aplicativo oficial para denúncias de ambulantes
          </p>
          <p className="text-xs text-gray-500">Versão 1.0.0</p>
        </div>

        {/* Logout Section */}
        <div className="pt-4">
          {!showLogoutConfirm ? (
            <Button
              variant="danger"
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full"
              size="md"
            >
              Sair do aplicativo
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-gray-700 font-medium">
                Tem certeza que deseja sair?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1"
                  size="md"
                >
                  Cancelar
                </Button>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="flex-1"
                  size="md"
                >
                  Confirmar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};