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

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <PartnerLogin />
      <Hero />
      
      <main>
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