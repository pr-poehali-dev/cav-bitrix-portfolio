import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface NewsItem {
  title: string;
  excerpt: string;
  content: string;
  source: string;
  sourceUrl: string;
  date: string;
  image: string;
  category: string;
  link: string;
}

const News = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [categories, setCategories] = useState<string[]>(['Все']);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://functions.poehali.dev/265f74c3-c0a3-4d44-b005-9119dff641cf');
        const data = await response.json();
        
        if (data.news && Array.isArray(data.news)) {
          setNewsItems(data.news);
          
          const uniqueCategories = ['Все', ...Array.from(new Set(data.news.map((item: NewsItem) => item.category)))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = selectedCategory === 'Все' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const cleanHtml = (html: string) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-gradient-start to-gradient-mid text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gradient-start/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-gradient-start/20 border-t-gradient-start rounded-full animate-spin" />
              <p className="text-gray-600 font-semibold">Загрузка новостей...</p>
            </div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="FileQuestion" size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-xl text-gray-600">Новостей не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNews.map((item, index) => (
              <article
                key={`${item.link}-${index}`}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gradient-start/30 flex flex-col"
                onClick={() => setSelectedNews(item)}
              >
                <div className="relative overflow-hidden h-44">
                  <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/70 to-gradient-mid/50 z-10 opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800';
                    }}
                  />
                  
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-block px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-bold text-gradient-start">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <a 
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-gradient-start transition-colors font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icon name="ExternalLink" size={12} />
                      <span>{item.source}</span>
                    </a>
                    <span className="text-gray-300">•</span>
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-bold text-gray-900 group-hover:text-gradient-start transition-colors line-clamp-2 text-lg leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-2 flex-1 leading-relaxed">
                    {cleanHtml(item.excerpt)}
                  </p>

                  <div className="flex items-center gap-1.5 text-gradient-start font-semibold text-sm pt-2 group-hover:gap-2 transition-all">
                    Читать
                    <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
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
              <img 
                src={selectedNews.image} 
                alt={selectedNews.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200';
                }}
              />
              
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
                {cleanHtml(selectedNews.excerpt)}
              </p>

              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
              </div>

              <div className="pt-6 border-t border-gray-200">
                <a
                  href={selectedNews.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gradient-start font-semibold hover:gap-3 transition-all"
                >
                  Читать полностью на {selectedNews.source}
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