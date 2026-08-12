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
