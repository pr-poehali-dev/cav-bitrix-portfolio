import { useState, useEffect } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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

  return (
    <>
      <div className="h-[50px]"></div>
      
      <nav 
        className={`navigation flex justify-end z-[9999999] transition-all duration-300 ${
          isSticky 
            ? 'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md py-4 px-[50px]' 
            : 'relative'
        }`}
      >
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium bg-[#424AE3] text-white px-4 py-2 rounded-[30px]"
        >
          <span className="w-6 h-0.5 bg-white"></span>
          Меню
        </button>
        
        <div className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-[10px] z-[999999]`}>
          <a href="#" className="nav-link-custom">Новости</a>
          <a href="#services" className="nav-link-custom">Услуги</a>
          <a href="#portfolio" className="nav-link-custom">Портфолио</a>
          <a href="#lid" className="nav-link-custom">Лидогенерация</a>
          <a href="#contacts" className="nav-link-custom">Контакты</a>
          <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm font-normal max-w-[181px]">
            Обсудить проект
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;
