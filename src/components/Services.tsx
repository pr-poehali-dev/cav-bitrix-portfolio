import { useState } from 'react';
import Icon from '@/components/ui/icon';
import ContactModal from './ContactModal';

const Services = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const services = [
    { icon: "TrendingUp", title: "Таргетированная реклама", color: "from-blue-500 to-indigo-600" },
    { icon: "BarChart3", title: "UI Оптимизация", color: "from-purple-500 to-pink-600" },
  ];

  return (
    <section id="services" className="services bg-white dark:bg-gray-800">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] lg:gap-[76px] gap-12 items-start min-h-[600px]">
          <div className="services-left">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">Услуги</h2>
            <ul className="flex gap-[10px] list-none m-0 p-0 flex-wrap lg:flex-nowrap">
              {services.map((service, index) => (
                <li 
                  key={index}
                  className="card-item max-w-[282px] lg:max-w-[282px] w-full lg:min-h-[321px] min-h-[240px] flex flex-col justify-end group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <p className="text-[22px] font-semibold max-w-[190px] dark:text-gray-100 dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">{service.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="services-right lg:pt-[316px] pt-0 min-h-full space-y-6">
            <a href="/services#additional" className="icon-badge max-w-[295px] flex items-center gap-2 group/badge cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/files/9a3097d8-c2ab-4acb-917e-a6fb88252298.png" 
                alt="memoji" 
                className="w-5 h-5 object-contain animate-bounce group-hover/badge:scale-125 group-hover/badge:rotate-12 transition-all duration-300"
              />
              мы предоставляем
            </a>
            <h3 className="section-subtitle dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
              Сделаем чтобы продукт работал на Вас, а не вы на него!
            </h3>
            <button 
              onClick={() => setContactModalOpen(true)}
              className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-8 py-4 rounded-full text-sm font-semibold hover:shadow-2xl transition-all duration-300"
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

export default Services;