import { useState, useEffect } from 'react';
import Header from './Header';
import PartnersCarousel from './PartnersCarousel';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header relative overflow-hidden min-h-screen flex flex-col -mt-[1px] bg-white dark:bg-gray-950">
      <div className="absolute inset-0 animated-gradient-bg" />
      
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
          animation: 'gradient-animation 20s ease infinite',
        }} />
      </div>

      <div className="fixed top-[10px] left-0 right-0 z-50">
        <div className="max-w-[1500px] w-full px-[50px] mx-auto">
          <Header />
        </div>
      </div>

      <div className="relative max-w-[1500px] w-full px-[50px] mx-auto py-8 flex-1 flex flex-col">
        <div className="grid lg:grid-cols-2 gap-[76px] items-center flex-1">
          <div className="header-left space-y-12 relative z-10 flex flex-col justify-center">
            <div className="header-bottom space-y-8">
              <h1 className="text-[clamp(60px,12vw,140px)] font-black leading-none m-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                Pixel
              </h1>
              <div className="flex flex-wrap gap-6">
                <a href="#" className="group relative nav-link-custom text-xl font-semibold pb-2 hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10">разработка сайтов</span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gradient-start to-gradient-mid transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
                <a href="#" className="group relative nav-link-custom text-xl font-semibold pb-2 hover:-translate-y-1 transition-all duration-300">
                  <span className="relative z-10">digital</span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gradient-mid to-gradient-end transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          <div className="header-right space-y-8 relative z-10 flex flex-col justify-center">
            
            <div className="header-img relative -translate-x-[39%] -translate-y-[9%] w-[144%] hidden lg:block">
              <div className="relative h-[400px] flex items-center justify-end overflow-hidden" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
                <div className="relative w-[350px] h-[350px] animate-float" style={{ transform: 'rotateX(10deg) rotateY(-10deg)', transformStyle: 'preserve-3d' }}>
                  <div className="grid grid-cols-10 gap-[2px]">
                    {Array.from({ length: 100 }).map((_, i) => {
                      const isColored = Math.random() > 0.7;
                      const height = Math.random() * 50 + 25;
                      const depth = Math.random() * 20;
                      const hue = Math.random() * 60 + 220;
                      return (
                        <div
                          key={i}
                          className="relative transition-all duration-500 hover:scale-125 hover:z-50"
                          style={{
                            height: `${height}px`,
                            transform: `translateZ(${depth}px)`,
                          }}
                        >
                          <div
                            className="w-full h-full rounded-[2px] shadow-lg"
                            style={{
                              background: isColored 
                                ? `linear-gradient(135deg, hsl(${hue}, 90%, 65%) 0%, hsl(${hue + 20}, 85%, 55%) 100%)`
                                : 'linear-gradient(135deg, rgba(240, 244, 255, 0.8) 0%, rgba(220, 225, 240, 0.5) 100%)',
                              opacity: isColored ? 0.95 : 0.4,
                              boxShadow: isColored ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float z-10">
        <div className="w-6 h-10 border-2 border-gradient-start/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-gradient-start to-transparent rounded-full animate-pulse" />
        </div>
      </div>

      <PartnersCarousel />
    </header>
  );
};

export default Hero;