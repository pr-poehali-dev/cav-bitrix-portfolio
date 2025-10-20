import { useState, useEffect } from 'react';
import ContactModal from './ContactModal';
import CalcModal from './CalcModal';

const Footer = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedLogo = localStorage.getItem('site_logo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }

    const handleLogoUpdate = (event: CustomEvent) => {
      setLogoUrl(event.detail);
    };

    const checkAdminAuth = () => {
      const adminAuth = localStorage.getItem('admin_auth');
      setIsAdmin(!!adminAuth);
    };

    checkAdminAuth();

    window.addEventListener('logoUpdated', handleLogoUpdate as EventListener);
    window.addEventListener('storage', checkAdminAuth);
    
    return () => {
      window.removeEventListener('logoUpdated', handleLogoUpdate as EventListener);
      window.removeEventListener('storage', checkAdminAuth);
    };
  }, []);
  
  return (
    <footer className="footer pt-16 pb-8 relative bg-white dark:bg-gray-950">
      <div className="absolute inset-0 bg-gradient-to-t from-gradient-start/5 via-transparent to-transparent pointer-events-none dark:from-gradient-start/10" />
      
      <div className="max-w-[1570px] w-full px-[50px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="logo group">
            <a href="/" className="inline-block transition-transform hover:scale-105">
              <img 
                src={logoUrl} 
                alt="Logo" 
                className="w-20 h-20 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300"
              />
            </a>
          </div>
          
          <nav className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <a href="#" className="nav-link-custom relative group dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              Новости
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#blok-dev" className="nav-link-custom relative group dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              Разработка
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#blok-prom" className="nav-link-custom relative group dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              Продвижение
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#services" className="nav-link-custom relative group dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              Услуги
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
            </a>
            <button onClick={() => setCalcModalOpen(true)} className="nav-link-custom relative group dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)] text-left">
              Калькулятор
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
            </button>
            <a href="#portfolio" className="nav-link-custom relative group dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              Портфолио
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contacts" className="nav-link-custom relative group dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
              Контакты
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
            </a>
            {isAdmin && (
              <a href="/admin/consents" className="nav-link-custom relative group text-xs opacity-50 hover:opacity-100 dark:[text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
              </a>
            )}
            <button 
              onClick={() => setContactModalOpen(true)}
              className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-xl transition-all duration-300"
            >
              Обсудить проект
            </button>
          </nav>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            © {new Date().getFullYear()} Pixel. Все права защищены.
          </p>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <a href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gradient-start transition-colors dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
              Пользовательское соглашение
            </a>
            <a href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gradient-start transition-colors dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
              Политика конфиденциальности
            </a>
            <button
              onClick={() => {
                localStorage.removeItem('cookieConsent');
                window.location.reload();
              }}
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gradient-start transition-colors underline dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.5)]"
            >
              Настройки cookies
            </button>
          </div>
        </div>
      </div>
      
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
      <CalcModal open={calcModalOpen} onOpenChange={setCalcModalOpen} />
    </footer>
  );
};

export default Footer;