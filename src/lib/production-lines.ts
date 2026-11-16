export type ProductionLine = {
    label: string;
    href: string;
};

/** Primary production lines shown as flat nav tabs (no accordion). */
export const PRODUCTION_LINES: ProductionLine[] = [
    { label: "Dosya Teli", href: "/hizmetler/dosya-teli" },
    { label: "Takvim Tenekesi", href: "/hizmetler/takvim-tenekesi" },
    { label: "Sac Kesim", href: "/hizmetler/giyotin-kesim" },
    { label: "UV Baskı", href: "/hizmetler/miknatisli-magnet" },
    { label: "Üretim", href: "/hizmetler" },
];

export const COMPANY_LINKS: ProductionLine[] = [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
];

/** Hero marquee labels (service lines only, linked). */
export const SEARCHED_SERVICES: ProductionLine[] = [
    { label: "İzmir dosya teli imalatı", href: "/hizmetler/dosya-teli" },
    { label: "Takvim tenekesi üretimi", href: "/hizmetler/takvim-tenekesi" },
    { label: "Giyotin sac kesim", href: "/hizmetler/giyotin-kesim" },
    { label: "Rulo dilimleme", href: "/hizmetler/rulo-dilimleme" },
    { label: "Tef zili üretimi", href: "/hizmetler/tef-zili" },
    { label: "UV metal poster baskı", href: "/hizmetler/miknatisli-magnet" },
];

/** Stored default is all-caps. Header buttons read as a normal label. */
export function headerCtaLabel(value?: string | null): string {
    const raw = (value || "").trim();
    if (!raw || raw.toLocaleUpperCase("tr-TR") === "TEKLİF AL") return "Teklif al";
    return raw;
}

export function isNavHrefActive(pathname: string | null | undefined, href: string): boolean {
    if (!pathname) return false;
    if (href === "/hizmetler") return pathname === "/hizmetler";
    return pathname === href || pathname.startsWith(`${href}/`);
}
