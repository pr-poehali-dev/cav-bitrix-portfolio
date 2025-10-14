import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';
import ServiceSection from '@/components/services/ServiceSection';
import ServiceCard from '@/components/services/ServiceCard';
import TechnologySelector from '@/components/services/TechnologySelector';
import HostingSelector from '@/components/services/HostingSelector';
import {
  developmentServices,
  promotionServices,
  additionalServices,
  bitrixLicenses,
  hostingOptions,
  begetTariffs
} from '@/components/services/servicesData';

const OurServices = () => {
  const [selectedDevelopment, setSelectedDevelopment] = useState<string[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<string[]>([]);
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');
  const [selectedBitrixLicense, setSelectedBitrixLicense] = useState<string>('');
  const [selectedHosting, setSelectedHosting] = useState<string>('');
  const [selectedBegetTariff, setSelectedBegetTariff] = useState<string>('');

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

  const handleTechnologyChange = (tech: string) => {
    setSelectedTechnology(selectedTechnology === tech ? '' : tech);
    setSelectedBitrixLicense('');
  };

  const handleBitrixLicenseChange = (licenseId: string) => {
    setSelectedBitrixLicense(licenseId === selectedBitrixLicense ? '' : licenseId);
  };

  const handleHostingChange = (hostingId: string) => {
    setSelectedHosting(selectedHosting === hostingId ? '' : hostingId);
    setSelectedBegetTariff('');
  };

  const handleBegetTariffChange = (tariffId: string) => {
    setSelectedBegetTariff(tariffId === selectedBegetTariff ? '' : tariffId);
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

    if (selectedHosting) {
      const hosting = hostingOptions.find(h => h.id === selectedHosting);
      if (hosting) {
        total += hosting.price;
      }
    }

    if (selectedHosting === 'beget' && selectedBegetTariff) {
      const tariff = begetTariffs.find(t => t.id === selectedBegetTariff);
      if (tariff) {
        total += tariff.price * 12;
      }
    }
    
    return total;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

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

          <TechnologySelector
            selectedTechnology={selectedTechnology}
            selectedBitrixLicense={selectedBitrixLicense}
            bitrixLicenses={bitrixLicenses}
            onTechnologyChange={handleTechnologyChange}
            onBitrixLicenseChange={handleBitrixLicenseChange}
          />

          <HostingSelector
            selectedHosting={selectedHosting}
            selectedBegetTariff={selectedBegetTariff}
            hostingOptions={hostingOptions}
            begetTariffs={begetTariffs}
            onHostingChange={handleHostingChange}
            onBegetTariffChange={handleBegetTariffChange}
          />
        </section>

        <ServiceSection
          id="promotion"
          title="Продвижение"
          description="Привлечение клиентов и рост продаж"
          icon="TrendingUp"
          services={promotionServices}
          selectedServices={selectedPromotion}
          onToggle={(id) => toggleService(id, 'promotion')}
        />

        <ServiceSection
          id="additional"
          title="Дополнительные услуги"
          description="Поддержка и развитие проекта"
          icon="Plus"
          services={additionalServices}
          selectedServices={selectedAdditional}
          onToggle={(id) => toggleService(id, 'additional')}
        />

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
