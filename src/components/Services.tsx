import Icon from '@/components/ui/icon';

const Services = () => {
  const services = [
    { icon: "TrendingUp", title: "Таргетированная реклама", color: "from-blue-500 to-indigo-600" },
    { icon: "BarChart3", title: "UI Оптимизация", color: "from-purple-500 to-pink-600" },
  ];

  return (
    <section id="services" className="services">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="services-left">
            <h2 className="section-title">Услуги</h2>
            <ul className="flex gap-[10px] list-none m-0 p-0">
              {services.map((service, index) => (
                <li 
                  key={index}
                  className="card-item max-w-[282px] w-full flex flex-col justify-end group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                    <Icon name={service.icon as any} size={32} className="text-white" />
                  </div>
                  <p className="text-[22px] font-semibold max-w-[190px]">{service.title}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="services-right pt-[316px] min-h-full space-y-6">
            <p className="icon-badge max-w-[295px] flex items-center gap-2">
              <img 
                src="https://cdn.poehali.dev/files/9a3097d8-c2ab-4acb-917e-a6fb88252298.png" 
                alt="memoji" 
                className="w-5 h-5 object-contain animate-bounce"
              />
              мы предоставляем
            </p>
            <h3 className="section-subtitle">
              Сделаем чтобы продукт работал на Вас, а не вы на него!
            </h3>
            <button className="btn bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-8 py-4 rounded-full text-sm font-semibold hover:shadow-2xl transition-all duration-300">
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;