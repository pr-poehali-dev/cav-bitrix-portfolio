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
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300">
                <p className="font-medium text-white mb-1">Требуется OAuth токен</p>
                <p className="mb-2">Для получения данных из Яндекс.Вебмастера нужно добавить OAuth токен в Secrets проекта.</p>
                <p className="text-xs opacity-75">После добавления токена здесь автоматически появятся все проблемы сайта из Яндекс.Вебмастера</p>
              </div>
            </div>
          </div>

          {loadingIssues ? (
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