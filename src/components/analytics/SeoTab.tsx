import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AnalyticsSettings {
  google_analytics_id: string;
  yandex_metrika_id: string;
  yandex_webmaster_user_id: string;
  ai_seo_enabled: boolean;
}

interface SeoTabProps {
  settings: AnalyticsSettings;
  setSettings: (settings: AnalyticsSettings) => void;
}

export default function SeoTab({ settings, setSettings }: SeoTabProps) {
  return (
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
  );
}
