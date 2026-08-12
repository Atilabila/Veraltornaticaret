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
    ? `${base}\nÜrün: ${opts.productName}`
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
