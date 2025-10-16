import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PortfolioProject } from './types';

interface PortfolioModalProps {
  project: PortfolioProject;
  onClose: () => void;
  onSave: () => void;
  onChange: (project: PortfolioProject) => void;
}

export const PortfolioModal = ({ project, onClose, onSave, onChange }: PortfolioModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {project.id ? 'Редактировать проект' : 'Новый проект'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Название проекта <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                ({project.title.length}/10 символов)
              </span>
            </label>
            <Input
              value={project.title}
              onChange={(e) =>
                onChange({ ...project, title: e.target.value.slice(0, 10) })
              }
              placeholder="Макс 10 символов"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Описание
            </label>
            <Textarea
              value={project.description}
              onChange={(e) =>
                onChange({ ...project, description: e.target.value })
              }
              placeholder="Краткое описание проекта"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Изображение для карусели <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                      const base64 = reader.result as string;
                      try {
                        const response = await fetch('https://functions.poehali.dev/a8a5e4db-ce2f-4430-931d-8b7e67ea6e9d', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ image: base64, filename: file.name })
                        });
                        const data = await response.json();
                        onChange({ ...project, carousel_image_url: data.url });
                      } catch (error) {
                        console.error('Upload failed:', error);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="flex-1"
              />
            </div>
            {project.carousel_image_url && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={project.carousel_image_url}
                  alt="Carousel Preview"
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Изображение для превью <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                      const base64 = reader.result as string;
                      try {
                        const response = await fetch('https://functions.poehali.dev/a8a5e4db-ce2f-4430-931d-8b7e67ea6e9d', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ image: base64, filename: file.name })
                        });
                        const data = await response.json();
                        onChange({ ...project, preview_image_url: data.url });
                      } catch (error) {
                        console.error('Upload failed:', error);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="flex-1"
              />
            </div>
            {project.preview_image_url && (
              <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={project.preview_image_url}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              URL сайта <span className="text-red-500">*</span>
            </label>
            <Input
              value={project.website_url}
              onChange={(e) =>
                onChange({ ...project, website_url: e.target.value })
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={project.is_active}
              onChange={(e) =>
                onChange({ ...project, is_active: e.target.checked })
              }
              className="w-4 h-4"
            />
            <label htmlFor="is_active" className="text-sm text-gray-900 dark:text-gray-100">
              Показывать на сайте
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
};
