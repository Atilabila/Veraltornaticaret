import React from 'react';

interface ProductSchemaProps {
    product: {
        name: string;
        description: string;
        image: string;
        sku: string;
        price: number;
        currency?: string;
        availability: 'InStock' | 'OutOfStock';
        brand?: string;
    }
}

export const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": [product.image],
        "description": product.description || `${product.name} - Özel Tasarım Metal Tablo`,
        "sku": product.sku,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "VERAL"
        },
        "offers": {
            "@type": "Offer",
            "url": typeof window !== 'undefined' ? window.location.href : '',
            "priceCurrency": product.currency || "TRY",
            "price": product.price,
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "availability": `https://schema.org/${product.availability}`,
            "seller": {
                "@type": "Organization",
                "name": "VERAL Torna & Teneke Ticaret"
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": 0,
                    "currency": "TRY"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 3,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 5,
                        "unitCode": "DAY"
                    }
                }
            }
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
