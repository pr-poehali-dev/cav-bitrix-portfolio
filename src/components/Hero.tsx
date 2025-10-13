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
    <header className="header transition-shadow hover:shadow-md rounded-[30px]">
      <div className="max-w-[1500px] w-full px-[50px] mx-auto py-8">
        <div className="grid lg:grid-cols-2 gap-[76px] items-start">
          <div className="header-left space-y-12">
            <div className="logo">
              <a href="#">
                <svg width="72" height="25" viewBox="0 0 72 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.88 24V1.6H9.712C14.928 1.6 18.224 4.576 18.224 9.152C18.224 14.176 14.192 16.8 9.264 16.8H4.816V24H0.88ZM4.816 13.248H9.392C12.368 13.248 14.224 11.584 14.224 9.184C14.224 6.56 12.336 5.184 9.392 5.184H4.816V13.248ZM21.871 4.512V0.831999H26.031V4.512H21.871ZM22.031 24V7.104H25.903V24H22.031ZM29.4913 24L35.6993 15.424L29.7153 7.104H33.9393L37.8433 12.672L41.7473 7.104H45.8753L39.8913 15.328L46.1313 24H41.9073L37.7473 18.08L33.6193 24H29.4913ZM56.1448 24.384C51.2488 24.384 47.4728 20.832 47.4728 15.552C47.4728 10.72 50.8968 6.752 55.7288 6.752C61.1048 6.752 63.8248 10.976 63.8248 15.84C63.8248 16.096 63.7928 16.736 63.7608 16.928H51.3448C51.7608 19.68 53.7128 21.216 56.2088 21.216C58.0968 21.216 59.4408 20.512 60.7848 19.2L63.0568 21.216C61.4568 23.136 59.2488 24.384 56.1448 24.384ZM51.3128 14.368H59.9848C59.7288 11.872 58.2568 9.92 55.6968 9.92C53.3288 9.92 51.6648 11.744 51.3128 14.368ZM67.9373 24V0.639999H71.8093V24H67.9373Z" fill="#252525" />
                </svg>
              </a>
            </div>
            
            <div className="header-bottom space-y-4 pt-[240px]">
              <h1 className="text-[160px] font-black leading-none m-0">Pixel</h1>
              <div className="flex gap-6 z-[10000000]">
                <a href="#" className="nav-link-custom text-xl font-semibold border-b border-[#252525] hover:-translate-y-1 transition-transform">
                  разработка сайтов
                </a>
                <a href="#" className="nav-link-custom text-xl font-semibold border-b border-[#252525] hover:-translate-y-1 transition-transform">
                  digital
                </a>
              </div>
            </div>
          </div>

          <div className="header-right space-y-8">
            <Header />
            
            <div className="header-img relative -translate-x-[39%] -translate-y-[9%] w-[144%] hidden lg:block">
              <div className="relative h-[400px] flex items-center justify-end overflow-hidden" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
                <div className="relative w-[350px] h-[350px]" style={{ transform: 'rotateX(10deg) rotateY(-10deg)', transformStyle: 'preserve-3d' }}>
                  <div className="grid grid-cols-10 gap-[2px]">
                    {Array.from({ length: 100 }).map((_, i) => {
                      const isBlue = Math.random() > 0.75;
                      const height = Math.random() * 50 + 25;
                      const depth = Math.random() * 20;
                      return (
                        <div
                          key={i}
                          className="relative transition-all duration-300 hover:scale-110"
                          style={{
                            height: `${height}px`,
                            transform: `translateZ(${depth}px)`,
                          }}
                        >
                          <div
                            className={`w-full h-full rounded-[1px] shadow-md`}
                            style={{
                              background: isBlue 
                                ? 'linear-gradient(135deg, #1427C6 0%, #0d1a8f 100%)'
                                : 'linear-gradient(135deg, rgba(235, 238, 242, 0.6) 0%, rgba(200, 205, 215, 0.4) 100%)',
                              opacity: isBlue ? 0.95 : 0.35
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
