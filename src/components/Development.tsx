const Development = () => {
  return (
    <section id="blok-dev" className="blok-dev">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="blok-dev-left space-y-8">
            <h2 className="section-title">Разработка</h2>
            <div className="w-full h-96 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-indigo-500/30 rounded-3xl relative overflow-hidden border border-gradient-start/20 backdrop-blur-sm group hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-black text-white/20 group-hover:text-white/30 transition-colors duration-500">
                  &lt;/&gt;
                </div>
              </div>
              <div className="absolute top-4 left-4 right-4 h-8 bg-gradient-to-r from-white/20 to-white/5 rounded-lg backdrop-blur-sm" />
              <div className="absolute top-16 left-4 right-20 h-4 bg-gradient-to-r from-white/15 to-transparent rounded" />
              <div className="absolute top-24 left-4 right-32 h-4 bg-gradient-to-r from-white/15 to-transparent rounded" />
              <div className="absolute inset-0 bg-gradient-to-t from-gradient-start/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          <div className="blok-dev-right pt-[316px] min-h-full space-y-6">
            <p className="icon-badge max-w-[230px] flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/files/9a3097d8-c2ab-4acb-917e-a6fb88252298.png" 
                alt="memoji" 
                className="w-5 h-5 object-contain"
              />
              наши услуги
            </p>
            <h3 className="section-subtitle">Делаем любой сложности проекты</h3>
            <button className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-8 py-4 rounded-full text-sm font-semibold hover:shadow-2xl transition-all duration-300">
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Development;