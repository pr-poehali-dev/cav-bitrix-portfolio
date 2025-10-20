import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/AdminLayout';
import BotAdmin from './BotAdmin';
import LoginHistory from './LoginHistory';
import ChangePassword from './ChangePassword';

const SecurityAdmin = () => {
  const [activeTab, setActiveTab] = useState('bot-protection');

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Безопасность
          </h1>
          <p className="text-gray-400">Защита от ботов, история входов и управление паролем</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-gray-800/50 border border-gray-700">
            <TabsTrigger 
              value="bot-protection"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Защита от ботов
            </TabsTrigger>
            <TabsTrigger 
              value="login-history"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              История входов
            </TabsTrigger>
            <TabsTrigger 
              value="change-password"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              Сменить пароль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bot-protection" className="mt-6">
            <BotAdmin isEmbedded={true} />
          </TabsContent>

          <TabsContent value="login-history" className="mt-6">
            <LoginHistory isEmbedded={true} />
          </TabsContent>

          <TabsContent value="change-password" className="mt-6">
            <ChangePassword isEmbedded={true} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SecurityAdmin;