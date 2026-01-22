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
                    <label className="cursor-pointer group block">
                        <div className="bg-black text-white px-4 py-3 font-mono text-[10px] font-bold border-2 border-white flex items-center gap-3 shadow-lg hover:bg-[#D4AF37] hover:text-black transition-all">
                            <Home className="w-4 h-4" />
                            <span>KENDİ ODANIN FOTOSUNU YÜKLE</span>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                setCustomRoomImage(url);
                            }
                        }} />
                    </label>

                    <div className="bg-white/90 backdrop-blur-md border border-black p-2 font-mono text-[8px] font-black uppercase text-black italic">
                        ÖNERİLEN ODA FOTOSU: 4000x3000 PX
                    </div>

                    {customRoomImage && (
                        <button
                            onClick={() => setCustomRoomImage(null)}
                            className="bg-red-600 text-white px-3 py-1 text-[8px] font-black uppercase border border-white/20"
                        >
                            VARSAYILAN ODAYA DÖN
                        </button>
                    )}

                    <div className="mt-4 space-y-2">
                        <button
                            onClick={() => setShowCalibrator(!showCalibrator)}
                            className={`w-full px-4 py-3 font-mono text-[10px] font-bold border-2 flex items-center gap-3 shadow-lg transition-all ${showCalibrator
                                    ? 'bg-[#D4AF37] text-black border-black'
                                    : 'bg-black text-white border-white hover:bg-[#D4AF37] hover:text-black'
                                }`}
                        >
                            <Ruler className="w-4 h-4" />
                            <span>{showCalibrator ? 'KALİBRASYONU TAMAMLA' : 'ÖLÇEK KALİBRASYONU'}</span>
                        </button>

                        {showCalibrator && (
                            <div className="bg-black/90 backdrop-blur-md border-2 border-[#D4AF37] p-5 space-y-4 animate-in fade-in slide-in-from-left-4 w-72 shadow-2xl">
                                <div>
                                    <label className="block text-[#D4AF37] text-[10px] font-black font-mono uppercase mb-2">
                                        [A-B] REFERANS GENİŞLİK (CM)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={currentCalib.refCm}
                                            onChange={(e) => updateCalibration(activeTemplateId, { refCm: Number(e.target.value) })}
                                            className="bg-white text-black font-bold font-mono px-3 py-2 w-full outline-none focus:ring-2 focus:ring-[#D4AF37]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[#3498db] text-[10px] font-black font-mono uppercase mb-2">
                                        [C-D] REFERANS YÜKSEKLİK (CM)
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={currentCalib.refHeightCm}
                                            onChange={(e) => updateCalibration(activeTemplateId, { refHeightCm: Number(e.target.value) })}
                                            className="bg-white text-black font-bold font-mono px-3 py-2 w-full outline-none focus:ring-2 focus:ring-[#3498db]"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowCalibrator(false)}
                                    className="w-full bg-[#D4AF37] text-black py-3 font-mono text-xs font-black flex items-center justify-center gap-2 hover:bg-white transition-colors border border-black shadow-lg"
                                >
                                    <Check className="w-5 h-5" />
                                    <span>KALİBRASYONU UYGULA</span>
                                </button>

                                <p className="text-white/60 text-[8px] font-mono leading-tight bg-white/5 p-2 rounded">
                                    * A-B (Altın) çizgisi genişliği, C-D (Mavi) çizgisi yüksekliği temsil eder.
                                </p>
                            </div>
                        )}
                    </div>

                    {!showCalibrator && (
                        <label className="cursor-pointer group block">
                            <div className="bg-black text-white px-4 py-3 font-mono text-[10px] font-bold border-2 border-white flex items-center gap-3 shadow-lg hover:bg-[#D4AF37] hover:text-black transition-all">
                                <Plus className="w-4 h-4" />
                                <span>KENDİ GÖRSELİNİ YÜKLE</span>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const url = URL.createObjectURL(file);
                                    useConfiguratorStore.getState().setCustomImage(url);
                                }
                            }} />
                        </label>
                    )}

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
                    <label className="flex-shrink-0 w-24 h-24 border-2 border-dashed border-[#0A0A0A]/20 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-[#0A0A0A]/40 hover:text-[#D4AF37]">
                        <Plus className="w-6 h-6" />
                        <span className="text-[9px] font-black uppercase">Farklı Art</span>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const url = URL.createObjectURL(file);
                                useConfiguratorStore.getState().setCustomImage(url);
                            }
                        }} />
                    </label>
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
