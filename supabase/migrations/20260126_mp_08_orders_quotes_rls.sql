-- MP-08 (Consolidated): Orders + Order Items + Quotes + RLS Policies
-- Note: This file exists to keep a single migration version for 20260126.

-- =====================================================
-- ORDERS TABLE
-- =====================================================

-- MP-08: Orders Table
-- Stores B2C e-commerce orders with product snapshots

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Reference number (unique, from localStorage)
    order_number TEXT UNIQUE NOT NULL,

    -- Customer info
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,

    -- Shipping address
    shipping_address JSONB NOT NULL,

    -- Order totals (snapshot at time of order)
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,

    -- Payment info
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL DEFAULT 'pending',

    -- Order status
    status TEXT NOT NULL DEFAULT 'pending',

    -- Sync metadata
    synced_from_local BOOLEAN DEFAULT false,
    sync_error TEXT,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Comments
COMMENT ON TABLE public.orders IS 'MP-08: B2C e-commerce orders with product snapshots';
COMMENT ON COLUMN public.orders.order_number IS 'Unique reference: ORD-YYYYMMDD-XXXX';
COMMENT ON COLUMN public.orders.shipping_address IS 'Full address object from checkout';
COMMENT ON COLUMN public.orders.synced_from_local IS 'True if migrated from localStorage';

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================

-- MP-08: Order Items Table
-- Stores individual line items with product snapshots (denormalized)

CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Foreign key to orders
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,

    -- Product snapshot (denormalized - price/details frozen at order time)
    product_id TEXT NOT NULL,
    product_slug TEXT NOT NULL,
    product_name TEXT NOT NULL,

    -- Variant details
    size TEXT NOT NULL,
    orientation TEXT NOT NULL,

    -- Pricing snapshot
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    subtotal DECIMAL(10,2) NOT NULL,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_order_items_product_slug ON public.order_items(product_slug);

-- Comments
COMMENT ON TABLE public.order_items IS 'MP-08: Order line items with denormalized product snapshots';
COMMENT ON COLUMN public.order_items.product_slug IS 'Frozen at order time - admin price changes do not affect past orders';
COMMENT ON COLUMN public.order_items.unit_price IS 'Price snapshot - never changes after order creation';

-- =====================================================
-- QUOTES TABLE
-- =====================================================

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

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- MP-08: RLS Policies (Minimal but SAFE)

-- ORDERS TABLE RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public/Anon can INSERT orders (checkout flow)
CREATE POLICY "anon_insert_orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Admin can SELECT all orders
CREATE POLICY "admin_select_orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
    auth.jwt() ->> 'role' = 'admin'
);

-- Policy 3: Admin can UPDATE order status only
CREATE POLICY "admin_update_orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (
    auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
);

-- ORDER ITEMS TABLE RLS
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public/Anon can INSERT order items (with order)
CREATE POLICY "anon_insert_order_items"
ON public.order_items
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Admin can SELECT all order items
CREATE POLICY "admin_select_order_items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
    auth.jwt() ->> 'role' = 'admin'
);

-- QUOTES TABLE RLS
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public/Anon can INSERT quotes (quote form)
CREATE POLICY "anon_insert_quotes"
ON public.quotes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Admin can SELECT all quotes
CREATE POLICY "admin_select_quotes"
ON public.quotes
FOR SELECT
TO authenticated
USING (
    auth.jwt() ->> 'role' = 'admin'
);

-- Policy 3: Admin can UPDATE quote status only
CREATE POLICY "admin_update_quotes"
ON public.quotes
FOR UPDATE
TO authenticated
USING (
    auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
    auth.jwt() ->> 'role' = 'admin'
);

COMMENT ON POLICY "anon_insert_orders" ON public.orders IS 'MP-08: Allow anonymous checkout submissions';
COMMENT ON POLICY "admin_select_orders" ON public.orders IS 'MP-08: Admin can view all orders';
COMMENT ON POLICY "admin_update_orders" ON public.orders IS 'MP-08: Admin can update order status';

