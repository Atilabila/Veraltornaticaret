import { blogPosts } from "@/lib/blog-posts";

/** Hizmet slug → ilgili mevcut blog yazıları (uydurma yok; yalnız yayındaki id'ler). */
export const SERVICE_RELATED_BLOGS: Record<string, string[]> = {
    "dosya-teli": ["dosya-teli-ve-arsiv-sistemleri"],
    "takvim-tenekesi": ["takvim-tenekesi-imalati-izmir"],
    "giyotin-kesim": ["giyotin-sac-kesim-ve-tolerans-standartlari"],
    "miknatisli-magnet": [
        "miknatisli-magnet-ve-metal-poster-estetigi",
        "endustriyel-metal-baski-rehberi",
    ],
    "rulo-dilimleme": ["rulo-sac-dilme-slitting-hatlari"],
    "aluminyum-dilimleme": ["rulo-sac-dilme-slitting-hatlari"],
    "bakir-dilimleme": ["rulo-sac-dilme-slitting-hatlari"],
};

/** Blog slug → ilgili hizmet sayfaları. */
export const BLOG_RELATED_SERVICES: Record<
    string,
    { slug: string; label: string }[]
> = {
    "dosya-teli-ve-arsiv-sistemleri": [
        { slug: "dosya-teli", label: "Dosya Teli" },
    ],
    "takvim-tenekesi-imalati-izmir": [
        { slug: "takvim-tenekesi", label: "Takvim Tenekesi" },
    ],
    "giyotin-sac-kesim-ve-tolerans-standartlari": [
        { slug: "giyotin-kesim", label: "Giyotin Sac Kesim" },
    ],
    "miknatisli-magnet-ve-metal-poster-estetigi": [
        { slug: "miknatisli-magnet", label: "Mıknatıslı Magnet & Metal Poster" },
    ],
    "endustriyel-metal-baski-rehberi": [
        { slug: "miknatisli-magnet", label: "Mıknatıslı Magnet & Metal Poster" },
    ],
    "rulo-sac-dilme-slitting-hatlari": [
        { slug: "rulo-dilimleme", label: "Rulo Dilimleme" },
        { slug: "aluminyum-dilimleme", label: "Alüminyum Dilimleme" },
        { slug: "bakir-dilimleme", label: "Bakır Dilimleme" },
    ],
};

export function relatedBlogsForService(serviceSlug: string) {
    const ids = SERVICE_RELATED_BLOGS[serviceSlug] || [];
    return ids
        .map((id) => blogPosts.find((p) => p.id === id))
        .filter((p): p is (typeof blogPosts)[number] => Boolean(p));
}

export function relatedServicesForBlog(blogSlug: string) {
    return BLOG_RELATED_SERVICES[blogSlug] || [];
}
