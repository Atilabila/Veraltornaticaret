/** Local stock images for service cards (name-matched). */
const STOCK = {
  giyotinCut: "/images/services/giyotin-kesim.webp",
  coilSlit: "/images/services/rulo-dilimleme.webp",
  dosyaTeli: "/images/services/dosya-teli.jpg",
  tefZili: "/images/services/tef-zili.jpg",
  magnetPoster: "/images/services/magnet-poster.jpg",
  takvimTeneke: "/images/services/takvim-teneke.jpg",
  factory: "/images/services/giyotin-kesim.webp",
} as const;

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
