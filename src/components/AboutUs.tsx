import { useState } from 'react';
import ContactModal from './ContactModal';
import Icon from './ui/icon';

const AboutUs = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const gridBlocks = [
    { 
      icon: 'Code2', 
      title: 'Код высшего качества',
      description: 'Мы пишем чистый, масштабируемый и поддерживаемый код, следуя лучшим практикам индустрии. Наши разработчики создают надежные решения, которые работают быстро и стабильно на протяжении многих лет.'
    },
    { 
      icon: 'Palette', 
      title: 'Уникальный дизайн',
      description: 'Создаем современные и запоминающиеся интерфейсы, которые отражают индивидуальность вашего бренда. Каждый проект — это баланс эстетики, удобства и функциональности, адаптированный под ваши цели.'
    },
    { 
      icon: 'Rocket', 
      title: 'Быстрый запуск',
      description: 'Оптимизированные процессы разработки позволяют нам запускать проекты в сжатые сроки без потери качества. Мы ценим ваше время и делаем всё, чтобы вы увидели результат максимально быстро.'
    },
    { 
      icon: 'Target', 
      title: 'Точное попадание в цель',
      description: 'Глубоко изучаем вашу нишу и целевую аудиторию, чтобы создать решение, которое решает конкретные бизнес-задачи. Каждая функция и элемент работают на достижение ваших целей.'
    },
    { 
      icon: 'Users', 
      title: 'Клиентоориентированность',
      description: 'Ваш успех — наш приоритет. Мы работаем как единая команда с вашим бизнесом, учитываем каждое пожелание и остаемся на связи на всех этапах проекта. Ваше мнение для нас важнее всего.'
    },
    { 
      icon: 'TrendingUp', 
      title: 'Рост и масштабирование',
      description: 'Создаем проекты, которые растут вместе с вашим бизнесом. Наши решения легко расширяются новыми функциями и выдерживают увеличение нагрузки без потери производительности.'
    },
    { 
      icon: 'Lightbulb', 
      title: 'Инновационные решения',
      description: 'Используем передовые технологии и нестандартный подход к каждой задаче. Наша команда всегда в курсе последних трендов и внедряет инновации, которые дают вам конкурентное преимущество.'
    },
    { 
      icon: 'Award', 
      title: 'Проверенная экспертиза',
      description: 'За плечами — десятки успешных проектов различной сложности. Наш опыт позволяет предвидеть возможные проблемы и предлагать оптимальные решения на каждом этапе разработки.'
    },
    { 
      icon: 'Zap', 
      title: 'Высокая производительность',
      description: 'Оптимизируем каждый байт кода для максимальной скорости работы. Ваш сайт будет загружаться молниеносно, что улучшает пользовательский опыт и позиции в поисковых системах.'
    }
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
      <div className="max-w-[1500px] w-full lg:px-[50px] px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] lg:gap-[76px] gap-12 items-start min-h-[600px]">
          <div className="about-us-left space-y-8">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">О Нас</h2>
            <div className="w-full h-96 lg:h-96 h-72 bg-gradient-to-br from-gradient-start/30 via-gradient-mid/20 to-gradient-end/30 rounded-3xl relative overflow-hidden border border-gradient-start/20 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-8 p-4">
                <div className="grid grid-cols-3 gap-4 lg:gap-4 gap-2 w-full h-full">
                  {gridBlocks.map((block, i) => (
                    <div 
                      key={i}
                      className={`rounded-2xl lg:rounded-2xl rounded-xl bg-gradient-to-br backdrop-blur-sm border animate-fade-in transition-all duration-500 flex items-center justify-center cursor-pointer relative overflow-hidden ${
                        hoveredIndex === null 
                          ? 'from-white/50 to-white/20 dark:from-white/30 dark:to-white/10 border-white/40 dark:border-white/20' 
                          : hoveredIndex === i 
                            ? 'col-span-3 row-span-3 from-white/70 to-white/30 dark:from-white/40 dark:to-white/20 border-white/60 dark:border-white/30 scale-105 z-10' 
                            : 'opacity-0 scale-75'
                      }`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {hoveredIndex === i ? (
                        <div className="p-6 text-center space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gradient-start to-gradient-mid flex items-center justify-center shadow-lg">
                            <Icon name={block.icon} size={32} className="text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">{block.title}</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">{block.description}</p>
                        </div>
                      ) : hoveredIndex === null ? (
                        <Icon name={block.icon} size={32} className="lg:w-8 lg:h-8 w-6 h-6 text-gradient-start dark:text-white drop-shadow-lg" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="about-us-right lg:pt-[316px] pt-0 min-h-full space-y-6">
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