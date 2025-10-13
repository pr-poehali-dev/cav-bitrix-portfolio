CREATE TABLE IF NOT EXISTS bot_logs (
    id SERIAL PRIMARY KEY,
    user_agent TEXT NOT NULL,
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    ip_address VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bot_logs_created_at ON bot_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bot_logs_is_blocked ON bot_logs(is_blocked);

COMMENT ON TABLE bot_logs IS 'Логирование попыток доступа ботов';
COMMENT ON COLUMN bot_logs.user_agent IS 'User-Agent бота';
COMMENT ON COLUMN bot_logs.is_blocked IS 'Был ли бот заблокирован';
COMMENT ON COLUMN bot_logs.ip_address IS 'IP адрес';
COMMENT ON COLUMN bot_logs.created_at IS 'Время попытки доступа';