"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useConfiguratorStore, SCENES } from '@/store/useConfiguratorStore';
import { MousePointer2, RotateCcw, RotateCw, Plus, ShieldCheck, Truck, RefreshCcw, Maximize2 } from 'lucide-react';
import { Product } from '@/lib/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScenePreview({ product }: { product: Product }) {
    const {
        activeScene, size, orientation, customImage, customRoomImage,
        manualOffset, manualRot, setManualOffset, setManualRot,
        setCustomRoomImage, setActiveScene, reset,
    } = useConfiguratorStore();

    const [isDragging, setIsDragging] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const dragRef = useRef({ startX: 0, startY: 0, startOffX: 0, startOffY: 0 });

    const productImages = [product.image, ...(product.images || [])];

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        dragRef.current = {
            startX: clientX,
            startY: clientY,
            startOffX: manualOffset.x,
            startOffY: manualOffset.y
        };
    };

    const handleMoveInput = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const deltaX = (clientX - dragRef.current.startX) / 5;
        const deltaY = (clientY - dragRef.current.startY) / 5;

        setManualOffset({
            x: dragRef.current.startOffX + deltaX,
            y: dragRef.current.startOffY + deltaY
        });
    };

    return (
        <div
            className="flex flex-col gap-10 select-none w-full"
            onMouseMove={handleMoveInput}
            onTouchMove={handleMoveInput}
            onMouseUp={() => setIsDragging(false)}
            onTouchEnd={() => setIsDragging(false)}
        >
            {/* VIEWPORT AREA - Clean Showroom Look */}
            <div className="relative aspect-[4/5] md:aspect-square w-full bg-gray-50 rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 group">

                {/* BACKGROUND ROOM */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeScene.id + (customRoomImage ? '_custom' : '')}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={customRoomImage || activeScene.image}
                            alt={activeScene.name}
                            fill
                            className="object-cover"
                        />
                        {/* Overlay to soften the room but keep it premium */}
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]" />
                    </motion.div>
                </AnimatePresence>

                {/* THE METAL POSTER */}
                <div
                    onMouseDown={handleStart}
                    onTouchStart={handleStart}
                    className={`absolute transition-transform duration-150 ease-out z-30 ${isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-[1.02]'}`}
                    style={{
                        top: customRoomImage ? `calc(40% + ${manualOffset.y}%)` : `calc(${activeScene.pos.top}% + ${manualOffset.y}%)`,
                        left: customRoomImage ? `calc(50% + ${manualOffset.x}%)` : `calc(${activeScene.pos.left}% + ${manualOffset.x}%)`,
                        width: orientation === 'portrait'
                            ? `${(customRoomImage ? 35 : activeScene.pos.width * 1.6) * (size.id === 'xs' ? 0.6 : size.id === 'm' ? 1.1 : size.id === 'l' ? 1.6 : 2.4)}%`
                            : `${(customRoomImage ? 38 : activeScene.pos.width * 1.8) * (size.id === 'xs' ? 0.55 : size.id === 'm' ? 1.1 : size.id === 'l' ? 1.6 : 2.4)}%`,
                        transform: `rotateY(${activeScene.pos.rotY + manualRot}deg) rotateX(${activeScene.pos.rotX}deg)`,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* ACCURATE DEPTH SHADOW */}
                    <div className="absolute inset-4 bg-black/30 blur-2xl -z-10 translate-x-6 translate-y-6 opacity-50" />

                    {/* THE POSTER SURFACE */}
                    <div
                        className="relative overflow-hidden bg-white shadow-2xl rounded-sm border-[0.5px] border-black/5"
                        style={{ aspectRatio: orientation === 'portrait' ? `2 / 3` : `3 / 2` }}
                    >
                        <Image
                            src={customImage || productImages[activeImageIndex]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* SUBTLE SHEEN */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                    </div>

                    {/* INTERACTIVE HINT */}
                    {!isDragging && manualOffset.x === 0 && (
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-[#111827] text-white px-4 py-2 rounded-full text-[10px] font-black shadow-2xl uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                            <MousePointer2 className="w-3 h-3 text-[#ff6b00]" />
                            TAŞIMAK İÇİN SÜRÜKLE
                        </div>
                    )}
                </div>

                {/* SCENE SELECTOR - Floating Pill */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 p-2 bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-2xl z-40">
                    {SCENES.map((scene) => (
                        <button
                            key={scene.id}
                            onClick={() => { setActiveScene(scene); reset(); }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${activeScene.id === scene.id ? 'bg-[#ff6b00] text-white' : 'text-gray-400 hover:text-gray-900'}`}
                        >
                            <scene.icon className="w-5 h-5" />
                        </button>
                    ))}
                </div>

                {/* ROTATION & RESET - Compact Right */}
                <div className="absolute top-8 right-8 flex flex-col gap-2 z-40">
                    <button onClick={() => setManualRot(prev => prev - 5)} className="w-10 h-10 bg-white/90 backdrop-blur text-gray-500 rounded-xl border border-white/50 flex items-center justify-center hover:text-[#111827] shadow-lg"><RotateCcw className="w-4 h-4" /></button>
                    <button onClick={() => setManualRot(prev => prev + 5)} className="w-10 h-10 bg-white/90 backdrop-blur text-gray-500 rounded-xl border border-white/50 flex items-center justify-center hover:text-[#111827] shadow-lg"><RotateCw className="w-4 h-4" /></button>
                    <button onClick={reset} className="w-10 h-10 bg-[#111827] text-white rounded-xl flex items-center justify-center shadow-lg"><RefreshCcw className="w-4 h-4" /></button>
                </div>
            </div>

            {/* THUMBNAIL NAVIGATOR */}
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ürün Detayları</span>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                    {productImages.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImageIndex(i)}
                            className={`relative flex-shrink-0 w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all ${activeImageIndex === i ? 'border-[#ff6b00] scale-105 shadow-xl shadow-orange-100' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
                        >
                            <Image src={img} alt="" fill className="object-cover" />
                        </button>
                    ))}
                    {/* CUSTOM DESIGN ACTION */}
                    <label className="flex-shrink-0 w-24 h-24 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-[#ff6b00] hover:bg-orange-50/10 transition-all text-gray-400 hover:text-[#ff6b00]">
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

            {/* PHOTO CUSTOMIZATION ACTIONS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <label className="md:col-span-8 cursor-pointer group">
                    <div className="h-24 rounded-[2rem] bg-gray-50 border border-gray-100 flex items-center gap-6 px-8 hover:border-[#ff6b00] hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all">
                        <div className="w-12 h-12 rounded-2xl bg-[#ff6b00]/10 flex items-center justify-center text-[#ff6b00] group-hover:scale-110 transition-transform">
                            <Maximize2 className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-[#111827] uppercase">Kendi Odanın Fotoğrafını Çek ve Yükle</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Posteri Senin Duvarında Görelim</span>
                        </div>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const url = URL.createObjectURL(file);
                            useConfiguratorStore.getState().setCustomRoomImage(url);
                        }
                    }} />
                </label>

                <div className="md:col-span-4 h-24 rounded-[2rem] bg-white border border-gray-100 flex items-center gap-6 px-8 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500">
                        <Truck className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-[#111827] uppercase tracking-tighter">Express</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kargo</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
