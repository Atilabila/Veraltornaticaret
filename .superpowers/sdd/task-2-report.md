# Task 2 Report: Soft-redirect cart/checkout routes + drop global CartDrawer

**Branch:** `feat/homepage-vision-cart-off`  
**Commit:** `2210bf1` — feat: redirect cart/checkout routes and unmount CartDrawer  
**Status:** DONE_WITH_CONCERNS

---

## Summary

Replaced `/sepet` and `/odeme` with server-side redirect components that send users to `/teklif-al` while `CART_ENABLED` is false. Gated `<CartDrawer />` in root layout so it no longer mounts globally. Added Playwright smoke tests in `e2e/cart-off.spec.ts`.

---

## TDD Evidence

### Step 1–2: RED — e2e before implementation

Created `e2e/cart-off.spec.ts` per brief.

Attempted pre-implementation run:

```bash
npx playwright test e2e/cart-off.spec.ts
```

**Blocked:** `.next/dev/lock` held by existing `next dev` on port 3000; Playwright webServer (port 4173) could not start. RED not captured via default config — environment blocker, not missing redirects.

### Step 3–5: Implement redirects + CartDrawer gate

| File | Change |
|------|--------|
| `src/app/sepet/page.tsx` | Server redirect to `/teklif-al` when cart off |
| `src/app/odeme/page.tsx` | Replaced 560-line client checkout with same redirect |
| `src/app/layout.tsx` | `{CART_ENABLED ? <CartDrawer /> : null}` |

### Step 6: GREEN — post-implementation e2e

Production build + `next start -p 4173` (dev server on 3000 was unresponsive):

```bash
npm run build
npx next start -H 127.0.0.1 -p 4173
$env:E2E_ADMIN_BYPASS=1; npx playwright test e2e/cart-off.spec.ts -c playwright.local.config.ts
```

**Results:**

| Test | Result |
|------|--------|
| `/sepet redirects to /teklif-al` | PASS |
| `/odeme redirects to /teklif-al` | PASS |
| `homepage has no Sepet aria control` | FAIL (1 Sepet button — Task 3 scope) |

Redirect tests GREEN. Sepet assertion expected to fail until Task 3 removes nav cart icon.

---

## Files Changed (committed)

| File | Action |
|------|--------|
| `src/app/sepet/page.tsx` | Replaced client drawer-opener with server redirect |
| `src/app/odeme/page.tsx` | Replaced full checkout UI with server redirect |
| `src/app/layout.tsx` | Import `CART_ENABLED`; gate `CartDrawer` |
| `e2e/cart-off.spec.ts` | Created |

Only these four files staged and committed.

---

## Self-Review

### Correctness

- Both routes use `redirect("/teklif-al")` via Next.js server component — no client checkout UI mounts.
- `CART_ENABLED` imported from `@/lib/commerce` (currently `false`).
- CartDrawer dynamic import retained; render guarded — component not mounted when flag is false.
- Contact helpers untouched.

### Scope discipline

- Navigation cart icon **not** removed (Task 3). Brief explicitly allows Sepet e2e failure here.

### Concerns

1. **Sepet button e2e fails** — expected; Navigation still renders cart control. Task 3 must gate/remove it.
2. **Default Playwright webServer blocked** when another `next dev` holds `.next/dev/lock`. CI with clean env should work; local runs may need `reuseExistingServer` + responsive dev, or production `next start`.
3. **CartDrawer still bundled** — dynamic import remains; tree-shaking limited with const false. Acceptable per brief.

---

## Interfaces Consumed

```ts
// src/lib/commerce.ts (Task 1)
export const CART_ENABLED: false;
```

---

## Next Steps (Task 3+)

Gate or remove Navigation cart icon using `CART_ENABLED`. Full `e2e/cart-off.spec.ts` suite should pass after Task 3.

---

## Review Fix (layout scope isolation)

**Commit:** `20b1543` — fix: isolate layout cart gate from unrelated theme edits  
**Status:** DONE

### Changes

Reverted out-of-scope `src/app/layout.tsx` edits to match pre-Task-2 commit `98092e6`:

| Restored from 98092e6 | Kept (Task 2 only) |
|-----------------------|-------------------|
| metadata title/description/keywords | `import { CART_ENABLED } from "@/lib/commerce"` |
| Space Grotesk / Syne / IBM Plex Mono font link with `media="print"` + `onLoad` | `{CART_ENABLED ? <CartDrawer /> : null}` |
| `body className="antialiased bg-zinc-950 text-zinc-300"` | — |

Removed UTF-8 BOM from `layout.tsx` (verified `NO_BOM`).

No changes to `sepet/page.tsx`, `odeme/page.tsx`, or `e2e/cart-off.spec.ts`.

### Verification

**File read:** CartDrawer gate confirmed at line 88 — `{CART_ENABLED ? <CartDrawer /> : null}`.

**Playwright (redirect tests only):**

```bash
npx playwright test e2e/cart-off.spec.ts --grep "redirects"
```

| Test | Result |
|------|--------|
| `/sepet redirects to /teklif-al` | PASS |
| `/odeme redirects to /teklif-al` | PASS |
