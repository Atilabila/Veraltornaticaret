-- =====================================================
-- DATA MIGRATION SCRIPT
-- =====================================================
-- This script migrates existing static product data to Supabase
-- Run this AFTER creating the schema
-- =====================================================

-- Insert products from static data
-- ARABA SERİSİ (CARS)
INSERT INTO products (id, name, slug, price, image, description, story, category, material, process, print, thickness, dims, mounting, seo_title, seo_description, seo_keywords, stock_quantity)
VALUES
('CARS_01', 'Veral Industrial | Klasik Ford Mustang GT | 1.5mm Alüminyum Metal Tablo | Retro Garaj Dekoru', 'klasik-ford-mustang-gt-metal-tablo', 350, '/catalog/cars/cars_01.webp', 'Amerikan kası efsanesi Ford Mustang''in endüstriyel yorumu. 1.5mm uçak sınıfı alüminyum üzerine işlenmiş, yıllara meydan okuyan bir sanat eseri.', '1960''ların özgürlük rüzgarını ve Amerikan mühendisliğinin zirvesini duvarlarınıza taşıyoruz. Ford Mustang, sadece bir otomobil değil, bir yaşam tarzı ikonudur.', 'ARABA_PLAKA', '6061-T6 Alüminyum', 'UV Dijital Baskı', 'Veral-Gen3 Pigment', '1.5 MM', '30x45cm', 'Endüstriyel Bant', 'Ford Mustang GT Metal Tablo | Veral Industrial', 'Klasik Mustang metal poster. 1.5mm alüminyum, solmaz UV baskı.', ARRAY['mustang tablo', 'metal poster'], 50),

('CARS_02', 'Veral Industrial | Vintage Porsche 911 Carrera | Fırçalanmış Metal Poster | Minimalist Ofis Sanatı', 'vintage-porsche-911-carrera-metal-poster', 350, '/catalog/cars/cars_02.webp', 'Alman mühendisliğinin zamansız tasarımı Porsche 911. Mekanik mükemmelliği estetikle buluşturan, koleksiyonluk bir metal baskı.', 'Hızın ve zarafetin sembolü Porsche 911, Veral Industrial''in metal işleme ustalığıyla buluştu.', 'ARABA_PLAKA', '5052 Alüminyum', 'UV Baskı', 'Arşivsel Mürekkep', '1.5 MM', '30x45cm', 'Gizli Askı', 'Porsche 911 Metal Poster | Minimalist Ofis Dekoru', 'Porsche 911 Carrera metal tablo. Endüstriyel tasarım.', ARRAY['porsche tablo', 'ofis dekoru'], 50),

('CARS_03', 'Veral Industrial | Klasik Kırmızı Chevrolet Corvette | UV Baskı Metal Levha | Amerikan Retro Stil', 'klasik-chevrolet-corvette-metal-levha', 350, '/catalog/cars/cars_03.webp', 'Corvette''in ateşli kırmızısı ve krom detayları metal üzerinde parlıyor. Retro Amerikan tarzını sevenler için.', 'Amerikan rüyasının en hızlı temsilcisi Corvette, şimdi duvarlarınızı süslemeye hazır.', 'ARABA_PLAKA', 'Alüminyum Alaşım', 'UV Baskı', 'Yüksek Parlaklık', '1.5 MM', '30x45cm', 'Vida Delikli', 'Chevrolet Corvette Metal Tablo | Retro Stil', 'Kırmızı Corvette metal poster. Amerikan klasik serisi.', ARRAY['corvette tablo', 'retro poster'], 50);

-- Add more products as needed...
-- You can continue this pattern for all products

-- Note: For a complete migration, you would need to insert all products from your static data
-- This is just a sample showing the first 3 products
