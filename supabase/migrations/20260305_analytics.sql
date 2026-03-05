-- Analytics Page Views Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS page_views (
    id BIGSERIAL PRIMARY KEY,
    page_path TEXT NOT NULL,
    page_title TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country TEXT,
    city TEXT,
    device_type TEXT DEFAULT 'desktop',
    browser TEXT,
    session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);

-- Enable Row Level Security
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous inserts" ON page_views
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated reads (for admin panel)
CREATE POLICY "Allow authenticated reads" ON page_views
    FOR SELECT TO authenticated
    USING (true);

-- Daily aggregation view for fast dashboard queries
CREATE OR REPLACE VIEW daily_page_stats AS
SELECT
    DATE(created_at) as visit_date,
    page_path,
    COUNT(*) as view_count,
    COUNT(DISTINCT session_id) as unique_visitors,
    COUNT(DISTINCT ip_address) as unique_ips
FROM page_views
GROUP BY DATE(created_at), page_path
ORDER BY visit_date DESC;
