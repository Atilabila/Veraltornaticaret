### Task 2: Soft-redirect cart/checkout routes + drop global CartDrawer

**Files:**
- Modify: `src/app/sepet/page.tsx`
- Modify: `src/app/odeme/page.tsx`
- Modify: `src/app/layout.tsx`
- Test: `e2e/cart-off.spec.ts` (partial â€” redirects)

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

- [ ] **Step 2: Run e2e â€” expect FAIL on redirects and/or Sepet still present**

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

If the file is large, replace the whole client checkout with this server redirect component â€” dead checkout UI must not mount.

- [ ] **Step 5: Gate CartDrawer in `src/app/layout.tsx`**

Remove or guard the dynamic import usage:

```tsx
import { CART_ENABLED } from "@/lib/commerce";
// keep dynamic import only if CART_ENABLED â€” otherwise omit
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
