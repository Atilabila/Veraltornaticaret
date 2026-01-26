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
