import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  source: string;
  sourceUrl: string;
  date: string;
  image: string;
  category: string;
}

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Новые возможности CSS Grid в 2025",
      excerpt: "Современные техники создания сложных макетов",
      content: "CSS Grid продолжает развиваться, предоставляя разработчикам еще больше возможностей для создания гибких и адаптивных макетов. Новые функции subgrid и container queries открывают новые горизонты в веб-дизайне. Теперь можно создавать более сложные и динамичные интерфейсы с меньшим количеством кода.",
      source: "web.dev",
      sourceUrl: "https://web.dev/",
      date: "15 октября 2024",
      image: "https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png",
      category: "CSS"
    },
    {
      id: 2,
      title: "TypeScript 5.3: Что нового?",
      excerpt: "Обзор ключевых обновлений TypeScript",
      content: "TypeScript 5.3 приносит значительные улучшения в производительность и новые возможности для типизации. Улучшенный вывод типов, оптимизация компиляции и новые утилиты делают разработку еще более комфортной и безопасной. Особое внимание уделено работе с асинхронным кодом.",
      source: "SitePoint",
      sourceUrl: "https://www.sitepoint.com/",
      date: "12 октября 2024",
      image: "https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png",
      category: "TypeScript"
    },
    {
      id: 3,
      title: "Оптимизация производительности React",
      excerpt: "Лучшие практики для быстрых приложений",
      content: "React 18 представляет новые возможности для оптимизации производительности приложений. Concurrent rendering, автоматический batching и новые хуки позволяют создавать более отзывчивые интерфейсы. Узнайте, как использовать эти возможности для улучшения UX вашего приложения.",
      source: "web.dev",
      sourceUrl: "https://web.dev/",
      date: "10 октября 2024",
      image: "https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png",
      category: "React"
    },
    {
      id: 4,
      title: "Web Accessibility: Руководство 2024",
      excerpt: "Создание доступных веб-приложений",
      content: "Доступность веб-приложений становится все более важной. Новые стандарты WCAG 2.2 и лучшие практики помогают создавать сайты, удобные для всех пользователей. Рассмотрим ключевые аспекты: семантическая разметка, управление с клавиатуры, контрастность и ARIA-атрибуты.",
      source: "SitePoint",
      sourceUrl: "https://www.sitepoint.com/",
      date: "8 октября 2024",
      image: "https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png",
      category: "Accessibility"
    },
    {
      id: 5,
      title: "AI в веб-разработке",
      excerpt: "Искусственный интеллект меняет процесс создания сайтов",
      content: "Искусственный интеллект революционизирует веб-разработку. От автоматической генерации кода до персонализации пользовательского опыта - AI открывает новые возможности. Инструменты на основе ML помогают оптимизировать производительность, улучшать доступность и создавать более умные интерфейсы.",
      source: "web.dev",
      sourceUrl: "https://web.dev/",
      date: "5 октября 2024",
      image: "https://cdn.poehali.dev/files/5e53ea79-1c81-4c3f-847b-e8a82a5743c2.png",
      category: "AI/ML"
    }
  ];

  return (
    <section className="py-24 px-[50px] bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gradient-start/20 to-transparent" />
      
      <div className="max-w-[1500px] mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-[clamp(40px,8vw,80px)] font-black bg-gradient-to-r from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent">
            Новости
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Последние тренды и обновления из мира веб-разработки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {newsItems.map((item, index) => {
            const isLarge = index === 0 || index === 4;
            const gridClass = isLarge 
              ? 'md:col-span-2 md:row-span-2' 
              : index === 2 
                ? 'lg:row-span-2' 
                : '';

            return (
              <article
                key={item.id}
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:border-gradient-start/20 ${gridClass}`}
                onClick={() => setSelectedNews(item)}
              >
                <div className={`relative overflow-hidden ${isLarge ? 'h-80' : 'h-48'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/80 via-gradient-mid/70 to-gradient-end/60 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800')] bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-gradient-start">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex flex-col h-[calc(100%-12rem)] md:h-auto">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <a 
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-gradient-start transition-colors group/source"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="ExternalLink" size={14} className="group-hover/source:translate-x-0.5 group-hover/source:-translate-y-0.5 transition-transform" />
                      <span className="font-semibold">{item.source}</span>
                    </a>
                    <span className="text-gray-300">•</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className={`font-bold text-gray-900 group-hover:text-gradient-start transition-colors line-clamp-2 ${isLarge ? 'text-2xl' : 'text-xl'}`}>
                    {item.title}
                  </h3>

                  <p className="text-gray-600 line-clamp-2 flex-1">
                    {item.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-gradient-start font-semibold text-sm group-hover:gap-3 transition-all">
                    Читать далее
                    <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedNews && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedNews(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/80 via-gradient-mid/70 to-gradient-end/60 z-10 opacity-70" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200')] bg-cover bg-center" />
              
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg group"
              >
                <Icon name="X" size={20} className="text-gray-700 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="absolute bottom-6 left-6 z-20">
                <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-bold text-gradient-start mb-4">
                  {selectedNews.category}
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-12 space-y-6">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <a 
                  href={selectedNews.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gradient-start transition-colors group/source"
                >
                  <Icon name="ExternalLink" size={14} className="group-hover/source:translate-x-0.5 group-hover/source:-translate-y-0.5 transition-transform" />
                  <span className="font-semibold">{selectedNews.source}</span>
                </a>
                <span className="text-gray-300">•</span>
                <span>{selectedNews.date}</span>
              </div>

              <h2 className="text-4xl font-black text-gray-900">
                {selectedNews.title}
              </h2>

              <p className="text-xl text-gradient-start font-semibold">
                {selectedNews.excerpt}
              </p>

              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedNews.content}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <a
                  href={selectedNews.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gradient-start font-semibold hover:gap-3 transition-all"
                >
                  Читать на {selectedNews.source}
                  <Icon name="ExternalLink" size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
