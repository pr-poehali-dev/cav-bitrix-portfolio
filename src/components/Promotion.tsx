const Promotion = () => {
  return (
    <section className="promotion">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="promotion-left space-y-8">
            <h2 className="section-title">Продвижение</h2>
            <div className="w-full h-96 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-rose-500/30 rounded-3xl relative overflow-hidden border border-gradient-start/20 backdrop-blur-sm group hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-white/30 rounded-full animate-pulse" />
                <div className="absolute w-24 h-24 border-4 border-white/40 rounded-full animate-ping" />
                <div className="absolute w-16 h-16 bg-white/30 rounded-full backdrop-blur-sm" />
              </div>
              <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-2xl animate-float" />
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-gradient-mid/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          <div className="promotion-right pt-[316px] min-h-full space-y-6">
            <a href="/services#promotion" className="icon-badge max-w-[195px] flex items-center gap-2 group/badge cursor-pointer">
              <img 
                src="https://cdn.poehali.dev/files/9a3097d8-c2ab-4acb-917e-a6fb88252298.png" 
                alt="memoji" 
                className="w-5 h-5 object-contain animate-bounce group-hover/badge:scale-125 group-hover/badge:rotate-12 transition-all duration-300"
              />
              взлетаем
            </a>
            <h3 className="section-subtitle">Сможем продвинуть любой ваш продукт или идею от А до Я</h3>
            <button className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-8 py-4 rounded-full text-sm font-semibold hover:shadow-2xl transition-all duration-300">
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;