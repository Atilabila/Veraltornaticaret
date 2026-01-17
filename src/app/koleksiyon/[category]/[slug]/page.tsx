import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import Script from "next/script";

// SEO için dinamik Metadata üretimi (Server Side)
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);

    if (!product) return { title: "Ürün Bulunamadı | Veral Industrial" };

    return {
        title: `${product.seo.title} | Veral Industrial`,
        description: product.seo.description,
        keywords: product.seo.keywords.join(", "),
        openGraph: {
            title: product.seo.title,
            description: product.seo.description,
            images: [product.image],
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { slug } = await params;
    const product = PRODUCTS.find((p) => p.slug === slug);

    if (!product) {
        return notFound();
    }

    // JSON-LD Schema for SEO
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.seo.title,
        "image": `https://veral.com${product.image}`,
        "description": product.seo.description,
        "brand": {
            "@type": "Brand",
            "name": "Veral Industrial"
        },
        "sku": product.id,
        "offers": {
            "@type": "Offer",
            "url": `https://veral.com/koleksiyon/${product.category}/${product.slug}`,
            "priceCurrency": "TRY",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    return (
        <main className="min-h-screen bg-transparent grid-terminal pt-32 pb-24">
            {/* JSON-LD Injection */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <ProductDetailClient product={product} />
        </main>
    );
}
