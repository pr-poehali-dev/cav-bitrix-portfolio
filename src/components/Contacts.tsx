const Contacts = () => {
  return (
    <section id="contacts" className="contacts">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-[76px] items-center min-h-[600px]">
          <div className="contacts-content min-h-full z-[1] p-5 content-center">
            <h2 className="section-title">Контакты</h2>
            <form className="flex flex-col gap-16">
              <input
                type="text"
                placeholder="Ваше имя"
                className="form-input-custom"
                required
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="form-input-custom"
                required
              />
              <button type="submit" className="btn bg-[#424AE3] text-white py-6 px-[132px] rounded-[30px] text-xl max-w-[521px] w-full min-h-[68px]">
                Оставить заявку
              </button>
            </form>
          </div>
          <div className="contacts-pic hidden lg:block">
            <div className="w-full h-96 bg-gradient-to-br from-[#1427C6]/20 to-[#424AE3]/10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
