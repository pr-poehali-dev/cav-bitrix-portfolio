import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface PartnerLogo {
  id: number;
  name: string;
  logo_url: string;
  website_url: string;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

const PartnersAdmin = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<PartnerLogo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    website_url: '',
    display_order: 0,
    is_active: true
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c7b03587-cdba-48a4-ac48-9aa2775ff9a0');
      if (response.ok) {
        const data = await response.json();
        setPartners(data);
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить партнёров',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, partnerId?: number) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Ошибка',
        description: 'Можно загружать только изображения',
        variant: 'destructive'
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target?.result as string;

        const response = await fetch('https://functions.poehali.dev/1103293c-17a5-453c-b290-c1c376ead996', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: base64Image,
            filename: file.name
          })
        });

        if (response.ok) {
          const data = await response.json();
          
          if (partnerId) {
            updatePartner(partnerId, 'logo_url', data.url);
          } else {
            setFormData({ ...formData, logo_url: data.url });
          }

          toast({
            title: 'Успешно',
            description: 'Логотип загружен'
          });
        } else {
          throw new Error('Upload failed');
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить логотип',
        variant: 'destructive'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/c7b03587-cdba-48a4-ac48-9aa2775ff9a0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Партнёр добавлен'
        });
        setIsAdding(false);
        setFormData({
          name: '',
          logo_url: '',
          website_url: '',
          display_order: 0,
          is_active: true
        });
        fetchPartners();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить партнёра',
        variant: 'destructive'
      });
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const partner = partners.find(p => p.id === id);
      if (!partner) return;

      const response = await fetch('https://functions.poehali.dev/c7b03587-cdba-48a4-ac48-9aa2775ff9a0', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partner)
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Партнёр обновлён'
        });
        setEditingId(null);
        fetchPartners();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить партнёра',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить партнёра?')) return;

    try {
      const response = await fetch(`https://functions.poehali.dev/c7b03587-cdba-48a4-ac48-9aa2775ff9a0?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Партнёр удалён'
        });
        fetchPartners();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось удалить партнёра',
        variant: 'destructive'
      });
    }
  };

  const updatePartner = (id: number, field: keyof PartnerLogo, value: any) => {
    setPartners(partners.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-start mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gradient-start to-gradient-mid bg-clip-text text-transparent">
          Логотипы партнёров
        </h2>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate('/test-s3')}
            variant="outline"
            className="border-gradient-start text-gradient-start hover:bg-gradient-start/10"
          >
            <Icon name="TestTube2" size={20} className="mr-2" />
            Тест S3
          </Button>
          <Button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-gradient-to-r from-gradient-start to-gradient-mid text-white"
          >
            <Icon name={isAdding ? 'X' : 'Plus'} size={20} className="mr-2" />
            {isAdding ? 'Отмена' : 'Добавить партнёра'}
          </Button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gradient-start/20 space-y-4">
          <h3 className="text-xl font-bold">Новый партнёр</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-name" className="text-base font-semibold">Название бренда</Label>
              <Input
                id="new-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="1С-Битрикс"
              />
            </div>

            <div>
              <Label htmlFor="new-website" className="text-base font-semibold">Сайт партнёра</Label>
              <Input
                id="new-website"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="col-span-2 space-y-3">
              <Label className="text-base font-semibold">Логотип партнёра</Label>
              <p className="text-sm text-gray-500">Вставьте ссылку на изображение или загрузите файл с компьютера</p>
              
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    id="new-logo"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="https://example.com/logo.svg"
                  />
                </div>
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                    className="hidden"
                    id="upload-new-logo"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    onClick={() => document.getElementById('upload-new-logo')?.click()}
                    disabled={isUploading}
                    className="bg-gradient-to-r from-gradient-start to-gradient-mid text-white whitespace-nowrap"
                  >
                    <Icon name={isUploading ? 'Loader2' : 'Upload'} size={16} className={`mr-2 ${isUploading ? 'animate-spin' : ''}`} />
                    {isUploading ? 'Загрузка...' : 'Загрузить файл'}
                  </Button>
                </div>
              </div>

              {formData.logo_url && (
                <div className="mt-2 p-4 border-2 border-gradient-start/20 rounded-lg bg-gradient-to-br from-gray-50 to-white">
                  <p className="text-xs text-gray-500 mb-2">Предпросмотр:</p>
                  <img 
                    src={formData.logo_url} 
                    alt="Preview" 
                    className="h-20 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="new-order">Порядок отображения</Label>
              <Input
                id="new-order"
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="new-active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="new-active">Активен</Label>
            </div>
          </div>

          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-gradient-start to-gradient-mid text-white"
          >
            <Icon name="Check" size={20} className="mr-2" />
            Сохранить
          </Button>
        </div>
      )}

      <div className="grid gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-100 hover:border-gradient-start/30 transition-all"
          >
            {editingId === partner.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Название</Label>
                    <Input
                      value={partner.name}
                      onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Сайт</Label>
                    <Input
                      value={partner.website_url}
                      onChange={(e) => updatePartner(partner.id, 'website_url', e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 space-y-3">
                    <Label className="text-base font-semibold">Логотип партнёра</Label>
                    <p className="text-sm text-gray-500">Вставьте ссылку на изображение или загрузите файл с компьютера</p>
                    
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Input
                          value={partner.logo_url}
                          onChange={(e) => updatePartner(partner.id, 'logo_url', e.target.value)}
                          placeholder="https://example.com/logo.svg"
                        />
                      </div>
                      
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, partner.id)}
                          className="hidden"
                          id={`upload-logo-${partner.id}`}
                          disabled={isUploading}
                        />
                        <Button
                          type="button"
                          onClick={() => document.getElementById(`upload-logo-${partner.id}`)?.click()}
                          disabled={isUploading}
                          className="bg-gradient-to-r from-gradient-start to-gradient-mid text-white whitespace-nowrap"
                        >
                          <Icon name={isUploading ? 'Loader2' : 'Upload'} size={16} className={`mr-2 ${isUploading ? 'animate-spin' : ''}`} />
                          {isUploading ? 'Загрузка...' : 'Загрузить файл'}
                        </Button>
                      </div>
                    </div>

                    {partner.logo_url && (
                      <div className="mt-2 p-4 border-2 border-gradient-start/20 rounded-lg bg-gradient-to-br from-gray-50 to-white">
                        <p className="text-xs text-gray-500 mb-2">Предпросмотр:</p>
                        <img 
                          src={partner.logo_url} 
                          alt="Preview" 
                          className="h-20 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Порядок</Label>
                    <Input
                      type="number"
                      value={partner.display_order}
                      onChange={(e) => updatePartner(partner.id, 'display_order', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={partner.is_active}
                      onCheckedChange={(checked) => updatePartner(partner.id, 'is_active', checked)}
                    />
                    <Label>Активен</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleUpdate(partner.id)}
                    className="bg-gradient-to-r from-gradient-start to-gradient-mid text-white"
                  >
                    <Icon name="Check" size={16} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button
                    onClick={() => setEditingId(null)}
                    variant="outline"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="h-16 w-32 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{partner.name}</h3>
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gradient-start hover:underline"
                    >
                      {partner.website_url}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Порядок: {partner.display_order} • {partner.is_active ? 'Активен' : 'Неактивен'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => setEditingId(partner.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Icon name="Pencil" size={16} />
                  </Button>
                  <Button
                    onClick={() => handleDelete(partner.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersAdmin;