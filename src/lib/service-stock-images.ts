/** Local stock images for service cards (name-matched). */
export const SERVICE_IMAGES = {
  giyotinCut: "/images/services/giyotin-kesim.webp",
  coilSlit: "/images/services/rulo-dilimleme.webp",
  dosyaTeli: "/images/services/dosya-teli-plastik-takim.webp",
  tefZili: "/images/services/tef-zili-38mm.webp",
  magnetPoster: "/images/services/metal-tabelalar.webp",
  takvimTeneke: "/images/services/takvim-tenekeleri-detay.webp",
  takvimTenekeSade: "/images/services/takvim-tenekeleri.webp",
  factory: "/images/services/giyotin-kesim.webp",
} as const;

const STOCK = SERVICE_IMAGES;

const IMAGE_ALT: Record<string, string> = {
  [SERVICE_IMAGES.dosyaTeli]: "Veral dosya telleri – plastik takım 14, 15, 17, 21, 24 cm ve akrep tel",
  [SERVICE_IMAGES.takvimTeneke]: "Veral takvim tenekeleri 31, 33 ve 48 cm – askı deliği detay görünümü",
  [SERVICE_IMAGES.takvimTenekeSade]: "Veral takvim tenekeleri 31, 33 ve 48 cm",
  [SERVICE_IMAGES.tefZili]: "Veral tef zili – 38 mm çap, toptan üretim",
  [SERVICE_IMAGES.magnetPoster]: "Veral atölyesinde üretilmiş UV baskılı metal tabelalar",
};

/** Portrait product posters carry size labels (14 CM, 31 cm, 38 MM) that must not be cropped. */
const POSTER_IMAGES = new Set<string>([
  SERVICE_IMAGES.dosyaTeli,
  SERVICE_IMAGES.takvimTeneke,
  SERVICE_IMAGES.takvimTenekeSade,
  SERVICE_IMAGES.tefZili,
]);

export function serviceImageAlt(src: string, fallback: string): string {
  return IMAGE_ALT[src] ?? fallback;
}

export function serviceImageFit(src: string): string {
  return POSTER_IMAGES.has(src) ? "object-contain bg-neutral-900" : "object-cover";
}

function isRemoteProductImage(image?: string | null): boolean {
  const value = (image || "").trim();
  if (!value) return false;
  const lower = value.toLowerCase();
  if (lower.includes("placeholder") || lower.includes("supabase.co")) return false;
  return lower.startsWith("http://") || lower.startsWith("https://");
}

function matchStockByName(service: {
  slug?: string | null;
  title?: string | null;
}): string | null {
  const key = `${service.slug || ""} ${service.title || ""}`.toLowerCase();

  if (key.includes("giyotin") && (key.includes("rulo") || key.includes("dilim"))) {
    return STOCK.coilSlit;
  }
  if (key.includes("giyotin") || (key.includes("kesim") && !key.includes("dilim"))) {
    return STOCK.giyotinCut;
  }
  if (key.includes("dosya") || key.includes("teli")) {
    return STOCK.dosyaTeli;
  }
  if (key.includes("tef") || key.includes("zil")) {
    return STOCK.tefZili;
  }
  if (
    key.includes("magnet") ||
    key.includes("mıknat") ||
    key.includes("miknat") ||
    key.includes("poster")
  ) {
    return STOCK.magnetPoster;
  }
  if (key.includes("takvim") || key.includes("teneke")) {
    return STOCK.takvimTeneke;
  }

  return null;
}

/**
 * Storefront cards: Verified local stock images first, then valid remote images (non-supabase).
 */
export function resolveServiceStockImage(service: {
  image?: string | null;
  slug?: string | null;
  title?: string | null;
}): string {
  const byName = matchStockByName(service);
  if (byName) return byName;

  if (isRemoteProductImage(service.image)) {
    return (service.image || "").trim();
  }

  const uploaded = (service.image || "").trim();
  if (uploaded && !uploaded.toLowerCase().includes("placeholder") && !uploaded.toLowerCase().includes("supabase.co")) {
    return uploaded;
  }

  return STOCK.factory;
}
