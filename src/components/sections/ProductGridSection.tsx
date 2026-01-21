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
                    <SystemLabel text="EN COK SATANLAR" active />
                    <h2 className="text-3xl font-bold font-space uppercase">Metal Poster Koleksiyonu</h2>
                    <p className="text-steel-gray text-sm max-w-[640px]">
                        En cok tercih edilen tasarimlar. Duvarini yenilemek icin hizli ve guvenli secim.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                </div>
            </div>
        </section>
    );
};
