-- Create user_consents table to store cookie and privacy consents
CREATE TABLE IF NOT EXISTS user_consents (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    cookies_accepted BOOLEAN NOT NULL DEFAULT true,
    terms_accepted BOOLEAN NOT NULL DEFAULT false,
    privacy_accepted BOOLEAN NOT NULL DEFAULT false,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_user_consents_created_at ON user_consents(created_at DESC);
CREATE INDEX idx_user_consents_email ON user_consents(email) WHERE email IS NOT NULL;
