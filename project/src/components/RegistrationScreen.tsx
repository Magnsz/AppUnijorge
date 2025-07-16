import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { formatCPF, isValidCPF } from '../utils/cpf';
import { Button } from './Button';
import { InputField } from './InputField';
import { UserPlus, ArrowLeft, Check } from 'lucide-react';

export const RegistrationScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { navigateToLogin } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    if (field === 'cpf') {
      value = formatCPF(value);
    }
    if (field === 'phone') {
      // Formatar telefone: (00) 00000-0000
      const numbers = value.replace(/\D/g, '');
      if (numbers.length <= 11) {
        value = numbers
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2');
      } else {
        value = numbers.slice(0, 11)
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d)/, '$1-$2');
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simular registro (em produção, faria chamada para API)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      
      // Após 3 segundos, voltar para login
      setTimeout(() => {
        navigateToLogin();
      }, 3000);
    } catch (error) {
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Conta criada com sucesso!</h1>
          <p className="text-gray-600">
            Sua conta foi criada. Você será redirecionado para a tela de login em alguns segundos.
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={navigateToLogin}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Criar Conta</h1>
          <p className="text-lg text-gray-600">Cadastre-se como ambulante</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Nome completo"
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            placeholder="Digite seu nome completo"
            error={errors.name}
            required
          />

          <InputField
            label="CPF"
            value={formData.cpf}
            onChange={(value) => handleInputChange('cpf', value)}
            placeholder="000.000.000-00"
            error={errors.cpf}
            required
          />

          <InputField
            label="Telefone"
            value={formData.phone}
            onChange={(value) => handleInputChange('phone', value)}
            placeholder="(00) 00000-0000"
            error={errors.phone}
            required
          />

          <InputField
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(value) => handleInputChange('password', value)}
            placeholder="Mínimo 6 caracteres"
            error={errors.password}
            required
          />

          <InputField
            label="Confirmar senha"
            type="password"
            value={formData.confirmPassword}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            placeholder="Digite a senha novamente"
            error={errors.confirmPassword}
            required
          />

          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-base font-medium">{errors.general}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3"
          >
            <UserPlus className="w-5 h-5" />
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Ao criar uma conta, você concorda com nossos termos de uso e política de privacidade.
          </p>
        </div>
      </div>
    </div>
  );
};