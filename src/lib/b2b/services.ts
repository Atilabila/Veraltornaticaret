// B2B manufacturing services — aligned with CMS /hizmetler slugs

import { Service } from './types';

export const SERVICES: Service[] = [
    {
        id: 'dosya-teli',
        slug: 'dosya-teli',
        title: 'Dosya Teli Üretimi',
        shortDescription: 'Endüstriyel sınıf dayanıklı dosya teli imalatı. Toptan ve perakende.',
        technicalDescription: 'Arşivleme sistemleri ve dosya üreticileri için standart ve özel boylarda dosya teli üretimi yapıyoruz. Paslanmaz yapı ve yüksek esneklik dayanımı.',
        useCases: [
            'Kırtasiye toptan sipariş',
            'Arşiv merkezi tedarik',
            'Dosya imalatçıları',
            'Özel ölçü seri üretim'
        ],
        technicalNotes: {
            materials: 'Paslanmaz kaplama, standart ve özel boy',
            quantities: 'MOQ — stoktan veya terminli'
        },
        icon: '📎'
    },
    {
        id: 'takvim-tenekesi',
        slug: 'takvim-tenekesi',
        title: 'Takvim Tenekesi İmalatı',
        shortDescription: 'İzmir merkezli seri takvim tenekesi üretimi. Özel ölçü ve yüksek kapasite.',
        technicalDescription: '40 yılı aşkın tecrübemizle, takvim yayıncıları ve matbaalar için yüksek kaliteli takvim tenekesi üretimi yapıyoruz.',
        useCases: [
            'Matbaa seri sipariş',
            'Ajans / yayınevi',
            'Özel ebat tenekesi',
            'Türkiye geneli sevkiyat'
        ],
        technicalNotes: {
            materials: '0.22 - 0.30mm teneke',
            quantities: 'Günlük 50.000+ adet kapasite'
        },
        icon: '📅'
    },
    {
        id: 'tef-zili',
        slug: 'tef-zili',
        title: 'Tef Zili Üretimi',
        shortDescription: 'Profesyonel tef zili imalatı. Akustik kalibrasyon ve özel metal alaşım.',
        technicalDescription: 'Müzik aleti üreticileri için yüksek akustik performanslı tef zili üretimi. Pirinç ve metal alaşım seçenekleriyle seri imalat.',
        useCases: [
            'Enstrüman üreticileri',
            'Darbuka atölyeleri',
            'Müzik market toptan',
            'Özel kaplama talepleri'
        ],
        technicalNotes: {
            materials: 'Pirinç / paslanmaz metal',
            quantities: 'Seri ve özel üretim'
        },
        icon: '🔔'
    },
    {
        id: 'miknatisli-magnet',
        slug: 'miknatisli-magnet',
        title: 'Mıknatıslı Magnet & Metal Poster',
        shortDescription: 'UV baskılı dekoratif metal posterler ve mıknatıslı magnetler — üçüncü hat.',
        technicalDescription: 'Kişiye özel veya seri üretim mıknatıslı magnetler ve UV baskılı metal posterler. Kurumsal promosyon ve dekorasyon.',
        useCases: [
            'Kurumsal promosyon',
            'Ev / ofis dekorasyonu',
            'Hediyelik seri üretim',
            'Özel tasarım UV baskı'
        ],
        technicalNotes: {
            materials: 'Metal levha, manyetik sistem',
            quantities: 'Küçük adet — teklif bazlı'
        },
        icon: '🧲'
    },
    {
        id: 'diger-imalat',
        slug: 'diger-imalat',
        title: 'Diğer İmalat / Özel Proje',
        shortDescription: 'Listede olmayan metal ve teneke imalat talepleri için serbest proje alanı.',
        technicalDescription: 'Özel ölçü, malzeme ve termin gerektiren metal / teneke imalat projeleriniz için teknik inceleme ve teklif sunuyoruz.',
        useCases: [
            'Özel metal parça',
            'Teneke kutu / levha',
            'Seri imalat dışı proje',
            'Kurumsal özel üretim'
        ],
        technicalNotes: {
            quantities: 'Proje bazlı'
        },
        icon: '⚙️'
    }
];

export function getServiceBySlug(slug: string): Service | undefined {
    return SERVICES.find(s => s.slug === slug);
}

export function getAllServices(): Service[] {
    return SERVICES;
}
