import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface AnalyticsSettings {
  google_analytics_id: string;
  yandex_metrika_id: string;
  yandex_webmaster_user_id: string;
  ai_seo_enabled: boolean;
}

interface WebmasterIssue {
  type: string;
  severity: 'critical' | 'warning' | 'info';
  description: string;
  url?: string;
}

interface WebmasterTabProps {
  settings: AnalyticsSettings;
  webmasterIssues: WebmasterIssue[];
  loadingIssues: boolean;
}

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

export default function WebmasterTab({ settings, webmasterIssues, loadingIssues }: WebmasterTabProps) {
  return (
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
  );
}
