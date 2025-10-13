const Footer = () => {
  return (
    <footer className="footer pt-16 pb-[100px]">
      <div className="max-w-[1570px] w-full px-[50px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="logo">
          <a href="#">
            <svg width="72" height="25" viewBox="0 0 72 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.88 24V1.6H9.712C14.928 1.6 18.224 4.576 18.224 9.152C18.224 14.176 14.192 16.8 9.264 16.8H4.816V24H0.88ZM4.816 13.248H9.392C12.368 13.248 14.224 11.584 14.224 9.184C14.224 6.56 12.336 5.184 9.392 5.184H4.816V13.248ZM21.871 4.512V0.831999H26.031V4.512H21.871ZM22.031 24V7.104H25.903V24H22.031ZM29.4913 24L35.6993 15.424L29.7153 7.104H33.9393L37.8433 12.672L41.7473 7.104H45.8753L39.8913 15.328L46.1313 24H41.9073L37.7473 18.08L33.6193 24H29.4913ZM56.1448 24.384C51.2488 24.384 47.4728 20.832 47.4728 15.552C47.4728 10.72 50.8968 6.752 55.7288 6.752C61.1048 6.752 63.8248 10.976 63.8248 15.84C63.8248 16.096 63.7928 16.736 63.7608 16.928H51.3448C51.7608 19.68 53.7128 21.216 56.2088 21.216C58.0968 21.216 59.4408 20.512 60.7848 19.2L63.0568 21.216C61.4568 23.136 59.2488 24.384 56.1448 24.384ZM51.3128 14.368H59.9848C59.7288 11.872 58.2568 9.92 55.6968 9.92C53.3288 9.92 51.6648 11.744 51.3128 14.368ZM67.9373 24V0.639999H71.8093V24H67.9373Z" fill="#252525" />
            </svg>
          </a>
        </div>
        <nav className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <a href="#" className="nav-link-custom">Новости</a>
          <a href="#services" className="nav-link-custom">Услуги</a>
          <a href="#portfolio" className="nav-link-custom">Портфолио</a>
          <a href="#lid" className="nav-link-custom">Лидогенерация</a>
          <a href="#contacts" className="nav-link-custom">Контакты</a>
          <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
            Обсудить проект
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
