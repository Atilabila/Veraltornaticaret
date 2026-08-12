"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";
import { Product } from "@/lib/products";
import ScenePreview from "@/components/product/detail/ScenePreview";
import ConfigurationPanel from "@/components/product/detail/ConfigurationPanel";
import SpecsSection from "@/components/product/detail/SpecsSection";
import { PageContainer } from "@/components/layout/PageContainer";

export default function ProductDetailClient({ product }: { product: Product }) {
    const { customImage, customRoomImage, reset } = useConfiguratorStore();

    useEffect(() => {
        reset();
    }, [reset]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (customImage || customRoomImage) {
                e.preventDefault();
                e.returnValue = "Özel tasarımınız kaybolabilir. Çıkmak istediğinize emin misiniz?";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [customImage, customRoomImage]);

    return (
        <PageContainer className="pb-16 pt-28 lg:pt-32">
            <nav className="text-xs text-[#525252] mb-8 flex flex-wrap items-center gap-2">
                <Link href="/" className="hover:text-[var(--color-brand-accent)]">Ana sayfa</Link>
                <span>/</span>
                <Link href="/urunler" className="hover:text-[var(--color-brand-accent)]">Katalog</Link>
                <span>/</span>
                <span className="text-[#161616] font-semibold">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-7">
                    <div className="bg-white border border-[#c6c6c6] p-4 md:p-6">
                        <ScenePreview product={product} />
                    </div>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-32">
                    <div className="bg-white border border-[#c6c6c6] p-6 md:p-8">
                        <ConfigurationPanel product={product} />
                    </div>
                </div>

                <div className="lg:col-span-12 mt-8">
                    <div className="bg-white border border-[#c6c6c6] p-6 md:p-10">
                        <SpecsSection product={product} />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}
