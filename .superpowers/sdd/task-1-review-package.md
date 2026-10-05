# Review Package Task 1
Base: 5e13c51c825cdeb9a19fd4ca3f03ab8255c73310
Head: 98092e6c8ad2fe54cac0c02e9c7cdede8afeac69

## Commits
98092e6 feat: add cart-off flag and shared contact helpers

## Stat
 scripts/verify-contact.ts | 16 ++++++++++++++++
 src/lib/commerce.ts       |  2 ++
 src/lib/contact.ts        | 40 ++++++++++++++++++++++++++++++++++++++++
 3 files changed, 58 insertions(+)

## Diff
```diff
diff --git a/scripts/verify-contact.ts b/scripts/verify-contact.ts
new file mode 100644
index 0000000..d467754
--- /dev/null
+++ b/scripts/verify-contact.ts
@@ -0,0 +1,16 @@
+import assert from "node:assert/strict";
+import { toTelHref, buildProductWhatsAppUrl, normalizePhoneDigits } from "../src/lib/contact";
+
+assert.equal(normalizePhoneDigits("+90 507 165 13 15"), "905071651315");
+assert.equal(toTelHref("+90 507 165 13 15"), "tel:+905071651315");
+assert.equal(toTelHref("905071651315"), "tel:+905071651315");
+
+const url = buildProductWhatsAppUrl({
+  whatsappNumber: "905071651315",
+  productName: "Dosya Teli 2mm",
+  baseMessage: "Merhaba, toptan dosya teli / imalat teklifi almak istiyorum.",
+});
+assert.match(url, /^https:\/\/wa\.me\/905071651315\?text=/);
+assert.match(decodeURIComponent(url), /Dosya Teli 2mm/);
+
+console.log("verify-contact: OK");
diff --git a/src/lib/commerce.ts b/src/lib/commerce.ts
new file mode 100644
index 0000000..3156544
--- /dev/null
+++ b/src/lib/commerce.ts
@@ -0,0 +1,2 @@
+/** Storefront cart/checkout. Keep false until ecommerce returns. */
+export const CART_ENABLED = false as const;
diff --git a/src/lib/contact.ts b/src/lib/contact.ts
new file mode 100644
index 0000000..1182f92
--- /dev/null
+++ b/src/lib/contact.ts
@@ -0,0 +1,40 @@
+import { buildWhatsAppUrl, normalizeWhatsappNumber } from "@/lib/whatsapp";
+
+export const DEFAULT_FOOTER_PHONE = "+90 507 165 13 15";
+export const DEFAULT_WHATSAPP_NUMBER = "905071651315";
+export const DEFAULT_WHATSAPP_MESSAGE =
+  "Merhaba, toptan dosya teli / imalat teklifi almak istiyorum.";
+
+export function normalizePhoneDigits(raw: string): string {
+  return String(raw || "").replace(/\D/g, "");
+}
+
+export function toTelHref(phone: string): string {
+  const digits = normalizePhoneDigits(phone);
+  if (!digits) return "tel:+905071651315";
+  const withCountry = digits.startsWith("90") ? digits : `90${digits.replace(/^0/, "")}`;
+  return `tel:+${withCountry}`;
+}
+
+export function buildProductWhatsAppUrl(opts: {
+  whatsappNumber: string;
+  productName?: string;
+  baseMessage?: string;
+}): string {
+  const base = opts.baseMessage || DEFAULT_WHATSAPP_MESSAGE;
+  const message = opts.productName
+    ? `${base}\n├£r├╝n: ${opts.productName}`
+    : base;
+  return buildWhatsAppUrl({
+    phoneNumber: opts.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
+    message,
+  });
+}
+
+export function resolveFooterPhone(footerPhone?: string | null): string {
+  return footerPhone?.trim() || DEFAULT_FOOTER_PHONE;
+}
+
+export function resolveWhatsappNumber(whatsappNumber?: string | null): string {
+  return normalizeWhatsappNumber(whatsappNumber || DEFAULT_WHATSAPP_NUMBER) || DEFAULT_WHATSAPP_NUMBER;
+}
```
