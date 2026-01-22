import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

import { ProductService } from '@/lib/supabase/products.service';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Try Supabase first
    let product = await ProductService.getProductBySlug(slug);

    // Fallback to static if not in DB
    if (!product) {
        product = PRODUCTS_DATA[slug] as any;
    }

    if (!product) return { title: 'Ürün Bulunamadı' };

    return {
        title: `${product.name} | VERAL Torna & Teneke İZMİR`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;

    // Try Supabase first
    const dbProduct = await ProductService.getProductBySlug(slug);
    let product: any = null;

    if (dbProduct) {
        product = {
            id: dbProduct.id,
            name: dbProduct.name,
            slug: dbProduct.slug,
            price: dbProduct.price,
            image: dbProduct.image,
            description: dbProduct.description,
            story: dbProduct.story || `${dbProduct.name} - Metal Poster Koleksiyonu.`,
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
    } else {
        product = PRODUCTS_DATA[slug];
    }

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-paper-white">
            <Navigation />

            {/* Page Content */}
            <div className="pt-24 pb-12">
                <ProductDetailClient product={product} />
            </div>

            <Footer />
            <MobileStickyBar />
        </main>
    );
}
