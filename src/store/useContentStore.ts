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
    footerMapLat: string;
    footerMapLng: string;
    footerMapZoom: number;
    footerMapLink: string;

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
    milestones: {
        year: string;
        title: string;
        desc: string;
        icon: string;
    }[];

    // ===== PRODUCTS PAGE (URUNLER) =====
    productsPageTitle: string;
    productsPageSubtitle: string;
    productsPageIntroLabel: string;
    productsPageBackgroundImage: string;
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

    // ===== SERVICE STATS =====
    serviceStats: { value: string; label: string }[];

    // ===== LEGAL PAGES =====
    privacyPolicy: string;
    termsOfService: string;
    kvkkText: string;

    // ===== NAVIGATION SYSTEM (CMS DRIVEN) =====
    menuItems: {
        id: string;
        key: string;
        label: string;
        url: string;
        type: 'link' | 'dropdown' | 'dynamic_catalog';
        children?: { label: string; url: string; }[];
        isPrimary?: boolean;
        visible: boolean;
        order: number;
    }[];

    // ===== CATEGORY SYSTEM =====
    productCategories: {
        id: string;
        title: string;
        slug: string;
        description: string;
        coverImage: string;
        icon: string;
        seoTitle: string;
        seoDescription: string;
        ctaLabel: string;
        ctaLink: string;
        isFeatured: boolean;
        order: number;
    }[];

    // ===== HEADER CONFIGURATION =====
    headerConfig: {
        logoLight: string;
        logoDark: string;
        mode: 'auto' | 'translucent' | 'light' | 'dark';
        transparency: number;
        blur: number; // Backdrop blur in px
        showBorder: boolean;
        shadow: 'none' | 'sm' | 'md' | 'lg';
        ctaText: string;
        ctaLink: string;
        announcementText?: string;
        announcementLink?: string;
        announcementActive: boolean;
    };

    // ===== GLOBAL GRID SYSTEM =====
    globalGridConfig: {
        enabled: boolean;
        style: 'dots' | 'lines' | 'squares';
        intensityLight: number; // 0-100 opacity
        intensityDark: number; // 0-100 opacity
    };

    // ===== SERVICES CMS SYSTEM =====
    services: {
        id: string;
        slug: string;
        title: string;
        shortDescription: string;
        fullDescription: string;
        icon: string;
        image: string;
        seoTitle: string;
        seoDescription: string;
        features: { key: string; value: string }[]; // Technical specs
        applicationAreas: string[]; // Usage areas
        slaText: string; // e.g. "24 Saat İçinde Teklif Garantisi"
        ctaTitle: string;
        ctaLabel: string;
        order: number;
        isActive: boolean;
    }[];

    servicesPageHeader: {
        title: string;
        subtitle: string;
    };

    // ===== PAGE LEVEL TOKENS (OVERRIDES) =====
    pageSettings: {
        path: string; // e.g. "/hakkimizda" or "/"
        theme: 'light' | 'dark';
        headerModeOverride: 'inherit' | 'auto' | 'translucent';
        gridOverride: 'inherit' | 'on' | 'off';
        seoTitle?: string;
        seoDescription?: string;
    }[];

    // ===== THEME CONFIGURATION (Legacy/Fallback) =====
    themeConfig: {
        darkPaths: string[];
    };

    // ===== QUOTE PAGE CONFIGURATION (CMS) =====
    quotePage: {
        title: string;
        subtitle: string;
        description: string;
        headerMode: 'dark' | 'light' | 'auto';
        seoTitle: string;
        seoDescription: string;

        // Form Sections Labels
        contactSectionTitle: string;
        projectSectionTitle: string;
        uploadSectionTitle: string;

        // Field Labels & Placeholders
        nameLabel: string;
        namePlaceholder: string;
        companyLabel: string;
        companyPlaceholder: string;
        emailLabel: string;
        emailPlaceholder: string;
        phoneLabel: string;
        phonePlaceholder: string;

        serviceLabel: string;
        descriptionLabel: string;
        descriptionPlaceholder: string;
        quantityLabel: string;
        quantityPlaceholder: string;
        materialLabel: string;
        materialPlaceholder: string;

        fileLabel: string;
        fileDescription: string;
        maxFiles: number;
        maxSizeMB: number;

        // CTA & Feedback
        submitButtonText: string;
        successTitle: string;
        successMessage: string;

        // Trust Blocks
        trustBlocks: {
            title: string;
            description: string;
            icon: string;
        }[];

        // Dropdown Options
        serviceOptions: string[];
    };

    // ===== CART PAGE CONFIGURATION (CMS) =====
    cartPage: {
        title: string;
        emptyTitle: string;
        emptyDescription: string;
        continueShoppingText: string;
        checkoutButtonText: string;
        shippingIncentiveText: string;
        freeShippingThreshold: number;
        advantageBlocks: { icon: string; text: string }[];
        showProgressBar: boolean;
        relatedProductsTitle: string;
    };

    // ===== CHECKOUT PAGE CONFIGURATION (CMS) =====
    checkoutPage: {
        title: string;
        showStepLabels: boolean;
        stepLabels: {
            shipping: string;
            billing: string;
            payment: string;
        };
        trustBlocks: { icon: string; title: string }[];
        legalText: string;
        successTitle: string;
        successMessage: string;
        completeButtonText: string;
    };
}

