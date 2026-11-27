import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_WHATSAPP } from "@/lib/site";

/** Sahibin kararı: sitede tek yıl 1986. */
export const FOUNDING_YEAR = "1986";

export const ABOUT_PARAGRAPHS = [
    "Veral Torna ve Teneke Ticaret, 1986'dan beri İzmir Alsancak'ta çalışır.",
    "Torna, yedek parça ve teneke ürünleri yapıyoruz.",
    "Dosya teli, takvim tenekesi, tef zili, sac kesim, rulo dilme ve metal poster de yapıyoruz.",
    "Adresimiz 1471 Sokak No:12/A, Alsancak / İzmir. Telefonumuz 0507 165 13 15.",
];

export const WORKSHOP_BLURB =
    "Veral Torna ve Teneke Ticaret, 1986'dan beri Alsancak'ta çalışır. Torna, yedek parça ve teneke ürünleri yapıyoruz.";

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
        shortDescription: "Dosya teli yapıyoruz. Boylar 14, 15, 17, 21 ve 24 cm. Akrep tel de var.",
        fullDescription:
            "Kırtasiye ve dosya işi için tel yapıyoruz. Boylar 14, 15, 17, 21 ve 24 cm. Akrep tel de var. Fiyat için bize yazabilirsiniz.",
        seoDescription: "Alsancak'ta dosya teli. Boylar: 14, 15, 17, 21, 24 cm ve akrep tel.",
        features: [{ key: "Boylar", value: "14, 15, 17, 21, 24 cm ve akrep tel" }],
        slaText: "Fiyat için yazabilirsiniz",
        ctaTitle: "Bu tel için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "takvim-tenekesi": {
        shortDescription: "Takvim tenekesi yapıyoruz. Boylar 31, 33 ve 48 cm.",
        fullDescription:
            "Takvim tenekesi, duvar takviminin kenarına geçen metal parçadır. Boylar 31, 33 ve 48 cm. Askılı ya da askısız olabilir.",
        seoDescription: "Takvim tenekesi. Boylar: 31, 33 ve 48 cm. Alsancak.",
        features: [{ key: "Boylar", value: "31, 33 ve 48 cm" }],
        slaText: "Fiyat için yazabilirsiniz",
        ctaTitle: "Bu teneke için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "tef-zili": {
        shortDescription: "Tef zili yapıyoruz. Görünen çap 38 mm.",
        fullDescription: "Müzik aleti işi için tef zili yapıyoruz. Görünen çap 38 mm. Fiyat için bize yazabilirsiniz.",
        seoDescription: "Tef zili. Görünen çap 38 mm. Alsancak.",
        features: [{ key: "Çap", value: "38 mm" }],
        slaText: "Fiyat için yazabilirsiniz",
        ctaTitle: "Bu zil için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "giyotin-kesim": {
        shortDescription: "Sac ve tenekeyi ölçüde kesiyoruz.",
        fullDescription: "Sac ve tenekeyi istediğiniz ölçüde kesiyoruz. Ölçüyü paylaşırsanız fiyatı birlikte bakarız.",
        seoDescription: "Alsancak'ta giyotin sac kesim. Ölçüyü paylaşırsanız fiyatı söyleyebiliriz.",
        features: [{ key: "İş", value: "Ölçüye göre kesim" }],
        slaText: "Fiyat için yazabilirsiniz",
        ctaTitle: "Kesim için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "rulo-dilimleme": {
        shortDescription: "Rulo sacı şerit olarak dilimliyoruz.",
        fullDescription: "Rulo sacı şerit olarak dilimleyebiliriz. Eni söylerseniz fiyatı birlikte bakarız.",
        seoDescription: "Rulo sac dilimleme. Alsancak.",
        features: [{ key: "İş", value: "Şerit dilimleme" }],
        slaText: "Fiyat için yazabilirsiniz",
        ctaTitle: "Dilim için fiyat",
        ctaLabel: "Fiyat isteği",
    },
    "miknatisli-magnet": {
        shortDescription: "Metal poster yapıyoruz. Mıknatıslı olanı da var.",
        fullDescription: "Metal poster yapıyoruz. Mıknatıslı olanı da var. Ölçüyü paylaşırsanız fiyatı söyleyebiliriz.",
        seoDescription: "Metal poster. Alsancak. Fiyat için yazabilirsiniz.",
        features: [{ key: "İş", value: "Metal poster" }],
        slaText: "Fiyat için yazabilirsiniz",
        ctaTitle: "Poster için fiyat",
        ctaLabel: "Fiyat isteği",
    },
};

export type TornaService = {
    slug: string;
    title: string;
    text: string;
};

/** Heli-Coil, Böllhoff’un vida dişine takılan tel burcudur. Baga adı sahibin istediği gibi durur. */
export const TORNA_SERVICES: TornaService[] = [
    {
        slug: "yedek-parca",
        title: "Yedek parça",
        text: "Alsancak atölyesinde torna ve makine için yedek parça yapıyoruz.",
    },
    {
        slug: "tamir",
        title: "Tamir",
        text: "Alsancak atölyesinde bozulan parçayı tamir ediyoruz.",
    },
    {
        slug: "imalat",
        title: "İmalat",
        text: "Alsancak atölyesinde istediğiniz parçayı tornada yapıyoruz.",
    },
    {
        slug: "kalip-imalati",
        title: "Kalıp imalatı",
        text: "Alsancak atölyesinde kalıp yapıyoruz.",
    },
    {
        slug: "makine-bakim-ve-onarimi",
        title: "Makine bakım ve onarımı",
        text: "Alsancak atölyesinde makine bakımı ve onarımı yapıyoruz.",
    },
    {
        slug: "heli-coil-ve-baga",
        title: "Heli-Coil ve baga uygulamaları",
        text: "Alsancak atölyesinde Heli-Coil ve baga uygulamaları yapıyoruz. Heli-Coil, vida dişine takılan bir tel burçtur.",
    },
    {
        slug: "motosiklet-jant-tamiri",
        title: "Motosiklet jant tamiri",
        text: "Alsancak atölyesinde motosiklet jant tamiri yapıyoruz.",
    },
    {
        slug: "rulman-ve-burc-cakma",
        title: "Hidrolik pres ile rulman ve burç çakma",
        text: "Alsancak atölyesinde hidrolik pres ile rulman ve burç çakıyoruz.",
    },
];

export function tornaHref(slug: string): string {
    return `/hizmetler/torna/${slug}`;
}

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
        answer: "Ürünü, ölçüyü ve adedi paylaşırsanız size fiyatı yazarız. Adınız ve telefonunuz yeter. E-posta zorunlu değil.",
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
        question: "Tef zili yapıyor musunuz?",
        answer: "Evet. Görünen çap 38 mm.",
    },
    {
        category: "Sac",
        question: "Sac kesimi ve rulo dilme var mı?",
        answer: "Evet. Giyotin kesim ve rulo dilme yapıyoruz. Ölçüyü paylaşırsanız fiyatı birlikte bakarız.",
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
        message: `Merhaba, ${productName} için fiyat öğrenmek istiyorum.`,
    });
}

export function applyPublicServiceCopy<T extends { slug: string }>(service: T): T & Partial<PublicServiceCopy> {
    const copy = PUBLIC_SERVICE_COPY[service.slug];
    if (!copy) return service;
    return { ...service, ...copy };
}
