const Development = () => {
  return (
    <section id="blok-dev" className="blok-dev">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="blok-dev-left">
            <h2 className="section-title">Разработка</h2>
            <div className="w-full h-96 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl"></div>
          </div>
          <div className="blok-dev-right pt-[316px] min-h-full">
            <p className="icon-badge max-w-[230px]">наши услуги</p>
            <h3 className="section-subtitle">Делаем любой сложности проекты</h3>
            <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Development;
