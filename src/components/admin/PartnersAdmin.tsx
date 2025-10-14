import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import PartnerForm from './PartnerForm';
import PartnerCard from './PartnerCard';

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
  const [isFixingPermissions, setIsFixingPermissions] = useState(false);
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

  const handleFixPermissions = async () => {
    if (!confirm('Исправить доступ ко всем загруженным файлам в S3?')) return;

    setIsFixingPermissions(true);
    try {
      const response = await fetch('https://functions.poehali.dev/aff07754-8999-4fc7-8efe-c58dabe45548', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: 'Успешно',
          description: data.message || `Исправлено файлов: ${data.fixed}`
        });
        fetchPartners();
      } else {
        throw new Error('Failed to fix permissions');
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось исправить доступ к файлам',
        variant: 'destructive'
      });
    } finally {
      setIsFixingPermissions(false);
    }
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
        <h2 className="text-3xl font-bold text-black">
          Логотипы партнёров
        </h2>
        <div className="flex gap-3">
          <Button
            onClick={handleFixPermissions}
            disabled={isFixingPermissions}
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <Icon name={isFixingPermissions ? 'Loader2' : 'Shield'} size={20} className={`mr-2 ${isFixingPermissions ? 'animate-spin' : ''}`} />
            {isFixingPermissions ? 'Исправление...' : 'Исправить доступ S3'}
          </Button>
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
          <h3 className="text-xl font-bold text-black">Новый партнёр</h3>
          
          <PartnerForm
            formData={formData}
            isUploading={isUploading}
            onFormDataChange={setFormData}
            onFileUpload={(e) => handleFileUpload(e)}
            onSubmit={handleAdd}
            uploadInputId="upload-new-logo"
            submitLabel="Сохранить"
          />
        </div>
      )}

      <div className="grid gap-4">
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            isEditing={editingId === partner.id}
            isUploading={isUploading}
            onEdit={() => setEditingId(partner.id)}
            onUpdate={updatePartner}
            onSave={() => handleUpdate(partner.id)}
            onCancel={() => setEditingId(null)}
            onDelete={() => handleDelete(partner.id)}
            onFileUpload={(e) => handleFileUpload(e, partner.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersAdmin;