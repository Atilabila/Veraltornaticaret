import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SiteContent {
    // ===== BRANDING =====
    headerLogo: string;
    footerLogo: string;
    siteName: string;

    // ===== HERO SECTION =====
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    heroPrice: string;
    heroImage: string;
    heroButton1Text: string;
    heroButton1Url: string;
    heroButton2Text: string;
    heroButton2Url: string;
    heroStats: { value: string; label: string }[];

    // ===== FEATURES SECTION =====
    featuresTitle: string;
    featuresSubtitle: string;
    featuresExploreText: string;
    featuresExploreUrl: string;
    featureItems: {
        title: string;
        description: string;
        tag: string;
        stats: string;
        image: string;
    }[];

    // ===== PRODUCT CONFIGURATOR =====
    configuratorTitle: string;
    configuratorInfoText: string;

    // ===== OTHER SERVICES =====
    servicesTitle: string;
    servicesSubtitle: string;
    servicesExploreText: string;
    servicesExploreUrl: string;
    serviceItems: {
        title: string;
        description: string;
        image: string;
        features: string[];
        exploreUrl: string;
    }[];

    // ===== FAQ SECTION =====
    faqTitle: string;
    faqItems: { question: string; answer: string }[];

    // ===== FOOTER =====
    footerCompanyName: string;
    footerAddress: string;
    footerPhone: string;
    footerEmail: string;
    footerInstagram: string;

    // ===== WHATSAPP =====
    whatsappNumber: string;
    whatsappMessage: string;

    // ===== ABOUT PAGE (HAKKIMIZDA) =====
    aboutTitle: string;
    aboutSubtitle: string;
    aboutContent: string;
    aboutImage: string;
    aboutStats: { label: string; value: string }[];
    aboutExploreText: string;
    aboutExploreUrl: string;

    // ===== PRODUCTS PAGE (URUNLER) =====
    productsPageTitle: string;
    productsPageSubtitle: string;
    productsExploreText: string;
    productsExploreUrl: string;

    // ===== BLOG PAGE =====
    blogPageTitle: string;
    blogPageSubtitle: string;

    // ===== METAL SHOWCASE =====
    metalShowcaseTitle: string;
    metalShowcaseSubtitle: string;
    metalShowcaseHeroImage: string;
    metalShowcaseTrustBadges: { icon: string; text: string }[];
}

interface ContentStore {
    content: SiteContent;
    updateContent: (updates: Partial<SiteContent>) => void;
    updateFaqItem: (index: number, item: { question: string; answer: string }) => void;
    addFaqItem: () => void;
    removeFaqItem: (index: number) => void;
    updateFeatureItem: (index: number, item: SiteContent["featureItems"][0]) => void;
    updateServiceItem: (index: number, item: SiteContent["serviceItems"][0]) => void;
    updateAboutStat: (index: number, stat: { label: string; value: string }) => void;
}

