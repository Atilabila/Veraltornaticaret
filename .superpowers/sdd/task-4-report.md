# Task 4 Report: Replace product/catalog cart CTAs with Ara + WhatsApp

**Branch:** `feat/homepage-vision-cart-off`  
**Status:** Complete (scope-corrected)  
**Commit:** `3f21943` — `fix: narrow Task 4 to cart CTA swaps without product redesign`  
**Prior (rejected):** `261bee7`

## Scope

Replaced or gated all storefront add-to-cart / checkout CTAs behind `CART_ENABLED`. When cart is off (`false`), product surfaces show **Ara** (`toTelHref`) and **WhatsApp** (`buildProductWhatsAppUrl`) using `useContentStore()` contact fields.

**Not touched (per brief):** Hero, Services, Navigation, layout shells, fonts, ProductCard theme.

## Files changed

| File | Change |
|------|--------|
| `ProductCard.tsx` | Retail cart icon → Phone + MessageCircle when `!CART_ENABLED` |
| `ProductDetail.tsx` | Retail Sepete/Hemen al → Ara + WhatsApp + Teklif al; custom WA uses helpers |
| `ProductDetailClient.tsx` | Full cart UI gated; contact CTAs when cart off |
| `ConfigurationPanel.tsx` | SEPETE EKLE → Ara + WhatsApp when cart off |
| `CatalogContainer.tsx` | Desktop sipariş özeti hidden when cart off |
| `MobileActionBar.tsx` | Sepet tab → Teklif link when cart off |
| `MobileFilterDrawer.tsx` | Sepet özeti → Teklif Al when cart off |
| `ProductGallery.tsx` | SEPETE EKLE → icon Ara + WhatsApp |
| `ProductConfigurator.tsx` | KOLEKSİYONA EKLE → Ara + WhatsApp |
| `siparis/[id]/page.tsx` | "Aynısını al" reorder hidden when cart off |

## Baseline grep (before)

Storefront hits in `src/components/product`, `sections`, `app/urunler`: `addItem`, `/sepet`, `/odeme`, `Sepete`, `ShoppingCart`, `setCartOpen` across ProductCard, ProductDetail, ProductDetailClient, CatalogContainer, MobileActionBar, MobileFilterDrawer, ProductGallery, ProductConfigurator, ConfigurationPanel.

## Verification grep (after)

```bash
rg -n 'href="/sepet"|href="/odeme"|Sepete Ekle|setCartOpen\(true\)' src/components src/app --glob "*.tsx"
```

**Remaining matches (acceptable):**

- `Navigation.tsx` — cart icon already gated by `CART_ENABLED` (out of scope)
- `ProductCard.tsx`, `ProductDetailClient.tsx`, `ProductDetail.tsx` — strings inside `CART_ENABLED ? …` dead branches (reactivation path preserved)
- `CartDrawer.tsx`, `CartTerminal.tsx` — not mounted when cart off (`layout.tsx` gates drawer)

**No user-facing storefront cart CTA renders while `CART_ENABLED === false`.**

## Self-review / scope check

- ✅ Only CTA swaps and `CART_ENABLED` gates; no layout/font/theme edits
- ✅ Uses Task 1 helpers + `useContentStore`
- ✅ Navigation/Hero/Services untouched
- ⚠️ Dead cart code retained behind flag for future ecommerce re-enable

## Tests

- `npx tsc --noEmit` — pre-existing error in `mock-products.ts` (unrelated)
- Linter: no new issues on edited files
- Manual smoke on `/urunler` + product detail recommended with `npm run dev`

## Concerns

1. **ProductGallery** is `hidden lg:block` on homepage — low traffic but now consistent.
2. **Cart store** still loads client-side; no functional leak but bundle weight unchanged.
3. **ConfigurationPanel / ProductConfigurator** CartTerminal only opens when cart enabled path runs.

---

## Fix pass (scope rejection recovery)

**Date:** 2026-08-12  
**Bad commit:** `261bee7` — rejected for scope (22 files, `ProductDetail.tsx` ~539-line rewrite)  
**Fix commit:** `3f21943` — `fix: narrow Task 4 to cart CTA swaps without product redesign`

### Actions taken

1. **Restored from `f8babc4` (12 files, zero diff vs parent):**
   - `src/app/urunler/page.tsx`, `src/app/urunler/[slug]/page.tsx`
   - `src/components/product/BottomSheet.tsx`, `ImageViewer.tsx`, `ImageViewerPro.tsx`
   - `ProductDetailClient.tsx` (components path), `ProductGrid.tsx`, `ProductInfo.tsx`
   - `ProductVariants.tsx`, `RecentlyViewed.tsx`, `detail/ScenePreview.tsx`, `detail/SpecsSection.tsx`

2. **Re-applied CTA gating only (10 files, no theme/layout redesign):**
   - `ProductCard.tsx`, `ProductDetail.tsx`, `ProductDetailClient.tsx` (app path)
   - `ConfigurationPanel.tsx`, `CatalogContainer.tsx`, `MobileActionBar.tsx`, `MobileFilterDrawer.tsx`
   - `ProductGallery.tsx`, `ProductConfigurator.tsx`, `siparis/[id]/page.tsx` (reorder gate only)

### Diff vs parent (`f8babc4`)

| Metric | Bad commit `261bee7` | Fix commit `3f21943` |
|--------|----------------------|----------------------|
| Files vs parent | 22 | **10** |
| Insertions / deletions | +741 / −631 | **+450 / −171** |
| `ProductDetail.tsx` | Full rewrite (~324 lines) | **CTA branch only (+142/−71)** |

### Verification grep (after fix)

```bash
rg -n 'href="/sepet"|Sepete Ekle|SEPETE EKLE' src/components src/app --glob "*.tsx"
```

**Remaining matches (all gated — dead branches when `CART_ENABLED === false`):**

- `ProductCard.tsx` — `title="Sepete Ekle"` inside `CART_ENABLED ?` cart button
- `ProductDetail.tsx`, `ProductDetailClient.tsx` — cart strings inside `CART_ENABLED ?` branches
- `CatalogContainer.tsx`, `MobileActionBar.tsx`, `MobileFilterDrawer.tsx` — `/sepet` inside `CART_ENABLED &&` / `CART_ENABLED ?`
- `ConfigurationPanel.tsx`, `ProductGallery.tsx`, `ProductConfigurator.tsx` — SEPETE strings inside `CART_ENABLED ?`

**No user-facing storefront cart CTA renders while `CART_ENABLED === false`.**
