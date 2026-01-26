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
