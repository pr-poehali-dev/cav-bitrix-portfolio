import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cookies, setCookies] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = async () => {
    if (!cookies) return;
    
    if (privacy && !fullName.trim()) {
      alert('Пожалуйста, укажите ФИО');
      return;
    }

    setIsSubmitting(true);

    try {
      if (privacy) {
        const response = await fetch('https://functions.poehali.dev/80536dd3-4799-47a9-893a-a756a259460e', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cookies,
            terms,
            privacy,
            fullName: fullName.trim(),
            phone: phone.trim(),
            email: email.trim(),
          })
        });

        if (!response.ok) {
          throw new Error('Ошибка сохранения данных');
        }
      }

      localStorage.setItem('cookieConsent', JSON.stringify({
        cookies,
        terms,
        privacy,
        date: new Date().toISOString()
      }));
      
      setIsVisible(false);
    } catch (error) {
      console.error('Error saving consent:', error);
      alert('Произошла ошибка при сохранении данных. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const canSubmit = cookies && (!privacy || fullName.trim());

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
              Согласие на использование cookies для улучшения работы сайта <span className="text-red-500 font-semibold">*</span>
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

          {privacy && (
            <div className="ml-8 space-y-3 pt-3 border-l-2 border-gradient-start/30 pl-4 animate-slide-up">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ФИО <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Иванов Иван Иванович"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/30 outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/30 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-gradient-start focus:ring-2 focus:ring-gradient-start/30 outline-none transition-all"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleAccept}
            disabled={!canSubmit || isSubmitting}
            className={`flex-1 px-6 py-4 rounded-full text-sm font-semibold transition-all duration-300 ${
              canSubmit && !isSubmitting
                ? 'bg-gradient-to-r from-gradient-start to-gradient-mid text-white hover:shadow-xl hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Сохранение...' : 'Принять'}
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 px-6 py-4 rounded-full text-sm font-semibold border-2 border-gray-300 text-gray-700 hover:border-gradient-start hover:text-gradient-start transition-all duration-300"
          >
            Отклонить
          </button>
        </div>

        {!cookies && (
          <p className="text-xs text-red-500 text-center mt-4">
            * Согласие на использование cookies обязательно для работы сайта
          </p>
        )}
        {privacy && !fullName.trim() && (
          <p className="text-xs text-red-500 text-center mt-4">
            * При согласии с политикой конфиденциальности необходимо указать ФИО
          </p>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;