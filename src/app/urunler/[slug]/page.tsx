import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS_DATA[slug];
    if (!product) return { title: 'Ürün Bulunamadı' };

    return {
        title: `${product.name} | VERAL Torna & Teneke İZMİR`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = PRODUCTS_DATA[slug];

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
