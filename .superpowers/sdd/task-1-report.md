# Task 1 Report: Commerce flag + contact helpers

**Branch:** `feat/homepage-vision-cart-off`  
**Commit:** `98092e6` — feat: add cart-off flag and shared contact helpers  
**Status:** DONE

---

## Summary

Created `CART_ENABLED` literal flag and shared contact helpers (`toTelHref`, `normalizePhoneDigits`, `buildProductWhatsAppUrl`, plus footer/WA resolvers) that downstream homepage-vision-cart-off tasks will import. Reused existing `buildWhatsAppUrl` and `normalizeWhatsappNumber` from `src/lib/whatsapp.ts`.

---

## TDD Evidence

### Step 1–2: RED — verify script before implementation

Created `scripts/verify-contact.ts` per brief, then ran:

```bash
npx tsx scripts/verify-contact.ts
```

**Output (exit code 1):**

```
Error: Cannot find module '../src/lib/contact'
Require stack:
- C:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro\scripts\verify-contact.ts
  code: 'MODULE_NOT_FOUND',
```

Expected failure: module missing. RED confirmed.

### Step 3–4: GREEN — implement and re-run

Created:

| File | Exports |
|------|---------|
| `src/lib/commerce.ts` | `CART_ENABLED = false as const` |
| `src/lib/contact.ts` | `DEFAULT_FOOTER_PHONE`, `DEFAULT_WHATSAPP_NUMBER`, `DEFAULT_WHATSAPP_MESSAGE`, `normalizePhoneDigits`, `toTelHref`, `buildProductWhatsAppUrl`, `resolveFooterPhone`, `resolveWhatsappNumber` |

Re-ran:

```bash
npx tsx scripts/verify-contact.ts
```

**Output (exit code 0):**

```
verify-contact: OK
```

GREEN confirmed. `@/` import in `contact.ts` resolved under tsx without switching to relative `./whatsapp`.

---

## Files Changed (committed)

| File | Action |
|------|--------|
| `src/lib/commerce.ts` | Created |
| `src/lib/contact.ts` | Created |
| `scripts/verify-contact.ts` | Created |

Only these three files were staged and committed; no unrelated workspace changes included.

---

## Self-Review

### Correctness

- `normalizePhoneDigits("+90 507 165 13 15")` → `"905071651315"` — strips non-digits.
- `toTelHref` adds `tel:+` prefix and ensures country code `90` when absent.
- `buildProductWhatsAppUrl` delegates to `buildWhatsAppUrl`; product name appended as `\nÜrün: {name}`.
- Defaults match brief verbatim: phone `+90 507 165 13 15`, WA `905071651315`, message about toptan dosya teli.

### Reuse

- `buildWhatsAppUrl` and `normalizeWhatsappNumber` imported from `@/lib/whatsapp` — no duplication of WA URL logic.

### Edge cases (brief-specified)

- Empty phone in `toTelHref` falls back to `tel:+905071651315`.
- `resolveFooterPhone` / `resolveWhatsappNumber` trim/null-coalesce to defaults.

### Concerns

None blocking. `CART_ENABLED` is not exercised by verify script (by design — flag is for later tasks). `resolveFooterPhone` / `resolveWhatsappNumber` are not covered by verify script but are trivial and specified in brief for later consumers.

---

## Interfaces Produced (for downstream tasks)

```ts
// src/lib/commerce.ts
export const CART_ENABLED: false;

// src/lib/contact.ts
export const DEFAULT_FOOTER_PHONE: "+90 507 165 13 15";
export const DEFAULT_WHATSAPP_NUMBER: "905071651315";
export function normalizePhoneDigits(raw: string): string;
export function toTelHref(phone: string): string;
export function buildProductWhatsAppUrl(opts: {
  whatsappNumber: string;
  productName?: string;
  baseMessage?: string;
}): string;
export function resolveFooterPhone(footerPhone?: string | null): string;
export function resolveWhatsappNumber(whatsappNumber?: string | null): string;
```

---

## Next Steps (Task 2+)

Import `CART_ENABLED` from `@/lib/commerce` and contact helpers from `@/lib/contact` in layout, footer, product CTAs, and cart-gated routes.
