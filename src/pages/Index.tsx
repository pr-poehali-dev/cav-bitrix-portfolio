import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="header py-8 px-6 lg:px-12">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="header-left space-y-12">
              <div className="logo">
                <a href="#">
                  <svg width="72" height="25" viewBox="0 0 72 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.88 24V1.6H9.712C14.928 1.6 18.224 4.576 18.224 9.152C18.224 14.176 14.192 16.8 9.264 16.8H4.816V24H0.88ZM4.816 13.248H9.392C12.368 13.248 14.224 11.584 14.224 9.184C14.224 6.56 12.336 5.184 9.392 5.184H4.816V13.248ZM21.871 4.512V0.831999H26.031V4.512H21.871ZM22.031 24V7.104H25.903V24H22.031ZM29.4913 24L35.6993 15.424L29.7153 7.104H33.9393L37.8433 12.672L41.7473 7.104H45.8753L39.8913 15.328L46.1313 24H41.9073L37.7473 18.08L33.6193 24H29.4913ZM56.1448 24.384C51.2488 24.384 47.4728 20.832 47.4728 15.552C47.4728 10.72 50.8968 6.752 55.7288 6.752C61.1048 6.752 63.8248 10.976 63.8248 15.84C63.8248 16.096 63.7928 16.736 63.7608 16.928H51.3448C51.7608 19.68 53.7128 21.216 56.2088 21.216C58.0968 21.216 59.4408 20.512 60.7848 19.2L63.0568 21.216C61.4568 23.136 59.2488 24.384 56.1448 24.384ZM51.3128 14.368H59.9848C59.7288 11.872 58.2568 9.92 55.6968 9.92C53.3288 9.92 51.6648 11.744 51.3128 14.368ZM67.9373 24V0.639999H71.8093V24H67.9373Z" fill="currentColor" />
                  </svg>
                </a>
              </div>
              <div className="header-bottom space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none"></h1>
                <div className="space-y-1">
                  <a href="#" className="block text-lg hover:text-primary transition-colors">разработка сайтов</a>
                  <a href="#" className="block text-lg text-muted-foreground hover:text-primary transition-colors">digital</a>
                </div>
              </div>
            </div>

            <div className="header-right space-y-8">
              <nav className="navigation">
                <button 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="lg:hidden flex items-center gap-2 mb-4 text-sm font-medium"
                >
                  <span className="w-6 h-0.5 bg-current"></span>
                  Меню
                </button>
                
                <div className={`${menuOpen ? 'block' : 'hidden'} lg:block space-y-4`}>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
                    <a href="#" className="text-sm hover:text-primary transition-colors">Новости</a>
                    <a href="#services" className="text-sm hover:text-primary transition-colors">Услуги</a>
                    <a href="#portfolio" className="text-sm hover:text-primary transition-colors">Портфолио</a>
                    <a href="#lid" className="text-sm hover:text-primary transition-colors">Лидогенерация</a>
                    <a href="#contacts" className="text-sm hover:text-primary transition-colors">Контакты</a>
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Обсудить проект
                    </Button>
                  </div>
                </div>
              </nav>
              
              <div className="header-img hidden lg:block">
                <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="about-us py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="about-us-left space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold">О Нас</h2>
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl"></div>
              </div>
              <div className="about-us-right space-y-6">
                <p className="text-sm uppercase tracking-wider text-primary font-medium">компания</p>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">Наша главная цель в компании</h3>
                <p className="text-lg text-muted-foreground">Забота о клиенте и его продукте.</p>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Обсудить проект
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="blok-dev" className="blok-dev py-20 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="blok-dev-left space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold">Разработка</h2>
                <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl"></div>
              </div>
              <div className="blok-dev-right space-y-6">
                <p className="text-sm uppercase tracking-wider text-primary font-medium">наши услуги</p>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">Делаем любой сложности проекты</h3>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Обсудить проект
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="promotion py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="promotion-left space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold">Продвижение</h2>
                <div className="w-full h-96 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl"></div>
              </div>
              <div className="promotion-right space-y-6">
                <p className="text-sm uppercase tracking-wider text-primary font-medium">взлетаем</p>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">Сможем продвинуть любой ваш продукт или идею от А до Я</h3>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Обсудить проект
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="services py-20 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="services-left space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold">Услуги</h2>
                <ul className="grid sm:grid-cols-2 gap-6">
                  <li className="bg-background p-8 rounded-2xl hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 mb-4">
                      <Icon name="TrendingUp" size={64} className="text-primary" />
                    </div>
                    <p className="font-medium">Таргетированная реклама</p>
                  </li>
                  <li className="bg-background p-8 rounded-2xl hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 mb-4">
                      <Icon name="BarChart3" size={64} className="text-primary" />
                    </div>
                    <p className="font-medium">UI Оптимизация</p>
                  </li>
                </ul>
              </div>
              <div className="services-right space-y-6">
                <p className="text-sm uppercase tracking-wider text-primary font-medium">мы предоставляем</p>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">Сделаем чтобы продукт работал на Вас, а не вы на него!</h3>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Обсудить проект
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="lid" className="lid py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="lid-left space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold">Лидогенерация</h2>
                <ul className="grid sm:grid-cols-2 gap-6">
                  <li className="bg-muted/50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 mb-4">
                      <Icon name="Target" size={64} className="text-primary" />
                    </div>
                    <p className="font-medium">Таргетированная реклама</p>
                  </li>
                  <li className="bg-muted/50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 mb-4">
                      <Icon name="Zap" size={64} className="text-primary" />
                    </div>
                    <p className="font-medium">UI Оптимизация</p>
                  </li>
                </ul>
              </div>
              <div className="lid-right space-y-6">
                <p className="text-sm uppercase tracking-wider text-primary font-medium">лучшие в своем деле</p>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">Мы комплексно подходим к процессу запуска интернет продаж</h3>
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Обсудить проект
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio py-20 px-6 lg:px-12 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-12">Портфолио</h2>
            
            <div className="mb-8 overflow-hidden">
              <div className="flex gap-6 animate-marquee whitespace-nowrap">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <a key={i} href="#" className="inline-block flex-shrink-0">
                    <div className="w-80 h-64 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl hover:shadow-lg transition-shadow"></div>
                  </a>
                ))}
              </div>
            </div>

            <div className="py-6 border-y border-border overflow-hidden">
              <div className="flex gap-12 animate-marquee-slow whitespace-nowrap text-2xl font-light">
                <p>Одностраничник</p>
                <p>Корпоративные сайты</p>
                <p>Интернет-магазины</p>
                <p>Одностраничник</p>
                <p>Корпоративные сайты</p>
                <p>Интернет-магазины</p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden">
              <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <a key={i} href="#" className="inline-block flex-shrink-0">
                    <div className="w-80 h-64 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl hover:shadow-lg transition-shadow"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="contacts py-20 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="contacts-content space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold">Контакты</h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-6 py-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="w-full px-6 py-4 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-6">
                    Оставить заявку
                  </Button>
                </form>
              </div>
              <div className="contacts-pic hidden lg:block">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer py-12 px-6 lg:px-12 bg-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="logo">
              <a href="#">
                <svg width="72" height="25" viewBox="0 0 72 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.88 24V1.6H9.712C14.928 1.6 18.224 4.576 18.224 9.152C18.224 14.176 14.192 16.8 9.264 16.8H4.816V24H0.88ZM4.816 13.248H9.392C12.368 13.248 14.224 11.584 14.224 9.184C14.224 6.56 12.336 5.184 9.392 5.184H4.816V13.248ZM21.871 4.512V0.831999H26.031V4.512H21.871ZM22.031 24V7.104H25.903V24H22.031ZM29.4913 24L35.6993 15.424L29.7153 7.104H33.9393L37.8433 12.672L41.7473 7.104H45.8753L39.8913 15.328L46.1313 24H41.9073L37.7473 18.08L33.6193 24H29.4913ZM56.1448 24.384C51.2488 24.384 47.4728 20.832 47.4728 15.552C47.4728 10.72 50.8968 6.752 55.7288 6.752C61.1048 6.752 63.8248 10.976 63.8248 15.84C63.8248 16.096 63.7928 16.736 63.7608 16.928H51.3448C51.7608 19.68 53.7128 21.216 56.2088 21.216C58.0968 21.216 59.4408 20.512 60.7848 19.2L63.0568 21.216C61.4568 23.136 59.2488 24.384 56.1448 24.384ZM51.3128 14.368H59.9848C59.7288 11.872 58.2568 9.92 55.6968 9.92C53.3288 9.92 51.6648 11.744 51.3128 14.368ZM67.9373 24V0.639999H71.8093V24H67.9373Z" fill="currentColor" />
                </svg>
              </a>
            </div>
            <nav className="flex flex-col md:flex-row gap-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">Новости</a>
              <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
              <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
              <a href="#lid" className="hover:text-primary transition-colors">Лидогенерация</a>
              <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Обсудить проект
              </Button>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
