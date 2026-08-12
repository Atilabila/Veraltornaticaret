# Homepage Atmosphere + Cart Off Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Disable cart/payment site-wide in favor of phone/WhatsApp orders (`+90 507 165 13 15`), then polish homepage Hero + `ServicesHomeSection` with understated local-craftsman atmosphere while keeping CMS-editable images/copy.

**Architecture:** Introduce a single `CART_ENABLED = false` commerce flag and shared contact URL helpers (`tel:` / WhatsApp) sourced from `useContentStore` defaults. Strip storefront cart UI and soft-redirect `/sepet` + `/odeme`. Then adjust Hero + services defaults/styles only — no redesign of Process/reviews/showcase.

**Tech Stack:** Next.js 16 App Router, React 19, Zustand (`useContentStore` / `useCartStore`), Tailwind, Framer Motion (existing), Playwright for smoke checks, `tsx` for pure helper asserts.

## Global Constraints

- Visual scope hard-stop: **Hero + `ServicesHomeSection` only** for atmosphere work
- Tone: local craftsman, **no hype / no drama** (no “lider”, “efsane”, etc.)
- Order phone: **`+90 507 165 13 15`** / WhatsApp **`905071651315`** via `content.footerPhone` + `content.whatsappNumber` — do not invent a second hardcoded source
- Cart mode: **full hide** — no nav cart, no drawer, no add-to-cart, soft redirect `/sepet` `/odeme` → `/teklif-al`
- Keep `/teklif-al`, floating WhatsApp, admin historical orders
- Hero image must remain Admin → Site Content → Hero → Ana Görsel (`content.heroImage`)
- Do not delete payment provider modules from repo; UI must not expose them
- Prefer existing patterns; no new design system

## File map

| File | Responsibility |
|------|----------------|
| `src/lib/commerce.ts` | `CART_ENABLED` flag |
| `src/lib/contact.ts` | `toTelHref`, `buildProductWhatsAppUrl`, display helpers from content fields |
| `scripts/verify-contact.ts` | Assert contact helper output |
| `e2e/cart-off.spec.ts` | Smoke: no sepet UI; `/sepet` `/odeme` redirect |
| `src/app/layout.tsx` | Conditionally omit `CartDrawer` |
| `src/components/layout/Navigation.tsx` | Remove cart icon / Sepetim when cart off |
| `src/app/sepet/page.tsx` | Redirect to `/teklif-al` |
| `src/app/odeme/page.tsx` | Redirect to `/teklif-al` |
| `src/components/product/ProductCard.tsx` | Replace cart button with Ara / WhatsApp |
| `src/components/product/ProductDetail.tsx` | Replace add-to-cart with Ara / WhatsApp |
| `src/app/urunler/[slug]/ProductDetailClient.tsx` | Same CTA swap |
| `src/components/product/detail/ConfigurationPanel.tsx` | Same CTA swap |
| `src/components/product/MobileActionBar.tsx` | Remove `/sepet` link |
| `src/components/product/MobileFilterDrawer.tsx` | Remove `/sepet` link |
| `src/components/product/CatalogContainer.tsx` | Remove cart chrome / `/sepet` |
| `src/components/sections/ProductGallery.tsx` | Guard add-to-cart |
| `src/components/sections/ProductConfigurator.tsx` | Guard add-to-cart |
| `src/components/sections/Hero.tsx` | Atmosphere polish + calmer media |
| `src/components/sections/ServicesHomeSection.tsx` | Spacing/rhythm + quieter cards |
| `src/store/useContentStore.ts` | Understated default copy for hero + services header |

---

### Task 1: Commerce flag + contact helpers

**Files:**
- Create: `src/lib/commerce.ts`
- Create: `src/lib/contact.ts`
- Create: `scripts/verify-contact.ts`
- Test: `scripts/verify-contact.ts`

**Interfaces:**
- Consumes: none
- Produces:
  - `CART_ENABLED: boolean` (literal `false`)
  - `toTelHref(phone: string): string`
  - `normalizePhoneDigits(phone: string): string`
  - `buildProductWhatsAppUrl(opts: { whatsappNumber: string; productName?: string; baseMessage?: string }): string`
  - Defaults: phone display `+90 507 165 13 15`, wa `905071651315`

- [ ] **Step 1: Write the failing verify script**

Create `scripts/verify-contact.ts`:

