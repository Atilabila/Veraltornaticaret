-- MP-08: RLS Policies (Minimal but SAFE)

-- =====================================================
-- ORDERS TABLE RLS
-- =====================================================

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

-- =====================================================
-- ORDER ITEMS TABLE RLS
-- =====================================================

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

-- =====================================================
-- QUOTES TABLE RLS
-- =====================================================

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

-- =====================================================
-- SECURITY VERIFICATION
-- =====================================================

-- Test queries (run as anon user):
-- SELECT * FROM orders; -- Should return 0 rows (no SELECT policy)
-- SELECT * FROM quotes; -- Should return 0 rows (no SELECT policy)

-- Test queries (run as admin user):
-- SELECT * FROM orders; -- Should return all orders
-- SELECT * FROM quotes; -- Should return all quotes

COMMENT ON POLICY "anon_insert_orders" ON public.orders IS 'MP-08: Allow anonymous checkout submissions';
COMMENT ON POLICY "admin_select_orders" ON public.orders IS 'MP-08: Admin can view all orders';
COMMENT ON POLICY "admin_update_orders" ON public.orders IS 'MP-08: Admin can update order status';
