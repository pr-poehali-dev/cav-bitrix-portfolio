import Hero from '@/components/Hero';
import News from '@/components/News';
import AboutUs from '@/components/AboutUs';
import Development from '@/components/Development';
import Promotion from '@/components/Promotion';
import Services from '@/components/Services';
import LeadGeneration from '@/components/LeadGeneration';
import Portfolio from '@/components/Portfolio';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import PartnerLogin from '@/components/services/PartnerLogin';
import HowItWorks from '@/components/HowItWorks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-white">
      <Button 
        onClick={() => navigate('/test-s3')}
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        variant="secondary"
        size="sm"
      >
        🧪 Тест S3
      </Button>
      <PartnerLogin />
      <Hero />
      
      <main>
        <HowItWorks />
        <Development />
        <Promotion />
        <Services />
        <News />
        <AboutUs />
        <Portfolio />
        <Contacts />
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Index;