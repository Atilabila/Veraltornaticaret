-- =====================================================
-- METAL POSTER PRO - SUPABASE DATABASE SCHEMA
-- =====================================================
-- Created: 2026-01-17
-- Description: Complete database schema for Metal Poster Pro e-commerce platform
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    color TEXT DEFAULT '#3B82F6',
    description TEXT,
    image TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- Enable RLS for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read access for categories
CREATE POLICY "Public categories are viewable by everyone"
    ON categories FOR SELECT
    USING (is_active = TRUE);

-- Admin full access for categories
CREATE POLICY "Authenticated users can manage categories"
    ON categories FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert default categories
INSERT INTO categories (name, slug, color, display_order) VALUES
    ('Arabalar', 'ARABA_PLAKA', '#3B82F6', 1),
    ('Atatürk', 'ATATURK_PLAKA', '#EF4444', 2),
    ('Karakterler', 'CHARACTER_PLAKA', '#8B5CF6', 3),
    ('Motorlar', 'MOTOR_PLAKA', '#F59E0B', 4),
    ('Özel Ürünler', 'CUSTOM', '#10B981', 5)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    story TEXT NOT NULL,
    category TEXT NOT NULL,
    
    -- Specifications
    material TEXT NOT NULL,
    process TEXT NOT NULL,
    print TEXT NOT NULL,
    thickness TEXT NOT NULL,
    dims TEXT NOT NULL,
    mounting TEXT NOT NULL,
    
    -- SEO Fields
    seo_title TEXT NOT NULL,
    seo_description TEXT NOT NULL,
    seo_keywords TEXT[] DEFAULT '{}',
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    view_count INTEGER DEFAULT 0v
);

-- Create index for faster queries
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);

-- =====================================================
-- PRODUCT IMAGES TABLE (for multiple sizes)
-- =====================================================
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size TEXT NOT NULL CHECK (size IN ('xs', 's', 'm', 'l', 'xl')),
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(product_id, size)
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- =====================================================
-- ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- =====================================================
-- ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Auto-update updated_at timestamp for products
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Public read access for products and images
CREATE POLICY "Public products are viewable by everyone"
    ON products FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Public product images are viewable by everyone"
    ON product_images FOR SELECT
    USING (TRUE);

-- Admin full access (you'll need to set up authentication for this)
-- For now, we'll allow authenticated users to manage products
CREATE POLICY "Authenticated users can manage products"
    ON products FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage product images"
    ON product_images FOR ALL
    USING (auth.role() = 'authenticated');

-- Orders: customers can only see their own orders
CREATE POLICY "Users can view their own orders"
    ON orders FOR SELECT
    USING (customer_email = auth.jwt() ->> 'email');

CREATE POLICY "Users can create orders"
    ON orders FOR INSERT
    WITH CHECK (TRUE);

-- Order items: viewable if user owns the order
CREATE POLICY "Users can view their own order items"
    ON order_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM orders
            WHERE orders.id = order_items.order_id
            AND orders.customer_email = auth.jwt() ->> 'email'
        )
    );

CREATE POLICY "Users can create order items"
    ON order_items FOR INSERT
    WITH CHECK (TRUE);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to increment product view count
CREATE OR REPLACE FUNCTION increment_product_view(product_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE products
    SET view_count = view_count + 1
    WHERE slug = product_slug;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTS
-- =====================================================
-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE products IS 'Main products catalog for Metal Poster Pro';
COMMENT ON TABLE product_images IS 'Multiple image sizes for each product';
COMMENT ON TABLE orders IS 'Customer orders';
COMMENT ON TABLE order_items IS 'Individual items in each order';

-- =====================================================
-- STORAGE BUCKET SETUP
-- =====================================================
-- Create 'products' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public read access to 'products' bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- Policy: Allow authenticated users to upload to 'products' bucket
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'products' AND auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to update their uploads
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'products' AND auth.role() = 'authenticated' );

-- Policy: Allow authenticated users to delete
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'products' AND auth.role() = 'authenticated' );
