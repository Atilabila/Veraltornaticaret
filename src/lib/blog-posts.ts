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
    content: string;
};

export const blogPosts: BlogPostSummary[] = [
    {
        id: "takvim-tenekesi-imalati-izmir",
        title: "Takvim tenekesi",
        excerpt: "Duvar takviminin kenarına geçen metal çıta. Boylar: 31, 33 ve 48 cm.",
        category: "Atölye",
        date: "03.02.2026",
        readTime: "1 dakika",
        image: "/images/services/takvim-tenekeleri-detay.webp",
        featured: true,
        tags: ["Takvim tenekesi", "Alsancak"],
        content: `
Takvim tenekesi imalatı. Duvar takviminin kenarına geçen metal parça.

Boylar: 31, 33 ve 48 cm. Askılı veya askısız. Fiyat için yazışma.
        `.trim(),
    },
    {
        id: "dosya-teli-ve-arsiv-sistemleri",
        title: "Dosya teli",
        excerpt: "Dosya ve arşiv işi için tel. Boylar: 14, 15, 17, 21, 24 cm ve akrep tel.",
        category: "Atölye",
        date: "03.02.2026",
        readTime: "1 dakika",
        image: "/images/services/dosya-teli-plastik-takim.webp",
        featured: false,
        tags: ["Dosya teli", "Alsancak"],
        content: `
Dosya teli, dosya ve arşiv işi için üretilir.

Boylar: 14, 15, 17, 21 ve 24 cm. Akrep tel. Fiyat için yazışma.
        `.trim(),
    },
    {
        id: "giyotin-sac-kesim-ve-tolerans-standartlari",
        title: "Giyotin sac kesim",
        excerpt: "Ölçüye göre sac ve teneke kesimi.",
        category: "Atölye",
        date: "18.01.2026",
        readTime: "1 dakika",
        image: "/images/services/giyotin-kesim.webp",
        featured: false,
        tags: ["Giyotin", "Sac kesim"],
        content: `
Giyotin ile sac ve teneke kesimi.

Ölçü yazılır. Fiyat teklifte bildirilir.
        `.trim(),
    },
    {
        id: "miknatisli-magnet-ve-metal-poster-estetigi",
        title: "Mıknatıslı metal poster",
        excerpt: "Metal levhaya baskı. Mıknatıslı asılan poster de yapılır.",
        category: "Atölye",
        date: "10.01.2026",
        readTime: "1 dakika",
        image: "/images/services/metal-tabelalar.webp",
        featured: false,
        tags: ["Metal poster", "Baskı"],
        content: `
Metal levhaya baskı yaparız. Mıknatıslı asılan poster de vardır.

Ölçü ve adet. Fiyat için yazışma.
        `.trim(),
    },
    {
        id: "endustriyel-metal-baski-rehberi",
        title: "Metal baskı",
        excerpt: "Tabela ve poster için metal levhaya baskı yapılır.",
        category: "Atölye",
        date: "05.01.2026",
        readTime: "1 dakika",
        image: "/hero-izmir-metal-poster.jpg",
        featured: false,
        tags: ["Metal baskı", "Alsancak"],
        content: `
Tabela ve poster için metal levhaya baskı yaparız.

Basılacak görsel ve ölçü. Fiyat için yazışma.
        `.trim(),
    },
    {
        id: "rulo-sac-dilme-slitting-hatlari",
        title: "Rulo sac dilimleme",
        excerpt: "Rulo sacın şerit olarak dilimlenmesi.",
        category: "Atölye",
        date: "28.12.2025",
        readTime: "1 dakika",
        image: "/images/services/rulo-dilimleme.webp",
        featured: false,
        tags: ["Rulo dilimleme", "Sac"],
        content: `
Rulo sacın şerit olarak dilimlenmesi.

En ve miktar yazılır. Fiyat teklifte bildirilir.
        `.trim(),
    },
];
