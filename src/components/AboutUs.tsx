import { useState } from 'react';
import ContactModal from './ContactModal';
import Icon from './ui/icon';

const AboutUs = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  const gridIcons = [
    'Code2', 'Palette', 'Rocket', 
    'Target', 'Users', 'TrendingUp',
    'Lightbulb', 'Award', 'Zap'
  ];

  const services = [
    { icon: 'Layout', text: 'Разработка современных веб-сайтов и приложений' },
    { icon: 'Smartphone', text: 'Адаптивный дизайн для всех устройств' },
    { icon: 'Search', text: 'SEO-оптимизация и продвижение' },
    { icon: 'Shield', text: 'Надежность и безопасность проектов' },
    { icon: 'Headphones', text: 'Поддержка на всех этапах разработки' }
  ];
  
  return (
    <section id="about-us" className="about-us bg-gray-50 dark:bg-gray-700">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="about-us-left space-y-8">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">О Нас</h2>
            <div className="w-full h-96 bg-gradient-to-br from-gradient-start/30 via-gradient-mid/20 to-gradient-end/30 rounded-3xl relative overflow-hidden border border-gradient-start/20 backdrop-blur-sm group hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-8 w-full h-full">
                  {gridIcons.map((iconName, i) => (
                    <div 
                      key={i}
                      className="rounded-2xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30 animate-fade-in hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Icon name={iconName} size={32} className="text-gradient-start dark:text-gradient-mid opacity-70" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gradient-start/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          <div className="about-us-right pt-[316px] min-h-full space-y-6">
            <p className="icon-badge max-w-[190px] flex items-center gap-2 group/badge cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/files/9a3097d8-c2ab-4acb-917e-a6fb88252298.png" 
                alt="memoji" 
                className="w-5 h-5 object-contain animate-bounce group-hover/badge:scale-125 group-hover/badge:rotate-12 transition-all duration-300"
              />
              компания
            </p>
            <h3 className="section-subtitle dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">Создаем цифровые решения для вашего бизнеса</h3>
            <p className="section-descr text-muted-foreground dark:text-gray-400 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.3)] mb-6">
              Мы — команда профессионалов, которая превращает идеи в успешные веб-проекты. 
              Наша главная цель — забота о клиенте и его продукте.
            </p>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-gradient-start/20 to-gradient-mid/20 flex items-center justify-center border border-gradient-start/20">
                    <Icon name={service.icon} size={20} className="text-gradient-start dark:text-gradient-mid" />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pt-2">{service.text}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setContactModalOpen(true)}
              className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-8 py-4 rounded-full text-sm font-semibold hover:shadow-2xl transition-all duration-300 mt-8"
            >
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
      
      <ContactModal open={contactModalOpen} onOpenChange={setContactModalOpen} />
    </section>
  );
};

export default AboutUs;