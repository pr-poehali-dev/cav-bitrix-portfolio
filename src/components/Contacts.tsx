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
            <div className="w-full h-96 bg-gradient-to-br from-gradient-start/30 via-gradient-mid/20 to-gradient-end/30 rounded-3xl relative overflow-hidden border border-gradient-start/20 backdrop-blur-sm group hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-gradient-start to-gradient-mid rounded-2xl animate-float" />
                <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-br from-gradient-mid to-gradient-end rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-gradient-end to-gradient-start rounded-2xl animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 right-10 w-14 h-14 bg-gradient-to-br from-gradient-start to-gradient-end rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-950/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;