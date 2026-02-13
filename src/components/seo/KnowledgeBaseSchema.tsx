import React from 'react';

export const KnowledgeBaseSchema = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Dosya teli nedir ve nerede kullanılır?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Dosya teli, arşivleme ve dosyalama işlemlerinde kağıtların bir arada tutulmasını sağlayan metal mekanizmadır. VERAL olarak endüstriyel standartlarda, dayanıklı ve esnek dosya telleri üretiyoruz."
                }
            },
            {
                "@type": "Question",
                "name": "Metal posterlerin özellikleri nelerdir?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Metal posterlerimiz 1.5mm yüksek kalite alüminyum veya teneke plaka üzerine UV dijital baskı teknolojisi ile üretilir. Sudan etkilenmez, solma yapmaz ve mıknatıslı montaj sistemi ile duvara zarar vermeden asılabilir."
                }
            },
            {
                "@type": "Question",
                "name": "Tef zili ve takvim tenekesi imalatı yapıyor musunuz?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet, VERAL Torna olarak 40 yılı aşkın süredir profesyonel tef zili ve takvimler için üst-alt teneke çıta imalatı yapmaktayız. İzmir Alsancak'taki tesisimizde seri üretim kapasitemiz mevcuttur."
                }
            }
        ]
    };

    const productKnowledgeSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "VERAL Endüstriyel Ürün Kataloğu",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Dosya Teli (Mekanimzalı)",
                "description": "Ofis ve arşivleme için yüksek dayanımlı metal dosya teli."
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Takvim Tenekesi",
                "description": "Mali yıl ve özel takvimler için metal çıta ve askı sistemleri."
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Tef Zili",
                "description": "Profesyonel vuruşlu çalgılar için pirinç ve metal alaşımlı ziller."
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productKnowledgeSchema) }}
            />
        </>
    );
};
