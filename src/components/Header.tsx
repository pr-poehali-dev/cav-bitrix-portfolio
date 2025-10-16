import { useState, useEffect, useRef } from 'react';
import ContactModal from './ContactModal';
import { useTheme } from '@/contexts/ThemeContext';
import Icon from '@/components/ui/icon';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    if (themeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themeMenuOpen]);

  return (
    <>
      <div className="h-[50px]"></div>
      
      <nav 
        className={`navigation flex justify-between items-center z-[9999999] transition-all duration-300 ${
          isSticky 
            ? 'fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl shadow-lg border-b border-gradient-start/10 dark:border-gray-800/50 py-4 px-[50px] animate-fade-in' 
            : 'relative'
        }`}
      >
        <div className="logo group relative" ref={themeMenuRef}>
          <button 
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            className="inline-block transition-transform hover:scale-105"
          >
            <img 
              src="https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png" 
              alt="Logo" 
              className="w-16 h-16 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-300"
            />
          </button>

          {themeMenuOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 min-w-[220px] animate-fade-in z-[99999]">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-3 mb-3">Выбор темы</p>
                
                <button
                  onClick={() => {
                    setTheme('light');
                    setThemeMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-gradient-start to-gradient-mid text-white shadow-lg'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300'
                  }`}
                >
                  <Icon name="Sun" size={18} />
                  <span className="font-medium">Светлая тема</span>
                </button>

                <button
                  onClick={() => {
                    setTheme('dark');
                    setThemeMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg border border-gray-700'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-300'
                  }`}
                >
                  <Icon name="Moon" size={18} />
                  <span className="font-medium">Темная тема</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-6 py-3 rounded-full hover:shadow-lg transition-all"
        >
          <div className="flex flex-col gap-1">
            <span className={`w-5 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
          Меню
        </button>
        
        <div className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-6 z-[999999] ${menuOpen ? 'absolute top-full right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl mt-4 border border-gradient-start/10 dark:border-gray-800/50' : ''}`}>
          <a href="/#blok-dev" className="nav-link-custom relative group">
            Разработка
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/#blok-prom" className="nav-link-custom relative group">
            Продвижение
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/#news" className="nav-link-custom relative group">
            Новости
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/services" className="nav-link-custom relative group">
            Наши услуги
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/#portfolio" className="nav-link-custom relative group">
            Портфолио
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/#contacts" className="nav-link-custom relative group">
            Контакты
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <button 
            onClick={() => setContactModalOpen(true)}
            className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-6 py-3 rounded-full text-sm font-semibold max-w-[181px] hover:shadow-xl transition-all duration-300"
          >
            Обсудить проект
          </button>
        </div>
      </nav>
      
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
};

export default Header;