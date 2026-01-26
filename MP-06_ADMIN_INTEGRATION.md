# MP-06: Admin Panel Integration & Data Management

**Objective:** Fully operationalize the Admin Panel by connecting it to the Supabase database using secure Server Actions, bypassing client-side RLS limitations for admin tasks.

## 🎯 Goals
1.  **Secure Admin Access:** Create a `service-role` Supabase client for backend operations.
2.  **Order Management:**
    *   Fetch all orders (bypassing "own orders only" RLS).
    *   Update order status (created -> shipped, etc.).
    *   View order details.
3.  **Product Management:**
    *   Create/Update/Delete products directly to Supabase.
    *   Inventory/Stock updates.
4.  **Dashboard Integration:**
    *   Refactor `AdminDashboard.tsx` to use Server Actions.
    *   Implement `OrdersTab` fully.
    *   Implement `ProductsTab` fully (connecting `useProductStore` to real DB actions or replacing logic).

## 🛠️ Technical Plan
- [ ] **Infrastructure**
    - Create `src/lib/supabase/admin.ts` (Service Role Client).
    - Create `src/actions/admin.ts` (Server Actions for Products/Orders).
- [ ] **Order System**
    - Refactor `OrdersTab` in `AdminDashboard` to call `getAdminOrders`.
    - Implement `handleStatusUpdate` using `updateAdminOrderStatus`.
- [ ] **Product System**
    - Ensure `ProductsTab` uses server actions for CRUD.
    - Validate specific image upload flow (Storage Bucket).
- [ ] **Verification**
    - Test Order viewing (should see ALL orders, not just current user's).
    - Test Product creation (should persist to DB).

## 📦 Deliverables
- Fully working Admin Panel with real data.
- `src/actions/admin.ts`
- Updated `AdminDashboard.tsx`
