import { useState } from 'react';
import { usePartner } from '@/contexts/PartnerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function PartnerLogin() {
  const { isPartner, login, logout, discountPercent } = usePartner();
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    const success = login(password);
    if (success) {
      setPassword('');
      setError('');
      setShowLogin(false);
    } else {
      setError('Неверный пароль');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isPartner) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
        <Icon name="BadgeCheck" size={24} />
        <div className="flex flex-col">
          <span className="font-bold">Партнерский доступ</span>
          <span className="text-xs opacity-90">Скидка {discountPercent}% на услуги</span>
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          size="sm"
          className="ml-2 hover:bg-white/20 text-white"
        >
          <Icon name="LogOut" size={16} />
        </Button>
      </div>
    );
  }

  if (!showLogin) {
    return (
      <Button
        onClick={() => setShowLogin(true)}
        className="fixed top-4 right-4 z-50 bg-primary hover:bg-primary/90 text-white shadow-lg"
        size="sm"
      >
        <Icon name="Users" size={16} className="mr-2" />
        Вход для партнеров
      </Button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 border-2 border-primary/20 w-72">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Icon name="Users" size={20} />
          Партнерский вход
        </h3>
        <Button
          onClick={() => {
            setShowLogin(false);
            setError('');
            setPassword('');
          }}
          variant="ghost"
          size="sm"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      
      <div className="space-y-3">
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          className={error ? 'border-red-500' : ''}
        />
        
        {error && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <Icon name="AlertCircle" size={14} />
            {error}
          </p>
        )}
        
        <Button onClick={handleLogin} className="w-full">
          <Icon name="LogIn" size={16} className="mr-2" />
          Войти
        </Button>
        
        <p className="text-xs text-gray-500 text-center">
          Скидка {discountPercent}% на все услуги кроме хостинга
        </p>
      </div>
    </div>
  );
}
