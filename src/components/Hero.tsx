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
                <svg width="72" height="25" viewBox="0 0 72 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="transition-all duration-300 group-hover:fill-[url(#gradient)]" d="M0.88 24V1.6H9.712C14.928 1.6 18.224 4.576 18.224 9.152C18.224 14.176 14.192 16.8 9.264 16.8H4.816V24H0.88ZM4.816 13.248H9.392C12.368 13.248 14.224 11.584 14.224 9.184C14.224 6.56 12.336 5.184 9.392 5.184H4.816V13.248ZM21.871 4.512V0.831999H26.031V4.512H21.871ZM22.031 24V7.104H25.903V24H22.031ZM29.4913 24L35.6993 15.424L29.7153 7.104H33.9393L37.8433 12.672L41.7473 7.104H45.8753L39.8913 15.328L46.1313 24H41.9073L37.7473 18.08L33.6193 24H29.4913ZM56.1448 24.384C51.2488 24.384 47.4728 20.832 47.4728 15.552C47.4728 10.72 50.8968 6.752 55.7288 6.752C61.1048 6.752 63.8248 10.976 63.8248 15.84C63.8248 16.096 63.7928 16.736 63.7608 16.928H51.3448C51.7608 19.68 53.7128 21.216 56.2088 21.216C58.0968 21.216 59.4408 20.512 60.7848 19.2L63.0568 21.216C61.4568 23.136 59.2488 24.384 56.1448 24.384ZM51.3128 14.368H59.9848C59.7288 11.872 58.2568 9.92 55.6968 9.92C53.3288 9.92 51.6648 11.744 51.3128 14.368ZM67.9373 24V0.639999H71.8093V24H67.9373Z" fill="#0a0a0a" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="72" y2="25">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
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