```ts
import assert from "node:assert/strict";
import { toTelHref, buildProductWhatsAppUrl, normalizePhoneDigits } from "../src/lib/contact";

assert.equal(normalizePhoneDigits("+90 507 165 13 15"), "905071651315");
assert.equal(toTelHref("+90 507 165 13 15"), "tel:+905071651315");
assert.equal(toTelHref("905071651315"), "tel:+905071651315");

const url = buildProductWhatsAppUrl({
  whatsappNumber: "905071651315",
  productName: "Dosya Teli 2mm",
  baseMessage: "Merhaba, toptan dosya teli / imalat teklifi almak istiyorum.",
});
assert.match(url, /^https:\/\/wa\.me\/905071651315\?text=/);
assert.match(decodeURIComponent(url), /Dosya Teli 2mm/);

console.log("verify-contact: OK");
```

- [ ] **Step 2: Run script — expect FAIL (module missing)**

Run: `npx tsx scripts/verify-contact.ts`  
Expected: FAIL — cannot find module `../src/lib/contact`

- [ ] **Step 3: Implement helpers + flag**

Create `src/lib/commerce.ts`:

```ts
/** Storefront cart/checkout. Keep false until ecommerce returns. */
export const CART_ENABLED = false as const;
```

Create `src/lib/contact.ts`:

```ts
import { buildWhatsAppUrl, normalizeWhatsappNumber } from "@/lib/whatsapp";

export const DEFAULT_FOOTER_PHONE = "+90 507 165 13 15";
export const DEFAULT_WHATSAPP_NUMBER = "905071651315";
export const DEFAULT_WHATSAPP_MESSAGE =
  "Merhaba, toptan dosya teli / imalat teklifi almak istiyorum.";

export function normalizePhoneDigits(raw: string): string {
  return String(raw || "").replace(/\D/g, "");
}

export function toTelHref(phone: string): string {
  const digits = normalizePhoneDigits(phone);
  if (!digits) return "tel:+905071651315";
  const withCountry = digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
  return `tel:+${withCountry}`;
}

export function buildProductWhatsAppUrl(opts: {
  whatsappNumber: string;
  productName?: string;
  baseMessage?: string;
}): string {
  const base = opts.baseMessage || DEFAULT_WHATSAPP_MESSAGE;
  const message = opts.productName
    ? `${base}\nÜrün: ${opts.productName}`
    : base;
  return buildWhatsAppUrl({
    phoneNumber: opts.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
    message,
  });
}

export function resolveFooterPhone(footerPhone?: string | null): string {
  return footerPhone?.trim() || DEFAULT_FOOTER_PHONE;
}

export function resolveWhatsappNumber(whatsappNumber?: string | null): string {
  return normalizeWhatsappNumber(whatsappNumber || DEFAULT_WHATSAPP_NUMBER) || DEFAULT_WHATSAPP_NUMBER;
}
```

- [ ] **Step 4: Re-run verify script — expect PASS**

Run: `npx tsx scripts/verify-contact.ts`  
Expected: `verify-contact: OK`

- [ ] **Step 5: Commit**

```bash
git add src/lib/commerce.ts src/lib/contact.ts scripts/verify-contact.ts
git commit -m "feat: add cart-off flag and shared contact helpers"
```

---

### Task 2: Soft-redirect cart/checkout routes + drop global CartDrawer

**Files:**
- Modify: `src/app/sepet/page.tsx`
- Modify: `src/app/odeme/page.tsx`
- Modify: `src/app/layout.tsx`
- Test: `e2e/cart-off.spec.ts` (partial — redirects)

**Interfaces:**
- Consumes: `CART_ENABLED` from `src/lib/commerce.ts`
- Produces: `/sepet` and `/odeme` always land on `/teklif-al` while cart off; no `CartDrawer` mount

- [ ] **Step 1: Write Playwright redirect smoke (will fail until pages redirect)**

Create `e2e/cart-off.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test.describe("cart off", () => {
  test("/sepet redirects to /teklif-al", async ({ page }) => {
    await page.goto("/sepet");
    await expect(page).toHaveURL(/\/teklif-al/);
  });

  test("/odeme redirects to /teklif-al", async ({ page }) => {
    await page.goto("/odeme");
    await expect(page).toHaveURL(/\/teklif-al/);
  });

  test("homepage has no Sepet aria control", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Sepet" })).toHaveCount(0);
  });
});
```

