const Portfolio = () => {
  return (
    <section id="portfolio" className="portfolio">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="w-[95%]">
          <h2 className="section-title">Портфолио</h2>
          
          <div className="mb-8 overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <a key={i} href="#" className="inline-block flex-shrink-0">
                  <div className="w-80 h-64 bg-gradient-to-br from-[#1427C6]/20 to-[#424AE3]/10 rounded-xl"></div>
                </a>
              ))}
            </div>
          </div>

          <div className="py-6 border-y border-[#f0f0f0] overflow-hidden my-8">
            <div className="flex gap-12 animate-marquee-slow whitespace-nowrap text-2xl font-light">
              <p>Одностраничник</p>
              <p>Корпоративные сайты</p>
              <p>Интернет-магазины</p>
              <p>Одностраничник</p>
              <p>Корпоративные сайты</p>
              <p>Интернет-магазины</p>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <a key={i} href="#" className="inline-block flex-shrink-0">
                  <div className="w-80 h-64 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
