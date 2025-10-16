const Portfolio = () => {
  const projects = [
    { gradient: 'from-blue-500/30 via-purple-500/20 to-cyan-500/30' },
    { gradient: 'from-purple-500/30 via-pink-500/20 to-red-500/30' },
    { gradient: 'from-cyan-500/30 via-blue-500/20 to-indigo-500/30' },
    { gradient: 'from-green-500/30 via-emerald-500/20 to-teal-500/30' },
    { gradient: 'from-orange-500/30 via-amber-500/20 to-yellow-500/30' },
    { gradient: 'from-pink-500/30 via-rose-500/20 to-red-500/30' },
    { gradient: 'from-indigo-500/30 via-violet-500/20 to-purple-500/30' },
    { gradient: 'from-teal-500/30 via-cyan-500/20 to-sky-500/30' },
  ];

  return (
    <section id="portfolio" className="portfolio bg-white dark:bg-gray-950">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto">
        <div className="w-[95%]">
          <h2 className="section-title">Портфолио</h2>
          
          <div className="mb-8 overflow-hidden">
            <div className="flex gap-6 animate-marquee whitespace-nowrap">
              {projects.map((project, i) => (
                <a key={i} href="#" className="inline-block flex-shrink-0 group">
                  <div className={`w-80 h-64 bg-gradient-to-br ${project.gradient} rounded-2xl relative overflow-hidden border border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-xl font-bold bg-black/30 backdrop-blur-md px-6 py-3 rounded-full">
                        Смотреть проект
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="py-8 border-y border-gradient-start/20 overflow-hidden my-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gradient-start/5 to-transparent" />
            <div className="flex gap-16 animate-marquee-slow whitespace-nowrap text-2xl font-semibold">
              {['Одностраничник', 'Корпоративные сайты', 'Интернет-магазины', 'Одностраничник', 'Корпоративные сайты', 'Интернет-магазины'].map((text, i) => (
                <p key={i} className="bg-gradient-to-r from-gradient-start to-gradient-mid bg-clip-text text-transparent">
                  {text}
                </p>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
              {projects.reverse().map((project, i) => (
                <a key={i} href="#" className="inline-block flex-shrink-0 group">
                  <div className={`w-80 h-64 bg-gradient-to-br ${project.gradient} rounded-2xl relative overflow-hidden border border-white/20 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-xl font-bold bg-black/30 backdrop-blur-md px-6 py-3 rounded-full">
                        Смотреть проект
                      </div>
                    </div>
                  </div>
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