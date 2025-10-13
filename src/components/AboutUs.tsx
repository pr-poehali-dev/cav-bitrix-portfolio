const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="about-us-left">
            <h2 className="section-title">О Нас</h2>
            <div className="w-full h-96 bg-gradient-to-br from-[#1427C6]/20 to-[#424AE3]/10 rounded-2xl"></div>
          </div>
          <div className="about-us-right pt-[316px] min-h-full">
            <p className="icon-badge max-w-[190px]">компания</p>
            <h3 className="section-subtitle">Наша главная цель в компании</h3>
            <p className="section-descr">Забота о клиенте и его продукте.</p>
            <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
