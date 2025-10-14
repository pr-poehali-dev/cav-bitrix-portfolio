import { Service, BitrixLicense, HostingOption, BegetTariff } from './types';

export const developmentServices: Service[] = [
  {
    id: 'corporate',
    title: 'Корпоративный сайт',
    description: 'Профессиональная платформа для презентации вашей компании и привлечения клиентов',
    price: 50000
  },
  {
    id: 'shop',
    title: 'Интернет-магазин',
    description: 'Удобное и надежное решение для онлайн-продаж с каталогом и корзиной',
    price: 80000
  },
  {
    id: 'landing',
    title: 'Лендинг',
    description: 'Эффективный одностраничный сайт для продвижения товаров и услуг',
    price: 25000
  },
  {
    id: 'business-card',
    title: 'Сайт-визитка',
    description: 'Быстрый и недорогой способ представить бизнес в сети',
    price: 15000
  },
  {
    id: 'adaptive',
    title: 'Адаптивная верстка',
    description: 'Сайт отлично выглядит и работает на всех устройствах',
    price: 10000
  }
];

export const promotionServices: Service[] = [
  {
    id: 'seo',
    title: 'SEO-оптимизация',
    description: 'Продвижение сайта в поисковых системах',
    price: 30000
  },
  {
    id: 'context',
    title: 'Контекстная реклама',
    description: 'Настройка и ведение рекламных кампаний',
    price: 25000
  },
  {
    id: 'smm',
    title: 'SMM-продвижение',
    description: 'Продвижение в социальных сетях',
    price: 20000
  }
];

export const additionalServices: Service[] = [
  {
    id: 'content',
    title: 'Контент-менеджмент',
    description: 'Регулярное обновление и наполнение сайта',
    price: 15000
  },
  {
    id: 'support',
    title: 'Техническая поддержка',
    description: 'Обслуживание и исправление ошибок',
    price: 10000
  },
  {
    id: 'analytics',
    title: 'Веб-аналитика',
    description: 'Настройка систем аналитики и отчеты',
    price: 12000
  }
];

export const hostingOptions: HostingOption[] = [
  {
    id: 'own',
    title: 'На моем хостинге',
    description: 'Уже купил или уже есть',
    price: 0
  },
  {
    id: 'vps',
    title: 'Предоставить VPS с ISPmanager 6',
    description: 'До 3-х сайтов',
    price: 4000
  },
  {
    id: 'beget',
    title: 'Приобрести хостинг партнера Beget.com',
    description: 'Надежный виртуальный хостинг',
    price: 0
  }
];

export const begetTariffs: BegetTariff[] = [
  {
    id: 'start',
    name: 'START',
    price: 150,
    period: 'мес',
    features: ['10 ГБ SSD', '1 сайт', '1 база данных MySQL', '5 почтовых ящиков', 'SSL сертификат']
  },
  {
    id: 'optimal',
    name: 'OPTIMAL',
    price: 250,
    period: 'мес',
    features: ['25 ГБ SSD', '5 сайтов', '10 баз данных MySQL', '50 почтовых ящиков', 'SSL сертификат', 'Резервные копии']
  },
  {
    id: 'business',
    name: 'BUSINESS',
    price: 450,
    period: 'мес',
    features: ['50 ГБ SSD', '20 сайтов', '50 баз данных MySQL', 'Безлимит почтовых ящиков', 'SSL сертификат', 'Резервные копии', 'Приоритетная поддержка']
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 750,
    period: 'мес',
    features: ['100 ГБ SSD', 'Безлимит сайтов', 'Безлимит баз данных', 'Безлимит почтовых ящиков', 'SSL сертификат', 'Резервные копии', 'Приоритетная поддержка', 'PHP 8.x']
  }
];

export const bitrixLicenses: BitrixLicense[] = [
  {
    id: 'start',
    title: 'Старт',
    description: 'Для небольших проектов и стартапов',
    price: 6200,
    features: ['1 сайт', 'Базовые модули', 'Поддержка 3 месяца', 'Обновления 1 год']
  },
  {
    id: 'standard',
    title: 'Стандарт',
    description: 'Оптимальное решение для среднего бизнеса',
    price: 17900,
    features: ['3 сайта', 'Расширенные модули', 'Интернет-магазин', 'Поддержка 1 год']
  },
  {
    id: 'small-business',
    title: 'Малый бизнес',
    description: 'Для растущих компаний',
    price: 40900,
    features: ['5 сайтов', 'Все модули', 'CRM-интеграция', 'Поддержка 1 год', 'Маркетплейс']
  },
  {
    id: 'business',
    title: 'Бизнес',
    description: 'Для крупного бизнеса',
    price: 83900,
    features: ['Безлимит сайтов', 'Полный функционал', 'Кластеризация', 'Приоритетная поддержка']
  },
  {
    id: 'enterprise',
    title: 'Энтерпрайз',
    description: 'Максимальные возможности для корпораций',
    price: 1699000,
    features: ['Все возможности Бизнес', 'Высоконагруженные проекты', 'Персональная поддержка', 'SLA 99.9%']
  }
];
