import { Suspense } from "react";
import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/actions/metal-products.actions";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CatalogContainer } from "@/components/product/CatalogContainer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { MOCK_PRODUCTS } from "@/lib/data/mock-products";

export const metadata: Metadata = {
    title: "Metal Poster & Seri İmalat Kataloğu | Veral Ticaret",
    description: "1200 DPI UV baskılı mıknatıslı metal posterler, toptan dosya telleri ve takvim tenekesi modelleri. İzmir Alsancak atölyemizden doğrudan fabrika satış kataloğu.",
    alternates: {
        canonical: "https://veralteneketicaret.com/urunler",
    },
    openGraph: {
        title: "Metal Poster & İmalat Kataloğu | Veral Torna & Teneke Ticaret",
        description: "Yüksek çözünürlüklü UV baskılı metal tablolar, endüstriyel tel ve teneke çözümleri.",
        url: "https://veralteneketicaret.com/urunler",
    },
};

export const revalidate = 60; // ISR 60 seconds

export default async function ProductsPage() {
    let products: any[] = [];
    let categories: any[] = [];
    let showcase: any[] = [];

    try {
        const [prodRes, catRes, showRes] = await Promise.all([
            getProducts(false).catch(() => ({ success: false, data: [] })),
            getCategories().catch(() => ({ success: false, data: [] })),
            getProducts(true).catch(() => ({ success: false, data: [] })),
        ]);

        products = prodRes.success && prodRes.data && prodRes.data.length > 0 ? prodRes.data : MOCK_PRODUCTS;
        categories = catRes.success && catRes.data ? catRes.data : [];
        showcase = showRes.success && showRes.data ? showRes.data : MOCK_PRODUCTS.slice(0, 2);
    } catch {
        products = MOCK_PRODUCTS;
        showcase = MOCK_PRODUCTS.slice(0, 2);
    }

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Ürün Kataloğu", url: "/urunler" },
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            <div className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
            </div>

            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-zinc-500 font-mono text-sm">Ürünler Yükleniyor...</div>}>
                <CatalogContainer
                    products={products}
                    showcaseProducts={showcase}
                    categories={categories}
                />
            </Suspense>

            <Footer />
        </main>
    );
}
