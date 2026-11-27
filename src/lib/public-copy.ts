import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_WHATSAPP } from "@/lib/site";

/** Sahibin kararı: sitede tek yıl 1986. */
export const FOUNDING_YEAR = "1986";

export const ABOUT_PARAGRAPHS = [
    "Veral Torna & Teneke Ticaret, 1986'dan beri İzmir Alsancak'ta çalışan bir aile atölyesidir.",
    "Dosya teli, takvim tenekesi, tef zili, sac kesim ve metal baskı işlerini burada yaparız.",
    "Siparişi ürün, ölçü ve adetle alırız. Fiyatı yazılı olarak bildiririz.",
    "Atölye adresi 1471 Sokak No:12/A, Alsancak / İzmir'dir.",
];

export const WORKSHOP_BLURB =
    "Veral Torna & Teneke Ticaret, 1986'dan beri İzmir Alsancak'ta çalışan bir aile atölyesidir. Dosya teli, takvim tenekesi, tef zili, sac kesim ve metal baskı yapar.";

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
        shortDescription: "Dosya teli. Boylar: 14, 15, 17, 21 ve 24 cm, bir de akrep tel.",
        fullDescription:
            "Kırtasiye ve dosya işi için tel üretiriz. Sitede görünen boylar 14, 15, 17, 21 ve 24 cm ile akrep teldir. Boyu ve adedi yazın, fiyatı söyleyelim.",
        seoDescription: "İzmir Alsancak'ta dosya teli. Boylar: 14, 15, 17, 21, 24 cm ve akrep tel. Fiyat için yazın.",
        features: [{ key: "Boylar", value: "14, 15, 17, 21, 24 cm ve akrep tel" }],
        slaText: "Teklif usulü",
        ctaTitle: "Bu tel için fiyat sorun",
        ctaLabel: "Teklif al",
    },
    "takvim-tenekesi": {
        shortDescription: "Takvim tenekesi. Boylar: 31, 33 ve 48 cm.",
        fullDescription:
            "Duvar takviminin kenarına geçen metal çıtadır. Sitede görünen boylar 31, 33 ve 48 cm'dir. Askılı ya da askısız olduğunu ve adedi yazın.",
        seoDescription: "Takvim tenekesi imalatı. Boylar: 31, 33 ve 48 cm. Fiyat için yazın.",
        features: [{ key: "Boylar", value: "31, 33 ve 48 cm" }],
        slaText: "Teklif usulü",
        ctaTitle: "Bu çıta için fiyat sorun",
        ctaLabel: "Teklif al",
    },
    "tef-zili": {
        shortDescription: "Tef zili. Sitedeki ölçüde çap 38 mm.",
        fullDescription:
            "Müzik aleti yapanlar için tef zili basarız. Sitedeki ölçüde çap 38 mm olarak görünür. Adedi yazın, fiyatı söyleyelim.",
        seoDescription: "Tef zili imalatı. Sitedeki çap 38 mm. Fiyat için yazın.",
        features: [{ key: "Çap", value: "38 mm" }],
        slaText: "Teklif usulü",
        ctaTitle: "Bu zil için fiyat sorun",
        ctaLabel: "Teklif al",
    },
    "giyotin-kesim": {
        shortDescription: "Giyotin ile sac ve teneke keseriz. Ölçüyü siz yazın.",
        fullDescription: "Sac ve tenekeyi istediğiniz ölçüde keseriz. Eni, boyu ve adedi yazın. Fiyatı teklifte söyleriz.",
        seoDescription: "İzmir Alsancak'ta giyotin sac kesim. Ölçüyü yazın, fiyatı söyleyelim.",
        features: [{ key: "İş", value: "Ölçüye göre kesim" }],
        slaText: "Teklif usulü",
        ctaTitle: "Kesim için fiyat sorun",
        ctaLabel: "Teklif al",
    },
    "rulo-dilimleme": {
        shortDescription: "Rulo sacı şerit halinde dilimleriz. Eni siz yazın.",
        fullDescription: "Rulo sacı istediğiniz ende şerit yaparız. Eni ve miktarı yazın. Fiyatı teklifte söyleriz.",
        seoDescription: "Rulo sac dilimleme. Eni yazın, fiyatı söyleyelim.",
        features: [{ key: "İş", value: "Şerit dilimleme" }],
        slaText: "Teklif usulü",
        ctaTitle: "Dilim için fiyat sorun",
        ctaLabel: "Teklif al",
    },
    "miknatisli-magnet": {
        shortDescription: "Metal levhaya baskı yaparız. Mıknatıslı poster de vardır.",
        fullDescription:
            "Metal levhaya baskı yaparız. Mıknatıslı asılan poster de yapılır. Ölçüyü ve adedi yazın, fiyatı söyleyelim.",
        seoDescription: "UV baskılı metal levha ve mıknatıslı poster. Ölçü için yazın.",
        features: [{ key: "İş", value: "Metal baskı" }],
        slaText: "Teklif usulü",
        ctaTitle: "Baskı için fiyat sorun",
        ctaLabel: "Teklif al",
    },
};

export const QUOTE_SERVICES = [
    { slug: "dosya-teli", label: "Dosya teli" },
    { slug: "takvim-tenekesi", label: "Takvim tenekesi" },
    { slug: "tef-zili", label: "Tef zili" },
    { slug: "giyotin-kesim", label: "Giyotin sac kesim" },
    { slug: "rulo-dilimleme", label: "Rulo dilimleme" },
    { slug: "miknatisli-magnet", label: "UV metal baskı" },
] as const;

export const PUBLIC_FAQS = [
    {
        category: "Sipariş",
        question: "Sipariş nasıl verilir?",
        answer: "Ürünü, ölçüyü ve adedi yazın. Adınızı ve telefonunuzu bırakın. Fiyatı size bildiririz.",
    },
    {
        category: "Dosya teli",
        question: "Dosya telinde hangi boylar var?",
        answer: "Sitede görünen boylar 14, 15, 17, 21 ve 24 cm ile akrep teldir.",
    },
    {
        category: "Takvim tenekesi",
        question: "Takvim tenekesinde hangi boylar var?",
        answer: "Sitede görünen boylar 31, 33 ve 48 cm'dir. Askılı ya da askısız olduğunu yazın.",
    },
    {
        category: "Tef zili",
        question: "Tef zili yapıyor musunuz?",
        answer: "Evet. Sitedeki ölçüde çap 38 mm olarak görünür. Adedi yazın.",
    },
    {
        category: "Sac",
        question: "Sac kesimi ve rulo dilimleme var mı?",
        answer: "Evet. Giyotin kesim ve rulo dilimleme yaparız. Ölçüyü yazın, fiyatı söyleyelim.",
    },
    {
        category: "Adres",
        question: "Atölye nerede?",
        answer: "1471 Sokak No:12/A, Alsancak / İzmir. Telefon: 0507 165 13 15. Çalışma: Pazartesi–Cumartesi 08:30–18:30.",
    },
];

export function priceAskUrl(productName: string): string {
    return buildWhatsAppUrl({
        phoneNumber: SITE_WHATSAPP,
        message: `Merhaba, ${productName} için fiyat soruyorum.`,
    });
}

export function applyPublicServiceCopy<T extends { slug: string }>(service: T): T & Partial<PublicServiceCopy> {
    const copy = PUBLIC_SERVICE_COPY[service.slug];
    if (!copy) return service;
    return { ...service, ...copy };
}
