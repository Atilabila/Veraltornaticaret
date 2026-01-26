-- MP-08: Quotes Table
-- Stores B2B quote requests with file metadata (NO base64)

CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Reference number (unique, from localStorage)
    quote_number TEXT UNIQUE NOT NULL,
    
    -- Customer info
    full_name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    
    -- Quote details
    service_type TEXT NOT NULL,
    description TEXT NOT NULL,
    
    -- File metadata ONLY (NO base64, NO binary)
    file_metadata JSONB,
    
    -- Quote status
    status TEXT NOT NULL DEFAULT 'pending',
    
    -- Sync metadata
    synced_from_local BOOLEAN DEFAULT false,
    sync_error TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_quotes_quote_number ON public.quotes(quote_number);
CREATE INDEX idx_quotes_email ON public.quotes(email);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_created_at ON public.quotes(created_at DESC);

-- Updated_at trigger
CREATE TRIGGER update_quotes_updated_at
    BEFORE UPDATE ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE public.quotes IS 'MP-08: B2B quote requests with file metadata only';
COMMENT ON COLUMN public.quotes.quote_number IS 'Unique reference: QTE-YYYYMMDD-XXXX';
COMMENT ON COLUMN public.quotes.file_metadata IS 'JSON: {fileName, fileSize, fileType} - NO base64, NO binary';
COMMENT ON COLUMN public.quotes.synced_from_local IS 'True if migrated from localStorage';

-- Constraint: file_metadata must have correct structure if present
ALTER TABLE public.quotes
ADD CONSTRAINT check_file_metadata_structure
CHECK (
    file_metadata IS NULL OR (
        file_metadata ? 'fileName' AND
        file_metadata ? 'fileSize' AND
        file_metadata ? 'fileType'
    )
);
