import React from 'react';

export const LocalBusinessSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VERAL Torna & Teneke Ticaret - İzmir Metal Poster, Dosya Teli & Takvim Tenekesi İmalatı",
        "alternateName": "Veral Teneke",
        "image": [
            "https://veralteneketicaret.com/veral-logo.webp",
            "https://veralteneketicaret.com/og-image.jpg"
        ],
        "description": "VERAL Torna & Teneke Ticaret, Türkiye'nin lider toptan dosya teli üreticisi ve takvim tenekesi imalatçısıdır. İzmir Alsancak merkezli tesisimizde ayrıca UV baskılı teneke posterler, mıknatıslı magnet ve tef zili üretimi yapmaktayız. 40 yılı aşkın tecrübe ile en uygun fiyatlı toptan metal imalat çözümleri sunuyoruz.",
        "url": "https://veralteneketicaret.com",
        "telephone": "+905071651315",
```tsx
        "email": "veraltornatic@hotmail.com",
```
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
            "latitude": 38.43809079996246,
                "longitude": 27.15673419606917
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
    ```tsx
        "hasMap": "https://maps.app.goo.gl/hfzcSVtSP91xS5P47",
```
    "sameAs": [
        "https://www.instagram.com/veralticaret",
        "https://www.facebook.com/veral"
    ],
        "keywords": "toptan dosya teli, takvim tenekesi, dosya teli üreticisi, takvim tenekesi imalatı, uv baskılı teneke posterler, metal poster imalatı, tef zili izmir, mıknatıslı magnet toptan, izmir takvim tenekesi yapanlar, ucuz dosya teli fiyatları"
};

return (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
);
};
