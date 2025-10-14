import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    if (cookies && terms && privacy) {
      localStorage.setItem('cookieConsent', 'true');
      setIsVisible(false);
    }
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const allChecked = cookies && terms && privacy;

  return (
    <div className="fixed inset-0 z-[99999] flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 animate-slide-up border border-gradient-start/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-gradient-start to-gradient-mid rounded-2xl flex items-center justify-center flex-shrink-0">
            <Icon name="Cookie" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gradient-start to-gradient-mid bg-clip-text text-transparent">
              Мы используем cookies
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Для корректной работы сайта и улучшения вашего опыта мы используем файлы cookies. Пожалуйста, ознакомьтесь с условиями и дайте согласие на обработку данных.
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={cookies}
                onChange={(e) => setCookies(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gradient-to-r checked:from-gradient-start checked:to-gradient-mid checked:border-transparent focus:ring-2 focus:ring-gradient-start/30 cursor-pointer appearance-none"
              />
              {cookies && (
                <Icon name="Check" size={14} className="absolute text-white pointer-events-none" />
              )}
            </div>
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
              Согласие на использование cookies для улучшения работы сайта
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gradient-to-r checked:from-gradient-start checked:to-gradient-mid checked:border-transparent focus:ring-2 focus:ring-gradient-start/30 cursor-pointer appearance-none"
              />
              {terms && (
                <Icon name="Check" size={14} className="absolute text-white pointer-events-none" />
              )}
            </div>
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
              Согласие с{' '}
              <a href="/terms" className="text-gradient-start hover:text-gradient-mid underline font-medium" onClick={(e) => e.stopPropagation()}>
                пользовательским соглашением
              </a>
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-1">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => setPrivacy(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-gradient-to-r checked:from-gradient-start checked:to-gradient-mid checked:border-transparent focus:ring-2 focus:ring-gradient-start/30 cursor-pointer appearance-none"
              />
              {privacy && (
                <Icon name="Check" size={14} className="absolute text-white pointer-events-none" />
              )}
            </div>
            <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
              Согласие с{' '}
              <a href="/privacy" className="text-gradient-start hover:text-gradient-mid underline font-medium" onClick={(e) => e.stopPropagation()}>
                политикой конфиденциальности
              </a>
            </span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAccept}
            disabled={!allChecked}
            className={`flex-1 px-6 py-4 rounded-full text-sm font-semibold transition-all duration-300 ${
              allChecked
                ? 'bg-gradient-to-r from-gradient-start to-gradient-mid text-white hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Принять все
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 px-6 py-4 rounded-full text-sm font-semibold border-2 border-gray-300 text-gray-700 hover:border-gradient-start hover:text-gradient-start transition-all duration-300"
          >
            Отклонить
          </button>
        </div>

        {!allChecked && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Для продолжения необходимо принять все условия
          </p>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