const defaultContent: SiteContent = {
    // Branding
    headerLogo: "/logo.svg",
    footerLogo: "/logo-white.svg",
    siteName: "VERAL",

    // Hero
    heroTitle: "Sanatta Asalet",
    heroSubtitle: "1.5mm yüksek kaliteli çelik üzerine işlenen, ömür boyu garantili metal tablolar. Yaşam alanınıza modern bir müze havası katın.",
    heroTagline: "MİRAS VE GELECEK",
    heroPrice: "199 TL",
    heroImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop",
    heroButton1Text: "Koleksiyonu Keşfet",
    heroButton1Url: "/urunler",
    heroButton2Text: "Katalog İndir",
    heroButton2Url: "/katalog.pdf",
    heroStats: [
        { value: "24-48s", label: "TESLİMAT" },
        { value: "1.5mm", label: "ÇELİK" },
        { value: "4K UV", label: "BASKI" }
    ],

    // Features
    featuresTitle: "NEDEN METAL?",
    featuresSubtitle: "GELİŞMİŞ DEKOR DONANIMI. KALICILIK İÇİN TASARLANDI.",
    featuresExploreText: "Tüm Özellikleri Keşfet",
    featuresExploreUrl: "/ozellikler",
    featureItems: [
        {
            title: "ENDÜSTRİYEL DAYANIKLILIK",
            description: "1.5MM ARŞİVSEL SINIF ALÜMİNYUM ALAŞIM. YÜKSEK MEKANİK YÜK ALTINDA SIFIR DEFORMASYON.",
            tag: "DONANIM",
            stats: "AL 1.5MM",
            image: "/mountains.png"
        },
        {
            title: "UV KALİBRASYON",
            description: "CMYK+W HASSAS MÜREKKEP FÜZYONU. TERMAL KÜRLEME SÜRECİ 100+ YIL BÜTÜNLÜĞÜ SAĞLAR.",
            tag: "OPTİK",
            stats: "100 YIL ARŞİVSEL",
            image: "/nebula.png"
        },
        {
            title: "ÇEVRESEL DİRENÇ",
            description: "IP68 EŞDEĞERİ SIZDIRMAZLIK. NEM, SU VE ENDÜSTRİYEL KİMYASALLARA KARŞI DİRENÇLİ.",
            tag: "KORUMA",
            stats: "IP68 DERECELİ",
            image: "/waves.png"
        }
    ],

    // Configurator
    configuratorTitle: "ÜRÜN YAPILANDIRICI",
    configuratorInfoText: "İSTEĞE BAĞLI ÖZEL ÖLÇÜLER MEVCUTTUR",

    // Services
    servicesTitle: "DİĞER OPERASYONLAR",
    servicesSubtitle: "GÖRSEL EKRAN BİRİMLERİNİN ÖTESİNDEKİ GENİŞLETİLMİŞ ÜRETİM KABİLİYETLERİ.",
    servicesExploreText: "Tüm Hizmetleri Gör",
    servicesExploreUrl: "/hizmetler",
    serviceItems: [
        {
            title: "DOSYA TELİ İMALATI",
            description: "ENDÜSTRİYEL SINIF DOSYA TELİ ÜRETİMİ. ÖZEL ÖLÇÜLER. YÜKSEK GERİLİM DAYANIKLILIK DERECESİ.",
            image: "/dosya-teli.jpg",
            features: ["STANDART ÖLÇÜ", "ÖZEL TASARIM", "TOPLU ÜRETİM"],
            exploreUrl: "/hizmetler/dosya-teli"
        },
        {
            title: "METAL ETİKET ÇIKTISI",
            description: "HASSAS LAZER VE MEKANİK ETİKETLEME. KOROZYON DİRENÇLİ. AĞIR MAKİNE UYGULAMALARI İÇİN.",
            image: "/metal-etiket.png",
            features: ["DEĞİŞKEN BOYUT", "LOGO BASKI", "YÜKSEK KALİTE"],
            exploreUrl: "/hizmetler/metal-etiket"
        },
        {
            title: "DEF SİSTEMLERİ",
            description: "PROFESYONEL METAL ENSTRÜMAN BİLEŞENLERİ. RENK KODLU YÜZEY. AKUSTİK OLARAK KALİBRE EDİLDİ.",
            image: "/tef.png",
            features: ["KROM KAPLAMA", "ÖZEL DİZİN", "HASSAS AYAR"],
            exploreUrl: "/hizmetler/def-sistemleri"
        }
    ],

    // FAQ
    faqTitle: "SİSTEM KILAVUZU",
    faqItems: [
        { question: "MALZEME ÖZELLİKLERİ?", answer: "1.5MM ENDÜSTRİYEL SINIF ALÜMİNYUM PLAKALAR KULLANIYORUZ. RİJİT YAPIDAN ÖDÜN VERMİYORUZ." },
        { question: "BASKI ÖMRÜ?", answer: "İÇ MEKAN İÇİN 100+ YIL ÖMÜRLÜ ARŞİVSEL UV MÜREKKEPLER. SU GEÇİRMEZ. ÇİZİLMEYE DAYANIKLI." },
        { question: "ÖZEL TASARIMLAR?", answer: "EVET. KİŞİSEL ÜRETİM İÇİN WHATSAPP TERMİNALİ ÜZERİNDEN ÖZEL VERİ GÖNDEREBİLİRSİNİZ." },
    ],

    // Footer
    footerCompanyName: "VERAL TORNA & TENEKE // TİCARET",
    footerAddress: "1512 Sk. No: 42/1\nAlsancak/İzmir\nTÜRKİYE BÖLGESİ",
    footerPhone: "+90 507 165 13 15",
    footerEmail: "LOG@VERAL.COM",
    footerInstagram: "@VERALTICARET",

    // WhatsApp
    whatsappNumber: "905071651315",
    whatsappMessage: "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.",

    // About Page
    aboutTitle: "HAKKIMIZDA",
    aboutSubtitle: "VERAL TORNA & TENEKE - METAL POSTER ÜRETİCİSİ",
    aboutContent: "2020 yılından bu yana İzmir'de faaliyet gösteren firmamız, yüksek kaliteli alüminyum baskılı metal posterler üretmektedir. UV dijital baskı teknolojisi ile 100+ yıl dayanıklı, solmaz ve su geçirmez ürünler sunuyoruz.",
    aboutImage: "/about-image.png",
    aboutStats: [
        { label: "Yıllık Deneyim", value: "5+" },
        { label: "Mutlu Müşteri", value: "1000+" },
        { label: "Ürün Çeşidi", value: "500+" }
    ],
    aboutExploreText: "Hikayemizi Keşfet",
    aboutExploreUrl: "/hakkimizda",

    // Products Page
    productsPageTitle: "ÜRÜN KATALOĞU",
    productsPageSubtitle: "TÜM METAL POSTER KOLEKSİYONUMUZU KEŞFEDİN",
    productsExploreText: "Tüm Ürünleri Gör",
    productsExploreUrl: "/urunler",

    // Blog Page
    blogPageTitle: "BLOG & HABERLER",
    blogPageSubtitle: "EN SON GELİŞMELER VE MAKALELER",

    // Metal Showcase
    metalShowcaseTitle: "Metal Art Atelier",
    metalShowcaseSubtitle: "Endüstriyel kalite. Sanatsal tasarım. Tel, etiket ve mıknatıs çözümlerinde güvenilir partneriniz.",
    metalShowcaseHeroImage: "",
    metalShowcaseTrustBadges: [
        { icon: "Zap", text: "Hızlı Üretim" },
        { icon: "Shield", text: "10 Yıl Garanti" },
        { icon: "Award", text: "Premium Kalite" }
    ]
};

