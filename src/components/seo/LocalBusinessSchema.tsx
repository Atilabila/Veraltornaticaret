import React from 'react';

export const LocalBusinessSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VERAL Torna & Teneke Ticaret - İzmir Metal Poster & İmalat",
        "alternateName": "Veral Teneke",
        "image": [
            "https://www.veralteneketicaret.com/veral-logo.webp",
            "https://www.veralteneketicaret.com/og-image.jpg"
        ],
        "description": "İzmir Alsancak merkezli VERAL Torna, takvim tenekesi, dosya teli, metal poster, mıknatıslı magnet ve tef zili üretimi yapmaktadır. 40 yılı aşkın tecrübe ile Türkiye geneli metal imalat çözümleri.",
        "url": "https://www.veralteneketicaret.com",
        "telephone": "+905071651315",
        "email": "info@metalposter.pro",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1512 Sk. No: 42/1 Alsancak Mahallesi",
            "addressLocality": "Konak",
            "addressRegion": "İzmir",
            "postalCode": "35210",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.4357,
            "longitude": 27.1495
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
            "closes": "18:00"
        },
        "priceRange": "₺₺",
        "currenciesAccepted": "TRY",
        "paymentAccepted": "WhatsApp, Bank Transfer, Cash",
        "areaServed": {
            "@type": "Country",
            "name": "Türkiye"
        },
        "hasMap": "https://maps.app.goo.gl/VERAL",
        "sameAs": [
            "https://www.instagram.com/veralticaret",
            "https://www.facebook.com/veral"
        ],
        "keywords": "takvim tenekesi, dosya teli, metal poster, mıknatıslı magnet, tef zili, izmir metal imalat, metal baskı izmir"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
