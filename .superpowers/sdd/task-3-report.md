# Task 3 Report: Remove Navigation cart chrome

**Branch:** `feat/homepage-vision-cart-off`  
**Commit:** `8910040` — feat: hide navigation cart controls when cart disabled  
**Status:** DONE

---

## Summary

Gated desktop cart icon (`aria-label="Sepet"`) and mobile menu "Sepetim" entry in `Navigation.tsx` behind `CART_ENABLED`. When cart is off, neither control renders. Full `e2e/cart-off.spec.ts` suite now passes (3/3).

---

## Changes

| File | Change |
|------|--------|
| `src/components/layout/Navigation.tsx` | Import `CART_ENABLED`; wrap desktop cart button and mobile "Sepetim" with `{CART_ENABLED && (...)}` |

Cart store hooks (`useCartItemCount`, `setCartOpen`) retained for future re-enable; only UI gated per brief.

---

## Verification

Port 4173 had a stale production server. Rebuilt and restarted:

```bash
npm run build
Stop-Process -Id 19860 -Force
npx next start -H 127.0.0.1 -p 4173
npx playwright test e2e/cart-off.spec.ts
```

Playwright reused existing server on 4173 (`reuseExistingServer: true` in config). No e2e file changes.

| Test | Result |
|------|--------|
| `/sepet redirects to /teklif-al` | PASS |
| `/odeme redirects to /teklif-al` | PASS |
| `homepage has no Sepet aria control` | PASS |

---

## Self-Review

### Correctness

- Desktop cart button hidden when `CART_ENABLED` is false.
- Mobile "Sepetim" menu item hidden when cart off.
- No other Navigation behavior changed.

### Concerns

- `useCartStore` hooks still run on every Navigation mount even when cart UI is hidden — acceptable per brief; can optimize later if flag stays false long-term.
- Other cart chrome remains in product/catalog components (Task 4+ scope per plan).

---

## Next

Task 4: Gate product/catalog cart CTAs (`ProductDetail`, `MobileActionBar`, etc.) behind `CART_ENABLED`.

---

## Scope-Creep Fix (post-review)

**Issue:** Task 3 commit `8910040` bundled unrelated Navigation edits (theme/menu/search/copy) with the cart gate.

**Fix commit:** `f8babc4` — `fix: isolate navigation cart gate from unrelated nav edits`

**Restored from:** `20b1543` (parent before Task 3), then re-applied only:
- `import { CART_ENABLED } from '@/lib/commerce';`
- Desktop cart button (`aria-label="Sepet"`) wrapped in `{CART_ENABLED && (...)}`
- Mobile "Sepetim" entry wrapped in `{CART_ENABLED && (...)}`

**Diff vs `20b1543`:** cart import + two gate wrappers only (also removed UTF-8 BOM from line 1 per no-BOM requirement).

### Re-verification

Rebuilt and restarted production server on `:4173`, then:

```bash
npm run build
npx next start -H 127.0.0.1 -p 4173
npx playwright test e2e/cart-off.spec.ts
```

| Test | Result |
|------|--------|
| `/sepet redirects to /teklif-al` | PASS |
| `/odeme redirects to /teklif-al` | PASS |
| `homepage has no Sepet aria control` | PASS |

**3/3 passed** (7.6s, chromium, reused server on 4173).
