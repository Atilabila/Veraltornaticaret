export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    description: string;
    story: string;
    category: string;
    specs: Record<string, string>;
    seo?: {
        title: string;
        description: string;
        keywords: string[];
    };
    // Legacy fields for backward compatibility
    images?: string[];
}

export const PRODUCTS_DATA: Record<string, Product> = {
    "dosya-teli": {
        id: "dosya-teli",
        name: "Veral Industrial | Endüstriyel Dosya Teli",
        slug: "dosya-teli",
        price: 50,
        image: "/catalog/metal-etiket.png",
        category: "SERİ ÜRETİM",
        description: "Veral Torna güvencesiyle üretilen dosya telleri, yüksek paslanmazlık direnci ve esneklik dengesiyle kurumsal arşiv dökümantasyon süreçleriniz için en güvenilir çözümü sunar. 1980'den beri geliştirdiğimiz form verme teknikleriyle, her telde aynı hassasiyeti garanti ediyoruz.",
        story: "1980'lerden bu yana Alsancak'taki atölyemizde binlerce kurumsal firmanın arşiv sistemlerine can verdik. Çelik telin form alışındaki o kusursuzluk, bizim sanayiye olan saygımızın bir nişanıdır.",
        specs: {
            "Malzeme": "Yay Çeliği / Galvaniz",
            "Kalınlık": "0.8mm - 1.2mm",
            "Kaplama": "Elektro-Galvaniz",
            "Üretim Tipi": "Otomatik Form Verme",
            "Kalite Kontrol": "ISO 9001 Standartı"
        },
        images: ["/catalog/metal-etiket.png"]
    },
    "metal-poster": {
        id: "metal-poster",
        name: "Veral Industrial | Premium Metal Poster",
        slug: "metal-poster",
        price: 350,
        image: "/catalog/cars/cars_01.webp",
        category: "PREMIUM",
        description: "Sanatın endüstriyel dayanıklılıkla buluştuğu nokta. Veral Industrial'ın torna hassasiyetiyle kenarları işlenmiş 1.5mm kalınlığındaki alüminyum plakalar, duvarlarınıza ömür boyu sürecek bir derinlik katar.",
        story: "Metalin soğuk dokusu üzerine işlenen canlı renkler, bir posterden fazlasını sunuyor. Her bir plaka, endüstriyel mirasımızın bir parçasını modern evlere taşıyor.",
        specs: {
            "Plaka": "1.5mm Alüminyum",
            "Kenar": "Pahlama İşlemi (Smooth)",
            "Baskı": "Direct UV (6 Renk)",
            "Kesim": "Lazer Giyotin",
            "Montaj": "Mıknatıs Kiti Dahil"
        },
        images: ["/catalog/cars/cars_01.webp"]
    }
};

export const PRODUCTS: Product[] = Object.values(PRODUCTS_DATA);
