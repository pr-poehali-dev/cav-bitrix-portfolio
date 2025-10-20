import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/AdminLayout';
import PartnerLogosAdmin from './PartnerLogosAdmin';
import PortfolioAdmin from './PortfolioAdmin';

const ContentAdmin = () => {
  const [activeTab, setActiveTab] = useState('partner-logos');

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Управление контентом
          </h1>
          <p className="text-gray-400">Логотипы партнёров и портфолио проектов</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-gray-800/50 border border-gray-700">
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
