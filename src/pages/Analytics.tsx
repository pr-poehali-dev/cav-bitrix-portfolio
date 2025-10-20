import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import AdminLayout from '@/components/AdminLayout';
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

interface WebmasterIssue {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  url?: string;
}

export default function Analytics() {
  const [settings, setSettings] = useState<AnalyticsSettings>({
    google_analytics_id: '',
    yandex_metrika_id: '',
    yandex_webmaster_user_id: '',
    ai_seo_enabled: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [visitData, setVisitData] = useState<VisitData[]>([]);
  const [webmasterIssues, setWebmasterIssues] = useState<WebmasterIssue[]>([]);
  const [loadingVisits, setLoadingVisits] = useState(false);
  const [loadingIssues, setLoadingIssues] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (settings.yandex_metrika_id) {
      loadVisitData();
    }
  }, [settings.yandex_metrika_id]);

  useEffect(() => {
    if (settings.yandex_webmaster_user_id) {
      loadWebmasterIssues();
    }
  }, [settings.yandex_webmaster_user_id]);

  const loadSettings = async () => {
    const savedSettings = localStorage.getItem('analytics_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setLoading(false);
  };

  const loadVisitData = async () => {
    if (!settings.yandex_metrika_id) {
      setVisitData([]);
      return;
    }

    setLoadingVisits(true);
    try {
      const response = await fetch('https://functions.poehali.dev/40804d39-8296-462b-abc2-78ee1f80f0dd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ counter_id: settings.yandex_metrika_id })
      });

      if (response.ok) {
        const data = await response.json();
        setVisitData(data.visits || []);
      } else {
        setVisitData([]);
      }
    } catch (error) {
      console.error('Failed to load visit data:', error);
      setVisitData([]);
    } finally {
      setLoadingVisits(false);
    }
  };

  const loadWebmasterIssues = async () => {
    if (!settings.yandex_webmaster_user_id) {
      setWebmasterIssues([]);
      return;
    }

    setLoadingIssues(true);
    try {
      const response = await fetch('https://functions.poehali.dev/f7cef033-563d-43d4-bc11-18ea42d54a00', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: settings.yandex_webmaster_user_id,
          host_id: window.location.hostname
        })
      });

      if (response.ok) {
        const data = await response.json();
        setWebmasterIssues(data.issues || []);
      } else {
        setWebmasterIssues([]);
      }
    } catch (error) {
      console.error('Failed to load webmaster issues:', error);
      setWebmasterIssues([]);
    } finally {
      setLoadingIssues(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    localStorage.setItem('analytics_settings', JSON.stringify(settings));
    
    if (settings.yandex_metrika_id) {
      await loadVisitData();
    }
    
    if (settings.yandex_webmaster_user_id) {
      await loadWebmasterIssues();
    }
    
    setTimeout(() => {
      setSaving(false);
    }, 1000);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Info';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'warning': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      default: return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    }
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
            <TabsTrigger value="webmaster" className="data-[state=active]:bg-blue-600">
              <Icon name="FileSearch" size={16} className="mr-2" />
              Яндекс.Вебмастер
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

                  <div>
                    <Label htmlFor="webmaster" className="text-gray-300 flex items-center gap-2 mb-2">
                      <Icon name="FileSearch" size={16} />
                      Яндекс.Вебмастер User ID
                    </Label>
                    <Input
                      id="webmaster"
                      placeholder="User ID из Яндекс.Вебмастера"
                      value={settings.yandex_webmaster_user_id}
                      onChange={(e) => setSettings({ ...settings, yandex_webmaster_user_id: e.target.value })}
                      className="bg-gray-900/50 border-gray-700 text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      OAuth токен для получения замечаний от Яндекса
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
                      setSettings({ ...settings, ai_seo_enabled: !settings.ai_seo_enabled });
                      localStorage.setItem('analytics_settings', JSON.stringify({ ...settings, ai_seo_enabled: !settings.ai_seo_enabled }));
                    }}
                    variant={settings.ai_seo_enabled ? "outline" : "default"}
                    className={settings.ai_seo_enabled ? 'border-gray-600 text-gray-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}
                  >
                    {settings.ai_seo_enabled ? 'Выключить' : 'Включить'}
                  </Button>
                </div>

                {settings.ai_seo_enabled && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white">Что оптимизируется:</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Title и meta description для каждой страницы</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Структура заголовков H1-H6</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Alt-теги для изображений</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Внутренние ссылки и структура контента</span>
                      </li>
                    </ul>
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

          <TabsContent value="webmaster" className="space-y-6 mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="FileSearch" size={24} />
                  Яндекс.Вебмастер
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Замечания и рекомендации от Яндекса по улучшению сайта
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!settings.yandex_webmaster_user_id ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      <Icon name="FileSearch" size={32} className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Подключите Яндекс.Вебмастер</h3>
                    <p className="text-gray-400 text-center max-w-md mb-6">
                      Добавьте User ID из Яндекс.Вебмастера во вкладке "Метрики", чтобы получать замечания и рекомендации от Яндекса
                    </p>
                    <Button
                      onClick={() => {
                        const metricsTab = document.querySelector('[value="metrics"]') as HTMLElement;
                        metricsTab?.click();
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Icon name="Settings" size={16} className="mr-2" />
                      Настроить интеграцию
                    </Button>
                  </div>
                ) : loadingIssues ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <Icon name="Loader2" className="animate-spin text-blue-400 mb-4" size={32} />
                    <p className="text-gray-400">Загрузка замечаний из Яндекс.Вебмастера...</p>
                  </div>
                ) : webmasterIssues.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                      <Icon name="CheckCircle" size={32} className="text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Всё отлично!</h3>
                    <p className="text-gray-400 text-center max-w-md">
                      Яндекс не обнаружил критических проблем на вашем сайте
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {webmasterIssues.map((issue, index) => (
                      <Alert key={index} className={getSeverityColor(issue.severity)}>
                        <Icon name={getSeverityIcon(issue.severity)} size={20} />
                        <AlertDescription className="ml-2">
                          <p className="font-medium mb-1">{issue.type}</p>
                          <p className="text-sm opacity-90">{issue.description}</p>
                          {issue.url && (
                            <a href={issue.url} target="_blank" rel="noopener noreferrer" className="text-sm underline mt-1 inline-block">
                              Подробнее
                            </a>
                          )}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}