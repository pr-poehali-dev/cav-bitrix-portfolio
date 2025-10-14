const Footer = () => {
  return (
    <footer className="footer pt-16 pb-[100px] relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gradient-start/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-[1570px] w-full px-[50px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="logo group">
          <a href="#" className="inline-block transition-transform hover:scale-105">
            <img 
              src="https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png" 
              alt="Logo" 
              className="w-20 h-20 object-contain drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300"
            />
          </a>
        </div>
        
        <nav className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <a href="#" className="nav-link-custom relative group">
            Новости
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#blok-dev" className="nav-link-custom relative group">
            Разработка
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#blok-prom" className="nav-link-custom relative group">
            Продвижение
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#services" className="nav-link-custom relative group">
            Услуги
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#portfolio" className="nav-link-custom relative group">
            Портфолио
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contacts" className="nav-link-custom relative group">
            Контакты
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="/admin/bots" className="nav-link-custom relative group text-xs opacity-50 hover:opacity-100">
            Admin
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transition-all duration-300 group-hover:w-full" />
          </a>
          <button className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-xl transition-all duration-300">
            Обсудить проект
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;