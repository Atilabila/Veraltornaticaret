export type BlogPostSummary = {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    featured: boolean;
    tags: string[];
};

export const blogPosts: BlogPostSummary[] = [
    {
        id: "takvim-tenekesi-imalati-izmir",
        title: "Takvim Tenekesi İmalatı: İzmir'de Seri Üretim ve DIN Kalite Standartları",
        excerpt: "Takvim yayıncılığı ve matbaalar için kritik parametreler: teneke kalınlığı, çift kanal koruyucu büküm radüsü ve korozyon direnci analizleri.",
        category: "ENDÜSTRİYEL İMALAT",
        date: "03.02.2026",
        readTime: "6 Dakika",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        featured: true,
        tags: ["Takvim Tenekesi", "Seri İmalat", "Alsancak", "DIN EN 10202"],
    },
    {
        id: "dosya-teli-ve-arsiv-sistemleri",
        title: "Dosya Teli Üretiminde Malzeme Bilimi: Paslanmaz ve Yüksek Elastikiyet",
        excerpt: "Devlet arşivleri ve kurumsal ofisler için polimer kaplı çelik dosya teli incelemesi: polimer kaplama ve 96 saatlik tuz sisi korozyon testleri.",
        category: "KIRTASİYE EKİPMANLARI",
        date: "03.02.2026",
        readTime: "5 Dakika",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        featured: false,
        tags: ["Dosya Teli", "Arşiv", "Polimer Kaplama", "Mekanik Direnç"],
    },
    {
        id: "giyotin-sac-kesim-ve-tolerans-standartlari",
        title: "CNC Giyotin Sac Kesiminde Tolerans ve Çapaksız Gönye Kriterleri",
        excerpt: "0.15 mm - 3.00 mm sac kalınlıklarında lif düzlemini bozmadan yapılan ±0.05 mm hassasiyetindeki endüstriyel makas ebatlama yöntemleri.",
        category: "ENDÜSTRİYEL İMALAT",
        date: "18.01.2026",
        readTime: "7 Dakika",
        image: "/images/services/giyotin-kesim.webp",
        featured: true,
        tags: ["Giyotin Kesim", "CNC Makas", "Tolerans", "DKP Sac"],
    },
    {
        id: "miknatisli-magnet-ve-metal-poster-estetigi",
        title: "Mıknatıslı Metal Posterler: N35 Neodimyum Askı Sistemi ile Duvarı Delmeden Montaj",
        excerpt: "Duvar delme, çivi ve matkap gerektirmeyen 3M VHB manyetik tutucu teknolojisi ve 1.5 mm çelik plaka üzerinde 4K UV kürlemeli mikronize baskı.",
        category: "DEKORASYON & SANAT",
        date: "10.01.2026",
        readTime: "8 Dakika",
        image: "/images/services/metal-tabelalar.webp",
        featured: false,
        tags: ["Metal Poster", "Neodimyum", "Manyetik Montaj", "UV Kürleme"],
    },
    {
        id: "endustriyel-metal-baski-rehberi",
        title: "Endüstriyel 4K UV Metal Baskı: Fırın Kürleme ve Güneş Solmazlığı Analizi",
        excerpt: "Metal levhalarda 1200 DPI piezoelektrik baskı ve çift kat vernik kürleme. Dış mekan, nem ve UV ışınlarına karşı 10 yıllık dayanım karşılaştırması.",
        category: "ENDÜSTRİYEL BASKI",
        date: "05.01.2026",
        readTime: "8 Dakika",
        image: "/hero-izmir-metal-poster.jpg",
        featured: false,
        tags: ["4K UV Baskı", "Vernik Kürleme", "Solmazlık", "Alsancak Zanaat"],
    },
    {
        id: "rulo-sac-dilme-slitting-hatlari",
        title: "Rulo Teneke Sac Dilimleme (Slitting) ve Dar Şerit Sarım Mühendisliği",
        excerpt: "Dairesel çelik disk bıçaklarla minimum 8 mm genişliğe kadar mikron toleranslı rulo dilme ve neme dayanıklı ambalajlama operasyonları.",
        category: "ENDÜSTRİYEL İMALAT",
        date: "28.12.2025",
        readTime: "6 Dakika",
        image: "/images/services/rulo-dilimleme.webp",
        featured: false,
        tags: ["Rulo Dilme", "Slitting", "Şerit Sac", "Alsancak Hat"],
    },
];
