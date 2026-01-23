-- =====================================================
-- METAL PRODUCTS E-COMMERCE SCHEMA
-- Version: 1.0.0 | Date: 2026-01-23
-- =====================================================
-- This migration creates the core tables for the metal
-- products e-commerce platform (file wires, tags, magnets)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. PRODUCTS TABLE (Simplified for Part 1)
-- =====================================================
CREATE TABLE IF NOT EXISTS metal_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0,
    image_url TEXT,  -- WebP/SVG URL or Supabase Storage path
    background_color VARCHAR(50) DEFAULT '#ffffff', -- Hex or Tailwind class
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. PRODUCT FEATURES TABLE (One-to-Many)
-- =====================================================
CREATE TABLE IF NOT EXISTS product_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES metal_products(id) ON DELETE CASCADE,
    feature_text VARCHAR(500) NOT NULL,
    feature_icon VARCHAR(50), -- Optional: lucide icon name
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_metal_products_category ON metal_products(category_id);
CREATE INDEX IF NOT EXISTS idx_metal_products_active ON metal_products(is_active);
CREATE INDEX IF NOT EXISTS idx_metal_products_slug ON metal_products(slug);
CREATE INDEX IF NOT EXISTS idx_product_features_product ON product_features(product_id);
CREATE INDEX IF NOT EXISTS idx_product_features_order ON product_features(display_order);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE metal_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Public can view active categories" ON categories
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view active products" ON metal_products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view product features" ON product_features
    FOR SELECT USING (true);

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access to categories" ON categories
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to products" ON metal_products
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access to features" ON product_features
    FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- UPDATED_AT TRIGGER FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_metal_products_updated_at
    BEFORE UPDATE ON metal_products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA: Sample Categories
-- =====================================================
INSERT INTO categories (name, slug, description, display_order) VALUES
('Tel Ürünler', 'tel-urunler', 'Endüstriyel tel ve kablo ürünleri', 1),
('Etiketler', 'etiketler', 'Metal etiket ve plaketler', 2),
('Mıknatıslar', 'miknatislar', 'Güçlü mıknatıs ürünleri', 3),
('Metal Posterler', 'metal-posterler', 'Dekoratif metal posterler', 4);

-- =====================================================
-- SEED DATA: Sample Products
-- =====================================================
INSERT INTO metal_products (name, slug, description, price, image_url, background_color, category_id, stock_quantity) VALUES
('Galvanizli Çelik Tel', 'galvanizli-celik-tel', 'Yüksek dayanıklılıklı galvanizli çelik tel, dış mekan kullanımına uygun', 45.00, '/products/tel-01.webp', '#f0f4f8', (SELECT id FROM categories WHERE slug = 'tel-urunler'), 100),
('Paslanmaz Çelik Etiket', 'paslanmaz-celik-etiket', 'Lazer kesimli paslanmaz çelik etiket, özel tasarım', 75.00, '/products/etiket-01.webp', '#1a1a2e', (SELECT id FROM categories WHERE slug = 'etiketler'), 50),
('Neodimyum Mıknatıs N52', 'neodimyum-mikratis-n52', 'Süper güçlü N52 sınıfı neodimyum mıknatıs', 120.00, '/products/miknatis-01.webp', '#16213e', (SELECT id FROM categories WHERE slug = 'miknatislar'), 200);

-- =====================================================
-- SEED DATA: Sample Features
-- =====================================================
INSERT INTO product_features (product_id, feature_text, feature_icon, display_order) VALUES
((SELECT id FROM metal_products WHERE slug = 'galvanizli-celik-tel'), 'Korozyona karşı yüksek direnç', 'Shield', 1),
((SELECT id FROM metal_products WHERE slug = 'galvanizli-celik-tel'), '10 yıl garanti', 'Award', 2),
((SELECT id FROM metal_products WHERE slug = 'galvanizli-celik-tel'), 'Dış mekan kullanımına uygun', 'Sun', 3),

((SELECT id FROM metal_products WHERE slug = 'paslanmaz-celik-etiket'), 'Lazer kesim hassasiyeti', 'Zap', 1),
((SELECT id FROM metal_products WHERE slug = 'paslanmaz-celik-etiket'), 'Özel tasarım seçenekleri', 'Palette', 2),
((SELECT id FROM metal_products WHERE slug = 'paslanmaz-celik-etiket'), 'Solmaz baskı kalitesi', 'Sparkles', 3),

((SELECT id FROM metal_products WHERE slug = 'neodimyum-mikratis-n52'), '30kg çekme gücü', 'Magnet', 1),
((SELECT id FROM metal_products WHERE slug = 'neodimyum-mikratis-n52'), 'Nikel kaplama', 'Shield', 2),
((SELECT id FROM metal_products WHERE slug = 'neodimyum-mikratis-n52'), 'Kompakt boyut', 'Minimize2', 3);
