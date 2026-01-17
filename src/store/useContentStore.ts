import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SiteContent {
    // ===== HERO SECTION =====
    heroTitle: string;
    heroSubtitle: string;
    heroTagline: string;
    heroPrice: string;
    heroImage: string;
    heroButton1Text: string;
    heroButton2Text: string;

    // ===== FEATURES SECTION =====
    featuresTitle: string;
    featuresSubtitle: string;
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
    serviceItems: {
        title: string;
        description: string;
        image: string;
        features: string[];
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

    // ===== PRODUCTS PAGE (URUNLER) =====
    productsPageTitle: string;
    productsPageSubtitle: string;

    // ===== BLOG PAGE =====
    blogPageTitle: string;
    blogPageSubtitle: string;
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
    // Hero
    heroTitle: "DUVARLARINIZ İÇİN YENİ NESİL DEKOR",
    heroSubtitle: "0.35 MM ENDÜSTRİYEL METAL PLAKALAR. UV DİJİTAL KALİBRASYON. SIFIR YUVARLAK KÖŞE.",
    heroTagline: "KAĞIT POSTERLERİ UNUTUN. BÜKÜLMEZ, SOLMAZ VE ŞIK METAL TABLOLARLA TANIŞIN",
    heroPrice: "199 TL",
    heroImage: "/hero-mockup.png",
    heroButton1Text: "KATALOG BAŞLAT",
    heroButton2Text: "ÖZELLİKLERİ GÖR",

    // Features
    featuresTitle: "NEDEN METAL?",
    featuresSubtitle: "GELİŞMİŞ DEKOR DONANIMI. KALICILIK İÇİN TASARLANDI.",
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
    serviceItems: [
        {
            title: "DOSYA TELİ İMALATI",
            description: "ENDÜSTRİYEL SINIF DOSYA TELİ ÜRETİMİ. ÖZEL ÖLÇÜLER. YÜKSEK GERİLİM DAYANIKLILIK DERECESİ.",
            image: "/dosya-teli.jpg",
            features: ["STANDART ÖLÇÜ", "ÖZEL TASARIM", "TOPLU ÜRETİM"]
        },
        {
            title: "METAL ETİKET ÇIKTISI",
            description: "HASSAS LAZER VE MEKANİK ETİKETLEME. KOROZYON DİRENÇLİ. AĞIR MAKİNE UYGULAMALARI İÇİN.",
            image: "/metal-etiket.png",
            features: ["DEĞİŞKEN BOYUT", "LOGO BASKI", "YÜKSEK KALİTE"]
        },
        {
            title: "DEF SİSTEMLERİ",
            description: "PROFESYONEL METAL ENSTRÜMAN BİLEŞENLERİ. RENK KODLU YÜZEY. AKUSTİK OLARAK KALİBRE EDİLDİ.",
            image: "/tef.png",
            features: ["KROM KAPLAMA", "ÖZEL DİZİN", "HASSAS AYAR"]
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

    // Products Page
    productsPageTitle: "ÜRÜN KATALOĞU",
    productsPageSubtitle: "TÜM METAL POSTER KOLEKSİYONUMUZU KEŞFEDİN",

    // Blog Page
    blogPageTitle: "BLOG & HABERLER",
    blogPageSubtitle: "EN SON GELİŞMELER VE MAKALELER"
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
