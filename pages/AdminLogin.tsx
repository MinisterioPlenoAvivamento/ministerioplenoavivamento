import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Flame, LogIn, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import Button from '../components/Button';
import { showSuccess, showError } from '../utils/toast';

const ADMIN_PASSWORD = 'Villares07oi'; // Senha atualizada
const ADMIN_AUTH_KEY = 'admin_authenticated'; // Chave consistente

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Novo estado para visibilidade
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      showSuccess('Acesso concedido! Redirecionando...');
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Senha incorreta. Tente novamente.');
      showError('Falha na autenticação.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-church-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 md:p-10 rounded-3xl border border-church-red/50 shadow-2xl shadow-red-900/20 relative overflow-hidden">
        
        <div className="text-center mb-8">
          <Flame className="h-12 w-12 text-church-red mx-auto mb-4 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
          <h1 className="text-3xl font-black text-white tracking-tight">Área Administrativa</h1>
          <p className="text-gray-500 text-sm mt-1">Acesso restrito para gestão do conteúdo.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Senha de Acesso</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 pl-12 rounded-xl bg-black border border-white/10 text-white focus:border-church-red focus:ring-1 focus:ring-church-red outline-none transition-all placeholder-gray-700"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white p-1 transition-colors"
                title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 p-3 rounded-lg flex items-center gap-2 text-sm">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <Button type="submit" fullWidth className="mt-4">
            Entrar no Painel <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </form>
        
        <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/')}>
                Voltar ao Site
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;