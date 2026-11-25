/** Yayın adresi ve sitede görünen hat. Ticaret sicili unvanı burada yok. */

export const SITE_ORIGIN = "https://www.veralteneketicaret.com";
export const SITE_NAME = "Veral Teneke Ticaret";
export const SITE_PHONE_DISPLAY = "0507 165 13 15";
export const SITE_PHONE_E164 = "+905071651315";
export const SITE_WHATSAPP = "905071651315";
export const SITE_EMAIL = "veraltornatic@hotmail.com";
export const SITE_INSTAGRAM = "https://www.instagram.com/veralticaret";
export const SITE_MAP = "https://maps.app.goo.gl/QqWJ6pVDPwgcFDDb9";
export const SITE_OPENS = "08:30";
export const SITE_CLOSES = "18:30";
export const SITE_HOURS_LABEL = `Pazartesi - Cumartesi ${SITE_OPENS} - ${SITE_CLOSES}`;

export const PRIVATE_PATHS = [
    "/admin",
    "/admin/",
    "/admin-login",
    "/api/admin/",
    "/api/auth/",
    "/test",
    "/test-supabase",
    "/ui-playground",
    "/hesabim",
    "/siparis-sorgula",
    "/teklif-al/basarili",
];

export function absUrl(path: string): string {
    if (!path || path === "/") return SITE_ORIGIN;
    if (/^https?:\/\//i.test(path)) {
        return path
            .replace(/^https?:\/\/(?:www\.)?veralteneketicaret\.com/i, SITE_ORIGIN)
            .replace(/\/$/, "") || SITE_ORIGIN;
    }
    const clean = (path.startsWith("/") ? path : `/${path}`).replace(/\/$/, "");
    return `${SITE_ORIGIN}${clean}`;
}
