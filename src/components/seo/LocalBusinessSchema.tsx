import React from 'react';
import { absUrl, SITE_ORIGIN } from '@/lib/site';

export const LocalBusinessSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "Manufacturer"],
        "name": "Veral Torna & Teneke Ticaret",
        "alternateName": ["Veral Teneke", "Veral Alsancak"],
        "image": [
            absUrl("/veral-logo.png"),
            absUrl("/images/services/giyotin-kesim.webp")
        ],
        "description": "İzmir Alsancak merkezli toptan dosya teli imalatı, takvim tenekesi üretimi, giyotin sac kesim, rulo dilimleme, tef zili ve UV baskılı metal poster imalatçısı.",
        "url": SITE_ORIGIN,
        "telephone": "+905071651315",
        "email": "veraltornatic@hotmail.com",
        "contactPoint": {
            "@type": "ContactPoint",
            "name": "Oğuzcan Veral",
            "telephone": "+905071651315",
            "contactType": "customer service",
            "areaServed": "TR",
            "availableLanguage": "Turkish"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1471 Sokak No:12/A",
            "addressLocality": "Alsancak / Konak",
            "addressRegion": "İzmir",
            "postalCode": "35220",
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
            "opens": "08:30",
            "closes": "18:30"
        },
        "priceRange": "₺₺",
        "currenciesAccepted": "TRY",
        "paymentAccepted": "Bank Transfer, Cash",
        "areaServed": [
            { "@type": "City", "name": "İzmir" },
            { "@type": "AdministrativeArea", "name": "Ege Bölgesi" },
            { "@type": "Country", "name": "Türkiye" }
        ],
        "hasMap": "https://maps.app.goo.gl/QqWJ6pVDPwgcFDDb9",
        "sameAs": [
            "https://www.instagram.com/veralticaret"
        ],
        "knowsAbout": [
            "dosya teli imalatı",
            "takvim tenekesi üretimi",
            "giyotin sac kesim",
            "UV metal poster",
            "İzmir Alsancak metal imalat"
        ],
        "makesOffer": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Toptan dosya teli imalatı",
                    "areaServed": "Türkiye"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Takvim tenekesi üretimi",
                    "areaServed": "Türkiye"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "UV baskılı metal poster imalatı",
                    "areaServed": "Türkiye"
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
