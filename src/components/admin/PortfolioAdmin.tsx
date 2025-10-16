import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PortfolioProject {
  id?: number;
  title: string;
  description: string;
  image_url: string;
  carousel_image_url?: string;
  preview_image_url?: string;
  website_url: string;
  display_order: number;
  is_active: boolean;
}

interface SortableProjectProps {
  project: PortfolioProject;
  onEdit: () => void;
  onDelete: () => void;
}

const SortableProject = ({ project, onEdit, onDelete }: SortableProjectProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video relative">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {!project.is_active && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Скрыт
          </div>
        )}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 p-2 rounded cursor-move hover:bg-white dark:hover:bg-gray-800 transition-colors"
          title="Перетащите для изменения порядка"
        >
          <Icon name="GripVertical" size={20} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {project.description}
          </p>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <Icon name="Edit" size={16} className="mr-1" />
            Редактировать
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="text-red-600 hover:text-red-700"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const PortfolioAdmin = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const emptyProject: PortfolioProject = {
    title: '',
    description: '',
    image_url: '',
    website_url: '',
    display_order: 0,
    is_active: true,
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/99ddd15c-93b5-4d9e-8536-31e6f6630304');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      setProjects(newProjects);

      const updates = newProjects.map((project, index) => ({
        ...project,
        display_order: index,
      }));

      try {
        await Promise.all(
          updates.map((project) =>
            fetch('https://functions.poehali.dev/99ddd15c-93b5-4d9e-8536-31e6f6630304', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(project),
            })
          )
        );
      } catch (error) {
        console.error('Failed to update order:', error);
        fetchProjects();
      }
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;

    if (editingProject.title.length > 10) {
      alert('Заголовок не должен превышать 10 символов');
      return;
    }

    const method = editingProject.id ? 'PUT' : 'POST';
    
    try {
      const response = await fetch('https://functions.poehali.dev/99ddd15c-93b5-4d9e-8536-31e6f6630304', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject),
      });

      if (response.ok) {
        await fetchProjects();
        setIsModalOpen(false);
        setEditingProject(null);
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Ошибка при сохранении проекта');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить проект?')) return;

    try {
      const response = await fetch('https://functions.poehali.dev/99ddd15c-93b5-4d9e-8536-31e6f6630304', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        await fetchProjects();
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Ошибка при удалении проекта');
    }
  };

  const openModal = (project?: PortfolioProject) => {
    setEditingProject(project || { ...emptyProject });
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Icon name="Loader2" className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Портфолио</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Перетаскивайте карточки для изменения порядка отображения
          </p>
        </div>
        <Button onClick={() => openModal()}>
          <Icon name="Plus" size={20} className="mr-2" />
          Добавить проект
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Icon name="FolderOpen" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="mb-4">Проектов пока нет</p>
          <Button onClick={() => openModal()}>Добавить первый проект</Button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map((p) => p.id!)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <SortableProject
                  key={project.id}
                  project={project}
                  onEdit={() => openModal(project)}
                  onDelete={() => project.id && handleDelete(project.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingProject.id ? 'Редактировать проект' : 'Новый проект'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
                  Заголовок <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({editingProject.title.length}/10 символов)
                  </span>
                </label>
                <Input
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, title: e.target.value.slice(0, 10) })
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
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
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
                            setEditingProject({ ...editingProject, carousel_image_url: data.url });
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
                {editingProject.carousel_image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={editingProject.carousel_image_url}
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
                            setEditingProject({ ...editingProject, preview_image_url: data.url });
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
                {editingProject.preview_image_url && (
                  <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={editingProject.preview_image_url}
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
                  value={editingProject.website_url}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, website_url: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={editingProject.is_active}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, is_active: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label htmlFor="is_active" className="text-sm text-gray-900 dark:text-gray-100">
                  Показывать на сайте
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Отмена
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  !editingProject.title ||
                  !editingProject.image_url ||
                  !editingProject.website_url
                }
              >
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioAdmin;