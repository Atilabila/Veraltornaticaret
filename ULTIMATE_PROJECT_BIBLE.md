# METAL POSTER PRO: ULTIMATE PROJECT BIBLE & MASTER PROMPT (V1.0)

## 0. INTRODUCTION: THE VISION
"Metal Poster Pro" is not just another e-commerce site; it is a high-octane, industrial-grade B2C experience designed to disrupt the premium decor market. It blends the raw, mechanical aesthetics of a manufacturing floor with the sleek, high-conversion flow of a modern Silicon Valley startup. The brand identity is "Cyber-Industrial Brutalism": unapologetically bold, precisely engineered, and visually stunning. This document is the single source of truth—the Master Blueprint—to bring this hybrid imagination into a concrete, high-performance web reality.

---

## 1. BRAND IDENTITY & AESTHETIC DNA
The design is guided by "Information-First" architecture. Every pixel must look like it was placed by a CNC machine.

### A. THE CORE COLORS (PRECISION SPECS)
- **LIGHT MODE (CLEAN INDUSTRIAL):**
  - **Background (Base):** `#FFFFFF` (Paper White)
  - **Text (Primary):** `#1A1A1A` (Near Black)
  - **Text (Secondary):** `#4B5563` (Steel Gray)
  - **Accent (Primary):** `#FF6B00` (Safety Orange) - Used for CTR, Icons, Highlights.
  - **Accent (Success):** `#00FF41` (Terminal Green) - Used for availability, stock, and "Added to Cart".
  - **Border:** `#000000` (1px - 4px variations).

- **DARK MODE (PREMIUM NOCTURNAL):**
  - **Background (Base):** `#121212` (Ebonite)
  - **Text (Primary):** `#F5F5F5` (Opal White)
  - **Text (Secondary):** `#9CA3AF` (Aluminum Gray)
  - **Accent (Primary):** `#FFA500` (Hazard Yellow/Orange)
  - **Accent (High Contrast):** `#00FFFF` (Cyber Blue) - Used sparingly for "Tech Props".
  - **Border:** `#FFFFFF` (Thin lines) or Glow Effects.

### B. TYPOGRAPHY (THE DATA FONT)
- **Headings (H1, H2, H3):** *Space Grotesk* or *Archivo Black*. All-caps, tight tracking (-0.05em), bold.
- **Body Text:** *Inter* or *Roboto*. Clean, high readability.
- **Data/UI/Labels:** *IBM Plex Mono*. Used for IDs, specs, prices, and small UI labels to reinforce the "industrial data" look.

### C. DESIGN ELEMENTS (THE BRUTALIST GRID)
- **Borders:** Every section and card must have a visible border (e.g., `border-2 border-black`).
- **Shadows:** Avoid soft blurs. Use "Brutal Shadows"—hard, offset shadows (e.g., `box-shadow: 4px 4px 0px 0px #000000`).
- **Containers:** No rounded corners (or very tight 2px radius). Everything is sharp.
- **Grids:** Use 12-column grids. Gaps should be precise (e.g., `gap-px` or multiples of 4).

---

## 2. TECHNICAL ARCHITECTURE (THE ENGINE)
The site is built for speed, SEO, and extreme interactivity.

### A. THE STACK
1. **Frontend:** Next.js 15+ (App Router) for SSR/ISR benefits.
2. **Styling:** Tailwind CSS 4.0 for utility-first, performant CSS.
3. **State Management:** Zustand (for Cart, Modals, and Configurator state).
4. **Backend/DB:** Supabase (PostgreSQL) for real-time data and edge functions.
5. **Storage:** Supabase Storage (Product assets and user uploads).
6. **Animations:** Framer Motion (for micro-interactions and transitions).

### B. DIRECTORY STRUCTURE
- `/src/app/`: Core routing and layouts.
- `/src/components/`:
  - `ui/`: Standardized atomic components (Buttons, Cards, Labels).
  - `product/`: Specialized product logic components (Configurator, Viewer).
  - `layout/`: Global Navigation, Footer, Mobile Bars.
- `/src/lib/`: Utilities, Supabase client, and helper functions.
- `/scripts/`: Automated tasks (Product generation, migration).
- `/public/`: Static assets (mockups, categories, SVGs).

---

## 3. CORE PAGE SPECIFICATIONS (THE BLUEPRINTS)

### PAGE 1: THE HOME (THE COMMAND CENTER)
- **Hero Section:** Split 12-column layout. Left: Bold Headline + CTA. Right: High-impact Mockup Animation.
- **Trust Strip:** Scrolling ticker of "100 Year Warranty", "Eco-Friendly Material", "Fast Global Shipping".
- **Product Gallery:** 1/2/3/4 column responsive grid.
  - *Golden Rule:* Text labels NEVER overlap images. They sit in defined paddings below or beside.
