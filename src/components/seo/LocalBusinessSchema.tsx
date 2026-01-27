import React from 'react';

export const LocalBusinessSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "VERAL Torna & Teneke Ticaret",
        "image": "https://www.veralteneketicaret.com/veral-logo.webp",
        "url": "https://www.veralteneketicaret.com",
        "telephone": "+905000000000",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Alsancak",
            "addressLocality": "İzmir",
            "addressRegion": "İzmir",
            "postalCode": "35000",
            "addressCountry": "TR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 38.435,
            "longitude": 27.145
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
        "sameAs": [
            "https://www.instagram.com/veralteneke"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
