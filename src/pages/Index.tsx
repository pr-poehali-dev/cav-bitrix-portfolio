import { useState } from 'react';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="header transition-shadow hover:shadow-md rounded-[30px]">
        <div className="max-w-[1500px] w-full px-[50px] mx-auto py-8">
          <div className="grid lg:grid-cols-2 gap-[76px] items-start">
            <div className="header-left space-y-12">
              <div className="logo">
                <a href="#">
                  <svg width="72" height="25" viewBox="0 0 72 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.88 24V1.6H9.712C14.928 1.6 18.224 4.576 18.224 9.152C18.224 14.176 14.192 16.8 9.264 16.8H4.816V24H0.88ZM4.816 13.248H9.392C12.368 13.248 14.224 11.584 14.224 9.184C14.224 6.56 12.336 5.184 9.392 5.184H4.816V13.248ZM21.871 4.512V0.831999H26.031V4.512H21.871ZM22.031 24V7.104H25.903V24H22.031ZM29.4913 24L35.6993 15.424L29.7153 7.104H33.9393L37.8433 12.672L41.7473 7.104H45.8753L39.8913 15.328L46.1313 24H41.9073L37.7473 18.08L33.6193 24H29.4913ZM56.1448 24.384C51.2488 24.384 47.4728 20.832 47.4728 15.552C47.4728 10.72 50.8968 6.752 55.7288 6.752C61.1048 6.752 63.8248 10.976 63.8248 15.84C63.8248 16.096 63.7928 16.736 63.7608 16.928H51.3448C51.7608 19.68 53.7128 21.216 56.2088 21.216C58.0968 21.216 59.4408 20.512 60.7848 19.2L63.0568 21.216C61.4568 23.136 59.2488 24.384 56.1448 24.384ZM51.3128 14.368H59.9848C59.7288 11.872 58.2568 9.92 55.6968 9.92C53.3288 9.92 51.6648 11.744 51.3128 14.368ZM67.9373 24V0.639999H71.8093V24H67.9373Z" fill="#252525" />
                  </svg>
                </a>
              </div>
              
              <div className="header-bottom space-y-4 pt-[240px]">
                <h1 className="text-[160px] font-black leading-none m-0"></h1>
                <div className="flex gap-6 z-[10000000]">
                  <a href="#" className="nav-link-custom text-xl font-semibold border-b border-[#252525] hover:-translate-y-1 transition-transform">
                    разработка сайтов
                  </a>
                  <a href="#" className="nav-link-custom text-xl font-semibold border-b border-[#252525] hover:-translate-y-1 transition-transform">
                    digital
                  </a>
                </div>
              </div>
            </div>

            <div className="header-right space-y-8">
              <nav className="navigation flex justify-end z-[9999999]">
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
              
              <div className="header-img relative -translate-x-[39%] -translate-y-[9%] w-[144%] hidden lg:block">
                <div className="w-full h-64 bg-gradient-to-br from-[#1427C6]/10 to-[#424AE3]/5 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="about-us">
          <div className="max-w-[1500px] w-full px-[50px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
              <div className="about-us-left">
                <h2 className="section-title">О Нас</h2>
                <div className="w-full h-96 bg-gradient-to-br from-[#1427C6]/20 to-[#424AE3]/10 rounded-2xl"></div>
              </div>
              <div className="about-us-right pt-[316px] min-h-full">
                <p className="icon-badge max-w-[190px]">компания</p>
                <h3 className="section-subtitle">Наша главная цель в компании</h3>
                <p className="section-descr">Забота о клиенте и его продукте.</p>
                <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
                  Обсудить проект
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="blok-dev" className="blok-dev">
          <div className="max-w-[1500px] w-full px-[50px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
              <div className="blok-dev-left">
                <h2 className="section-title">Разработка</h2>
                <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl"></div>
              </div>
              <div className="blok-dev-right pt-[316px] min-h-full">
                <p className="icon-badge max-w-[230px]">наши услуги</p>
                <h3 className="section-subtitle">Делаем любой сложности проекты</h3>
                <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
                  Обсудить проект
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="promotion">
          <div className="max-w-[1500px] w-full px-[50px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
              <div className="promotion-left">
                <h2 className="section-title">Продвижение</h2>
                <div className="w-full h-96 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl"></div>
              </div>
              <div className="promotion-right pt-[316px] min-h-full">
                <p className="icon-badge max-w-[195px]">взлетаем</p>
                <h3 className="section-subtitle">Сможем продвинуть любой ваш продукт или идею от А до Я</h3>
                <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
                  Обсудить проект
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="max-w-[1500px] w-full px-[50px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
              <div className="services-left">
                <h2 className="section-title">Услуги</h2>
                <ul className="flex gap-[10px] list-none m-0 p-0">
                  <li className="card-item max-w-[282px] w-full flex flex-col justify-end">
                    <div className="mb-4">
                      <Icon name="TrendingUp" size={64} className="text-[#1427C6]" />
                    </div>
                    <p className="text-[22px] font-semibold max-w-[190px]">Таргетированная реклама</p>
                  </li>
                  <li className="card-item max-w-[282px] w-full flex flex-col justify-end">
                    <div className="mb-4">
                      <Icon name="BarChart3" size={64} className="text-[#1427C6]" />
                    </div>
                    <p className="text-[22px] font-semibold max-w-[190px]">UI Оптимизация</p>
                  </li>
                </ul>
              </div>
              <div className="services-right pt-[316px] min-h-full">
                <p className="icon-badge max-w-[295px]">мы предоставляем</p>
                <h3 className="section-subtitle">Сделаем чтобы продукт работал на Вас, а не вы на него!</h3>
                <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
                  Обсудить проект
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="lid" className="lid">
          <div className="max-w-[1500px] w-full px-[50px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
              <div className="lid-left">
                <h2 className="section-title">Лидогенерация</h2>
                <ul className="flex gap-[10px] list-none m-0 p-0">
                  <li className="card-item max-w-[282px] w-full flex flex-col justify-end">
                    <div className="mb-4">
                      <Icon name="Target" size={64} className="text-[#1427C6]" />
                    </div>
                    <p className="text-[22px] font-semibold max-w-[190px]">Таргетированная реклама</p>
                  </li>
                  <li className="card-item max-w-[282px] w-full flex flex-col justify-end">
                    <div className="mb-4">
                      <Icon name="Zap" size={64} className="text-[#1427C6]" />
                    </div>
                    <p className="text-[22px] font-semibold max-w-[190px]">UI Оптимизация</p>
                  </li>
                </ul>
              </div>
              <div className="lid-right pt-[316px] min-h-full">
                <p className="icon-badge max-w-[335px]">лучшие в своем деле</p>
                <h3 className="section-subtitle">Мы комплексно подходим к процессу запуска интернет продаж</h3>
                <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
                  Обсудить проект
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio">
          <div className="max-w-[1500px] w-full px-[50px] mx-auto">
            <div className="w-[95%]">
              <h2 className="section-title">Портфолио</h2>
              
              <div className="mb-8 overflow-hidden">
                <div className="flex gap-6 animate-marquee whitespace-nowrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <a key={i} href="#" className="inline-block flex-shrink-0">
                      <div className="w-80 h-64 bg-gradient-to-br from-[#1427C6]/20 to-[#424AE3]/10 rounded-xl"></div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="py-6 border-y border-[#f0f0f0] overflow-hidden my-8">
                <div className="flex gap-12 animate-marquee-slow whitespace-nowrap text-2xl font-light">
                  <p>Одностраничник</p>
                  <p>Корпоративные сайты</p>
                  <p>Интернет-магазины</p>
                  <p>Одностраничник</p>
                  <p>Корпоративные сайты</p>
                  <p>Интернет-магазины</p>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <a key={i} href="#" className="inline-block flex-shrink-0">
                      <div className="w-80 h-64 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl"></div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="contacts">
          <div className="max-w-[1500px] w-full px-[50px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-[76px] items-center min-h-[600px]">
              <div className="contacts-content min-h-full z-[1] p-5 content-center">
                <h2 className="section-title">Контакты</h2>
                <form className="flex flex-col gap-16">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="form-input-custom"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="form-input-custom"
                    required
                  />
                  <button type="submit" className="btn bg-[#424AE3] text-white py-6 px-[132px] rounded-[30px] text-xl max-w-[521px] w-full min-h-[68px]">
                    Оставить заявку
                  </button>
                </form>
              </div>
              <div className="contacts-pic hidden lg:block">
                <div className="w-full h-96 bg-gradient-to-br from-[#1427C6]/20 to-[#424AE3]/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

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
    </div>
  );
};

export default Index;
