"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { TEMPLATES } from '@/data/templates';
import { MockupRenderer } from '@/components/mockup/MockupRenderer';
import { RotateCcw, RotateCw, Plus, Truck, RefreshCcw, Home, Ruler, Check } from 'lucide-react';
import { Product } from '@/lib/products';

export default function ScenePreview({ product }: { product: Product }) {
    const {
        activeTemplateId, size, customImage, customRoomImage,
        manualOffset, manualRot, setManualOffset, setManualRot,
        setCustomRoomImage, setActiveTemplateId, reset, imageScale, imageFit,
        showCalibrator, setShowCalibrator, calibrations, updateCalibration
    } = useConfiguratorStore();

    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const productImages = [product.image, ...(product.images || [])];
    const activeTemplate = TEMPLATES.find(t => t.id === activeTemplateId) || TEMPLATES[0];
    const currentCalib = calibrations[activeTemplateId] || {
        refA: activeTemplate.refA, refB: activeTemplate.refB, refCm: activeTemplate.sofaCm,
        refC: activeTemplate.refC, refD: activeTemplate.refD, refHeightCm: activeTemplate.sofaHeightCm
    };

    const handleDragMove = (delta: { x: number; y: number }) => {
        setManualOffset(prev => ({
            x: prev.x + delta.x,
            y: prev.y + delta.y
        }));
    };

    return (
        <div className="flex flex-col gap-10 select-none w-full">
            <div className="relative">
                <MockupRenderer
                    template={activeTemplate}
                    sizeCm={{ dimA: size.dimA, dimB: size.dimB }}
                    posterPreviewSrc={customImage || productImages[activeImageIndex]}
                    manualOffset={manualOffset}
                    manualRot={manualRot}
                    imageScale={imageScale}
                    imageFit={imageFit}
                    onDragMove={handleDragMove}
                />

                {/* HUD - Sol üst */}
                <div className="absolute top-6 left-6 z-40 space-y-2">
                    {/* HUD - Removed complex customization controls for simplicity */}

                    {!showCalibrator && (
                        <div className="mt-4 bg-black/60 backdrop-blur-md border border-[#D4AF37] p-3 w-64 shadow-2xl">
                            <div className="flex items-center gap-2 text-[#D4AF37] text-[9px] font-mono font-black uppercase">
                                <div className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
                                <span>SMART-FIT AKTİF</span>
                            </div>
                            <p className="text-white/50 text-[8px] font-mono mt-1 leading-tight">
                                Poster oranı görselinize göre otomatik ayarlandı. Boşluksuz ve tam ölçek.
                            </p>
                        </div>
                    )}
                </div>

                <div className="absolute top-6 right-6 z-40 flex flex-col md:flex-row gap-2">
                    {TEMPLATES.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => { setActiveTemplateId(template.id); reset(); }}
                            className={`p-2 border transition-all duration-300 flex items-center gap-2 text-[10px] font-bold uppercase
                                ${activeTemplateId === template.id
                                    ? 'bg-black text-white border-black scale-105 shadow-xl'
                                    : 'bg-white/60 backdrop-blur-md text-black border-black/10 hover:bg-white hover:scale-105'}`}
                        >
                            <template.icon className="w-3 h-3" />
                            <span className="hidden md:inline">{template.name}</span>
                        </button>
                    ))}
                </div>

                <div className="absolute bottom-6 right-6 z-50 flex gap-3">
                    <button
                        onClick={() => setManualRot(prev => prev - 5)}
                        className="w-10 h-10 bg-white/40 backdrop-blur-xl text-black hover:bg-black hover:text-white flex items-center justify-center border border-white/20 shadow-xl transition-all rounded-full"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setManualRot(prev => prev + 5)}
                        className="w-10 h-10 bg-white/40 backdrop-blur-xl text-black hover:bg-black hover:text-white flex items-center justify-center border border-white/20 shadow-xl transition-all rounded-full"
                    >
                        <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                        onClick={reset}
                        className="w-10 h-10 bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center border border-black shadow-sm transition-colors rounded-full"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>

                <div className="absolute top-4 left-4 bg-[#0A0A0A]/80 text-white px-3 py-1.5 text-xs font-bold tracking-wide z-40">
                    AKILLI ÖLÇEKLENDİRME AKTİF
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-[#0A0A0A]/40 uppercase tracking-widest">Ürün Görselleri</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {productImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImageIndex(i)}
                            className={`relative flex-shrink-0 w-24 h-24 overflow-hidden border transition-all ${activeImageIndex === i ? 'border-[#D4AF37] shadow-xl' : 'border-[#0A0A0A]/10 opacity-60 hover:opacity-100'}`}
                        >
                            <Image src={img} alt="" fill className="object-cover" />
                        </button>
                    ))}
                    {/* Images list - removed custom art upload button */}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] font-bold text-center">
                <div className="flex flex-col items-center gap-2 bg-white p-4 border-2 border-dashed border-black/20">
                    <span className="uppercase tracking-tighter">100 YIL SOLMAMA GARANTİSİ</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white p-4 border-2 border-dashed border-black/20">
                    <Truck className="w-5 h-5 text-[#D4AF37]" />
                    <span className="uppercase tracking-tighter">HIZLI LOJİSTİK AĞI</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white p-4 border-2 border-dashed border-black/20">
                    <span className="uppercase tracking-tighter">POLİKARBON PAKETLEME</span>
                </div>
            </div>
        </div>
    );
}