interface ContentStore {
    content: SiteContent;
    updateContent: (updates: Partial<SiteContent>) => void;
    updateFaqItem: (index: number, item: { question: string; answer: string }) => void;
    addFaqItem: () => void;
    removeFaqItem: (index: number) => void;
    updateFeatureItem: (index: number, item: SiteContent["featureItems"][0]) => void;
    updateServiceItem: (index: number, item: SiteContent["serviceItems"][0]) => void;
    addServiceItem: () => void;
    removeServiceItem: (index: number) => void;
    updateAboutStat: (index: number, stat: { label: string; value: string }) => void;

    // Navigation & Category Actions
    nav_updateItem: (index: number, item: SiteContent["menuItems"][0]) => void;
    nav_reorder: (newOrder: SiteContent["menuItems"]) => void;
    cat_update: (index: number, item: SiteContent["productCategories"][0]) => void;
    cat_add: () => void;
    cat_remove: (index: number) => void;

    // Supabase Sync Methods
    fetchContent: () => Promise<void>;
    saveToSupabase: () => Promise<boolean>;
}

export const defaultContent: SiteContent = {
    // Branding
    headerLogo: "/logo.svg",
    footerLogo: "/logo-white.svg",
    siteName: "VERAL",

    // Header Defaults
    headerConfig: {
        logoLight: "/logo-white.svg",
        logoDark: "/logo.svg",
        mode: 'translucent',
        transparency: 90,
        blur: 12,
        showBorder: true,
        shadow: 'none',
        ctaText: "TEKLİF AL",
        ctaLink: "/teklif-al",
        announcementText: "YENİ SEZON KOLEKSİYONU YAYINDA",
        announcementLink: "/urunler",
        announcementActive: false
    },

    // Grid Defaults
    globalGridConfig: {
        enabled: true,
        style: 'lines',
        intensityLight: 40,
        intensityDark: 60
    },

    // Services Defaults
    services: [
        {
            id: '1',
            slug: 'takvim-tenekesi',
            title: 'Takvim Tenekesi İmalatı',
            shortDescription: 'İzmir merkezli seri takvim tenekesi üretimi. Özel ölçü ve yüksek kapasite.',
            fullDescription: '40 yılı aşkın tecrübemizle, takvim yayıncıları ve matbaalar için yüksek kaliteli takvim tenekesi üretimi yapıyoruz. Farklı renk ve ölçü seçenekleriyle seri imalat kapasitemizle hizmetinizdeyiz.',
            icon: 'Calendar',
            image: '',
            seoTitle: 'Takvim Tenekesi İmalatı İzmir | VERAL Teneke',
            seoDescription: 'Toptan takvim tenekesi üretimi. İzmir Alsancak merkezli atölyemizde yüksek kapasiteli seri imalat ve Türkiye geneli sevkiyat.',
            features: [
                { key: 'Kapasite', value: 'Günlük 50.000+ Adet' },
                { key: 'Malzeme', value: '0.22 - 0.30mm Teneke' }
            ],
            applicationAreas: ['Matbaalar', 'Ajanslar', 'Yayınevleri'],
            slaText: 'Hızlı Termin Süresi',
            ctaTitle: 'Toptan Sipariş İçin Teklif Alın',
            ctaLabel: 'Teklif Al',
            order: 1,
            isActive: true
        },
        {
            id: '2',
            slug: 'dosya-teli',
            title: 'Dosya Teli Üretimi',
            shortDescription: 'Endüstriyel sınıf dayanıklı dosya teli imalatı. Toptan ve perakende.',
            fullDescription: 'Arşivleme sistemleri ve dosya üreticileri için standart ve özel boylarda dosya teli üretimi yapıyoruz. Paslanmaz yapı ve yüksek esneklik dayanımı.',
            icon: 'FileText',
            image: '',
            seoTitle: 'Dosya Teli İmalatı ve Toptan Satış | VERAL',
            seoDescription: 'İzmir dosya teli üreticisi. Kırtasiye ve arşiv sistemleri için yüksek kaliteli, dayanıklı metal dosya telleri.',
            features: [
                { key: 'Dayanıklılık', value: 'Paslanmaz Kaplama' },
                { key: 'Ölçü', value: 'Standart ve Özel Boy' }
            ],
            applicationAreas: ['Kırtasiye Sektörü', 'Arşiv Merkezleri', 'Dosya İmalatçıları'],
            slaText: 'Stoktan Teslimat',
            ctaTitle: 'Toplu Alım İçin Bize Ulaşın',
            ctaLabel: 'İletişime Geç',
            order: 2,
            isActive: true
        },
        {
            id: '3',
            slug: 'tef-zili',
            title: 'Tef Zili Üretimi',
            shortDescription: 'Profesyonel tef zili imalatı. Akustik kalibrasyon ve özel metal alaşım.',
            fullDescription: 'Müzik aleti üreticileri için yüksek akustik performanslı tef zili üretimi. Pirinç ve çelik alaşım seçenekleriyle, altı köşe ve yuvarlak formlarda seri imalat.',
            icon: 'Music',
            image: '',
            seoTitle: 'Tef Zili İmalatı İzmir | VERAL Metal',
            seoDescription: 'Müzik aletleri için profesyonel tef zili üretimi. Pirinç ve çelik yüzey seçenekleriyle en iyi akustik performans.',
            features: [
                { key: 'Malzeme', value: 'Pirinç / Paslanmaz Çelik' },
                { key: 'Akustik', value: 'Kalibre Edilmiş Ses' }
            ],
            applicationAreas: ['Enstrüman Üreticileri', 'Darbuka Atölyeleri', 'Müzik Marketler'],
            slaText: 'Yüksek Parlaklık Garantisi',
            ctaTitle: 'Özel Öretim Talebi Oluşturun',
            ctaLabel: 'Detay Al',
            order: 3,
            isActive: true
        },
        {
            id: '4',
            slug: 'miknatisli-magnet',
            title: 'Mıknatıslı Magnet & Metal Poster',
            shortDescription: 'UV baskılı dekoratif metal posterler ve güçlü mıknatıslı magnetler.',
            fullDescription: 'Kişiye özel veya seri üretim mıknatıslı magnetler. 4K UV baskı teknolojisi ile metal yüzeylere kalıcı, solmayan görseller aktarıyoruz. Hem dekoratif hem kurumsal çözümler.',
            icon: 'Zap',
            image: '',
            seoTitle: 'Metal Poster & Magnet Üretimi İzmir | VERAL',
            seoDescription: 'Özel tasarım metal posterler ve mıknatıslı magnet imalatı. UV baskı kalitesiyle İzmir dekorasyon çözümleri.',
            features: [
                { key: 'Baskı', value: '4K UV Digital' },
                { key: 'Sistem', value: 'Kolay Manyetik Montaj' }
            ],
            applicationAreas: ['Ev Dekorasyonu', 'Promosyon', 'Hediyelik Eşya'],
            slaText: 'Ömür Boyu Renk Garantisi',
            ctaTitle: 'Kendi Tasarımını Bastır',
            ctaLabel: 'Şimdi Oluştur',
            order: 4,
            isActive: true
        }
    ],

    servicesPageHeader: {
        title: 'Endüstriyel Hizmetlerimiz',
        subtitle: 'Metal işleme ve tasarımda 20 yıllık tecrübe ile kurumsal çözümler.'
    },

    // Page Settings Defaults (Common paths)
    pageSettings: [
        { path: '/', theme: 'dark', headerModeOverride: 'inherit', gridOverride: 'inherit' },
        { path: '/urunler', theme: 'dark', headerModeOverride: 'inherit', gridOverride: 'inherit' },
        { path: '/teklif-al', theme: 'dark', headerModeOverride: 'inherit', gridOverride: 'inherit' },
        { path: '/hakkimizda', theme: 'light', headerModeOverride: 'inherit', gridOverride: 'inherit' },
    ],

    // Theme Fallback (Keep for backward compatibility)
    themeConfig: {
        darkPaths: ['/urunler', '/metal-urunler', '/teklif-al', '/siparis-sorgula', '/product', '/metal-tablolar']
    },


    // Hero
    heroTitle: "İZMİR'İN METAL ÜRETİM MERKEZİ",
    heroSubtitle: "TAKVİM TENEKESİ, DOSYA TELİ VE METAL POSTER İMALATINDA 40 YILLIK TECRÜBE.",
    heroTagline: "ENDÜSTRİYEL METAL ÇÖZÜMLERİ. TAKVİM TENEKESİNDEN ÖZEL METAL POSTERLERE.",
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
            title: "TAKVİM TENEKESİ & DOSYA TELİ",
            description: "SERİ TAKVİM TENEKESİ VE DOSYA TELİ İMALATI. İZMİR MERKEZLİ TÜRKİYE GENELİ SEVKİYAT.",
            image: "/images/production/teneke.jpg",
            features: ["HASSAS KESİM", "KOROZYON DİRENÇLİ", "TOPLU ÜRETİM"],
            exploreUrl: "/hizmetler/takvim-tenekesi"
        },
        {
            title: "METAL POSTER & MAGNET",
            description: "4K UV BASKILI METAL POSTERLER VE MIKNATISLI MAGNET ÜRETİMİ. ÖMÜR BOYU DAYANIKLI RENKLER.",
            image: "/images/production/poster.jpg",
            features: ["UV BASKI", "MIKNATISLI SİSTEM", "KİŞİYE ÖZEL"],
            exploreUrl: "/urunler"
        },
        {
            title: "TEF ZİLİ & METAL AKSESUAR",
            description: "PROFESYONEL TEF ZİLİ İMALATI VE ÖZEL METAL AKSESUAR ÇÖZÜMLERİ. AKUSTİK KALİTE.",
            image: "/images/production/tef.jpg",
            features: ["ALTI KÖŞE ZİL", "PİRİNÇ / ÇELİK", "ÖZEL KAPLAMA"],
            exploreUrl: "/hizmetler/tef-zili"
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
    footerMapLat: "38.4357",
    footerMapLng: "27.1495",
    footerMapZoom: 15,
    footerMapLink: "https://maps.app.goo.gl/VERAL",

    // WhatsApp
    whatsappNumber: "905071651315",
    whatsappMessage: "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.",

    // About Page
    aboutTitle: "HAKKIMIZDA",
    aboutSubtitle: "VERAL TORNA & TENEKE - METAL POSTER ÜRETİCİSİ",
    aboutContent: "İzmir Alsancak'ta 40 yılı aşkın tecrübesiyle faaliyet gösteren VERAL, takvim tenekesi, dosya teli, tef zili ve mıknatıslı magnet imalatında Türkiye'nin öncü firmalarından biridir. Modern UV baskı teknolojimizle ürettiğimiz metal posterler, yaşam alanlarınıza endüstriyel kalite ve sanatsal estetik katıyor. Tüm üretim süreçlerimizde hammadde kalitesini ve müşteri memnuniyetini en üst seviyede tutuyoruz.",
    aboutImage: "/about-image.png",
    aboutStats: [
        { label: "Yıllık Deneyim", value: "5+" },
        { label: "Mutlu Müşteri", value: "1000+" },
        { label: "Ürün Çeşidi", value: "500+" }
    ],
    aboutExploreText: "Hikayemizi Keşfet",
    aboutExploreUrl: "/hakkimizda",
    milestones: [
        {
            year: "1980",
            title: "Temeller",
            desc: "İzmir Alsancak’ta torna ve metal işleme atölyesinin kuruluşu.",
            icon: "Factory"
        },
        {
            year: "1995",
            title: "Teneke İmalat Hattı",
            desc: "Takvim tenekesi ve dosya teli seri üretimi için ilk otomatik hatların devreye alınması.",
            icon: "Target"
        },
        {
            year: "2010",
            title: "2. Nesil Dönüşümü",
            desc: "Üretim süreçlerinde modernizasyon ve kurumsal kimlik çalışmaları.",
            icon: "Users"
        },
        {
            year: "2024",
            title: "3. Nesil & Dijitalleşme",
            desc: "UV baskı teknolojisi ve küresel pazarlar için endüstriyel arşiv sisteminin lansmanı.",
            icon: "Award"
        }
    ],

    // Products Page
    productsPageTitle: "ÜRÜN KATALOĞU",
    productsPageSubtitle: "TÜM METAL POSTER KOLEKSİYONUMUZU KEŞFEDİN",
    productsPageIntroLabel: "Sistem: Katalog Çıktısı",
    productsPageBackgroundImage: "", // Default empty to use CSS gradient/fallback
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
    inquiryDescription: "Mevcut siparişlerinizle ilgili durum takibi yapabilir veya kurumsal projeleriniz için özel teklif isteyebilirsiniz.",

    serviceStats: [
        { value: "±0.01mm", label: "Hassasiyet Toleransı" },
        { value: "24 Saat", label: "Teklif Dönüş Süresi" },
        { value: "15+ Yıl", label: "Sektör Deneyimi" }
    ],

    // Legal
    privacyPolicy: "Gizlilik politikası içeriği buraya gelecek...",
    termsOfService: "Kullanım şartları içeriği buraya gelecek...",
    kvkkText: "KVKK aydınlatma metni içeriği buraya gelecek...",

    // Navigation Defaults
    menuItems: [
        { id: "nav_1", key: "catalog", label: "Katalog", url: "/urunler", type: "dynamic_catalog", visible: true, order: 1 },
        { id: "nav_2", key: "about", label: "Hakkımızda", url: "/hakkimizda", type: "link", visible: true, order: 2 },
        { id: "nav_3", key: "workshop", label: "Metal Atölyesi", url: "/metal-urunler", type: "link", visible: true, order: 3 },
        { id: "nav_4", key: "services", label: "Hizmetler", url: "/hizmetler", type: "link", visible: true, order: 4 },
        { id: "nav_5", key: "order_tracking", label: "Sipariş Sorgula", url: "/siparis-sorgula", type: "link", visible: true, order: 5 },
        { id: "nav_6", key: "quote", label: "Teklif Al", url: "/teklif-al", type: "link", isPrimary: true, visible: true, order: 6 }
    ],

    // Product Categories Defaults
    productCategories: [
        {
            id: "cat_1",
            title: "Metal Tablolar",
            slug: "metal-tablolar",
            description: "Yüksek çözünürlüklü UV baskı ile üretilen dekoratif metal tablolar.",
            coverImage: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1000",
            icon: "Frame",
            seoTitle: "Metal Tablo Modelleri - VERAL",
            seoDescription: "En şık metal tablo modellerini keşfedin.",
            ctaLabel: "Tabloları İncele",
            ctaLink: "/urunler?cat=metal-tablolar",
            isFeatured: true,
            order: 1
        },
        {
            id: "cat_2",
            title: "Teneke Ürünler",
            slug: "teneke-urunler",
            description: "Retro ve endüstriyel tarzda teneke kutu ve levha çözümleri.",
            coverImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000",
            icon: "Box",
            seoTitle: "Teneke Kutu ve Levha - VERAL",
            seoDescription: "Özel üretim teneke kutu ve levha modelleri.",
            ctaLabel: "Tenekeleri Gör",
            ctaLink: "/urunler?cat=teneke-urunler",
            isFeatured: true,
            order: 2
        },
        {
            id: "cat_3",
            title: "Özel Üretim",
            slug: "ozel-uretim",
            description: "Kurumsal ve kişisel projeleriniz için özel metal çözümleri.",
            coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
            icon: "Settings",
            seoTitle: "Özel Metal Üretim - VERAL",
            seoDescription: "Projenize özel metal üretim hizmetleri.",
            ctaLabel: "Teklif İste",
            ctaLink: "/hizmetler/ozel-uretim",
            isFeatured: false,
            order: 3
        }
    ],

    // Quote Page Defaults
    quotePage: {
        title: "Teklif Formu",
        subtitle: "Projeniz İçin Teknik Analiz ve Fiyatlandırma",
        description: "İzmir merkezli atölyemizde endüstriyel metal tasarımı, CNC kesim ve özel üretim projeleriniz için 24 saat içinde teknik değerlendirme ve teklif sunuyoruz.",
        headerMode: "dark",
        seoTitle: "Teklif Al | Özel Metal Üretim ve Tasarım - VERAL Metal Works",
        seoDescription: "Endüstriyel metal projeleriniz, CNC kesim ve özel tasarım talepleriniz için hemen teklif alın. İzmir'in öncü metal atölyesi.",

        contactSectionTitle: "İletişim Bilgileri",
        projectSectionTitle: "Proje Detayları",
        uploadSectionTitle: "Dosya Yükleme",

        nameLabel: "Ad Soyad",
        namePlaceholder: "Adınızı ve soyadınızı giriniz",
        companyLabel: "Firma Adı",
        companyPlaceholder: "Varsa firma adını giriniz (Opsiyonel)",
        emailLabel: "E-posta",
        emailPlaceholder: "Size ulaşabileceğimiz e-posta adresi",
        phoneLabel: "Telefon",
        phonePlaceholder: "05xx xxx xx xx",

        serviceLabel: "Hizmet Türü",
        descriptionLabel: "Proje Açıklaması",
        descriptionPlaceholder: "Projenizle ilgili teknik detayları, beklentilerinizi ve varsa özel notlarınızı buraya yazınız.",
        quantityLabel: "Tahmini Adet",
        quantityPlaceholder: "Örn: 50 adet veya 1.000 metre",
        materialLabel: "Malzeme Türü",
        materialPlaceholder: "Örn: Alüminyum, Paslanmaz Çelik vb. (Opsiyonel)",

        fileLabel: "Teknik Çizim / Görsel",
        fileDescription: "PDF, JPG, PNG veya DXF formatında teknik çizimlerinizi yükleyebilirsiniz.",
        maxFiles: 3,
        maxSizeMB: 10,

        submitButtonText: "Teklif Talebini Gönder",
        successTitle: "Talebiniz Alındı",
        successMessage: "Teklif talebiniz başarıyla tarafımıza ulaştı. Mühendislerimiz projenizi inceleyip 24 saat içinde size geri dönüş yapacaktır.",

        trustBlocks: [
            { title: "24 Saat İçinde Geri Dönüş", description: "Talepleriniz iş günlerinde 24 saat içinde yanıtlanır.", icon: "Clock" },
            { title: "Teknik İnceleme", description: "Mühendislerimiz çizimlerinizi teknik açıdan analiz eder.", icon: "Search" },
            { title: "Ücretsiz Ön Değerlendirme", description: "Projeniz için fizibilite çalışması ücretsiz yapılır.", icon: "CheckCircle" }
        ],

        serviceOptions: [
            "Lazer Kesim & Büküm",
            "Endüstriyel Metal Etiketler",
            "Özel Tasarım Metal Tablolar",
            "Seri Üretim Teneke Kutu/Levha",
            "Mimari Metal Detaylar",
            "Diğer / Özel Proje"
        ]
    },

    // Cart Page Defaults
    cartPage: {
        title: "SEPETİM",
        emptyTitle: "SEPETİNİZ BOŞ",
        emptyDescription: "HENÜZ SEPETE ÜRÜN EKLEMEDİNİZ. KOLEKSİYONUMUZU KEŞFEDİN.",
        continueShoppingText: "ALIŞVERİŞE DEVAM ET",
        checkoutButtonText: "ÖDEMEYE GEÇ",
        shippingIncentiveText: "₺{amount} DAHA EKLEYİN, ÜCRETSİZ KARGO KAZANIN!",
        freeShippingThreshold: 500,
        advantageBlocks: [
            { icon: "ShieldCheck", text: "GÜVENLİ ÖDEME (SSL)" },
            { icon: "RotateCcw", text: "14 GÜN İADE GARANTİSİ" },
            { icon: "Factory", text: "YERLİ ÜRETİM" },
            { icon: "Zap", text: "HIZLI KARGO" }
        ],
        showProgressBar: true,
        relatedProductsTitle: "BUNLAR DA İLGİNİZİ ÇEKEBİLİR"
    },

    // Checkout Page Defaults
    checkoutPage: {
        title: "ÖDEME PROTOKOLÜ",
        showStepLabels: true,
        stepLabels: {
            shipping: "01 TESLİMAT BİLGİLERİ",
            billing: "02 FATURA BİLGİLERİ",
            payment: "03 ÖDEME"
        },
        trustBlocks: [
            { icon: "Lock", title: "SSL GÜVENLİ ÖDEME" },
            { icon: "CheckCircle", title: "KVKK UYUMLU" },
            { icon: "CreditCard", title: "IYZICO ALTYAPISI" }
        ],
        legalText: "Siparişi tamamlayarak <a href='/sartlar' class='underline'>Satış Sözleşmesi</a>'ni kabul etmiş olursunuz.",
        successTitle: "SİPARİŞİNİZ ALINDI",
        successMessage: "SİPARİŞİNİZ BAŞARIYLA OLUŞTURULDU. DETAYLAR E-POSTA ADRESİNİZE GÖNDERİLDİ.",
        completeButtonText: "SİPARİŞİ TAMAMLA"
    }
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

            addServiceItem: () => {
                set((state) => ({
                    content: {
                        ...state.content,
                        serviceItems: [
                            ...state.content.serviceItems,
                            {
                                title: "YENİ HİZMET",
                                description: "Hizmet açıklaması...",
                                image: "/placeholder.png",
                                features: ["Özellik 1"],
                                exploreUrl: "/hizmetler"
                            }
                        ]
                    }
                }));
            },

            removeServiceItem: (index) => {
                set((state) => ({
                    content: {
                        ...state.content,
                        serviceItems: state.content.serviceItems.filter((_, i) => i !== index)
                    }
                }));
            },

            updateAboutStat: (index, stat) => {
                set((state) => {
                    const newStats = [...state.content.aboutStats];
                    newStats[index] = stat;
                    return { content: { ...state.content, aboutStats: newStats } };
                });
            },

            // ===== NAVIGATION & CATEGORY ACTIONS =====
            nav_updateItem: (index, item) => {
                set((state) => {
                    const newItems = [...state.content.menuItems];
                    newItems[index] = item;
                    newItems.sort((a, b) => a.order - b.order);
                    return { content: { ...state.content, menuItems: newItems } };
                });
            },

            nav_reorder: (newOrder) => {
                set((state) => ({
                    content: { ...state.content, menuItems: newOrder }
                }));
            },

            cat_update: (index, item) => {
                set((state) => {
                    const newCats = [...state.content.productCategories];
                    newCats[index] = item;
                    return { content: { ...state.content, productCategories: newCats } };
                });
            },

            cat_add: () => {
                set((state) => ({
                    content: {
                        ...state.content,
                        productCategories: [
                            ...state.content.productCategories,
                            {
                                id: `cat_${Date.now()}`,
                                title: "Yeni Kategori",
                                slug: "yeni-kategori",
                                description: "Açıklama giriniz...",
                                coverImage: "",
                                icon: "Box",
                                seoTitle: "",
                                seoDescription: "",
                                ctaLabel: "İncele",
                                ctaLink: "#",
                                isFeatured: false,
                                order: state.content.productCategories.length + 1
                            }
                        ]
                    }
                }));
            },

            cat_remove: (index) => {
                set((state) => ({
                    content: {
                        ...state.content,
                        productCategories: state.content.productCategories.filter((_, i) => i !== index)
                    }
                }));
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
            version: 9,
            migrate: (persistedState: any, version: number) => {
                const newState = { ...persistedState };
                if (version < 8) {
                    newState.content = {
                        ...defaultContent,
                        ...newState.content,
                        headerConfig: {
                            ...defaultContent.headerConfig,
                            ...(newState.content?.headerConfig || {})
                        },
                        quotePage: {
                            ...defaultContent.quotePage,
                            ...(newState.content?.quotePage || {})
                        },
                        globalGridConfig: newState.content?.globalGridConfig || defaultContent.globalGridConfig,
                        services: newState.content?.services || defaultContent.services,
                        servicesPageHeader: newState.content?.servicesPageHeader || defaultContent.servicesPageHeader,
                        pageSettings: newState.content?.pageSettings || defaultContent.pageSettings,
                        themeConfig: newState.content?.themeConfig || defaultContent.themeConfig,
                        cartPage: {
                            ...defaultContent.cartPage,
                            ...(newState.content?.cartPage || {})
                        },
                        checkoutPage: {
                            ...defaultContent.checkoutPage,
                            ...(newState.content?.checkoutPage || {})
                        },
                    };
                }
                if (version < 9) {
                    newState.content = {
                        ...newState.content,
                        cartPage: {
                            ...defaultContent.cartPage,
                            ...(newState.content?.cartPage || {})
                        },
                        checkoutPage: {
                            ...defaultContent.checkoutPage,
                            ...(newState.content?.checkoutPage || {})
                        },
                    };
                }
                return newState;
            },
        }
    )
);
