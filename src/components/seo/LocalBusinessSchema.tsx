import React from 'react';
import { absUrl, SITE_ORIGIN } from '@/lib/site';
import { FOUNDING_YEAR, TORNA_SERVICES, WORKSHOP_BLURB, tornaHref } from '@/lib/public-copy';

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
        "description": WORKSHOP_BLURB,
        "foundingDate": FOUNDING_YEAR,
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
            "torna",
            "yedek parça",
            "tamir",
            "kalıp",
            "makine bakım",
            "Heli-Coil ve baga uygulamaları",
            "motosiklet jant tamiri",
            "hidrolik pres ile rulman ve burç çakma",
            "dosya teli",
            "takvim tenekesi",
            "metal poster"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Torna işleri",
            "itemListElement": TORNA_SERVICES.map((item) => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": item.title,
                    "description": item.text,
                    "url": absUrl(tornaHref(item.slug)),
                    "areaServed": "Alsancak, İzmir"
                }
            }))
        },
        "makesOffer": TORNA_SERVICES.map((item) => ({
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": item.title,
                "description": item.text,
                "url": absUrl(tornaHref(item.slug)),
                "areaServed": "Alsancak, İzmir"
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
