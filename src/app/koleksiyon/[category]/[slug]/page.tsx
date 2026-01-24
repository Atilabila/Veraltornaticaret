import { notFound } from "next/navigation";
import { ProductService } from "@/lib/supabase/products.service";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { Product } from "@/lib/products";

// SEO için dinamik Metadata üretimi (Server Side)
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { slug } = await params;
    const dbProduct = await ProductService.getProductBySlug(slug);

    if (!dbProduct) return { title: "Ürün Bulunamadı | Veral Torna & Teneke" };

    return {
        title: `${dbProduct.seo_title} | Veral Torna & Teneke`,
        description: dbProduct.seo_description,
        keywords: dbProduct.seo_keywords?.join(", ") || "",
        openGraph: {
            title: dbProduct.seo_title,
            description: dbProduct.seo_description,
            images: [dbProduct.image],
        },
    };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { slug } = await params;
    const dbProduct = await ProductService.getProductBySlug(slug);

    if (!dbProduct) {
        return notFound();
    }

    // Map DB product to Frontend Product interface
    const product: Product = {
        id: dbProduct.id,
        name: dbProduct.name,
        slug: dbProduct.slug,
        price: dbProduct.price,
        image: dbProduct.image,
        description: dbProduct.description,
        story: dbProduct.story,
        category: dbProduct.category,
        specs: {
            material: dbProduct.material,
            process: dbProduct.process,
            print: dbProduct.print,
            thickness: dbProduct.thickness,
            dims: dbProduct.dims,
            mounting: dbProduct.mounting,
        },
        seo: {
            title: dbProduct.seo_title,
            description: dbProduct.seo_description,
            keywords: dbProduct.seo_keywords || [],
        }
    };

    // JSON-LD Schema for SEO
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.seo?.title || product.name,
        "image": `https://veral.com${product.image}`,
        "description": product.seo?.description || product.description,
        "brand": {
            "@type": "Brand",
            "name": "Veral Torna & Teneke"
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
