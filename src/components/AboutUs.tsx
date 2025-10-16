import { useState } from 'react';
import ContactModal from './ContactModal';

const AboutUs = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  return (
    <section className="about-us bg-gray-50 dark:bg-gray-700">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="about-us-left space-y-8">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">О Нас</h2>
            <div className="w-full h-96 bg-gradient-to-br from-gradient-start/30 via-gradient-mid/20 to-gradient-end/30 rounded-3xl relative overflow-hidden border border-gradient-start/20 backdrop-blur-sm group hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 p-8 w-full h-full">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div 
                      key={i}
                      className="rounded-2xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30 animate-fade-in hover:scale-110 transition-transform duration-300"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
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
            <h3 className="section-subtitle dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">Наша главная цель в компании</h3>
            <p className="section-descr text-muted-foreground dark:text-gray-400 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.3)]">Забота о клиенте и его продукте.</p>
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

export default AboutUs;