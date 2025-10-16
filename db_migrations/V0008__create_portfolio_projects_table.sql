-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS t_p26695620_cav_bitrix_portfolio.portfolio_projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(10) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    website_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for sorting
CREATE INDEX IF NOT EXISTS idx_portfolio_display_order ON t_p26695620_cav_bitrix_portfolio.portfolio_projects(display_order);

-- Create index for active projects
CREATE INDEX IF NOT EXISTS idx_portfolio_active ON t_p26695620_cav_bitrix_portfolio.portfolio_projects(is_active);