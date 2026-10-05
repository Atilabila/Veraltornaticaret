### Task 3: Remove Navigation cart chrome

**Files:**
- Modify: `src/components/layout/Navigation.tsx`
- Test: `e2e/cart-off.spec.ts` (homepage Sepet assertion)

**Interfaces:**
- Consumes: `CART_ENABLED`
- Produces: no cart button / no â€œSepetimâ€ menu item when cart off

- [ ] **Step 1: Gate desktop cart button**

In `Navigation.tsx`, import `CART_ENABLED`. Wrap the cart `button` (`aria-label="Sepet"`, `setCartOpen(true)`) so it renders only when `CART_ENABLED` is true. Remove unused cart imports when false path is permanent (or leave gated).

- [ ] **Step 2: Gate mobile â€œSepetimâ€ entry**

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
