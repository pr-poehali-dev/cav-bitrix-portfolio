import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Users, Mail, Phone } from 'lucide-react';

interface Consent {
  id: number;
  fullName: string;
  phone: string | null;
  email: string | null;
  cookies: boolean;
  terms: boolean;
  privacy: boolean;
  ipAddress: string;
  createdAt: string;
}

interface ConsentResponse {
  consents: Consent[];
}

const ConsentAdmin = () => {
  const { data, isLoading } = useQuery<ConsentResponse>({
    queryKey: ['consents'],
    queryFn: async () => {
      const response = await fetch('https://functions.poehali.dev/80536dd3-4799-47a9-893a-a756a259460e');
      if (!response.ok) throw new Error('Failed to fetch consents');
      return response.json();
    },
    refetchInterval: 10000
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-gray-700 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalConsents = data?.consents.length || 0;
  const withPhone = data?.consents.filter(c => c.phone).length || 0;
  const withEmail = data?.consents.filter(c => c.email).length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Согласия пользователей
            </h1>
            <p className="text-gray-400">Управление согласиями на обработку персональных данных</p>
          </div>
          <a href="/admin/bots" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← К панели ботов
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Всего согласий</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{totalConsents}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">С телефоном</CardTitle>
              <Phone className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{withPhone}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">С email</CardTitle>
              <Mail className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{withEmail}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl text-white">Список согласий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {data?.consents.map((consent) => (
                <div
                  key={consent.id}
                  className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">{consent.fullName}</h3>
                        <span className="text-xs text-gray-400">#{consent.id}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {consent.phone && (
                          <div className="flex items-center gap-1 text-sm text-gray-300">
                            <Phone className="h-3 w-3" />
                            {consent.phone}
                          </div>
                        )}
                        {consent.email && (
                          <div className="flex items-center gap-1 text-sm text-gray-300">
                            <Mail className="h-3 w-3" />
                            {consent.email}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {consent.cookies && (
                          <Badge variant="default" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            Cookies
                          </Badge>
                        )}
                        {consent.terms && (
                          <Badge variant="default" className="bg-green-500/20 text-green-300 border-green-500/30">
                            Соглашение
                          </Badge>
                        )}
                        {consent.privacy && (
                          <Badge variant="default" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            Конфиденциальность
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs text-gray-500 flex flex-wrap gap-3">
                        <span>IP: {consent.ipAddress}</span>
                        <span>{formatDate(consent.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {(!data?.consents || data.consents.length === 0) && (
                <div className="text-center py-12 text-gray-400">
                  <ShieldCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Пока нет записей о согласиях</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsentAdmin;
