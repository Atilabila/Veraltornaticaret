import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_WHATSAPP } from "@/lib/site";

/** Sahibin kararı: sitede tek yıl 1986. */
export const FOUNDING_YEAR = "1986";

export const ABOUT_PARAGRAPHS = [
    "Veral Torna ve Teneke Ticaret, 1986'dan beri İzmir Alsancak'ta seri üretim yapan bir atölyedir.",
    "Torna, yedek parça ve teneke ürünleri imalatı.",
    "Dosya teli, takvim tenekesi, tef zili, sac kesim, rulo dilme ve metal poster imalatı.",
    "Adres: 1471 Sokak No:12/A, Alsancak / İzmir. Telefon: 0507 165 13 15.",
];

export const WORKSHOP_BLURB =
    "Veral Torna ve Teneke Ticaret, 1986'dan beri İzmir Alsancak'ta seri üretim yapan bir atölyedir. Torna, yedek parça ve teneke ürünleri imalatı.";

export type PublicFeature = { key: string; value: string };

export type PublicServiceCopy = {
    shortDescription: string;
    fullDescription: string;
    seoDescription: string;
    features: PublicFeature[];
    slaText: string;
    ctaTitle: string;
    ctaLabel: string;
};

/** Ölçüler yalnızca sitede zaten görünen boylardır. Yeni sayı yok. */
export const PUBLIC_SERVICE_COPY: Record<string, PublicServiceCopy> = {
    "dosya-teli": {
        shortDescription: "Dosya teli imalatı. Boylar: 14, 15, 17, 21 ve 24 cm. Akrep tel.",
        fullDescription:
            "Dosya teli imalatı. Boylar: 14, 15, 17, 21 ve 24 cm. Akrep tel. Fiyat için yazışma.",
        seoDescription: "Alsancak'ta dosya teli imalatı. Boylar: 14, 15, 17, 21, 24 cm ve akrep tel.",
        features: [{ key: "Boylar", value: "14, 15, 17, 21, 24 cm ve akrep tel" }],
        slaText: "Fiyat için yazışma",
        ctaTitle: "Bu tel için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "takvim-tenekesi": {
        shortDescription: "Takvim tenekesi imalatı. Boylar: 31, 33 ve 48 cm.",
        fullDescription:
            "Takvim tenekesi imalatı. Duvar takviminin kenarına geçen metal parça. Boylar: 31, 33 ve 48 cm. Askılı veya askısız.",
        seoDescription: "Takvim tenekesi imalatı. Boylar: 31, 33 ve 48 cm. Alsancak.",
        features: [{ key: "Boylar", value: "31, 33 ve 48 cm" }],
        slaText: "Fiyat için yazışma",
        ctaTitle: "Bu teneke için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "tef-zili": {
        shortDescription: "Tef zili imalatı. Görünen çap 38 mm.",
        fullDescription: "Tef zili imalatı. Görünen çap 38 mm. Fiyat için yazışma.",
        seoDescription: "Tef zili imalatı. Görünen çap 38 mm. Alsancak.",
        features: [{ key: "Çap", value: "38 mm" }],
        slaText: "Fiyat için yazışma",
        ctaTitle: "Bu zil için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "giyotin-kesim": {
        shortDescription: "Sac ve teneke kesimi.",
        fullDescription: "Ölçüye göre sac ve teneke kesimi. Fiyat için yazışma.",
        seoDescription: "Alsancak'ta giyotin sac kesim.",
        features: [{ key: "İş", value: "Ölçüye göre kesim" }],
        slaText: "Fiyat için yazışma",
        ctaTitle: "Kesim için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "rulo-dilimleme": {
        shortDescription: "Rulo sac dilimleme.",
        fullDescription: "Rulo sacın şerit olarak dilimlenmesi. Fiyat için yazışma.",
        seoDescription: "Rulo sac dilimleme. Alsancak.",
        features: [{ key: "İş", value: "Şerit dilimleme" }],
        slaText: "Fiyat için yazışma",
        ctaTitle: "Dilim için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "miknatisli-magnet": {
        shortDescription: "Metal poster imalatı. Mıknatıslı poster.",
        fullDescription: "Metal poster imalatı. Mıknatıslı poster de yapılır. Fiyat için yazışma.",
        seoDescription: "Metal poster imalatı. Alsancak.",
        features: [{ key: "İş", value: "Metal poster" }],
        slaText: "Fiyat için yazışma",
        ctaTitle: "Poster için fiyat",
        ctaLabel: "Fiyat isteği",
    },
};

export type { TornaService } from "@/lib/torna-services";
export { TORNA_SERVICES, tornaHref, findTornaService } from "@/lib/torna-services";

export const QUOTE_SERVICES = [
    { slug: "torna", label: "Torna" },
    { slug: "dosya-teli", label: "Dosya teli" },
    { slug: "takvim-tenekesi", label: "Takvim tenekesi" },
    { slug: "tef-zili", label: "Tef zili" },
    { slug: "giyotin-kesim", label: "Giyotin sac kesim" },
    { slug: "rulo-dilimleme", label: "Rulo dilimleme" },
    { slug: "miknatisli-magnet", label: "Metal poster" },
] as const;

export const PUBLIC_FAQS = [
    {
        category: "Sipariş",
        question: "Sipariş nasıl olur?",
        answer: "Ürün, ölçü ve adet bilgisi. Ardından ad ve telefon. E-posta zorunlu değil. Fiyatın yazılması.",
    },
    {
        category: "Dosya teli",
        question: "Dosya telinde hangi boylar var?",
        answer: "14, 15, 17, 21 ve 24 cm. Akrep tel de var.",
    },
    {
        category: "Takvim tenekesi",
        question: "Takvim tenekesinde hangi boylar var?",
        answer: "31, 33 ve 48 cm. Askılı ya da askısız olabilir.",
    },
    {
        category: "Tef zili",
        question: "Tef zili imalatı var mı?",
        answer: "Evet. Tef zili imalatı. Görünen çap 38 mm.",
    },
    {
        category: "Sac",
        question: "Sac kesimi ve rulo dilme var mı?",
        answer: "Evet. Giyotin kesim ve rulo dilme. Ölçü yazılır, fiyat bildirilir.",
    },
    {
        category: "Adres",
        question: "Atölye nerede?",
        answer: "1471 Sokak No:12/A, Alsancak / İzmir. Telefon: 0507 165 13 15. Pazartesi–Cumartesi 08:30–18:30.",
    },
];

export function priceAskUrl(productName: string): string {
    return buildWhatsAppUrl({
        phoneNumber: SITE_WHATSAPP,
        message: `Merhaba, ${productName} için fiyat talebi.`,
    });
}

export function applyPublicServiceCopy<T extends { slug: string }>(service: T): T & Partial<PublicServiceCopy> {
    const copy = PUBLIC_SERVICE_COPY[service.slug];
    if (!copy) return service;
    return { ...service, ...copy };
}
