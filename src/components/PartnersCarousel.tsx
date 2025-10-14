import { useEffect, useState } from 'react';

interface PartnerLogo {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
  display_order: number;
  is_active: boolean;
}

const PartnersCarousel = () => {
  const [partners, setPartners] = useState<PartnerLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/c7b03587-cdba-48a4-ac48-9aa2775ff9a0');
        if (response.ok) {
          const data = await response.json();
          console.log('Partners data:', data);
          setPartners(data);
        }
      } catch (error) {
        console.error('Failed to fetch partners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (isLoading || partners.length === 0) {
    return null;
  }

  const doubledPartners = [...partners, ...partners];

  return (
    <div className="relative w-full py-8 bg-white/50 backdrop-blur-sm border-t border-gradient-start/10">
      <div className="max-w-[1500px] mx-auto px-[50px]">
        <h3 className="text-center text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">
          Наши партнёры
        </h3>
        
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/50 to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-carousel hover:[animation-play-state:paused]">
            {doubledPartners.map((partner, index) => (
              <a
                key={`${partner.id}-${index}`}
                href={partner.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[200px] mx-6 flex items-center justify-center h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 group"
              >
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Failed to load image:', partner.logo_url, 'for partner:', partner.name);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const textFallback = document.createElement('div');
                    textFallback.className = 'text-lg font-bold text-gray-700';
                    textFallback.textContent = partner.name;
                    target.parentElement?.appendChild(textFallback);
                  }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersCarousel;