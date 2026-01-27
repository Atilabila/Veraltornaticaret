-- Create table for quote attachments
CREATE TABLE IF NOT EXISTS public.quote_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT one_attachment_per_quote UNIQUE(quote_id)
);

-- Enable RLS
ALTER TABLE public.quote_attachments ENABLE ROW LEVEL SECURITY;

-- Note: In Supabase, bucket creation from SQL requires the 'storage' schema.
-- This part ensures the bucket exists if run with sufficient privileges.
INSERT INTO storage.buckets (id, name, public)
SELECT 'quote-attachments', 'quote-attachments', false
WHERE NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'quote-attachments'
);

-- Storage RLS Policies
-- 1. Unauthenticated Upload: Anyone can upload to their specific quote folder
CREATE POLICY "Unauthenticated Upload Policy" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'quote-attachments' AND
        (storage.foldername(name))[1] = 'quotes'
    );

-- 2. Admin Read: Only admins can read/download
CREATE POLICY "Admin Read Policy" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'quote-attachments' AND
        auth.role() = 'service_role'
    );

-- Table RLS Policies
CREATE POLICY "Public Insert" ON public.quote_attachments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin Select" ON public.quote_attachments
    FOR SELECT USING (auth.role() = 'service_role');
