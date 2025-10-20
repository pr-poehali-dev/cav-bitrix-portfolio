CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    service_id VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('development', 'promotion', 'additional')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_active ON services(is_active);

INSERT INTO services (service_id, category, title, description, price, display_order) VALUES
('corporate', 'development', 'Корпоративный сайт', 'Профессиональная платформа для презентации вашей компании и привлечения клиентов', 50000, 1),
('shop', 'development', 'Интернет-магазин', 'Удобное и надежное решение для онлайн-продаж с каталогом и корзиной', 80000, 2),
('landing', 'development', 'Лендинг', 'Эффективный одностраничный сайт для продвижения товаров и услуг', 25000, 3),
('business-card', 'development', 'Сайт-визитка', 'Быстрый и недорогой способ представить бизнес в сети', 15000, 4),
('adaptive', 'development', 'Адаптивная верстка', 'Сайт отлично выглядит и работает на всех устройствах', 10000, 5),
('seo', 'promotion', 'SEO-оптимизация', 'Продвижение сайта в поисковых системах', 30000, 1),
('context', 'promotion', 'Контекстная реклама', 'Настройка и ведение рекламных кампаний', 25000, 2),
('smm', 'promotion', 'SMM-продвижение', 'Продвижение в социальных сетях', 20000, 3),
('crm-integration', 'additional', 'Работа с интеграциями CRM', 'Создание форм с веб-хуками в CRM (amoCRM, Битрикс24)', 5000, 1),
('content', 'additional', 'Контент-менеджмент', 'Регулярное обновление и наполнение сайта', 15000, 2),
('support', 'additional', 'Техническая поддержка', 'Обслуживание и исправление ошибок', 10000, 3),
('analytics', 'additional', 'Веб-аналитика', 'Настройка систем аналитики и отчеты', 12000, 4);
