import React from 'react';

export const LocalBusinessSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "HomeGoodsStore", // Hem mağaza hem atölye
        "name": "VERAL Torna & Teneke Ticaret",
        "alternateName": "Veral Metal Works",
        "image": [
            "https://www.veralteneketicaret.com/veral-logo.webp",
            "https://www.veralteneketicaret.com/og-image.jpg"
        ],
        "description": "İzmir Alsancak merkezli endüstriyel metal üretim, özel tasarım metal tablolar, CNC torna ve seri imalat atölyesi. Kişiye özel metal dekorasyon ve kurumsal çözümler.",
        "url": "https://www.veralteneketicaret.com",
        "telephone": "+905000000000", // Update with real number if available
        "email": "info@metalposter.pro",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Alsancak Mahallesi", // Daha detaylı adres varsa eklenmeli
            "addressLocality": "Konak",
            "addressRegion": "İzmir",
            "postalCode": "35220",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.4382,
            "longitude": 27.1418
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "09:00",
            "closes": "19:00"
        },
        "priceRange": "₺₺",
        "currenciesAccepted": "TRY",
        "paymentAccepted": "Credit Card, Cash, Bank Transfer",
        "areaServed": {
            "@type": "City",
            "name": "İzmir"
        },
        "hasMap": "https://maps.google.com/?q=Alsancak,Izmir",
        "sameAs": [
            "https://www.instagram.com/veralteneke",
            "https://www.facebook.com/veral"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
