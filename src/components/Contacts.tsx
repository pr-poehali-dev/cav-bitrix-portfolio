import { useState } from 'react';
import Icon from '@/components/ui/icon';

const ContactInfo = () => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'details'>('contacts');

  return (
    <div className="w-full h-full bg-gradient-to-br from-gradient-start/30 via-gradient-mid/20 to-gradient-end/30 rounded-3xl relative overflow-hidden border border-gradient-start/20 backdrop-blur-sm">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-gradient-start to-gradient-mid rounded-2xl animate-float" />
        <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-br from-gradient-mid to-gradient-end rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-gradient-end to-gradient-start rounded-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 right-10 w-14 h-14 bg-gradient-to-br from-gradient-start to-gradient-end rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-gray-950/80 to-transparent" />
      
      <div className="relative z-10 h-full flex flex-col p-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'contacts'
                ? 'bg-gradient-to-r from-gradient-start to-gradient-mid text-white shadow-lg'
                : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
            }`}
          >
            Контакты
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === 'details'
                ? 'bg-gradient-to-r from-gradient-start to-gradient-mid text-white shadow-lg'
                : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70'
            }`}
          >
            Реквизиты
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'contacts' ? (
            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gradient-start/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-start to-gradient-mid flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Телефон</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">+7 (958) 240‒00‒10</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gradient-start/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-mid to-gradient-end flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">ivanickiy@centerai.tech</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gradient-start/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-end to-gradient-start flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Режим работы</h3>
                    <p className="text-gray-700 dark:text-gray-300">Пн-Пт: 9:00-18:00</p>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">Поддержка: 24/7</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">8 (800) 333-72-27</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gradient-start/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-start via-gradient-mid to-gradient-end flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Адрес</h3>
                    <p className="text-gray-700 dark:text-gray-300">614007, Пермский край, город Пермь,</p>
                    <p className="text-gray-700 dark:text-gray-300">ул. Революции, д. 14, кв. 57</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gradient-start/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-start to-gradient-mid flex items-center justify-center flex-shrink-0">
                    <Icon name="Building2" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">Юридическая информация</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Полное наименование</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">ООО "МОЛОТОВ ТРАСТ"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ИНН</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">5906060110</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">КПП</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">590401001</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">ОКПО</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">73907860</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Директор</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Иваницкая Е. С.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <section id="contacts" className="contacts relative bg-gray-50 dark:bg-gray-700">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-center min-h-[600px]">
          <div className="contacts-content min-h-full z-[1] p-5 content-center">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">Контакты</h2>
            <form className="flex flex-col gap-12">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="form-input-custom peer"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid scale-x-0 peer-focus:scale-x-100 transition-transform duration-300" />
              </div>
              
              <div className="relative group">
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="form-input-custom peer"
                  required
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gradient-mid to-gradient-end scale-x-0 peer-focus:scale-x-100 transition-transform duration-300" />
              </div>
              
              <button 
                type="submit" 
                className="btn bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end text-white py-6 px-[132px] rounded-full text-xl max-w-[521px] w-full min-h-[68px] font-semibold group relative overflow-hidden bg-[length:200%_auto] animate-gradient-shift"
              >
                <span className="relative z-10">Оставить заявку</span>
              </button>
            </form>
          </div>
          
          <div className="contacts-pic hidden lg:block">
            <ContactInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;