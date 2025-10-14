CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    discount_percent INTEGER NOT NULL DEFAULT 10 CHECK (discount_percent >= 0 AND discount_percent <= 100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_partners_login ON partners(login);
CREATE INDEX idx_partners_is_active ON partners(is_active);

INSERT INTO partners (login, password, name, discount_percent, is_active) 
VALUES ('partner', 'partner2024', 'Партнёр по умолчанию', 10, true)
ON CONFLICT (login) DO NOTHING;
