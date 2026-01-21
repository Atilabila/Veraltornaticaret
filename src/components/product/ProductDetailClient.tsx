"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import { Product } from "@/lib/products";
import ScenePreview from "@/components/product/detail/ScenePreview";
import ConfigurationPanel from "@/components/product/detail/ConfigurationPanel";
import SpecsSection from "@/components/product/detail/SpecsSection";
import { MousePointer2 } from "lucide-react";
import { CartTerminal } from '@/components/checkout/CartTerminal';
import { useCartStore } from "@/store/useCartStore";
// Note: CartTerminal uses useCartStore internally for isOpen? No, it accepts props.
// But we need to manage cart open state here or in ConfigurationPanel.
// ConfigurationPanel manages "Add to Cart" and "Open Cart".
// ProductDetailClient might need to just hold the CartTerminal or leave it to ConfigurationPanel?
// In my ConfigurationPanel implementation (Step 83), I put CartTerminal INSIDE ConfigurationPanel.
// So I don't need it here unless I want it global.
// I'll check if CartTerminal is used elsewhere.
// But for now, I'll trust ConfigurationPanel to handle the cart popup.

// Wait, I should double check logic.
// Step 83: ConfigurationPanel renders <CartTerminal isOpen={isCartOpen} ... />
// Good.

export default function ProductDetailClient({ product }: { product: Product }) {
    const { customImage, customRoomImage, reset, manualOffset, manualRot } = useConfiguratorStore();

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
        <div className="container-brutal pt-32 pb-24">
            {/* BREADCRUMB */}
            <nav className="font-mono text-xs font-bold text-steel-gray mb-10 uppercase flex items-center gap-2 tracking-wide px-4 md:px-0">
                <Link href="/" className="hover:text-near-black border-b border-transparent hover:border-brand transition-colors">HOME</Link>
                <span className="text-gray-300">/</span>
                <Link href="/urunler" className="hover:text-near-black border-b border-transparent hover:border-brand transition-colors">CATALOG</Link>
                <span className="text-gray-300">/</span>
                <span className="text-near-black bg-gray-100 px-2 py-0.5 rounded-sm">
                    {product.name}
                </span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* LEFT: VISUAL ASSET (DYNAMIC WALL MOCKUP) - WRAPPED IN CARD */}
                <div className="lg:col-span-7 flex flex-col gap-10">
                    <div className="card-premium p-4 md:p-8 bg-white">
                        <ScenePreview product={product} />
                    </div>
                </div>

                {/* RIGHT: CONFIGURATION & SALES - WRAPPED IN CARD */}
                <div className="lg:col-span-5 lg:sticky lg:top-32">
                    <div className="card-premium p-8 md:p-10 bg-white">
                        <ConfigurationPanel product={product} />
                    </div>
                </div>

                {/* BOTTOM: TECHNICAL DETAILS & REVIEWS - WRAPPED IN WIDE CARD */}
                <div className="lg:col-span-12 mt-10">
                    <div className="card-premium p-8 md:p-16 bg-white overflow-hidden">
                        <SpecsSection product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
