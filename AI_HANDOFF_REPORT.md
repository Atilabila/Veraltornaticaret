# 🤖 PROJECT STATE REPORT: Metal Poster Pro (MP-06 Phase)

> **DATE:** 2026-01-26
> **TARGET AUDIENCE:** Senior Prompt Engineer AI / Architect Agent
> **MISSION:** "Satış Odaklı MVP" (Sales-Focused MVP) - removing friction, enabling guest checkout & reordering without full DB auth lock-in.

---

## 1. 🌍 GLOBAL CONTEXT & ARCHITECTURE

**Project Identity:** "VERAL" - Industrial Metal Poster E-commerce.
**Stack:**
- **Framework:** Next.js 16.1 (App Router, Turbopack)
- **Styling:** TailwindCSS v4 + `metal-art.css` (Custom Design System: Industrial/Premium)
- **State Management:** Zustand (`useCartStore`, `useOrderStore`, `useProductStore`)
- **Backend/DB:** Supabase (Schema ready, but Frontend creates "Mock/Hybrid" orders to localStorage for MVP speed).
- **Deployment:** Vercel (Build fixed via `postcss.config.js` patch).

---

## 2. 🛡️ COMPLETED MODULES (MP-01 to MP-06)

### A. Frontend / Customer Experience
1.  **Landing Page:** High-performance, animation-heavy entrance (`/`).
2.  **Product Configurator:** Interactive size/frame selector (`/urunler/[slug]`).
3.  **Cart & Checkout:**
    -   Full cart management with persistence.
    -   Checkout flow (`/odeme`) simulating payment process.
    -   **CRITICAL:** Skipping actual Payment Gateway for testing (Dev Mode toggle implemented).
4.  **Order Success:** Dynamic receipt page (`/siparis/[id]`).

### B. MP-06 "Sales Booster" Features (JUST FINISHED)
**Goal:** Enable "Guest Tracking" and "Re-ordering" without requiring standard SignUp.

1.  **Guest Order Query (`/siparis-sorgula`)**
    -   **Logic:** Matches `email` + `orderNumber` against `localStorage` history.
    -   **UX:** Simple, focused form. No friction. Directs to order detail.
    -   **Tech:** Client-side lookup. Scalable to API endpoint later.
    -   **Status:** ✅ LIVE (Tested on localhost:3005).

2.  **Lightweight Account (`/hesabim`)**
    -   **Logic:** Device-based history. "If you bought here, you see it here."
    -   **UX:** Lists past orders, statuses, and totals.
    -   **Tech:** Reads `metal-poster-orders` from localStorage. Zero-login friction.
    -   **Status:** ✅ LIVE.

3.  **Buy Again / Reorder Flow**
    -   **Feature:** Button on Order Detail page to re-add all items to cart.
    -   **Tech:** `handleReorder` function in `src/app/siparis/[id]/page.tsx`.
    -   **Fix:** Added `slug` persistence to `useOrderStore` to ensure correct URLs on re-order.
    -   **Status:** ✅ LIVE.

### C. Infrastructure & Fixes
-   **Vercel Build Fix:** Removed `autoprefixer` from `postcss.config.js` (redundant with Tailwind v4) to solve `Module not found` error during deployment.
-   **Port Management:** Shifted dev server to `:3005` to avoid zombie process conflicts on `:3002`.

---

## 3. 🧠 CRITICAL CODEBASE INTELLIGENCE

### State Stores (The Brain)
-   **`useOrderStore.ts`**: Currently acts as the "Database Proxy". It generates Orders, saves them to Browser Storage, and serves them back.
    -   *Strategy:* In MP-08, we will swap the internal logic of `createOrder` to call Supabase API, but keep the interface same for the UI.

### Key Files Created/Modified
-   `src/app/siparis-sorgula/page.tsx`: Guest query entrance.
-   `src/app/hesabim/page.tsx`: Account dashboard.
-   `src/app/siparis/[id]/page.tsx`: Order visualizer & Reorder trigger.
-   `src/app/layout.tsx`: Navigation updates.
-   `postcss.config.js`: Build config patch.

---

## 4. 🚧 CURRENT CHALLENGES & "THE GAP"

1.  **Admin Panel Disconnect:**
    -   We have an Admin Panel (`/admin`), but it is currently isolated from these "Local Storage" orders.
    -   **The Problem:** The Admin (You) cannot see orders placed by Customers (Me) because they live in the customer's browser.
    -   **The Fix Needed:** We need to sync these orders to Supabase *even if* the user isn't logged in. (Anonymous Row Insertion).

2.  **Supabase Sync (The Next Step):**
    -   Tables `orders` and `order_items` exist in SQL.
    -   We need to wire `useOrderStore.createOrder` to *also* POST to Supabase RLS (using a public `service-role` wrapper or open RLS policy for `insert`).

---

## 5. 🎯 PROMPT FOR THE NEXT AGENT

**Copy this prompt to the next AI:**

> **ROLE:** Senior Full-Stack Architect (Next.js/Supabase).
>
> **CONTEXT:** We have a functioning e-commerce frontend (Next.js 16) that handles Orders and Accounts purely via Client-Side Logic (localStorage) to maximize sales/UX speed.
>
> **CURRENT STATUS:**
> - Guest Order Lookup: ✅ Ready.
> - Device-based Account: ✅ Ready.
> - Checkout Flow: ✅ Ready.
> - Vercel Build: ✅ Fixed.
>
> **THE PROBLEM:**
> The Shop Admin cannot see these orders because they are trapped in the user's browser (localStorage).
>
> **YOUR MISSION:**
> Bridge the gap between "Client-Side Orders" and "Supabase Database" WITHOUT breaking the friction-free guest experience.
>
> **TASKS:**
> 1. **Connect `useOrderStore` to Supabase:** When `createOrder` happens, silently POST the data to the `public.orders` table in Supabase.
> 2. **Secure It:** Ensure RLS policies allow "Generic/Guest" inserts but only "Admin" reads.
> 3. **Update Admin Panel:** Make the `/admin/orders` page fetch REAL data from Supabase so the merchant can fulfill orders.
>
> **CONSTRAINT:** Do NOT force the user to sign up. The DB sync must happen in the background during the "Order Success" step.
