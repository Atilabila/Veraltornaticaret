"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import { Product } from "@/lib/products";
import ScenePreview from "@/components/product/detail/ScenePreview";
import ConfigurationPanel from "@/components/product/detail/ConfigurationPanel";
import SpecsSection from "@/components/product/detail/SpecsSection";

export default function ProductDetailClient({ product }: { product: Product }) {
    const { customImage, customRoomImage, reset } = useConfiguratorStore();

    // RESET STATE ON MOUNT
    useEffect(() => {
        reset();
    }, [reset]);

    // EXIT WARNING
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (customImage || customRoomImage) {
                e.preventDefault();
                e.returnValue = "Your custom design and settings will be lost. Are you sure?";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [customImage, customRoomImage]);

    return (
        <div className="container-brutal pt-12 pb-24">
            {/* 30-YEAR UX: REFINED BREADCRUMB */}
            <nav className="font-extrabold text-[10px] text-gray-400 mb-12 uppercase flex items-center gap-4 tracking-[0.3em] px-4 md:px-0">
                <Link href="/" className="hover:text-black transition-colors">HOME</Link>
                <div className="w-4 h-[1px] bg-gray-200" />
                <Link href="/urunler" className="hover:text-black transition-colors">CATALOG</Link>
                <div className="w-4 h-[1px] bg-gray-200" />
                <span className="text-black bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                    {product.name}
                </span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* LEFT: VISUAL ASSET (DYNAMIC WALL MOCKUP) */}
                <div className="lg:col-span-7 flex flex-col gap-10">
                    <div className="card-premium p-4 md:p-6 bg-white ring-1 ring-black/5">
                        <ScenePreview product={product} />
                    </div>
                </div>

                {/* RIGHT: CONFIGURATION & SALES */}
                <div className="lg:col-span-12 xl:col-span-5 xl:sticky xl:top-32">
                    <div className="card-premium p-8 md:p-12 bg-white ring-1 ring-black/5 shadow-2xl">
                        <ConfigurationPanel product={product} />
                    </div>
                </div>

                {/* BOTTOM: TECHNICAL DETAILS & REVIEWS */}
                <div className="lg:col-span-12 mt-12">
                    <div className="card-premium p-8 md:p-20 bg-white ring-1 ring-black/5">
                        <SpecsSection product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
