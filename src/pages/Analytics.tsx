import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import AdminLayout from '@/components/AdminLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AnalyticsSettings {
  google_analytics_id: string;
  yandex_metrika_id: string;
  ai_seo_enabled: boolean;
}

interface VisitData {
  date: string;
  visits: number;
}

export default function Analytics() {
  const [settings, setSettings] = useState<AnalyticsSettings>({
    google_analytics_id: '',
    yandex_metrika_id: '',
    ai_seo_enabled: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [visitData, setVisitData] = useState<VisitData[]>([]);

  useEffect(() => {
    loadSettings();
    loadVisitData();
  }, []);

  const loadSettings = async () => {
    const savedSettings = localStorage.getItem('analytics_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setLoading(false);
  };

  const loadVisitData = async () => {
    const mockData: VisitData[] = [
      { date: '01.10', visits: 120 },
      { date: '02.10', visits: 145 },
      { date: '03.10', visits: 132 },
      { date: '04.10', visits: 168 },
      { date: '05.10', visits: 195 },
      { date: '06.10', visits: 178 },
      { date: '07.10', visits: 210 },
      { date: '08.10', visits: 198 },
      { date: '09.10', visits: 225 },
      { date: '10.10', visits: 240 },
      { date: '11.10', visits: 235 },
      { date: '12.10', visits: 268 },
      { date: '13.10', visits: 255 },
      { date: '14.10', visits: 290 }
    ];
    setVisitData(mockData);
  };

  const handleSave = async () => {
    setSaving(true);
    localStorage.setItem('analytics_settings', JSON.stringify(settings));
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Icon name="Loader2" className="animate-spin" size={32} />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Аналитика и SEO</h1>
          <p className="text-gray-400">Управление метриками и SEO-оптимизацией</p>
        </div>

        <Tabs defaultValue="metrics" className="w-full">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="metrics" className="data-[state=active]:bg-blue-600">
              <Icon name="Activity" size={16} className="mr-2" />
              Метрики
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-blue-600">
              <Icon name="Search" size={16} className="mr-2" />
              ИИ SEO
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-blue-600">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Посещаемость
            </TabsTrigger>
          </TabsList>

          <TabsContent value="metrics" className="space-y-6 mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="BarChart3" size={24} />
                  Подключение аналитики
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Интегрируйте Google Analytics и Яндекс.Метрику для отслеживания посещений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="google" className="text-gray-300 flex items-center gap-2 mb-2">
                      <Icon name="Globe" size={16} />
                      Google Analytics ID
                    </Label>
                    <Input
                      id="google"
                      placeholder="G-XXXXXXXXXX или UA-XXXXXXXXX-X"
                      value={settings.google_analytics_id}
                      onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Найдите ID в настройках Google Analytics
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="yandex" className="text-gray-300 flex items-center gap-2 mb-2">
                      <Icon name="Activity" size={16} />
                      Яндекс.Метрика ID
                    </Label>
                    <Input
                      id="yandex"
                      placeholder="12345678"
                      value={settings.yandex_metrika_id}
                      onChange={(e) => setSettings({ ...settings, yandex_metrika_id: e.target.value })}
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Номер счётчика из панели Яндекс.Метрики
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {saving ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Icon name="Save" size={16} className="mr-2" />
                      Сохранить настройки
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6 mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Sparkles" size={24} />
                  ИИ SEO-оптимизация
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Автоматическая оптимизация контента для поисковых систем
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <Icon name="Lightbulb" size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <p className="font-medium text-white mb-1">Автоматическая SEO-оптимизация</p>
                    <p>ИИ анализирует ваш контент и автоматически оптимизирует meta-теги, заголовки и описания для лучшего ранжирования в поисковых системах.</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${settings.ai_seo_enabled ? 'bg-green-500/20' : 'bg-gray-700'}`}>
                      <Icon name={settings.ai_seo_enabled ? "CheckCircle" : "Circle"} size={24} className={settings.ai_seo_enabled ? 'text-green-400' : 'text-gray-500'} />
                    </div>
                    <div>
                      <p className="font-medium text-white">ИИ SEO</p>
                      <p className="text-sm text-gray-400">
                        {settings.ai_seo_enabled ? 'Включено' : 'Выключено'}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      const newSettings = { ...settings, ai_seo_enabled: !settings.ai_seo_enabled };
                      setSettings(newSettings);
                      localStorage.setItem('analytics_settings', JSON.stringify(newSettings));
                    }}
                    variant={settings.ai_seo_enabled ? "destructive" : "default"}
                    className={settings.ai_seo_enabled ? "" : "bg-green-600 hover:bg-green-700"}
                  >
                    {settings.ai_seo_enabled ? (
                      <>
                        <Icon name="X" size={16} className="mr-2" />
                        Отключить
                      </>
                    ) : (
                      <>
                        <Icon name="Zap" size={16} className="mr-2" />
                        Включить
                      </>
                    )}
                  </Button>
                </div>

                {settings.ai_seo_enabled && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white">Активные оптимизации:</h3>
                    {[
                      { icon: 'FileText', label: 'Meta-теги', status: 'Оптимизировано' },
                      { icon: 'Type', label: 'Заголовки H1-H6', status: 'Оптимизировано' },
                      { icon: 'Image', label: 'Alt-теги изображений', status: 'Оптимизировано' },
                      { icon: 'Link', label: 'Внутренние ссылки', status: 'Оптимизировано' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded border border-gray-700">
                        <div className="flex items-center gap-2">
                          <Icon name={item.icon as any} size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-300">{item.label}</span>
                        </div>
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Icon name="Check" size={12} />
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6 mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  График посещаемости
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Статистика посещений за последние 14 дней
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                      <Icon name="Users" size={16} />
                      <span className="text-xs font-medium">Всего посещений</span>
                    </div>
                    <p className="text-2xl font-bold text-white">2,849</p>
                    <p className="text-xs text-gray-400 mt-1">За 14 дней</p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-green-400 mb-1">
                      <Icon name="TrendingUp" size={16} />
                      <span className="text-xs font-medium">Средний рост</span>
                    </div>
                    <p className="text-2xl font-bold text-white">+12.5%</p>
                    <p className="text-xs text-gray-400 mt-1">День к дню</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-400 mb-1">
                      <Icon name="MousePointer" size={16} />
                      <span className="text-xs font-medium">Сегодня</span>
                    </div>
                    <p className="text-2xl font-bold text-white">290</p>
                    <p className="text-xs text-gray-400 mt-1">Текущих посетителей</p>
                  </div>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visitData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="#9CA3AF"
                        style={{ fontSize: '12px' }}
                      />
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