export const useContentStore = create<ContentStore>()(
    persist(
        (set) => ({
            content: defaultContent,

            updateContent: (updates) => {
                set((state) => ({
                    content: { ...state.content, ...updates },
                }));
            },

            updateFaqItem: (index, item) => {
                set((state) => {
                    const newFaqItems = [...state.content.faqItems];
                    newFaqItems[index] = item;
                    return { content: { ...state.content, faqItems: newFaqItems } };
                });
            },

            addFaqItem: () => {
                set((state) => ({
                    content: {
                        ...state.content,
                        faqItems: [...state.content.faqItems, { question: "YENİ SORU?", answer: "Cevabı buraya yazın..." }],
                    },
                }));
            },

            removeFaqItem: (index) => {
                set((state) => ({
                    content: {
                        ...state.content,
                        faqItems: state.content.faqItems.filter((_, i) => i !== index),
                    },
                }));
            },

            updateFeatureItem: (index, item) => {
                set((state) => {
                    const newItems = [...state.content.featureItems];
                    newItems[index] = item;
                    return { content: { ...state.content, featureItems: newItems } };
                });
            },

            updateServiceItem: (index, item) => {
                set((state) => {
                    const newItems = [...state.content.serviceItems];
                    newItems[index] = item;
                    return { content: { ...state.content, serviceItems: newItems } };
                });
            },

            updateAboutStat: (index, stat) => {
                set((state) => {
                    const newStats = [...state.content.aboutStats];
                    newStats[index] = stat;
                    return { content: { ...state.content, aboutStats: newStats } };
                });
            },
        }),
        {
            name: "site-content-storage",
            version: 1,
            migrate: (persistedState: any, version: number) => {
                if (version === 0) {
                    return {
                        ...persistedState,
                        content: {
                            ...defaultContent,
                            ...(persistedState.content || {}),
                            featureItems: persistedState.content?.featureItems || defaultContent.featureItems,
                        }
                    };
                }
                return persistedState;
            },
        }
    )
);
