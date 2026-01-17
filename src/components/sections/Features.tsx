"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Droplets, Sun, Activity } from "lucide-react";
import { useContentStore } from "@/store/useContentStore";

export const Features = () => {
    const { content } = useContentStore();

    return (
        <section id="features" className="py-24 bg-[#E5E7EB] border-b-8 border-black overflow-hidden">
            <div className="container-brutal">
                {/* SYSTEM_HEADER */}
                <div className="mb-24 border-8 border-black p-12 bg-white shadow-brutal">
                    <div className="flex items-center gap-4 mb-6">
                        <Activity className="w-8 h-8 text-[var(--color-brand-safety-orange)] animate-pulse" />
                        <span className="font-mono font-black text-xl tracking-[0.2em]">SİSTEM AVANTAJLARI</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl font-[Archivo Black] leading-none mb-4 uppercase">
                        {(content?.featuresTitle || "").split(" ").slice(0, 1)}<br />
                        <span className="text-[var(--color-brand-safety-orange)]">{(content?.featuresTitle || "").split(" ").slice(1).join(" ")}</span>
                    </h2>
                    <p className="font-mono text-xl font-bold border-t-4 border-black pt-6 max-w-2xl">
                        {content.featuresSubtitle}
                    </p>
                </div>

                {/* MODULE_GRID */}
                <div className="space-y-16">
                    {content?.featureItems?.map((feature, index) => (
                        <FeatureModule key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface Feature {
    title: string;
    description: string;
    image: string;
    stats: string;
    tag: string;
}

const icons = [
    <Shield key="shield" className="w-8 h-8" />,
    <Sun key="sun" className="w-8 h-8" />,
    <Droplets key="droplets" className="w-8 h-8" />
];

const FeatureModule = ({ feature, index }: { feature: Feature, index: number }) => {
    const isReversed = index % 2 === 1;

    return (
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch border-8 border-black bg-white shadow-brutal overflow-hidden`}>
            {/* LOG_DATA */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b-8 lg:border-b-0 lg:border-r-8 last:border-r-0 border-black bg-white">
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <span className="font-[Archivo Black] text-6xl text-black/10">0{index + 1}</span>
                        <div className="bg-black text-white p-4">
                            {icons[index % icons.length]}
                        </div>
                    </div>

                    <div className="mb-4 inline-block bg-[#FFD700] text-black px-3 py-1 font-mono font-black text-base">
                        TEKNİK ETİKET: {feature.tag}
                    </div>

                    <h3 className="text-3xl md:text-5xl font-[Archivo Black] mb-6 uppercase leading-tight">
                        {feature.title}
                    </h3>

                    <p className="font-mono text-xl md:text-2xl font-bold text-black border-l-8 border-[var(--color-brand-safety-orange)] pl-6 mb-8 uppercase leading-relaxed">
                        {feature.description}
                    </p>
                </div>

                <div className="mt-auto pt-8 border-t-4 border-black flex items-center justify-between font-mono font-black">
                    <span className="text-black/50">VERİ DEĞERİ //</span>
                    <span className="text-3xl text-[var(--color-brand-safety-orange)]">{feature.stats}</span>
                </div>
            </div>

            {/* VISUAL_MATRIX */}
            <div className="flex-1 min-h-[400px] relative bg-black overflow-hidden group">
                <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* SCANLINE_OVERLAY */}
                <div className="absolute inset-0 pointer-events-none grid-terminal opacity-30" />

                {/* CORNER_MARKERS */}
                <div className="absolute top-4 left-4 border-t-4 border-l-4 border-white w-8 h-8" />
                <div className="absolute top-4 right-4 border-t-4 border-r-4 border-white w-8 h-8" />
                <div className="absolute bottom-4 left-4 border-b-4 border-l-4 border-white w-8 h-8" />
                <div className="absolute bottom-4 right-4 border-b-4 border-r-4 border-white w-8 h-8" />
            </div>
        </div>
    );
};
