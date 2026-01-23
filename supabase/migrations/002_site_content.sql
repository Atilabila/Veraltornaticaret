-- SITE CONTENT TABLE
CREATE TABLE IF NOT EXISTS public.site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL, -- e.g. 'main_content'
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public read access for site_content" ON public.site_content
    FOR SELECT USING (true);

CREATE POLICY "Admin full access for site_content" ON public.site_content
    FOR ALL USING (auth.role() = 'authenticated');
