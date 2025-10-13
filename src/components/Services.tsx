import Icon from '@/components/ui/icon';

const Services = () => {
  return (
    <section id="services" className="services">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="services-left">
            <h2 className="section-title">Услуги</h2>
            <ul className="flex gap-[10px] list-none m-0 p-0">
              <li className="card-item max-w-[282px] w-full flex flex-col justify-end">
                <div className="mb-4">
                  <Icon name="TrendingUp" size={64} className="text-[#1427C6]" />
                </div>
                <p className="text-[22px] font-semibold max-w-[190px]">Таргетированная реклама</p>
              </li>
              <li className="card-item max-w-[282px] w-full flex flex-col justify-end">
                <div className="mb-4">
                  <Icon name="BarChart3" size={64} className="text-[#1427C6]" />
                </div>
                <p className="text-[22px] font-semibold max-w-[190px]">UI Оптимизация</p>
              </li>
            </ul>
          </div>
          <div className="services-right pt-[316px] min-h-full">
            <p className="icon-badge max-w-[295px]">мы предоставляем</p>
            <h3 className="section-subtitle">Сделаем чтобы продукт работал на Вас, а не вы на него!</h3>
            <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
