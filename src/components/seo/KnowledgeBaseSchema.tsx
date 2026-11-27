import React from 'react';

export const KnowledgeBaseSchema = () => {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Toptan dosya teli nerede üretilir ve fiyatları nasıldır?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VERAL Torna olarak İzmir Alsancak tesisimizde toptan dosya teli üretimi yapmaktayız. Arşiv ve kırtasiye sektörü için paslanmaz, yüksek esneklikte dosya telleri imal ediyoruz. Direkt üreticiden en uygun dosya teli fiyatları için WhatsApp üzerinden teklif alabilirsiniz."
                }
            },
            {
                "@type": "Question",
                "name": "Takvim tenekesi imalatı boyutları ve üretim kapasiteniz nedir?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Takvim tenekesi yaparız. Sitede görünen boylar 31, 33 ve 48 cm'dir. Adedi yazın, fiyatı söyleyelim."
                }
            },
            {
                "@type": "Question",
                "name": "Tef zili ve metal aksesuar imalatı yapıyor musunuz?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet. Tef zili üretimi ve metal aksesuar hatlarımızda seri imalat yapıyoruz. Müzik endüstrisi ve özel proje talepleri için teklif formu veya WhatsApp üzerinden ulaşabilirsiniz."
                }
            },
            {
                "@type": "Question",
                "name": "Metal poster yapıyor musunuz?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet. Alsancak atölyesinde metal poster yapıyoruz."
                }
            }
        ]
    };

    const productKnowledgeSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "VERAL Metal Endüstriyel Üretim - Dosya Teli ve Takvim Tenekesi",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Toptan Dosya Teli İmalatı",
                "description": "Kırtasiye, ofis ve arşivleme firmaları için toptan metal dosya teli üretimi."
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Takvim Tenekesi Üreticisi",
                "description": "Matbaalar için seri üretim, özel ebat takvim tenekesi (takvim çıtası) imalatı."
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Tef Zili & Metal Aksesuar",
                "description": "Profesyonel tef zili ve metal aksesuar seri imalatı."
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Metal poster",
                "description": "Dekoratif metal poster ve magnet — ikincil perakende hat."
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
