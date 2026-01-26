# 🔴 MP-08 SCOPE VIOLATION - ROLLBACK NOTES

**DATE:** 2026-01-26 19:31
**SEVERITY:** Critical Sprint Discipline Violation

## ❌ WHAT WAS DONE (OUT OF SCOPE)

The following MP-08 features were prematurely implemented during MP-06:

1. **Silent Sync to Supabase** (`useOrderStore.ts`)
   - Background order persistence to DB
   - OrderService integration
   - RLS-aware writes

2. **Database Schema Extensions**
   - `order_number` field
   - `product_slug` field  
   - `size`, `orientation` fields
   - Migration file: `20260126184500_add_order_number.sql`

3. **Admin Panel DB Integration** (`AdminDashboard.tsx`)
   - Live Supabase order fetching
   - Order detail modal with DB data
   - Status update via DB

4. **RLS Policies**
   - Public insert policies
   - Admin read policies

## ✅ ROLLBACK ACTIONS TAKEN

### 1. useOrderStore.ts
- ❌ Removed `OrderService` import
- ❌ Removed silent sync block
- ✅ Kept localStorage-only approach (MP-06 scope)
- ✅ Added TODO comment for MP-08

### 2. Files Preserved for MP-08
The following files contain valid MP-08 work but are NOT ACTIVE:

- `supabase/migrations/20260126184500_add_order_number.sql` (DO NOT RUN)
- `src/lib/supabase/database.types.ts` (extended types - unused for now)
- `src/components/admin/AdminDashboard.tsx` (modal code exists but fetches mock data)

## 🟢 MP-06 ACTUAL SCOPE (RESTORED)

MP-06 is now back to its original scope:

1. ✅ Guest Order Query (`/siparis-sorgula`)
   - Email + Order Number lookup
   - Client-side localStorage matching
   
2. ✅ Device-based Account (`/hesabim`)
   - Shows orders from THIS device
   - No login required
   
3. ✅ Reorder Flow
   - "Buy Again" button
   - Re-adds items to cart

**NO DATABASE. NO ADMIN SYNC. NO RLS.**

## 📋 MP-08 CHECKLIST (FUTURE)

When MP-08 officially starts:

- [ ] Run migration: `20260126184500_add_order_number.sql`
- [ ] Uncomment OrderService in `useOrderStore.ts`
- [ ] Implement silent sync (replace TODO)
- [ ] Connect Admin Panel to live DB
- [ ] Test RLS policies
- [ ] Add logging/audit trail
- [ ] Legal compliance check (KVKK/GDPR)

## 🎯 LESSON LEARNED

**Good code at wrong time = Technical debt**

Sprint discipline > Feature completeness