- **Process Steps:** Visual path: "Choose Art" -> "Configure Size" -> "Instant Print" -> "Doorstep Delivery".

### PAGE 2: THE CATALOG (THE ARCHIVE)
- **Layout:** Vertical Sidebar (Filter) + Main Grid (Products).
- **Navigation:** Horizontal scrollable category chips on mobile.
- **Card Design:** `ProductCard` must display: Image, Name (Category-prefixed), Price, and a "QUICK VIEW" button on hover.

### PAGE 3: THE PRODUCT DETAIL (THE SHOWROOM)
- **Configurator (Top Priority):**
  - **The Mockup Engine:** A real-time canvas where the poster image is projected onto a 3D-feeling wall.
  - **Controls:**
    - **Orientation:** Portrait/Landscape toggle.
    - **Size Selection:** Boxy buttons (XS to XL) with price deltas.
    - **Scene Selector:** Instant background change (Office, Garage, Bedroom).
    - **Manual Adjustment:** "Drag to Place" and "Scale" sliders for custom previews.
- **Tech Table:** A clean table listing: Material (1.5mm Aluminum), Printing (UV Digital 4K), Finish (Matte/Gloss).
- **Sticky Buy Bar:** On mobile, a persistent bottom bar with "Add to Cart" and "Price".

---

## 4. DATABASE & DATA MODEL (THE SCHEMA)
Supabase tables must mirror the `Product` interface:

- **Tables:**
  - `products`: `id, name, slug, price, category, image, description, story, material, process, print, thickness, dims, mounting, is_active, stock_quantity, view_count, created_at`.
  - `categories`: `id, name, slug, display_name`.
  - `orders`: `id, customer_id, total_price, status, shipping_address, payment_intent_id`.
  - `order_items`: `order_id, product_id, quantity, size_id, price_at_purchase`.

---

## 5. AUTOMATION & AI PIPELINE (THE PRODUCTION LINE)
- **n8n Workflow:** Every Sunday at 9 PM, runs trend analysis.
- **Logic:** Calls Gemini 2.0 Flash for viral trends -> Calls Fal.ai (Flux) for 4K art -> Submits to Supabase with `is_active: false`.
- **Admin Approval:** Admin toggles `is_active` to launch the product to the store.

---

## 6. DEVELOPMENT ROADMAP (THE MILESTONES)
1. **Phase 1: Refactor UI Foundation.** Update `index.css` with the new Brutalist color tokens. Harmonize all `ProductCard` instances.
2. **Phase 2: The Configurator Overhaul.** Split the massive `ProductDetailClient.tsx` into `MockupCanvas`, `SizeConfig`, and `SalesPanel`. Fix all overlapping UI issues via CSS Grid/Flex.
3. **Phase 3: Search & Discovery.** Add the sidebar filters to `/urunler`. Implement fuzzy search via Supabase.
4. **Phase 4: Order System.** Integrate checkout modals. Connect cart to a "Dummy Checkout" for initial launch.
5. **Phase 5: Performance & SEO.** Convert all PNG/JPG to WebP. Optimize LCP (Largest Contentful Paint) for the hero section.

---

