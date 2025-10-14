import { useState } from 'react';
import { usePartner } from '@/contexts/PartnerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function PartnerLogin() {
  const { isPartner, login, logout, discountPercent, partnerName } = usePartner();
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    const success = await login(loginValue, password);
    
    if (success) {
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
      setLoginValue('');
      setPassword('');
      setError('');
      setShowLogin(false);
      setIsHovered(false);
    } else {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }
      setError('Неверный логин или пароль');
    }
    
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  if (isPartner) {
    return (
      <div className="fixed top-4 right-4 z-[99999999] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-right">
        <Icon name="BadgeCheck" size={24} />
        <div className="flex flex-col">
          <span className="font-bold">{partnerName}</span>
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

  if (showLogin) {
    return (
      <div 
        className="fixed top-4 right-4 z-[99999999] bg-white rounded-lg shadow-xl p-4 border-2 border-primary/20 w-72 animate-in slide-in-from-right"
        onMouseLeave={() => {
          if (!isLoading) {
            setShowLogin(false);
            setError('');
            setLoginValue('');
            setPassword('');
          }
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Icon name="Users" size={20} />
            Партнерский вход
          </h3>
          <Button
            onClick={() => {
              setShowLogin(false);
              setError('');
              setLoginValue('');
              setPassword('');
            }}
            variant="ghost"
            size="sm"
            disabled={isLoading}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
        
        <div className="space-y-3">
          <Input
            type="text"
            placeholder="Логин"
            value={loginValue}
            onChange={(e) => {
              setLoginValue(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            autoFocus
          />
          
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            className={error ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          
          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <Icon name="AlertCircle" size={14} />
              {error}
            </p>
          )}
          
          <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                Вход...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed top-4 right-0 z-[99999999] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        onClick={() => setShowLogin(true)}
        className={`
          bg-primary hover:bg-primary/90 text-white shadow-lg rounded-l-full rounded-r-none pr-4 pl-4
          transition-all duration-300 ease-out
          ${isHovered ? 'translate-x-0' : 'translate-x-[calc(100%-48px)]'}
        `}
        size="sm"
      >
        <Icon name="Users" size={20} className="flex-shrink-0" />
        <span className={`ml-2 whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
          Вход для партнеров
        </span>
      </Button>
    </div>
  );
}
