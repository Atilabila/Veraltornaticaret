-- Add SKU column to metal_products table
ALTER TABLE public.metal_products ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE;

-- Create a function to generate next SKU if not provided
CREATE OR REPLACE FUNCTION generate_next_sku()
RETURNS TEXT AS $$
DECLARE
    current_prefix TEXT;
    last_sku TEXT;
    next_num INTEGER;
BEGIN
    current_prefix := 'VRL' || to_char(CURRENT_DATE, 'YYMM') || '-';
    
    SELECT sku INTO last_sku
    FROM public.metal_products
    WHERE sku LIKE current_prefix || '%'
    ORDER BY sku DESC
    LIMIT 1;
    
    IF last_sku IS NULL THEN
        next_num := 1;
    ELSE
        next_num := (substring(last_sku from '[0-9]+$'))::INTEGER + 1;
    END IF;
    
    RETURN current_prefix || lpad(next_num::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;