## 7. THE MASTER PROMPT (COPY-PASTE FOR AI CONTINUITY)
> "You are an Elite Frontend Engineer and UI Designer specialized in **Modern Industrial Brutalism**. You are working on the **Metal Poster Pro** project (Next.js 15, Tailwind 4, Supabase).
>
> **MISSION:** Build a high-performance, premium e-commerce site for metal posters.
> **DESIGN RULES:** High contrast (#1A1A1A / #FFFFFF / #FF6B00), Sharp corners, Hard shadows (4px offset), IBM Plex Mono for UI data.
> **CURRENT TASK:** Refer to `TASK_PROGRESS.md` and `ULTIMATE_PROJECT_BIBLE.md` to identify the next priority.
> **CRITICAL:** Do not allow UI elements to overlap (especially in the product detail page). Use Flexbox/Grid for spacing. All product images must be WebP.
> **BEHAVIOR:** Be proactive. If a component is too large, refactor it. If a route is missing logic, implement it. Refer to the 'imagination to reality' goal – every line of code must be production-ready and aesthetically 'WOW'."

---

## 8. QA CHECKLIST (THE QUALITY CONTROL)
- [ ] Are all borders perfectly sharp (no blurry shadows)?
- [ ] Does the "Safety Orange" pop against the background?
- [ ] Is the "1.5mm Aluminum" premium feel conveyed through text and iconography?
- [ ] Does the product mockup handle both Portrait and Landscape without distorting the aspect ratio?
- [ ] Is the site responsive on 320px (iPhone SE) and 1440px (Desktop)?

---

## 9. DEEP TECHNICAL SPECIFICATIONS (FOR AGENTIC IMPLEMENTATION)

### 9.1 THE DYNAMIC CONFIGURATOR (MOCKUP ENGINE)
The Mockup Engine is the "heart" of the project. It must handle complex transformations without sacrificing performance.

**Logic Flow:**
1. **Selection Layer:** The User selects a size (XS-XL). This updates the `selectedSize` state in Zustand.
2. **Orientation Layer:** Toggle between `portrait` and `landscape`. This flips the `aspect-ratio` utility in the CSS.
3. **Projection Layer:**
   - The main poster image is placed inside a `div` with `perspective: 2000px`.
   - Realistic shadows are applied using CSS `filter: drop-shadow()` or a secondary `-z-10` layer with a blur.
   - **Realism Trick:** Apply a `mask-image` with a subtle metallic grain texture to the poster to simulate the aluminum surface.
4. **Scene Integration:**
   - Backgrounds are served as optimized `.webp` images.
   - Each background has a "Sweet Spot" coordinate set (`activeScene.pos`) where the poster is anchored.
   - **Interaction:** Users can use `framer-motion`'s `drag` prop to move the poster within the scene. The coordinates are saved so they can be sent to the factory if needed (for custom placement orders).

### 9.2 THE BRUTALIST UI KIT (TAILWIND STANDARDS)
Create a `src/components/ui/Brutal.tsx` for atomic elements:

```tsx
// Example Component: The Hazard Button
export const HazardButton = ({ label, onClick, icon: Icon }) => (
  <button 
    onClick={onClick}
    className="bg-black text-white hover:bg-[#FF6B00] border-2 border-black 
               px-6 py-3 font-space font-black uppercase tracking-tighter 
               shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none 
               hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
  >
    {label}
    {Icon && <Icon className="w-4 h-4" />}
  </button>
);
```

### 9.3 THE AUTOMATED SEO STRATEGY
Each page must be a "Lead Magnet".
- **Dynamic Meta:** Generate titles like `[ProductName] Premium Metal Poster | 1.5mm Aluminum UV Print`.
- **JSON-LD:** Inject Schema.org "Product" data including `brand`, `name`, `image`, `description`, and `offers` (price/currency).
- **Slug Management:** Slugs must be clean: `category-name-uniqueid`.

---

## 10. THE ULTIMATE PROMPT SEGMENTS FOR MODULE COMPLETION
Copy and use these specific prompts when focusing on different areas:

### PROMPT A: FOR THE GLOBAL THEME & ACCESSIBILITY
> "Refactor the `globals.css` to implement the 'Metal Poster Pro' Design System. Define CSS variables for --paper-white (#FFFFFF), --near-black (#1A1A1A), and --safety-orange (#FF6B00). Create a `.container-brutal` utility class that caps width at 1280px and adds responsive padding. Ensure all focus states use the high-contrast orange for accessibility."

### PROMPT B: FOR THE PRODUCT DETAIL REFACTOR
> "The `ProductDetailClient.tsx` is bloated. Break it into a modular architecture:
> 1. `ScenePreview`: Handles the wall mockup, background scenes, and poster positioning.
> 2. `ConfigurationPanel`: Handles size triggers, orientation toggles, and price updates.
> 3. `SpecsSection`: A technical, table-based display for material and print quality.
> Use `Zustand` for state communication between these modules."

### PROMPT C: FOR THE SUPABASE SYNC
> "Write a service in `src/lib/supabase/products.service.ts` that fetches products by category. Implement a `incrementViewCount` RPC function to track product popularity in real-time. Ensure the data return matches the `Product` interface exactly to avoid UI crashes."

---

## 11. FINAL QUALITY ASSURANCE PROTOCOLS (THE "JILET" STANDARD)
In Turkish terms, we call this the "Jilet Gibi" (Razor Sharp) standard.

1. **Pixel Perfect Alignment:** No 1px gaps where there should be none. Borders must meet exactly.
2. **Micro-Interactions:** Buttons must "press" (translate-x/y) on click.
3. **Loading States:** Use "Skeleton" loaders that mimic the brutalist grid shape.
4. **Mobile Experience:** The sticky "Buy Now" bar must be the only focus for the user on mobile.
5. **Color Accuracy:** Verify hex codes against the "Safety Orange" standard to ensure brand consistency.

---
**PROJECT DIRECTIVE: COMPLETE. COMMENCE IMPLEMENTATION.**
