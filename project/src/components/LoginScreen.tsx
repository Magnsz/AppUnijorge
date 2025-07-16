import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { formatCPF, isValidCPF } from '../utils/cpf';
import { Button } from './Button';
import { InputField } from './InputField';
import { UserCheck, LogIn } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, loginAsGuest, navigateToRegister } = useAuth();

  const handleCpfChange = (value: string) => {
    const formatted = formatCPF(value);
    setCpf(formatted);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isValidCPF(cpf)) {
      setError('CPF inválido. Verifique os números digitados.');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('Senha é obrigatória.');
      setLoading(false);
      return;
    }

    const success = await login(cpf, password);
    if (!success) {
      setError('CPF ou senha incorretos. Tente novamente.');
    }
    setLoading(false);
  };

  const handleGuestLogin = () => {
    loginAsGuest();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <UserCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Carnaval Salvador</h1>
          <p className="text-lg text-gray-600">Denúncias de ambulantes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="CPF"
            value={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            required
          />
          
          <InputField
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Digite sua senha"
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-base font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3"
          >
            <LogIn className="w-5 h-5" />
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-base">
              <span className="px-4 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGuestLogin}
            className="w-full"
          >
            Entrar como visitante
          </Button>

          <Button
            variant="secondary"
            onClick={navigateToRegister}
            className="w-full"
          >
            Criar nova conta
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Como visitante você pode fazer denúncias, mas não poderá acompanhar o status.
          </p>
        </div>
      </div>
    </div>
  );
};