- [ ] **Step 2: Run e2e — expect FAIL on redirects and/or Sepet still present**

Run: `npx playwright test e2e/cart-off.spec.ts`  
Expected: FAIL (pages still render cart/checkout or Sepet button exists)

- [ ] **Step 3: Replace `src/app/sepet/page.tsx` with redirect**

```tsx
import { redirect } from "next/navigation";
import { CART_ENABLED } from "@/lib/commerce";

export default function SepetPage() {
  if (!CART_ENABLED) redirect("/teklif-al");
  redirect("/teklif-al");
}
```

(Keep a single redirect path while cart is off; do not reintroduce drawer open behavior.)

- [ ] **Step 4: Replace `src/app/odeme/page.tsx` entry with the same pattern**

At the top of the default export (or replace file body):

```tsx
import { redirect } from "next/navigation";
import { CART_ENABLED } from "@/lib/commerce";

export default function OdemePage() {
  if (!CART_ENABLED) redirect("/teklif-al");
  redirect("/teklif-al");
}
```

If the file is large, replace the whole client checkout with this server redirect component — dead checkout UI must not mount.

- [ ] **Step 5: Gate CartDrawer in `src/app/layout.tsx`**

Remove or guard the dynamic import usage:

```tsx
import { CART_ENABLED } from "@/lib/commerce";
// keep dynamic import only if CART_ENABLED — otherwise omit
```

Inside the tree where `<CartDrawer />` is rendered:

```tsx
{CART_ENABLED ? <CartDrawer /> : null}
```

If `CART_ENABLED` is a const false, tree-shaking may still bundle; that is acceptable. Prefer not mounting.

- [ ] **Step 6: Commit**

```bash
git add src/app/sepet/page.tsx src/app/odeme/page.tsx src/app/layout.tsx e2e/cart-off.spec.ts
git commit -m "feat: redirect cart/checkout routes and unmount CartDrawer"
```

---

### Task 3: Remove Navigation cart chrome

**Files:**
- Modify: `src/components/layout/Navigation.tsx`
- Test: `e2e/cart-off.spec.ts` (homepage Sepet assertion)

**Interfaces:**
- Consumes: `CART_ENABLED`
- Produces: no cart button / no “Sepetim” menu item when cart off

- [ ] **Step 1: Gate desktop cart button**

In `Navigation.tsx`, import `CART_ENABLED`. Wrap the cart `button` (`aria-label="Sepet"`, `setCartOpen(true)`) so it renders only when `CART_ENABLED` is true. Remove unused cart imports when false path is permanent (or leave gated).

- [ ] **Step 2: Gate mobile “Sepetim” entry**

Same file: the menu item that calls `setCartOpen(true)` / label `Sepetim` must not render when `!CART_ENABLED`.

- [ ] **Step 3: Run e2e homepage assertion**

Run: `npx playwright test e2e/cart-off.spec.ts`  
Expected: Sepet button count 0; redirects PASS (from Task 2)

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navigation.tsx
git commit -m "feat: hide navigation cart controls when cart disabled"
```

---

### Task 4: Replace product/catalog cart CTAs with Ara + WhatsApp

**Files:**
- Modify: `src/components/product/ProductCard.tsx`
- Modify: `src/components/product/ProductDetail.tsx`
- Modify: `src/app/urunler/[slug]/ProductDetailClient.tsx`
- Modify: `src/components/product/detail/ConfigurationPanel.tsx`
- Modify: `src/components/product/MobileActionBar.tsx`
- Modify: `src/components/product/MobileFilterDrawer.tsx`
- Modify: `src/components/product/CatalogContainer.tsx`
- Modify: `src/components/sections/ProductGallery.tsx`
- Modify: `src/components/sections/ProductConfigurator.tsx`
- Optional: `src/app/siparis/[id]/page.tsx` (remove “reorder to sepet” if user-facing)

**Interfaces:**
- Consumes: `CART_ENABLED`, `toTelHref`, `buildProductWhatsAppUrl`, `resolveFooterPhone`, `resolveWhatsappNumber`, `useContentStore`
- Produces: no user-facing `addItem` / `/sepet` / `/odeme` CTAs on storefront product surfaces

- [ ] **Step 1: Grep baseline (document remaining cart CTAs)**

Run:

```bash
rg -n "addItem|addToCart|/sepet|/odeme|Sepete|ShoppingCart|setCartOpen" src/components/product src/components/sections src/app/urunler src/components/layout --glob "*.tsx"
```

Keep the list; every storefront hit must be gated or replaced in this task.

- [ ] **Step 2: ProductCard — replace retail cart button**

When `!CART_ENABLED` (or always while flag is false), replace the retail `ShoppingCart` button with a compact action group:

```tsx
import { Phone, MessageCircle } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";
import {
  toTelHref,
  buildProductWhatsAppUrl,
  resolveFooterPhone,
  resolveWhatsappNumber,
} from "@/lib/contact";
import { CART_ENABLED } from "@/lib/commerce";

