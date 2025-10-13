import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Development from '@/components/Development';
import Promotion from '@/components/Promotion';
import Services from '@/components/Services';
import LeadGeneration from '@/components/LeadGeneration';
import Portfolio from '@/components/Portfolio';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      <main>
        <Development />
        <Promotion />
        <Services />
        <LeadGeneration />
        <AboutUs />
        <Portfolio />
        <Contacts />
      </main>

      <Footer />
    </div>
  );
};

export default Index;