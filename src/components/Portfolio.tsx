import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image_url: string;
  website_url: string;
  display_order: number;
  is_active: boolean;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://functions.poehali.dev/99ddd15c-93b5-4d9e-8536-31e6f6630304');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section id="portfolio" className="portfolio bg-white dark:bg-gray-800">
        <div className="max-w-[1500px] w-full px-[50px] mx-auto">
          <div className="w-[95%]">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">Портфолио</h2>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Icon name="Loader2" className="animate-spin inline-block mb-2" size={32} />
              <p>Загрузка проектов...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="portfolio" className="portfolio bg-white dark:bg-gray-800">
        <div className="max-w-[1500px] w-full px-[50px] mx-auto">
          <div className="w-[95%]">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">Портфолио</h2>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Icon name="FolderOpen" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Проекты скоро появятся</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const doubledProjects = [...projects, ...projects];
  const middleIndex = Math.ceil(projects.length / 2);
  const firstHalf = projects.slice(0, middleIndex);
  const secondHalf = projects.slice(middleIndex);
  const doubledFirstHalf = [...firstHalf, ...firstHalf];
  const doubledSecondHalf = [...secondHalf, ...secondHalf];

  return (
    <>
      <section id="portfolio" className="portfolio bg-white dark:bg-gray-800">
        <div className="max-w-[1500px] w-full px-[50px] mx-auto">
          <div className="w-[95%]">
            <h2 className="section-title dark:[text-shadow:0_3px_12px_rgba(0,0,0,0.5)]">Портфолио</h2>
            
            <div className="mb-8 overflow-hidden">
              <div className="flex gap-6 animate-marquee whitespace-nowrap">
                {doubledFirstHalf.map((project, i) => (
                  <button 
                    key={`${project.id}-${i}`}
                    onClick={() => setSelectedProject(project)}
                    className="inline-block flex-shrink-0 group"
                  >
                    <div className="w-80 h-64 rounded-2xl relative overflow-hidden border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                        <div className="text-white text-xl font-bold mb-2 dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                          {project.title}
                        </div>
                        {project.description && (
                          <p className="text-white/90 text-sm text-center mb-3 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.6)] line-clamp-2">
                            {project.description}
                          </p>
                        )}
                        <div className="bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Смотреть проект
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {secondHalf.length > 0 && (
              <>
                <div className="py-8 border-y border-gradient-start/20 overflow-hidden my-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gradient-start/5 to-transparent" />
                  <div className="flex gap-16 animate-marquee-slow whitespace-nowrap text-2xl font-semibold">
                    {['Веб-дизайн', 'Разработка', 'Оптимизация', 'Веб-дизайн', 'Разработка', 'Оптимизация'].map((text, i) => (
                      <p key={i} className="bg-gradient-to-r from-gradient-start to-gradient-mid bg-clip-text text-transparent dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
                    {doubledSecondHalf.map((project, i) => (
                      <button 
                        key={`${project.id}-${i}`}
                        onClick={() => setSelectedProject(project)}
                        className="inline-block flex-shrink-0 group"
                      >
                        <div className="w-80 h-64 rounded-2xl relative overflow-hidden border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                          <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                            <div className="text-white text-xl font-bold mb-2 dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
                              {project.title}
                            </div>
                            {project.description && (
                              <p className="text-white/90 text-sm text-center mb-3 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.6)] line-clamp-2">
                                {project.description}
                              </p>
                            )}
                            <div className="bg-gradient-to-r from-gradient-start to-gradient-mid text-white px-4 py-2 rounded-full text-sm font-semibold">
                              Смотреть проект
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Modal for project preview */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/70 dark:bg-black/85 z-[99999] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 dark:[text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">
                {selectedProject.title}
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <Icon name="X" size={28} />
              </button>
            </div>

            {selectedProject.description && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300 dark:[text-shadow:0_1px_6px_rgba(0,0,0,0.3)]">
                  {selectedProject.description}
                </p>
              </div>
            )}

            <div className="p-4 bg-gray-100 dark:bg-gray-900">
              <iframe
                src={selectedProject.website_url}
                className="w-full h-[calc(90vh-240px)] rounded-lg border border-gray-300 dark:border-gray-600"
                title={selectedProject.title}
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Закрыть
              </button>
              <a
                href={selectedProject.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-gradient-start to-gradient-mid text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Открыть сайт
                <Icon name="ExternalLink" size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