// inside component:
const { content } = useContentStore();
const tel = toTelHref(resolveFooterPhone(content.footerPhone));
const wa = buildProductWhatsAppUrl({
  whatsappNumber: resolveWhatsappNumber(content.whatsappNumber),
  productName: product.name,
  baseMessage: content.whatsappMessage,
});

// retail branch when !CART_ENABLED:
<a href={tel} onClick={(e) => e.stopPropagation()} aria-label="Ara" className="...">
  <Phone className="w-5 h-5" />
</a>
<a href={wa} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} aria-label="WhatsApp" className="...">
  <MessageCircle className="w-5 h-5" />
</a>
```

Keep custom “teklif” link behavior for non-retail as-is (or also point to WhatsApp — prefer keep detail link).

- [ ] **Step 3: ProductDetail + ProductDetailClient + ConfigurationPanel**

Remove `handleAddToCart` UI paths when `!CART_ENABLED`. Primary buttons:

- `Ara` → `toTelHref(resolveFooterPhone(...))`
- `WhatsApp` → `buildProductWhatsAppUrl({ productName: product.name, ... })`
- Optional tertiary: Link `/teklif-al`

Do not call `router.push("/sepet")` or `router.push("/odeme")`.

- [ ] **Step 4: Catalog / mobile chrome**

In `CatalogContainer.tsx`, `MobileActionBar.tsx`, `MobileFilterDrawer.tsx`: remove links to `/sepet` and cart count chrome when `!CART_ENABLED`. Prefer Teklif Al or nothing.

- [ ] **Step 5: ProductGallery + ProductConfigurator**

Wrap `addItem` handlers:

```ts
if (!CART_ENABLED) return;
```

Or replace buttons with WhatsApp/tel. Prefer replace if the button is user-visible.

- [ ] **Step 6: Verification grep — zero storefront cart CTAs**

Run:

```bash
rg -n "href=\"/sepet\"|href=\"/odeme\"|Sepete Ekle|setCartOpen\(true\)" src/components src/app --glob "*.tsx"
```

Expected: no matches in storefront UI files (admin may still mention orders). Acceptable leftovers: admin dashboard icons, dead store code not mounted.

- [ ] **Step 7: Manual smoke on `/urunler` and one product**

With `npm run dev`: open product page — see Ara + WhatsApp, no Sepete Ekle.

- [ ] **Step 8: Commit**

```bash
git add src/components/product src/components/sections/ProductGallery.tsx src/components/sections/ProductConfigurator.tsx src/app/urunler
git commit -m "feat: replace storefront cart CTAs with phone and WhatsApp"
```

---

### Task 5: Hero atmosphere + understated defaults

**Files:**
- Modify: `src/store/useContentStore.ts` (defaultContent hero + trust badges)
- Modify: `src/components/sections/Hero.tsx`
- Test: manual + content still binds `content.heroImage`

**Interfaces:**
- Consumes: existing CMS fields; image still `content.heroImage`
- Produces: calmer media frame; updated default copy strings

- [ ] **Step 1: Update default copy in `useContentStore.ts`**

Set defaults (exact):

```ts
heroSubtitle: "İzmir — toptan dosya teli ve metal imalat",
heroProductLine: "Ölçü netleşir, termin konuşulur, sevkiyat planlanır.",
// keep heroTitle unless it reads as hype; prefer:
heroTitle: "ÖZEL & SERİ\nDOSYA TELİ",
metalShowcaseTrustBadges: [
  { icon: "Factory", text: "Seri İmalat" },
  { icon: "Clock", text: "24s Teklif" },
  { icon: "PackageCheck", text: "Toptan MOQ" },
],
```

Remove the 4th badge from defaults (max 3). Do not change `heroImage` admin wiring.

Also update `resetToManufacturingDefaults` / merge fallbacks if they hardcode old subtitle strings.

- [ ] **Step 2: Calm Hero media treatment in `Hero.tsx`**

Keep left/right structure and `content.heroImage`. Adjust classes:

- Drop decorative inner white border motion overlay (or reduce opacity to unused)
- Soften hover scale (`group-hover:scale-[1.01]` → remove scale or keep 1.0)
- Keep simple `border border-[#c6c6c6]` frame — no card shadow stack
- Ensure `Image` still uses `normalizeImagePath(content.heroImage || …)`

Eyebrow already uses `heroSubtitle`; tagline uses `heroProductLine` — confirm they render the new defaults.

- [ ] **Step 3: Visual check**

Open `http://127.0.0.1:3000/` — first viewport: understated copy, no cart icon, CMS image path intact. Confirm Admin → Hero → Ana Görsel still updates `heroImage`.

- [ ] **Step 4: Commit**

```bash
git add src/store/useContentStore.ts src/components/sections/Hero.tsx
git commit -m "feat: calm hero atmosphere and understated default copy"
```

---

### Task 6: ServicesHomeSection polish

**Files:**
- Modify: `src/store/useContentStore.ts` (`servicesPageHeader` defaults)
- Modify: `src/components/sections/ServicesHomeSection.tsx`

**Interfaces:**
- Consumes: `content.services`, `content.servicesPageHeader`
- Produces: quieter section aligned with Hero borders/spacing

- [ ] **Step 1: Update `servicesPageHeader` defaults**

```ts
servicesPageHeader: {
  title: "Üretim Hizmetlerimiz",
  subtitle: "Dosya teli, takvim tenekesi, tef zili ve metal poster — ölçüye göre.",
  badge: "Üretim hizmetleri",
  // keep other CTA fields factual; trim drama if present
  ...
}
```

- [ ] **Step 2: Align section chrome with Hero**

In `ServicesHomeSection.tsx`:

- Reduce heavy `shadow-sm hover:shadow-md` to border-only hover (match Hero’s flat border language)
- Keep `border border-[#c6c6c6]` + accent left border on hover
- No new card system, no dark skin, no stats strip
- Keep “Detaylı incele” + shortDescription

- [ ] **Step 3: Visual check first scroll**

Homepage: Hero then services — same quiet industrial language; Process section untouched.

- [ ] **Step 4: Commit**

```bash
git add src/store/useContentStore.ts src/components/sections/ServicesHomeSection.tsx
git commit -m "feat: quiet services section defaults and border rhythm"
```

---

### Task 7: Final verification checklist

**Files:** none new (verification only)

- [ ] **Step 1: Run contact verify**

`npx tsx scripts/verify-contact.ts` → OK

- [ ] **Step 2: Run cart-off e2e**

`npx playwright test e2e/cart-off.spec.ts` → PASS

- [ ] **Step 3: Grep leakage**

```bash
rg -n "href=\"/sepet\"|href=\"/odeme\"|Sepete Ekle|aria-label=\"Sepet\"" src --glob "*.tsx"
```

Expected: no storefront matches (admin OK)

- [ ] **Step 4: Manual paths**

- `/` — no cart; hero + services look intentional; copy understated  
- `/urunler` + product — Ara / WhatsApp work with 507 165 13 15  
- `/sepet`, `/odeme` → `/teklif-al`  
- `/teklif-al` still works  
- Admin Hero image upload still bound  

- [ ] **Step 5: Final commit only if leftover fixes**

```bash
git commit -m "fix: close remaining cart UI leaks"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Cart full hide | 2, 3, 4, 7 |
| Soft redirect `/sepet` `/odeme` | 2 |
| Ara + WhatsApp order path / phone | 1, 4 |
| Single source footerPhone / whatsappNumber | 1, 4 |
| Keep teklif-al + floating WA | 2–4 (untouched intentionally) |
| Hero atmosphere A + CMS image | 5 |
| Understated copy | 5, 6 |
| ServicesHomeSection only (+ Hero) | 5, 6 |
| Process/reviews/showcase untouched | 5–6 (no edits) |
| No payment UI | 2, 4 |

## Placeholder scan

No TBD / “implement later” left. Helper signatures defined in Task 1 and reused by later tasks.
