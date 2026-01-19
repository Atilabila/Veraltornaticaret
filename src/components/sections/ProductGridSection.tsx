"use client";

import React from 'react';
import { ProductCard, SystemLabel } from '@/components/ui/Industrial';
import { PRODUCTS_DATA } from '@/lib/products';

export const ProductGridSection = () => {
    const products = Object.values(PRODUCTS_DATA);

    return (
        <section id="products" className="bg-white border-b border-fog-gray">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="flex flex-col gap-4 mb-12">
                    <SystemLabel text="MODÜL: ÜRÜN GRUPLARI" active />
                    <h2 className="text-3xl font-bold font-space uppercase">Hizmet Alanları ve Üretim Portföyü</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.slug}
                            title={product.name}
                            oneLiner={product.description}
                            href={`/urunler/${product.slug}`}
                            tag={product.category}
                            image={product.image}
                            price={product.price}
                        />
                    ))}
                    {/* If there are more items in the user request not in PRODUCTS_DATA yet, we can add placeholders or expand the data */}
                </div>
            </div>
        </section>
    );
};
