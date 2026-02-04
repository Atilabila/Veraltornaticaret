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
        url?: string;
    }
}

export const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
    // Ensure we have an absolute URL for the image
    const getAbsoluteUrl = (path: string) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://veralmetal.com';
        return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
    };

    const absoluteImageUrl = getAbsoluteUrl(product.image);
    const absoluteProductUrl = product.url || (typeof window !== 'undefined' ? window.location.href : '');

    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": [absoluteImageUrl],
        "description": product.description || `${product.name} - Premium Metal Tasarım`,
        "sku": product.sku,
        "mpn": product.sku, // Manufacturing Part Number
        "brand": {
            "@type": "Brand",
            "name": product.brand || "VERAL"
        },
        "offers": {
            "@type": "Offer",
            "url": absoluteProductUrl,
            "priceCurrency": product.currency || "TRY",
            "price": product.price,
            "priceValidUntil": "2026-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": `https://schema.org/${product.availability}`,
            "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": "TR",
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
                "merchantReturnDays": 14,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn"
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
                        "maxValue": 3,
                        "unitCode": "DAY"
                    }
                }
            },
            "seller": {
                "@type": "Organization",
                "name": "VERAL"
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
