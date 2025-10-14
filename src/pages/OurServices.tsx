import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface BitrixLicense {
  id: string;
  title: string;
  description: string;
  price: number;
  features: string[];
}

const OurServices = () => {
  const [selectedDevelopment, setSelectedDevelopment] = useState<string[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<string[]>([]);
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedBitrixLicense, setSelectedBitrixLicense] = useState<string>('');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  const developmentServices: Service[] = [
    {
      id: 'corporate',
      title: 'Корпоративный сайт',
      description: 'Профессиональная платформа для презентации вашей компании и привлечения клиентов',
      price: 50000
    },
    {
      id: 'shop',
      title: 'Интернет-магазин',
      description: 'Удобное и надежное решение для онлайн-продаж с каталогом и корзиной',
      price: 80000
    },
    {
      id: 'landing',
      title: 'Лендинг',
      description: 'Эффективный одностраничный сайт для продвижения товаров и услуг',
      price: 25000
    },
    {
      id: 'business-card',
      title: 'Сайт-визитка',
      description: 'Быстрый и недорогой способ представить бизнес в сети',
      price: 15000
    },
    {
      id: 'adaptive',
      title: 'Адаптивная верстка',
      description: 'Сайт отлично выглядит и работает на всех устройствах',
      price: 10000
    }
  ];

  const promotionServices: Service[] = [
    {
      id: 'seo',
      title: 'SEO-оптимизация',
      description: 'Продвижение сайта в поисковых системах',
      price: 30000
    },
    {
      id: 'context',
      title: 'Контекстная реклама',
      description: 'Настройка и ведение рекламных кампаний',
      price: 25000
    },
    {
      id: 'smm',
      title: 'SMM-продвижение',
      description: 'Продвижение в социальных сетях',
      price: 20000
    }
  ];

  const additionalServices: Service[] = [
    {
      id: 'content',
      title: 'Контент-менеджмент',
      description: 'Регулярное обновление и наполнение сайта',
      price: 15000
    },
    {
      id: 'support',
      title: 'Техническая поддержка',
      description: 'Обслуживание и исправление ошибок',
      price: 10000
    },
    {
      id: 'analytics',
      title: 'Веб-аналитика',
      description: 'Настройка систем аналитики и отчеты',
      price: 12000
    }
  ];

  const bitrixLicenses: BitrixLicense[] = [
    {
      id: 'start',
      title: 'Старт',
      description: 'Для небольших проектов и стартапов',
      price: 69000,
      features: ['1 сайт', 'Базовые модули', 'Поддержка 3 месяца', 'Обновления 1 год']
    },
    {
      id: 'standard',
      title: 'Стандарт',
      description: 'Оптимальное решение для среднего бизнеса',
      price: 149000,
      features: ['3 сайта', 'Расширенные модули', 'Интернет-магазин', 'Поддержка 1 год']
    },
    {
      id: 'small-business',
      title: 'Малый бизнес',
      description: 'Для растущих компаний',
      price: 229000,
      features: ['5 сайтов', 'Все модули', 'CRM-интеграция', 'Поддержка 1 год', 'Маркетплейс']
    },
    {
      id: 'business',
      title: 'Бизнес',
      description: 'Для крупного бизнеса',
      price: 349000,
      features: ['Безлимит сайтов', 'Полный функционал', 'Кластеризация', 'Приоритетная поддержка']
    },
    {
      id: 'enterprise',
      title: 'Энтерпрайз',
      description: 'Максимальные возможности для корпораций',
      price: 1590000,
      features: ['Все возможности Бизнес', 'Высоконагруженные проекты', 'Персональная поддержка', 'SLA 99.9%']
    }
  ];

  const toggleService = (
    id: string,
    category: 'development' | 'promotion' | 'additional'
  ) => {
    if (category === 'development') {
      setSelectedDevelopment(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
    } else if (category === 'promotion') {
      setSelectedPromotion(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
    } else {
      setSelectedAdditional(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
    }
  };

  const calculateTotal = () => {
    let total = 0;
    
    developmentServices.forEach(service => {
      if (selectedDevelopment.includes(service.id)) {
        total += service.price;
      }
    });
    
    promotionServices.forEach(service => {
      if (selectedPromotion.includes(service.id)) {
        total += service.price;
      }
    });
    
    additionalServices.forEach(service => {
      if (selectedAdditional.includes(service.id)) {
        total += service.price;
      }
    });

    if (selectedTechnology === 'bitrix' && selectedBitrixLicense) {
      const license = bitrixLicenses.find(l => l.id === selectedBitrixLicense);
      if (license) {
        total += license.price;
      }
    }
    
    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const ServiceCard = ({
    service,
    isSelected,
    onToggle
  }: {
    service: Service;
    isSelected: boolean;
    onToggle: () => void;
  }) => (
    <Card
      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-primary border-2 bg-primary/5' : ''
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={isSelected}
          onCheckedChange={onToggle}
          className="mt-1"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
          <p className="text-muted-foreground text-sm mb-3">{service.description}</p>
          <p className="text-primary font-bold">от {formatPrice(service.price)} ₽</p>
        </div>
      </div>
    </Card>
  );

  const totalPrice = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
            <Icon name="ArrowLeft" size={20} />
            <span className="font-medium">На главную</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите нужные услуги и рассчитайте стоимость проекта
          </p>
        </div>

        <section id="development" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Code" className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Разработка</h2>
              <p className="text-muted-foreground">Создание сайтов под ключ</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {developmentServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={selectedDevelopment.includes(service.id)}
                onToggle={() => toggleService(service.id, 'development')}
              />
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-6">На чем собираем сайт</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedTechnology === 'bitrix' ? 'border-primary border-2 bg-primary/5' : ''
                }`}
                onClick={() => {
                  setSelectedTechnology(selectedTechnology === 'bitrix' ? '' : 'bitrix');
                  setSelectedBitrixLicense('');
                }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox checked={selectedTechnology === 'bitrix'} />
                  <div>
                    <h4 className="font-semibold text-lg">CMS 1С-Битрикс</h4>
                    <p className="text-sm text-muted-foreground">Управление Сайтом</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedTechnology === 'react' ? 'border-primary border-2 bg-primary/5' : ''
                }`}
                onClick={() => {
                  setSelectedTechnology(selectedTechnology === 'react' ? '' : 'react');
                  setSelectedBitrixLicense('');
                }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox checked={selectedTechnology === 'react'} />
                  <div>
                    <h4 className="font-semibold text-lg">React</h4>
                    <p className="text-sm text-muted-foreground">Современный фреймворк</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedTechnology === 'html' ? 'border-primary border-2 bg-primary/5' : ''
                }`}
                onClick={() => {
                  setSelectedTechnology(selectedTechnology === 'html' ? '' : 'html');
                  setSelectedBitrixLicense('');
                }}
              >
                <div className="flex items-center gap-3">
                  <Checkbox checked={selectedTechnology === 'html'} />
                  <div>
                    <h4 className="font-semibold text-lg">HTML-статика</h4>
                    <p className="text-sm text-muted-foreground">Простое решение</p>
                  </div>
                </div>
              </Card>
            </div>

            {selectedTechnology === 'bitrix' && (
              <div className="animate-in slide-in-from-top-4 duration-300">
                <h4 className="text-xl font-bold mb-4">Выберите лицензию 1С-Битрикс</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bitrixLicenses.map(license => (
                    <Card
                      key={license.id}
                      className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                        selectedBitrixLicense === license.id ? 'border-primary border-2 bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedBitrixLicense(license.id === selectedBitrixLicense ? '' : license.id)}
                    >
                      <div className="mb-4">
                        <Checkbox checked={selectedBitrixLicense === license.id} className="mb-3" />
                        <h5 className="font-bold text-lg mb-1">{license.title}</h5>
                        <p className="text-sm text-muted-foreground mb-3">{license.description}</p>
                        <p className="text-primary font-bold text-xl">{formatPrice(license.price)} ₽</p>
                      </div>
                      <ul className="space-y-2">
                        {license.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="promotion" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="TrendingUp" className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Продвижение</h2>
              <p className="text-muted-foreground">Привлечение клиентов и рост продаж</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {promotionServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={selectedPromotion.includes(service.id)}
                onToggle={() => toggleService(service.id, 'promotion')}
              />
            ))}
          </div>
        </section>

        <section id="additional" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Plus" className="text-primary" size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Дополнительные услуги</h2>
              <p className="text-muted-foreground">Поддержка и развитие проекта</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                isSelected={selectedAdditional.includes(service.id)}
                onToggle={() => toggleService(service.id, 'additional')}
              />
            ))}
          </div>
        </section>

        {totalPrice > 0 && (
          <Card className="sticky bottom-6 p-8 bg-white shadow-xl border-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-muted-foreground mb-2">Предварительная стоимость проекта</p>
                <p className="text-4xl font-bold text-primary">{formatPrice(totalPrice)} ₽</p>
              </div>
              <Button size="lg" className="w-full md:w-auto">
                <Icon name="Send" size={20} className="mr-2" />
                Отправить заявку
              </Button>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OurServices;