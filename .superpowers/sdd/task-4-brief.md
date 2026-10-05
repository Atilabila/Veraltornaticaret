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
- Optional: `src/app/siparis/[id]/page.tsx` (remove â€œreorder to sepetâ€ if user-facing)

**Interfaces:**
- Consumes: `CART_ENABLED`, `toTelHref`, `buildProductWhatsAppUrl`, `resolveFooterPhone`, `resolveWhatsappNumber`, `useContentStore`
- Produces: no user-facing `addItem` / `/sepet` / `/odeme` CTAs on storefront product surfaces

- [ ] **Step 1: Grep baseline (document remaining cart CTAs)**

Run:

```bash
rg -n "addItem|addToCart|/sepet|/odeme|Sepete|ShoppingCart|setCartOpen" src/components/product src/components/sections src/app/urunler src/components/layout --glob "*.tsx"
```

Keep the list; every storefront hit must be gated or replaced in this task.

- [ ] **Step 2: ProductCard â€” replace retail cart button**

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

Keep custom â€œteklifâ€ link behavior for non-retail as-is (or also point to WhatsApp â€” prefer keep detail link).

- [ ] **Step 3: ProductDetail + ProductDetailClient + ConfigurationPanel**

Remove `handleAddToCart` UI paths when `!CART_ENABLED`. Primary buttons:

- `Ara` â†’ `toTelHref(resolveFooterPhone(...))`
- `WhatsApp` â†’ `buildProductWhatsAppUrl({ productName: product.name, ... })`
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

- [ ] **Step 6: Verification grep â€” zero storefront cart CTAs**

Run:

```bash
rg -n "href=\"/sepet\"|href=\"/odeme\"|Sepete Ekle|setCartOpen\(true\)" src/components src/app --glob "*.tsx"
```

Expected: no matches in storefront UI files (admin may still mention orders). Acceptable leftovers: admin dashboard icons, dead store code not mounted.

- [ ] **Step 7: Manual smoke on `/urunler` and one product**

With `npm run dev`: open product page â€” see Ara + WhatsApp, no Sepete Ekle.

- [ ] **Step 8: Commit**

```bash
git add src/components/product src/components/sections/ProductGallery.tsx src/components/sections/ProductConfigurator.tsx src/app/urunler
git commit -m "feat: replace storefront cart CTAs with phone and WhatsApp"
```

---
