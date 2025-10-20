import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import AdminLayout from '@/components/AdminLayout';
import MetricsTab from '@/components/analytics/MetricsTab';
import SeoTab from '@/components/analytics/SeoTab';
import StatsTab from '@/components/analytics/StatsTab';
import WebmasterTab from '@/components/analytics/WebmasterTab';

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

          <MetricsTab 
            settings={settings}
            setSettings={setSettings}
            saving={saving}
            handleSave={handleSave}
          />

          <SeoTab 
            settings={settings}
            setSettings={setSettings}
          />

          <StatsTab 
            settings={settings}
            visitData={visitData}
            loadingVisits={loadingVisits}
          />

          <WebmasterTab 
            settings={settings}
            webmasterIssues={webmasterIssues}
            loadingIssues={loadingIssues}
          />
        </Tabs>
      </div>
    </AdminLayout>
  );
}
