import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsSettings {
  google_analytics_id: string;
  yandex_metrika_id: string;
  yandex_webmaster_user_id: string;
  ai_seo_enabled: boolean;
}

interface VisitData {
  date: string;
  visits: number;
}

interface StatsTabProps {
  settings: AnalyticsSettings;
  visitData: VisitData[];
  loadingVisits: boolean;
}

export default function StatsTab({ settings, visitData, loadingVisits }: StatsTabProps) {
  return (
    <TabsContent value="stats" className="space-y-6 mt-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Icon name="TrendingUp" size={24} />
            Посещаемость сайта
          </CardTitle>
          <CardDescription className="text-gray-400">
            Статистика посещений за последние 14 дней
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!settings.yandex_metrika_id ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                <Icon name="BarChart3" size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Подключите Яндекс.Метрику</h3>
              <p className="text-gray-400 text-center max-w-md mb-6">
                Добавьте ID счётчика Яндекс.Метрики во вкладке "Метрики", чтобы видеть статистику посещений
              </p>
              <Button
                onClick={() => {
                  const metricsTab = document.querySelector('[value="metrics"]') as HTMLElement;
                  metricsTab?.click();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Настроить метрики
              </Button>
            </div>
          ) : loadingVisits ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Icon name="Loader2" className="animate-spin text-blue-400 mb-4" size={32} />
              <p className="text-gray-400">Загрузка данных из Яндекс.Метрики...</p>
            </div>
          ) : visitData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mb-4">
                <Icon name="BarChart3" size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Нет данных</h3>
              <p className="text-gray-400 text-center max-w-md">
                Данные появятся после накопления статистики в Яндекс.Метрике
              </p>
            </div>
          ) : (
            <>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="visits" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={{ fill: '#3B82F6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Всего посещений</p>
                  <p className="text-2xl font-bold text-white">
                    {visitData.reduce((sum, item) => sum + item.visits, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Среднее в день</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(visitData.reduce((sum, item) => sum + item.visits, 0) / visitData.length).toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-1">Пиковый день</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.max(...visitData.map(item => item.visits)).toLocaleString()}
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
