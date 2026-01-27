-- INSTAGRAM FEED TABLE
CREATE TABLE IF NOT EXISTS public.instagram_feed (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    permalink TEXT,
    caption TEXT,
    likes INTEGER DEFAULT 0,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- ENABLE RLS
ALTER TABLE public.instagram_feed ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public read instagram_feed" ON public.instagram_feed
    FOR SELECT USING (true);

CREATE POLICY "Admin all instagram_feed" ON public.instagram_feed
    FOR ALL USING (auth.role() = 'authenticated');
