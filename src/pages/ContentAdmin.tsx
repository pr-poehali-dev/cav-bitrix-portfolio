import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/AdminLayout';
import PartnerLogosAdmin from './PartnerLogosAdmin';
import PortfolioAdmin from './PortfolioAdmin';
import ServicesAdmin from './ServicesAdmin';
import LogoAdmin from './LogoAdmin';

const ContentAdmin = () => {
  const [activeTab, setActiveTab] = useState('logo');

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Управление контентом
          </h1>
          <p className="text-gray-400">Логотип, услуги, партнёры и портфолио проектов</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 bg-gray-800/50 border border-gray-700">
            <TabsTrigger 
              value="logo"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Логотип
            </TabsTrigger>
            <TabsTrigger 
              value="services"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Услуги
            </TabsTrigger>
            <TabsTrigger 
              value="partner-logos"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Логотипы партнёров
            </TabsTrigger>
            <TabsTrigger 
              value="portfolio"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Портфолио
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logo" className="mt-6">
            <LogoAdmin isEmbedded={true} />
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <ServicesAdmin isEmbedded={true} />
          </TabsContent>

          <TabsContent value="partner-logos" className="mt-6">
            <PartnerLogosAdmin isEmbedded={true} />
          </TabsContent>

          <TabsContent value="portfolio" className="mt-6">
            <PortfolioAdmin isEmbedded={true} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ContentAdmin;