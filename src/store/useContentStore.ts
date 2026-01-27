import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ContentService } from "@/lib/supabase/content.service";
import { upsertAdminContent } from "@/actions/admin";

export interface SiteContent {
    // ... (existing interface lines remain same)
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
    heroImages: string[];
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
    metalShowcaseItems: {
        title: string;
        desc: string;
        image: string;
        category: string;
    }[];

    // ===== INSTAGRAM FEED =====
    instagramPosts: {
        id: string;
        image_url: string;
        permalink?: string;
        caption?: string;
        likes?: number;
        display_order: number;
        is_active: boolean;
    }[];

    // ===== DYNAMIC HOME SECTIONS =====
    heroTagline1: string;
    heroTagline2: string;
    heroTagline3: string;
    heroCustomerCount: string;

    statsItems: {
        label: string;
        value: string;
        icon: string;
    }[];

    reviewsTitle: string;
    reviewsSubtitle: string;
    reviewsRatingLabel: string;
    reviewItems: {
        id: string;
        name: string;
        city: string;
        rating: number;
        text: string;
        product: string;
        image: string;
        date: string;
    }[];

    processTitle: string;
    processSubtitle: string;
    processDescription: string;
    processItems: {
        stepNumber: string;
        title: string;
        desc: string;
    }[];

    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
    contactItems: {
        icon: string;
        title: string;
        desc: string;
        color?: string;
    }[];
    inquiryTitle: string;
    inquiryDescription: string;
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

    // Supabase Sync Methods
    fetchContent: () => Promise<void>;
    saveToSupabase: () => Promise<boolean>;
}

