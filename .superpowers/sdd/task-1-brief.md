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

- [ ] **Step 2: Run script â€” expect FAIL (module missing)**

Run: `npx tsx scripts/verify-contact.ts`  
Expected: FAIL â€” cannot find module `../src/lib/contact`

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
    ? `${base}\nÃœrÃ¼n: ${opts.productName}`
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

- [ ] **Step 4: Re-run verify script â€” expect PASS**

Run: `npx tsx scripts/verify-contact.ts`  
Expected: `verify-contact: OK`

- [ ] **Step 5: Commit**

```bash
git add src/lib/commerce.ts src/lib/contact.ts scripts/verify-contact.ts
git commit -m "feat: add cart-off flag and shared contact helpers"
```

---
