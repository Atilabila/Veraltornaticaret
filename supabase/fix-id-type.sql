-- Fix: Change product ID from UUID to TEXT to support custom IDs like "CARS_01"
ALTER TABLE products ALTER COLUMN id TYPE TEXT;
ALTER TABLE product_images ALTER COLUMN product_id TYPE TEXT;
ALTER TABLE order_items ALTER COLUMN product_id TYPE TEXT;

-- Update foreign key constraints
ALTER TABLE product_images DROP CONSTRAINT IF EXISTS product_images_product_id_fkey;
ALTER TABLE product_images ADD CONSTRAINT product_images_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

ALTER TABLE order_items DROP CONSTRAINT IF EXISTS order_items_product_id_fkey;
ALTER TABLE order_items ADD CONSTRAINT order_items_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES products(id);
