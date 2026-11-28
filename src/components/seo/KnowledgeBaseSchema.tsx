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
                    "text": "Alsancak'ta dosya teli imalatı. Boylar: 14, 15, 17, 21, 24 cm ve akrep tel."
                }
            },
            {
                "@type": "Question",
                "name": "Takvim tenekesi imalatı boyutları ve üretim kapasiteniz nedir?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Takvim tenekesi imalatı. Boylar: 31, 33 ve 48 cm."
                }
            },
            {
                "@type": "Question",
                "name": "Tef zili imalatı var mı?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet. Tef zili imalatı. Görünen çap 38 mm."
                }
            },
            {
                "@type": "Question",
                "name": "Metal poster imalatı var mı?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet. Alsancak atölyesinde metal poster imalatı."
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
