// MP-07: Static Service Definitions (LOCKED)

import { Service } from './types';

export const SERVICES: Service[] = [
    {
        id: 'torna-cnc',
        slug: 'torna-cnc-isleme',
        title: 'Torna & CNC İşleme',
        shortDescription: 'Hassas toleranslı metal parça imalatı. CNC torna ve freze ile prototip ve seri üretim.',
        technicalDescription: 'CNC torna ve freze tezgahlarımızla, sac, alüminyum, pirinç ve paslanmaz metal malzemelerden hassas parça imalatı yapıyoruz. Prototipten seri üretime kadar tüm aşamalarda hizmet veriyoruz.',
        useCases: [
            'Makine parçası imalatı',
            'Prototip üretim',
            'Özel tasarım bileşenler',
            'Yedek parça imalatı'
        ],
        technicalNotes: {
            tolerances: '±0.01mm hassasiyet',
            materials: 'Metal, Alüminyum, Pirinç, Paslanmaz',
            quantities: 'Tek parçadan seri üretime'
        },
        icon: '⚙️'
    },
    {
        id: 'ozel-metal',
        slug: 'ozel-metal-uretim',
        title: 'Özel Metal Üretim',
        shortDescription: 'Teknik çizime göre özel metal parça ve yapı imalatı. Kaynak, büküm, kesim işlemleri.',
        technicalDescription: 'Teknik çizimlerinize göre özel metal yapılar, kasalar, muhafazalar ve endüstriyel parçalar üretiyoruz. Lazer kesim, CNC büküm ve profesyonel kaynak işlemleri ile projelerinizi hayata geçiriyoruz.',
        useCases: [
            'Endüstriyel kasalar',
            'Metal muhafazalar',
            'Özel konstrüksiyon',
            'Makine gövdeleri'
        ],
        technicalNotes: {
            materials: 'Sac, profil, boru - tüm metal türleri',
            quantities: 'Prototip ve seri üretim'
        },
        icon: '🔧'
    },
    {
        id: 'seri-imalat',
        slug: 'seri-imalat',
        title: 'Seri İmalat',
        shortDescription: 'Yüksek hacimli metal parça üretimi. Tekrar eden siparişler için optimize edilmiş süreç.',
        technicalDescription: 'Seri üretim için optimize edilmiş süreçlerimizle, tutarlı kalitede yüksek hacimli metal parça imalatı yapıyoruz. CNC otomasyon ve kalite kontrol sistemlerimiz ile hatasız üretim garantisi.',
        useCases: [
            'Toplu parça siparişleri',
            'OEM üretim',
            'Stok parça imalatı',
            'Düzenli tedarik'
        ],
        technicalNotes: {
            quantities: 'Minimum 100 adet',
            tolerances: 'Seri üretimde tutarlı tolerans'
        },
        icon: '🏭'
    },
    {
        id: 'metal-etiket',
        slug: 'metal-etiket-endustriyel',
        title: 'Metal Etiket & Endüstriyel Etiketleme',
        shortDescription: 'Dayanıklı metal etiket, seri numarası plakası ve endüstriyel işaretleme çözümleri.',
        technicalDescription: 'Lazer kazıma, baskı ve kabartma teknikleri ile kalıcı metal etiketler üretiyoruz. Makine plakaları, seri numarası etiketleri, uyarı levhaları ve kurumsal metal tabelalar.',
        useCases: [
            'Makine seri numarası plakaları',
            'Uyarı ve güvenlik levhaları',
            'Kurumsal metal tabelalar',
            'QR kodlu takip etiketleri'
        ],
        technicalNotes: {
            materials: 'Alüminyum, Paslanmaz Metal, Pirinç',
            quantities: 'Tek adetten binlerce adete'
        },
        icon: '🏷️'
    }
];

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find(s => s.slug === slug);
}

export function getAllServices(): Service[] {
    return SERVICES;
}
