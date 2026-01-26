// =====================================================
// B2B SERVICES DATA
// =====================================================
// MP-07: Service definitions for /hizmetler

export interface Service {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    technicalNotes: string[];
    useCases: string[];
    image?: string;
    icon?: string;
}

export const SERVICES: Service[] = [
    {
        id: 'torna',
        slug: 'torna',
        name: 'CNC Torna İşleme',
        shortDescription: 'Hassas toleranslı metal parça üretimi. Ø2mm - Ø200mm arası işleme kapasitesi.',
        fullDescription: 'CNC torna tezgahlarımızda yüksek hassasiyetli metal parça üretimi yapıyoruz. Prototipten seri üretime kadar tüm aşamalarda hizmet veriyoruz.',
        technicalNotes: [
            'Tolerans: ±0.01mm',
            'Malzeme: Alüminyum, Paslanmaz, Pirinç, Çelik',
            'Çap aralığı: Ø2mm - Ø200mm',
            'Uzunluk: Max 500mm'
        ],
        useCases: [
            'Endüstriyel makine parçaları',
            'Otomotiv komponentleri',
            'Prototip üretimi',
            'Özel tasarım parçalar'
        ],
        icon: '⚙️'
    },
    {
        id: 'ozel-metal-uretim',
        slug: 'ozel-metal-uretim',
        name: 'Özel Metal Ürün Üretimi',
        shortDescription: 'Teknik çiziminize göre özel metal ürün tasarım ve üretimi.',
        fullDescription: 'CAD çizimlerinizden veya fiziksel örneklerinizden yola çıkarak özel metal ürünler üretiyoruz. Lazer kesim, büküm, kaynak ve montaj hizmetleri.',
        technicalNotes: [
            'Malzeme kalınlığı: 0.5mm - 10mm',
            'Lazer kesim hassasiyeti: ±0.1mm',
            'Büküm açısı toleransı: ±0.5°',
            'Kaynak: TIG, MIG, nokta kaynak'
        ],
        useCases: [
            'Makine kasaları',
            'Elektrik panoları',
            'Özel aparatlar',
            'Endüstriyel mobilyalar'
        ],
        icon: '🔧'
    },
    {
        id: 'seri-imalat',
        slug: 'seri-imalat',
        name: 'Seri İmalat',
        shortDescription: 'Yüksek hacimli metal parça üretimi. Min. 100 adet, max. sınırsız.',
        fullDescription: 'Onaylanmış prototipinizin seri üretimine geçiyoruz. Kalite kontrol ve zamanında teslimat garantisi.',
        technicalNotes: [
            'Minimum sipariş: 100 adet',
            'Tekrar üretim toleransı: %100 uyum',
            'Kalite kontrol: Her 50 parçada 1',
            'Teslimat: 2-4 hafta (hacme göre)'
        ],
        useCases: [
            'Toptan metal aksesuar',
            'Makine yedek parçaları',
            'OEM üretim',
            'İhracat siparişleri'
        ],
        icon: '📦'
    },
    {
        id: 'metal-etiket',
        slug: 'metal-etiket',
        name: 'Metal Etiket & Plaka',
        shortDescription: 'Endüstriyel metal etiket, seri numarası plakası, uyarı levhaları.',
        fullDescription: 'Lazer gravür, UV baskı veya kazıma yöntemiyle dayanıklı metal etiketler üretiyoruz. İç/dış mekan kullanımına uygun.',
        technicalNotes: [
            'Malzeme: Alüminyum, Paslanmaz, Pirinç',
            'Baskı: UV statik, lazer gravür',
            'Boyut: 20x20mm - 300x200mm',
            'Dayanıklılık: 10+ yıl (dış mekan)'
        ],
        useCases: [
            'Makine seri numarası plakaları',
            'Güvenlik uyarı levhaları',
            'Marka logoları',
            'QR kodlu takip etiketleri'
        ],
        icon: '🏷️'
    }
];

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find(s => s.slug === slug);
}
