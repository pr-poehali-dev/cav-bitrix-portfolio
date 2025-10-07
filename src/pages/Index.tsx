import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: 'Users',
      title: 'О нас',
      description: 'Команда профессионалов с опытом разработки на 1С-Битрикс более 7 лет'
    },
    {
      icon: 'Code2',
      title: 'Разработка',
      description: 'Создаем современные сайты на CMS Битрикс с уникальным дизайном'
    },
    {
      icon: 'TrendingUp',
      title: 'Продвижение',
      description: 'Комплексное SEO продвижение и настройка рекламных кампаний'
    },
    {
      icon: 'Settings',
      title: 'Услуги',
      description: 'Техническая поддержка, доработка и оптимизация существующих сайтов'
    },
    {
      icon: 'Target',
      title: 'Лидогенерация',
      description: 'Привлечение целевых клиентов через эффективные маркетинговые инструменты'
    }
  ];

  const portfolioProjects = [
    { id: 1, title: 'Интернет-магазин электроники' },
    { id: 2, title: 'Корпоративный портал' },
    { id: 3, title: 'Сайт производственной компании' },
    { id: 4, title: 'Образовательная платформа' },
    { id: 5, title: 'Медицинский центр' },
    { id: 6, title: 'Ресторанный холдинг' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Rocket" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ЦАВ
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
            <a href="#portfolio" className="text-sm font-medium hover:text-primary transition-colors">Портфолио</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </div>
          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white">
              Связаться
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden animate-fade-in">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <a
              href="#about"
              className="text-2xl font-semibold hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              О нас
            </a>
            <a
              href="#services"
              className="text-2xl font-semibold hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Услуги
            </a>
            <a
              href="#portfolio"
              className="text-2xl font-semibold hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Портфолио
            </a>
            <a
              href="#contact"
              className="text-2xl font-semibold hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Контакты
            </a>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white mt-8"
              onClick={() => setMobileMenuOpen(false)}
            >
              Связаться
            </Button>
          </div>
        </div>
      )}

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full">
                <span className="text-primary font-semibold text-sm">WEB STUDIO</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                Разработка на{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  1С-Битрикс
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Создаем современные веб-решения с передовыми инструментами и управлением от компании ЦАВ
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  <Icon name="Rocket" className="mr-2" size={20} />
                  Начать проект
                </Button>
                <Button size="lg" variant="outline">
                  Портфолио
                </Button>
              </div>
            </div>
            <div className="relative h-[500px]" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-3xl animate-float"></div>
              <div className="relative h-full flex items-center justify-center">
                <div className="grid grid-cols-8 gap-2 animate-scale-in">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-sm hover:scale-110 transition-transform cursor-pointer"
                      style={{
                        animationDelay: `${i * 0.02}s`,
                        opacity: Math.random() * 0.5 + 0.5
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg">Полный цикл разработки и поддержки веб-проектов</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card border-border group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name={service.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                <Button variant="link" className="mt-4 p-0 text-primary">
                  Подробнее
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Портфолио</h2>
            <p className="text-muted-foreground text-lg">Наши успешные проекты на 1С-Битрикс</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioProjects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-64 bg-gradient-to-br from-primary/80 to-secondary/80 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="Globe" size={64} className="text-white/20 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground text-lg">Расскажите о вашем проекте, и мы подберем оптимальное решение</p>
          </div>
          <Card className="p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <Input placeholder="Ваше имя" className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Телефон</label>
                <Input type="tel" placeholder="+7 (___) ___-__-__" className="h-12" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Сообщение</label>
                <Textarea placeholder="Расскажите о вашем проекте..." className="min-h-32" />
              </div>
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white">
                <Icon name="Send" className="mr-2" size={20} />
                Отправить заявку
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-6 bg-foreground/5 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Rocket" size={24} className="text-white" />
                </div>
                <span className="text-2xl font-bold">ЦАВ</span>
              </div>
              <p className="text-muted-foreground">Разработка и поддержка сайтов на 1С-Битрикс</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a></li>
                <li><a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">Портфолио</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@tsav.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (___) ___-__-__
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2025 ЦАВ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;