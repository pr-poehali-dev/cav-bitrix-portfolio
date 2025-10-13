const Promotion = () => {
  return (
    <section className="promotion">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start min-h-[600px]">
          <div className="promotion-left">
            <h2 className="section-title">Продвижение</h2>
            <div className="w-full h-96 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-2xl"></div>
          </div>
          <div className="promotion-right pt-[316px] min-h-full">
            <p className="icon-badge max-w-[195px]">взлетаем</p>
            <h3 className="section-subtitle">Сможем продвинуть любой ваш продукт или идею от А до Я</h3>
            <button className="btn bg-[#1427C6] text-white px-[22px] py-[14px] rounded-[30px] text-sm">
              Обсудить проект
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