const defaultContent: SiteContent = {
    // Branding
    headerLogo: "/logo.svg",
    footerLogo: "/logo-white.svg",
    siteName: "VERAL",

    // Hero
    heroTitle: "YAŞAM ALANINIZ İÇİN YENİ NESİL DEKOR",
    heroSubtitle: "0.30 MM ENDÜSTRİYEL METAL PLAKALAR. 4K UV BASKI. ÖMÜR BOYU DAYANIKLILIK.",
    heroTagline: "POSTER DEĞİL, DEKOR DONANIMI. BÜKÜLMEZ, SOLMAZ, DEFORME OLMAZ.",
    heroPrice: "199 TL",
    heroImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop",
    heroImages: [
        "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1524169358666-79f22c79745d?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=2680&auto=format&fit=crop"
    ],
    heroButton1Text: "KOLEKSİYONU GÖR",
    heroButton1Url: "/urunler",
    heroButton2Text: "KATALOG",
    heroButton2Url: "/katalog.pdf",
    heroStats: [
        { value: "24-48s", label: "TESLİMAT" },
        { value: "1.5mm", label: "ÇELİK" },
        { value: "4K UV", label: "BASKI" }
    ],

    // Features
    featuresTitle: "METAL PROTOKOLÜ",
    featuresSubtitle: "SANATIN EN DAYANIKLI HALİ. ENDÜSTRİYEL KALİTE.",
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
    ],
    metalShowcaseItems: [
        {
            title: "DOSYA TELİ",
            desc: "ENDÜSTRİYEL SINIF ÇELİK TEL. YÜKSEK GERİLİM DİRENCİ VE HASSAS BÜKÜM.",
            image: "/images/showcase/dosya-teli.jpg",
            category: "ÜRETİM // 001"
        },
        {
            title: "TEF ZİLİ",
            desc: "PASLANMAZ METAL ALAŞIM. KUSURSUZ AKUSTİK VE FORM KORUMA.",
            image: "/images/showcase/tef-zili.jpg",
            category: "ÜRETİM // 002"
        },
        {
            title: "METAL ETİKET",
            desc: "LAZER KESİM ŞERİTLER. KOROZYON DİRENCİ VE YÜKSEK OKUNABİLİRLİK.",
            image: "/images/showcase/metal-etiket.jpg",
            category: "ÜRETİM // 003"
        }
    ],

    // Instagram Feed
    instagramPosts: [],

    // Dynamic Home Sections
    heroTagline1: "KAĞIT POSTERLERİ UNUTUN.",
    heroTagline2: "BÜKÜLMEZ, SOLMAZ VE ŞIK",
    heroTagline3: "METAL TABLOLARLA TANIŞIN",
    heroCustomerCount: "5000+",

    statsItems: [
        { label: "BAŞARILI TESLİMAT", value: "2500+", icon: "ShieldCheck" },
        { label: "GENEL SKOR", value: "4.9 / 5", icon: "Star" },
        { label: "MEMNUNİYET ORANI", value: "%99", icon: "Users" },
        { label: "ÜRETİM PROTOKOLÜ", value: "ISO-9001", icon: "Factory" },
        { label: "HASSAS İŞÇİLİK", value: "YÜKSEK KALİTE", icon: "Target" },
    ],

    reviewsTitle: "GERÇEK",
    reviewsSubtitle: "GÖRÜŞLER",
    reviewsRatingLabel: "4.9 / 5 Müşteri Memnuniyeti",
    reviewItems: [
        {
            id: "1",
            name: "Ahmet Yılmaz",
            city: "İstanbul",
            rating: 5,
            text: "METALE AKTARILAN DETAYLAR KUSURSUZ. PLAKA SERTLEĞİ VE YÜZEY KALİTESİ BEKLENTİMİN ÜZERİNDE.",
            product: "Borusan Contemporary",
            image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200",
            date: "2 hafta önce"
        },
        {
            id: "2",
            name: "Zeynep Kaya",
            city: "Ankara",
            rating: 5,
            text: "DİKKAT ÇEKİCİ BİR DERİNLİK VAR. DİJİTAL BASKI NETLİĞİ VE RENK DOĞRULUĞU ŞAŞIRTICI.",
            product: "Klasik Porsche",
            image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=200",
            date: "1 ay önce"
        }
    ],

    processTitle: "HASSAS",
    processSubtitle: "İŞÇİLİK",
    processDescription: "HAMMADDEDEN DUVARINIZA: KUSURSUZ DÖNÜŞÜM.",
    processItems: [
        { stepNumber: "ETAP/01", title: "TASARIM SEÇİMİ", desc: "KOLEKSİYONDAN SEÇİN. KARARINIZI NETLEŞTİRİN." },
        { stepNumber: "ETAP/02", title: "DİJİTAL HAZIRLIK", desc: "4K UV BASKI İÇİN PİKSEL KONTROLÜ VE RENK AYARI." },
        { stepNumber: "ETAP/03", title: "METALE AKTARIM", desc: "1.5MM ÇELİK ÜZERİNE YÜKSEK ÇÖZÜNÜRLÜKLÜ BASKI." },
        { stepNumber: "ETAP/04", title: "KORUYUCU AMBALAJ", desc: "MANYETİK APARAT VE DARBE EMİCİ ÖZEL KUTULAMA." },
        { stepNumber: "ETAP/05", title: "LOJİSTİK ÇIKIŞ", desc: "MAKSİMUM 48 SAAT İÇİNDE KARGOYA TESLİM." }
    ],

    contactTitle: "BİZE",
    contactSubtitle: "ERİŞİN",
    contactDescription: "TEKNİK DESTEK VE ÖZEL PROJELER İÇİN OPERASYON MERKEZİ.",
    contactItems: [
        { icon: "PackageCheck", title: "İADE", desc: "14 GÜN KOŞULSUZ İADE POLİTİKASI" },
        { icon: "Phone", title: "TELEFON", desc: "+90 507 165 13 15" },
        { icon: "Mail", title: "E-POSTA", desc: "support@metalposter.co" },
        { icon: "MessageCircle", title: "WHATSAPP", desc: "ANLIK OPERASYON HATTI", color: "text-[#D4AF37]" }
    ],
    inquiryTitle: "Özel Sipariş Sorgulama",
    inquiryDescription: "Mevcut siparişlerinizle ilgili durum takibi yapabilir veya kurumsal projeleriniz için özel teklif isteyebilirsiniz."
};

export const useContentStore = create<ContentStore>()(
    persist(
        (set, get) => ({
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

            fetchContent: async () => {
                const data = await ContentService.getContent();
                if (data) {
                    set((state) => ({
                        content: { ...state.content, ...data }
                    }));
                }
            },

            saveToSupabase: async () => {
                const { content } = get();
                const result = await upsertAdminContent(content);
                return result.success;
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
