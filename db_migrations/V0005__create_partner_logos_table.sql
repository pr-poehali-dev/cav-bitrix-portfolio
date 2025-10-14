CREATE TABLE IF NOT EXISTS t_p26695620_cav_bitrix_portfolio.partner_logos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500) NOT NULL,
    website_url VARCHAR(500) NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO t_p26695620_cav_bitrix_portfolio.partner_logos (name, logo_url, website_url, display_order) VALUES
('1С-Битрикс', 'https://www.1c-bitrix.ru/upload/main_new/1c-bitrix-logo-main.png', 'https://www.1c-bitrix.ru/', 1),
('1С ФРЕШ', 'https://1cfresh.com/images/logo.svg', 'https://1cfresh.com/', 2),
('amoCRM', 'https://www.amocrm.ru/static/images/logo/amocrm-logo.svg', 'https://www.amocrm.ru/', 3),
('WAZZUP', 'https://wazzup24.ru/img/logo.svg', 'https://wazzup24.ru/', 4),
('Ростелеком', 'https://rt-provider.ru/bitrix/templates/rostelecom2021/img/logo.svg', 'https://rt-provider.ru/', 5);
