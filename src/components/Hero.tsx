import { useState, useEffect } from 'react';
import Header from './Header';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="header relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/40 to-cyan-50/60 pointer-events-none" />
      
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-gradient-start to-gradient-mid rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1500px] w-full px-[50px] mx-auto py-8">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start">
          <div className="header-left space-y-12 relative z-10">
            <div className="logo group">
              <a href="#" className="inline-block transition-transform hover:scale-105">
                <img 
                  src="https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png" 
                  alt="Logo" 
                  className="w-32 h-32 object-contain drop-shadow-2xl group-hover:drop-shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300"
                />
              </a>
            </div>
            
            <div className="header-bottom space-y-6 pt-[240px]">
              <h1 className="text-[clamp(80px,15vw,160px)] font-black leading-none m-0 bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
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

          <div className="header-right space-y-8 relative z-10">
            <Header />
            
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
    </header>
  );
};

export default Hero;