"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingCart, Check, Star, Shield, Truck, Box, Settings, ArrowRight, Move, MousePointer2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, RotateCcw, RotateCw, Coffee, Home, Briefcase, Plus, MessageSquare, Phone, Gamepad2, Warehouse, Car, Frame, Bed } from "lucide-react";
import { CartTerminal } from "@/components/checkout/CartTerminal";
import { Product, PRODUCTS } from "@/lib/products";

const SCENES = [
    {
        id: 'boho',
        name: 'YAŞAM ALANI',
        image: '/mockups/boho.png',
        icon: Home,
        pos: { top: 35, left: 53.5, width: 12.5, rotY: 0, rotX: 0 }
    },
    {
        id: 'loft',
        name: 'ENDÜSTRİYEL LOFT',
        image: '/mockups/loft.png',
        icon: Warehouse,
        pos: { top: 35, left: 50, width: 14, rotY: 0, rotX: 0 }
    },
    {
        id: 'garage',
        name: 'GARAJ / RETRO',
        image: '/mockups/garage.png',
        icon: Car,
        pos: { top: 25, left: 40, width: 12, rotY: 0, rotX: 0 }
    },
    {
        id: 'gallery',
        name: 'SANAT GALERİSİ',
        image: '/mockups/gallery.png',
        icon: Frame,
        pos: { top: 35, left: 45, width: 20, rotY: 0, rotX: 0 }
    },
    {
        id: 'teen',
        name: 'GENÇ ODASI',
        image: '/mockups/teen.png',
        icon: Bed,
        pos: { top: 25, left: 63, width: 15, rotY: 0, rotX: 0 }
    },
    {
        id: 'cafe',
        name: 'KAFE / BOHO',
        image: '/mockups/cafe.png',
        icon: Coffee,
        pos: { top: 28, left: 44, width: 11, rotY: 0, rotX: 0 }
    },
    {
        id: 'office',
        name: 'OFİS / STÜDYO',
        image: '/mockups/office.png',
        icon: Briefcase,
        pos: { top: 28, left: 49, width: 16, rotY: 0, rotX: 0 }
    }
];

const ORIENTATIONS = [
    { id: 'portrait', name: 'DİKEY', icon: ChevronUp },
    { id: 'landscape', name: 'YATAY', icon: ChevronRight },
];

const sizes = [
    { id: "xs", name: "10x20 CM", priceAdd: -100, desc: "MİNİ PLAKA", ratio: 0.5 },
    { id: "m", name: "30x45 CM", priceAdd: 200, desc: "STANDART KAYIT", ratio: 0.67 },
    { id: "l", name: "45x60 CM", priceAdd: 500, desc: "GENİŞ ALAN", ratio: 0.75 },
    { id: "xl", name: "60x90 CM", priceAdd: 1000, desc: "MAKS YÜK", ratio: 0.67 },
];

export default function ProductDetailClient({ product }: { product: Product }) {
    const [selectedSize, setSelectedSize] = useState(sizes[1]);
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
    const [isAdded, setIsAdded] = useState(false);
    const [manualOffset, setManualOffset] = useState({ x: 0, y: 0 });
    const [manualRot, setManualRot] = useState(0);
    const [activeScene, setActiveScene] = useState(SCENES[0]);
    const [customImage, setCustomImage] = useState<string | null>(null);
    const [customRoomImage, setCustomRoomImage] = useState<string | null>(null);
    const [rotations, setRotations] = useState({ x: 0, y: 0, z: 0 });
    const [scale, setScale] = useState(1);
    const [customSize, setCustomSize] = useState<{ w: number, h: number } | null>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const dragRef = useState<{ startX: number, startY: number, startOffX: number, startOffY: number }>({ startX: 0, startY: 0, startOffX: 0, startOffY: 0 })[0];

    const addItem = useCartStore((state) => state.addItem);

    // EXIT WARNING
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (customImage || customRoomImage) {
                e.preventDefault();
                e.returnValue = "Yüklediğiniz görseller ve ayarlarınız silinecek. Çıkmak istediğinize emin misiniz?";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [customImage, customRoomImage]);

    // MOUSE/TOUCH DRAG LOGIC
    const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation(); // Prevent drag start
        setIsResizing(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        dragRef.startX = clientX;
        dragRef.startY = clientY;
    };

    const handleResizeMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isResizing) return;
        e.stopPropagation();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const deltaX = (clientX - dragRef.startX); // Pixels moved
        const deltaY = (clientY - dragRef.startY);

        // Update custom size multiplier (base 100)
        setCustomSize(prev => {
            const currentW = prev ? prev.w : 100;
            const currentH = prev ? prev.h : 100;
            return {
                w: Math.max(20, currentW + deltaX * 0.5),
                h: Math.max(20, currentH + deltaY * 0.5)
            };
        });

        dragRef.startX = clientX;
        dragRef.startY = clientY;
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
    };

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        dragRef.startX = clientX;
        dragRef.startY = clientY;
        dragRef.startOffX = manualOffset.x;
        dragRef.startOffY = manualOffset.y;
    };

    const handleMoveInput = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const deltaX = (clientX - dragRef.startX) / 5; // sensitivity
        const deltaY = (clientY - dragRef.startY) / 5;

        setManualOffset({
            x: dragRef.startOffX + deltaX,
            y: dragRef.startOffY + deltaY
        });
    };

    const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCustomImage(url);
        }
    };

    const handleRoomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setCustomRoomImage(url);
        }
    };

    const handleMove = (dir: 'up' | 'down' | 'left' | 'right') => {
        setManualOffset(prev => {
            const step = 0.5; // percentage or small units
            if (dir === 'up') return { ...prev, y: prev.y - step };
            if (dir === 'down') return { ...prev, y: prev.y + step };
            if (dir === 'left') return { ...prev, x: prev.x - step };
            if (dir === 'right') return { ...prev, x: prev.x + step };
            return prev;
        });
    };

    const handleRotate = (dir: 'cw' | 'ccw') => {
        setManualRot(prev => dir === 'cw' ? prev + 1 : prev - 1);
    };

    const resetPos = () => {
        setManualOffset({ x: 0, y: 0 });
        setManualRot(0);
        setRotations({ x: 0, y: 0, z: 0 });
        setScale(1);
        setCustomSize(null);
    };

    const totalPrice = product.price + selectedSize.priceAdd;

    const handleAddToCart = () => {
        const displaySize = orientation === 'landscape'
            ? `${selectedSize.name.split('x')[1].split(' ')[0]}x${selectedSize.name.split('x')[0]} CM`
            : selectedSize.name;

        addItem({
            id: product.id + "_" + selectedSize.id + "_" + orientation,
            name: customImage ? "ÖZEL TASARIM METAL POSTER" : product.name,
            size: displaySize + ` (${orientation === 'portrait' ? 'DİKEY' : 'YATAY'})`,
            price: totalPrice,
            image: customImage || product.image,
        });
        setIsAdded(true);
        setIsCartOpen(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="container-brutal" onMouseMove={handleMoveInput} onTouchMove={handleMoveInput} onMouseUp={() => setIsDragging(false)} onTouchEnd={() => setIsDragging(false)}>
            <CartTerminal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            {/* BREADCRUMB */}
            <div className="font-mono text-xs md:text-xs font-bold text-black/50 mb-8 uppercase flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
                <div className="text-[14px] md:text-xs">
                    <Link href="/" className="hover:text-[var(--color-brand-safety-orange)]">ANA ÜS</Link> /
                    <Link href="/urunler" className="hover:text-[var(--color-brand-safety-orange)] mx-2">KOLEKSİYON</Link> /
                    <span className="text-black">
                        {product.category?.replace("_PLAKA", " KOLEKSİYONU").replace("ATATURK", "ATATÜRK").replace("CHARACTER", "KARAKTER").replace("MOTOR", "MOTORSİKLET").replace("CITY", "ŞEHİR")}
                    </span>
                </div>
                {/* PIXEL HUD */}
                <div className="bg-black text-[#FFD700] px-4 py-1 text-[12px] md:text-[10px] font-black border-2 border-dashed border-[#FFD700]/30 rounded-sm self-start">
                    LOC: X:{manualOffset.x.toFixed(1)}% | Y:{manualOffset.y.toFixed(1)}% | R:{manualRot}°
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* LEFT: VISUAL ASSET (DYNAMIC WALL MOCKUP) */}
                <div className="lg:col-span-7">
                    <div className="sticky top-32">
                        {/* ULTRA REALISTIC SHOWROOM WITH PERSPECTIVE */}
                        <div
                            className={`relative aspect-square w-full bg-[#1a1a1a] border-4 border-black shadow-brutal-orange overflow-hidden select-none group transition-all duration-300 ${isDragging ? 'cursor-grabbing scale-[1.01]' : 'cursor-crosshair'}`}
                            style={{
                                perspective: '2000px'
                            }}
                        >
                            {/* DYNAMIC ROOM BACKGROUND (User's room or presets) */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={customRoomImage || activeScene.image}
                                    alt={activeScene.name}
                                    fill
                                    className="object-cover opacity-100 transition-all duration-1000 ease-in-out"
                                />
                                {customRoomImage && (
                                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                                )}
                                <div className="absolute inset-0 bg-black/5" />
                            </div>

                            {/* DYNAMIC METAL PLATE WITH 3D PERSPECTIVE */}
                            <div
                                onMouseDown={handleStart}
                                onTouchStart={handleStart}
                                className="absolute transition-transform duration-100 ease-out z-30 group-active:scale-[1.02]"
                                style={{
                                    top: customRoomImage ? `calc(40% + ${manualOffset.y}%)` : `calc(${activeScene.pos.top}% + ${manualOffset.y}%)`,
                                    left: customRoomImage ? `calc(50% + ${manualOffset.x}%)` : `calc(${activeScene.pos.left}% + ${manualOffset.x}%)`,
                                    width: orientation === 'portrait'
                                        ? `${(customRoomImage ? 25 * scale : activeScene.pos.width) * (
                                            selectedSize.id === 'xs' ? 0.33 :
                                                selectedSize.id === 's' ? 0.67 :
                                                    selectedSize.id === 'm' ? 1 :
                                                        selectedSize.id === 'l' ? 1.5 : 2.0
                                        )}%`
                                        : `${(customRoomImage ? 35 * scale : activeScene.pos.width * 1.5) * (
                                            selectedSize.id === 'xs' ? 0.33 :
                                                selectedSize.id === 's' ? 0.67 :
                                                    selectedSize.id === 'm' ? 1 :
                                                        selectedSize.id === 'l' ? 1.5 : 2.0
                                        )}%`,

                                    transform: customRoomImage
                                        ? `perspective(1000px) rotateX(${rotations.x}deg) rotateY(${rotations.y}deg) rotateZ(${rotations.z}deg)`
                                        : `rotateY(${activeScene.pos.rotY + manualRot}deg) rotateX(${activeScene.pos.rotX}deg) translateZ(50px)`,
                                    transformStyle: 'preserve-3d',
                                }}
                            >

                                {/* INTERACTIVE FLOATING UI */}
                                {manualOffset.x === 0 && manualOffset.y === 0 && manualRot === 0 && (
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-white/80 backdrop-blur-md text-black border border-black/10 px-4 py-2 shadow-xl flex items-center gap-3 font-mono text-[10px] font-bold uppercase whitespace-nowrap rounded-full">
                                            <MousePointer2 className="w-3 h-3 text-[var(--color-brand-safety-orange)]" />
                                            POSTERİ ODANA YERLEŞTİR
                                        </div>
                                    </div>
                                )}

                                {/* METAL DEPTH & REALISTIC CAST SHADOW */}
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-300"
                                    style={{ transform: 'translateZ(-4px)', filter: 'blur(1px)' }}
                                />
                                <div className="absolute inset-4 bg-black/50 blur-3xl -z-10 translate-x-12 translate-y-6 opacity-60" />

                                {/* THE MAIN PRINTED SURFACE (METAL PLATE) */}
                                <div className="relative overflow-hidden bg-zinc-950 shadow-2xl border-[0.5px] border-white/10"
                                    style={{
                                        transform: 'translateZ(1px)',
                                        aspectRatio: orientation === 'portrait' ? `1 / ${1 / selectedSize.ratio}` : `${1 / selectedSize.ratio} / 1`
                                    }}>

                                    {/* BLURRED BACKGROUND FILL (To prevent cutting and gaps) */}
                                    <Image
                                        src={customImage || product.images?.[selectedSize.id as keyof typeof product.images] || product.image || "/hero-mockup.png"}
                                        alt=""
                                        fill
                                        className="object-cover blur-[20px] opacity-40 scale-110 pointer-events-none"
                                    />

                                    {/* THE ACTUAL PRODUCT IMAGE - FULL COVER */}
                                    <Image
                                        src={customImage || product.images?.[selectedSize.id as keyof typeof product.images] || product.image || "/hero-mockup.png"}
                                        alt={`${product.name} - ${selectedSize.name}`}
                                        fill
                                        priority
                                        className="object-cover z-10 transition-all duration-700 ease-in-out"
                                    />

                                    {/* PREMIUM METAL SHEEN */}
                                    <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-screen pointer-events-none opacity-30" />

                                    {/* MOUNTING DETAILS (VİDALI GÖRÜNÜM) */}
                                    <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-black/40 shadow-inner z-30 border border-white/10" />
                                    <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black/40 shadow-inner z-30 border border-white/10" />
                                    <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-black/40 shadow-inner z-30 border border-white/10" />
                                    <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-black/40 shadow-inner z-30 border border-white/10" />
                                </div>

                                {/* SIZE INFO LABEL */}
                                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="bg-black text-white px-3 py-1 font-mono text-[9px] font-black uppercase tracking-widest border border-white/20">
                                        ÖLÇEK: {orientation === 'landscape'
                                            ? `${selectedSize.name.split('x')[1].split(' ')[0]}x${selectedSize.name.split('x')[0]} CM`
                                            : selectedSize.name} ({orientation === 'portrait' ? 'DİKEY' : 'YATAY'})
                                    </span>
                                </div>
                            </div>

                            {/* HUD INTERFACE */}
                            <div className="absolute top-6 left-6 z-40 space-y-2">
                                <label className="cursor-pointer group block">
                                    <div className="bg-black text-white px-4 py-3 font-mono text-[10px] font-bold border-2 border-white flex items-center gap-3 shadow-brutal hover:bg-[#00FF41] hover:text-black transition-all">
                                        <Home className="w-4 h-4" />
                                        <span>KENDİ ODANIN FOTOSUNU YÜKLE</span>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleRoomImageUpload} />
                                </label>
                                <div className="bg-white/90 backdrop-blur-md border border-black p-2 font-mono text-[8px] font-black uppercase text-black italic">
                                    ÖNERİLEN ODA FOTOSU: 4000x3000 PX
                                </div>
                                {customRoomImage && (
                                    <button
                                        onClick={() => setCustomRoomImage(null)}
                                        className="bg-red-600 text-white px-3 py-1 text-[8px] font-black uppercase border border-white/20 shadow-brutal active:shadow-none translate-y-0 active:translate-y-1"
                                    >
                                        VARSAYILAN ODAYA DÖN
                                    </button>
                                )}
                                {/* Original product image upload */}
                                <label className="cursor-pointer group block">
                                    <div className="bg-black text-white px-4 py-3 font-mono text-[10px] font-bold border-2 border-white flex items-center gap-3 shadow-brutal hover:bg-[var(--color-brand-safety-orange)] transition-all">
                                        <Plus className="w-4 h-4" />
                                        <span>KENDİ GÖRSELİNİ YÜKLE (TASLAK)</span>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleProductImageUpload} />
                                </label>
                                {customImage && (
                                    <button
                                        onClick={() => setCustomImage(null)}
                                        className="mt-2 bg-red-600 text-white px-3 py-1 text-[8px] font-black uppercase border border-white/20"
                                    >
                                        GÖRSELİ SİL
                                    </button>
                                )}
                            </div>

                            {/* SCENE SELECTOR BAR */}
                            <div className="absolute top-6 right-6 z-40 flex flex-col md:flex-row gap-2">
                                {SCENES.map((scene) => (
                                    <button
                                        key={scene.id}
                                        onClick={() => { setActiveScene(scene); resetPos(); }}
                                        className={`p-2 border transition-all duration-300 flex items-center gap-2 text-[10px] font-bold uppercase
                                            ${activeScene.id === scene.id
                                                ? 'bg-black text-white border-black scale-105 shadow-xl'
                                                : 'bg-white/60 backdrop-blur-md text-black border-black/10 hover:bg-white hover:scale-105'}`}
                                    >
                                        <scene.icon className="w-3 h-3" />
                                        <span className="hidden md:inline">{scene.name}</span>
                                    </button>
                                ))}
                            </div>

                            {/* ADJUSTMENT CONSOLE (ONLY FOR CUSTOM ROOM) */}
                            {customRoomImage && (
                                <div className="absolute bottom-4 left-4 right-4 z-50 bg-black/80 backdrop-blur-md p-4 border border-white/20 rounded-xl space-y-3">
                                    <div className="flex justify-between items-center text-white text-[10px] font-mono font-bold uppercase border-b border-white/10 pb-2 mb-2">
                                        <span>PERSPEKTİF AYARI</span>
                                        <button onClick={resetPos} className="text-[var(--color-brand-safety-orange)] hover:underline">SIFIRLA</button>
                                    </div>

                                    {/* X AXIS (TILT UP/DOWN) */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-white font-mono text-[9px] w-8">EĞİM D</span>
                                        <input
                                            type="range" min="-60" max="60"
                                            value={rotations.x}
                                            onChange={(e) => setRotations(prev => ({ ...prev, x: parseInt(e.target.value) }))}
                                            className="w-full accent-[var(--color-brand-safety-orange)] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Y AXIS (TURN LEFT/RIGHT) */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-white font-mono text-[9px] w-8">EĞİM Y</span>
                                        <input
                                            type="range" min="-60" max="60"
                                            value={rotations.y}
                                            onChange={(e) => setRotations(prev => ({ ...prev, y: parseInt(e.target.value) }))}
                                            className="w-full accent-[var(--color-brand-safety-orange)] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* Z AXIS (TILT SIDEWAYS) */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-white font-mono text-[9px] w-8">EĞİM Z</span>
                                        <input
                                            type="range" min="-45" max="45"
                                            value={rotations.z}
                                            onChange={(e) => setRotations(prev => ({ ...prev, z: parseInt(e.target.value) }))}
                                            className="w-full accent-[var(--color-brand-safety-orange)] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>

                                    {/* SCALE (SIZE) */}
                                    <div className="flex items-center gap-3 border-t border-white/10 pt-2 mt-2">
                                        <span className="text-white font-mono text-[9px] w-8">BOYUT</span>
                                        <input
                                            type="range" min="0.5" max="2" step="0.1"
                                            value={scale}
                                            onChange={(e) => setScale(parseFloat(e.target.value))}
                                            className="w-full accent-[#00FF41] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* STANDARD CONTROLS (Only visible when NO custom room image) */}
                            {!customRoomImage && (
                                <>
                                    {/* SCALE REFERENCE MARKERS */}
                                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {activeScene.id === 'loft' && (
                                            <>
                                                <div className="absolute top-[82%] left-[20%] border-t border-white/50 w-[60%] flex justify-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase mt-1">DERİ KOLTUK (~220 CM)</span>
                                                </div>
                                                <div className="absolute top-[30%] left-[10%] border-l border-white/50 h-[40%] flex items-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase ml-2">TAVAN YÜKSEKLİĞİ (~3.2 M)</span>
                                                </div>
                                            </>
                                        )}
                                        {activeScene.id === 'garage' && (
                                            <>
                                                <div className="absolute top-[65%] left-[10%] border-t border-white/50 w-[40%] flex justify-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase mt-1">PROFESYONEL TEZGAH (~150 CM)</span>
                                                </div>
                                                <div className="absolute top-[65%] left-[65%] border-t border-white/50 w-[30%] flex justify-center">
                                                    <span className="bg-black/80 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-cyan-400 font-mono uppercase mt-1">RGB GAMING DESK (~160 CM)</span>
                                                </div>
                                            </>
                                        )}
                                        {activeScene.id === 'gallery' && (
                                            <>
                                                <div className="absolute top-[85%] left-[65%] border-t border-black/50 w-[25%] flex justify-center">
                                                    <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-black font-mono uppercase mt-1">GALERİ BANKI (~120 CM)</span>
                                                </div>
                                                <div className="absolute top-[10%] left-[5%] border-l border-black/50 h-[80%] flex items-center">
                                                    <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-black font-mono uppercase ml-2">SERGİ DUVARI (~4 M)</span>
                                                </div>
                                            </>
                                        )}
                                        {activeScene.id === 'teen' && (
                                            <>
                                                <div className="absolute top-[82%] left-[35%] border-t border-black/50 w-[45%] flex justify-center">
                                                    <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-black font-mono uppercase mt-1">YATAK (~90x200 CM)</span>
                                                </div>
                                                <div className="absolute top-[40%] left-[18%] border-l border-black/50 h-[40%] flex items-center">
                                                    <span className="bg-white/80 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-black font-mono uppercase ml-2">KİTAPLIK (~180 CM)</span>
                                                </div>
                                            </>
                                        )}
                                        {activeScene.id === 'boho' && (
                                            <>
                                                <div className="absolute top-[82%] left-[25%] border-t border-white/50 w-[50%] flex justify-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase mt-1">OTURMA GRUBU (~210 CM)</span>
                                                </div>
                                                <div className="absolute top-[88%] left-[10%] border-l border-white/50 h-[10%] flex items-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase ml-2">YÜKSEKLİK (~85 CM)</span>
                                                </div>
                                            </>
                                        )}
                                        {activeScene.id === 'cafe' && (
                                            <>
                                                <div className="absolute top-[80%] left-[35%] border-t border-white/50 w-[30%] flex justify-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase mt-1">AHŞAP SEHPA (~65 CM)</span>
                                                </div>
                                                <div className="absolute top-[65%] left-[75%] border-l border-white/50 h-[30%] flex items-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase ml-2">BERJER NY (~90 CM)</span>
                                                </div>
                                            </>
                                        )}
                                        {activeScene.id === 'office' && (
                                            <>
                                                <div className="absolute top-[85%] left-[20%] border-t border-white/50 w-[60%] flex justify-center">
                                                    <span className="bg-black/40 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-white font-mono uppercase mt-1">ENDÜSTRİYEL MASA (~180 CM)</span>
                                                </div>
                                                <div className="absolute top-[70%] left-[45%] border-t border-white/50 w-[10%] flex justify-center">
                                                    <span className="bg-black/80 backdrop-blur-md px-2 py-1 text-[10px] md:text-[8px] text-purple-400 font-mono uppercase mt-1">ULTRA-WIDE (~80 CM)</span>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="absolute bottom-6 right-6 z-50 flex flex-col items-center gap-4 scale-90 md:scale-100 origin-bottom-right">
                                        {/* ROTATION BUTTONS */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleRotate('ccw')}
                                                className="w-10 h-10 bg-white/40 backdrop-blur-xl text-black hover:bg-black hover:text-white flex items-center justify-center border border-white/20 shadow-xl transition-all rounded-full"
                                                aria-label="Rotate Left"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleRotate('cw')}
                                                className="w-10 h-10 bg-white/40 backdrop-blur-xl text-black hover:bg-black hover:text-white flex items-center justify-center border border-white/20 shadow-xl transition-all rounded-full"
                                                aria-label="Rotate Right"
                                            >
                                                <RotateCw className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={resetPos}
                                                className="w-10 h-10 bg-black text-white hover:bg-[var(--color-brand-safety-orange)] flex items-center justify-center border border-black shadow-sm transition-colors rounded-full"
                                                aria-label="Reset All"
                                            >
                                                <Settings className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 font-mono text-[12px] md:text-[10px] font-bold text-center">
                            <div className="flex flex-col items-center gap-2 bg-white p-4 border-2 border-dashed border-black/20">
                                <Shield className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                                <span className="uppercase tracking-tighter">100 YIL SOLMAMA GARANTİSİ</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-white p-4 border-2 border-dashed border-black/20">
                                <Truck className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                                <span className="uppercase tracking-tighter">HIZLI LOJİSTİK AĞA</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-white p-4 border-2 border-dashed border-black/20">
                                <Box className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                                <span className="uppercase tracking-tighter">POLİKARBON PAKETLEME</span>
                            </div>
                        </div>

                        {/* ATTACHED SPECS TABLE */}
                        <div className="mt-4 border-4 border-black bg-white overflow-hidden shadow-brutal">
                            <div className="bg-black text-white px-4 py-2 font-mono text-[12px] md:text-[10px] font-black tracking-widest uppercase flex justify-between items-center">
                                <span>TEKNİK VERİ TABLOSU</span>
                                <span className="text-[#FFD700]">● DOĞRULANDI</span>
                            </div>
                            <div className="divide-y-2 divide-black/10">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key} className="flex font-mono text-[14px] md:text-[11px]">
                                        <div className="w-1/3 bg-slate-100 p-3 md:p-2 font-black uppercase text-black/50 border-r-2 border-black/10">
                                            {key}
                                        </div>
                                        <div className="w-2/3 p-3 md:p-2 font-bold uppercase">
                                            {value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* HOW TO USE ANIMATED DEMOS */}
                        <div className="mt-6 bg-slate-900 border-4 border-black p-6">
                            <h3 className="font-[Archivo Black] text-xl uppercase text-white mb-6 flex items-center gap-2">
                                <span className="bg-[#00CED1] text-black px-2 py-1">NASIL</span>
                                <span>KULLANILIR?</span>
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Demo 1: Drag to Move */}
                                <div className="bg-black/50 border-2 border-white/20 p-4 relative overflow-hidden group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-slate-800 border-2 border-white/30 relative flex items-center justify-center">
                                            <div className="w-5 h-7 bg-[#FFD700] border border-black animate-[drag_2s_ease-in-out_infinite]" />
                                            <Move className="absolute -bottom-1 -right-1 w-4 h-4 text-[#00CED1] animate-pulse" />
                                        </div>
                                        <div>
                                            <div className="text-white font-mono text-xs font-bold">SÜRÜKLE & BIRAK</div>
                                            <div className="text-white/50 font-mono text-[9px]">Posteri taşı</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 text-[10px] font-mono text-[#00CED1]">01</div>
                                </div>

                                {/* Demo 2: Resize */}
                                <div className="bg-black/50 border-2 border-white/20 p-4 relative overflow-hidden">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-slate-800 border-2 border-white/30 relative flex items-center justify-center">
                                            <div className="bg-[#FF1493] border border-black animate-[resize_2.5s_ease-in-out_infinite]" style={{ width: '16px', height: '20px' }} />
                                            <Plus className="absolute -bottom-1 -right-1 w-4 h-4 text-[#FF1493] animate-spin" style={{ animationDuration: '3s' }} />
                                        </div>
                                        <div>
                                            <div className="text-white font-mono text-xs font-bold">BOYUT AYARLA</div>
                                            <div className="text-white/50 font-mono text-[9px]">Boyut butonları ile seç</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 text-[10px] font-mono text-[#FF1493]">02</div>
                                </div>

                                {/* Demo 3: Scene Selection */}
                                <div className="bg-black/50 border-2 border-white/20 p-4 relative overflow-hidden">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-slate-800 border-2 border-white/30 relative flex items-center justify-center overflow-hidden">
                                            <div className="flex gap-1 animate-[scenes_3s_ease-in-out_infinite]">
                                                <div className="w-3 h-3 bg-[#9400D3] rounded-sm" />
                                                <div className="w-3 h-3 bg-[#FFD700] rounded-sm" />
                                                <div className="w-3 h-3 bg-[#00CED1] rounded-sm" />
                                            </div>
                                            <Home className="absolute -bottom-1 -right-1 w-4 h-4 text-[#9400D3]" />
                                        </div>
                                        <div>
                                            <div className="text-white font-mono text-xs font-bold">ORTAM SEÇ</div>
                                            <div className="text-white/50 font-mono text-[9px]">Ev, Kafe, Ofis</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 text-[10px] font-mono text-[#9400D3]">03</div>
                                </div>

                                {/* Demo 4: Upload Image */}
                                <div className="bg-black/50 border-2 border-white/20 p-4 relative overflow-hidden">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-slate-800 border-2 border-dashed border-white/30 relative flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-[#FFD700] animate-[upload_1.5s_ease-in-out_infinite]" />
                                            <ArrowRight className="absolute -bottom-1 -right-1 w-4 h-4 text-[#FFD700] animate-bounce" />
                                        </div>
                                        <div>
                                            <div className="text-white font-mono text-xs font-bold">GÖRSEL YÜKLE</div>
                                            <div className="text-white/50 font-mono text-[9px]">Kendi odanı dene</div>
                                        </div>
                                    </div>
                                    <div className="absolute top-2 right-2 text-[10px] font-mono text-[#FFD700]">04</div>
                                </div>
                            </div>

                            {/* Tip */}
                            <div className="mt-4 bg-[#00CED1]/10 border border-[#00CED1]/30 p-3 font-mono text-[10px] text-[#00CED1] text-center">
                                💡 Yukarıdaki mockup alanında tüm bu işlemleri deneyebilirsin!
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SALES LETTER */}
                <div className="lg:col-span-5 space-y-8">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-[Archivo Black] leading-[0.9] uppercase mb-1">
                            {customImage ? "SİZİN ÖZEL TASARIMINIZ" : (product.name.split("|")[1]?.trim() || product.name)}
                        </h1>
                        <div className="font-mono text-xs font-bold text-black/40 uppercase tracking-[0.2em] mb-4">
                            {customImage ? "— SİZE ÖZEL METAL BASKI —" : "— HAYALİNDEKİ MEKANI TASARLA —"}
                        </div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-[var(--color-brand-safety-orange)]">
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                                <Star className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-sm font-bold text-black/60">(48 Değerlendirme)</span>
                        </div>

                        <p className="font-mono text-lg leading-relaxed border-l-4 border-[var(--color-brand-safety-orange)] pl-6 py-2 bg-slate-50 mb-8 italic">
                            {customImage ? "Yüklediğiniz bu harika görseli 1.5mm yüksek kalite alüminyum üzerine işleyip size gönderiyoruz!" : product.description}
                        </p>

                        {/* SIZE SELECTION GRID (From Configurator) */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <label className="flex items-center gap-2 text-base font-black uppercase text-black font-mono">
                                    <Settings className="w-4 h-4" /> BOYUT VE YAPILANDIRMA
                                </label>
                                {/* RESOLUTION RECOMENDATION */}
                                <div className="font-mono text-[9px] font-black text-[var(--color-brand-safety-orange)] animate-pulse">
                                    ÖNERİLEN ÇÖZÜNÜRLÜK: 3000x2000 PX+
                                </div>
                            </div>

                            {/* ORIENTATION TOGGLE */}
                            <div className="flex gap-0 border-4 border-black mb-4">
                                {ORIENTATIONS.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setOrientation(opt.id as 'portrait' | 'landscape')}
                                        className={`flex-1 py-4 font-mono text-xs font-black flex items-center justify-center gap-3 transition-none ${orientation === opt.id
                                            ? 'bg-black text-white'
                                            : 'bg-white text-black hover:bg-[#FFD700]'
                                            }`}
                                    >
                                        <opt.icon className={`w-4 h-4 ${opt.id === 'landscape' ? 'rotate-0' : ''}`} />
                                        {opt.name}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-0 border-4 border-black">
                                {sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => setSelectedSize(size)}
                                        className={`p-4 text-left transition-none border-b-2 last:border-b-0 md:border-b-2 md:[&:nth-child(even)]:border-l-2 border-black ${selectedSize.id === size.id
                                            ? 'bg-[var(--color-brand-safety-orange)] text-white'
                                            : 'bg-white text-black hover:bg-[#FFD700]'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-black font-mono text-[16px] md:text-sm">
                                                {orientation === 'landscape'
                                                    ? `${size.name.split('x')[1].split(' ')[0]}x${size.name.split('x')[0]} CM`
                                                    : size.name}
                                            </span>
                                            {selectedSize.id === size.id && <Check className="w-4 h-4" />}
                                        </div>
                                        <p className="text-[12px] md:text-[10px] font-bold opacity-70">{size.desc}</p>
                                        {size.priceAdd !== 0 && (
                                            <p className="text-xs font-black mt-1">
                                                {size.priceAdd > 0 ? `+₺${size.priceAdd}` : `-₺${Math.abs(size.priceAdd)}`}
                                            </p>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {customSize ? (
                        <div className="bg-black text-white p-8 shadow-brutal border-l-8 border-[var(--color-brand-safety-orange)] animate-pulse">
                            <h2 className="text-2xl font-[Archivo Black] uppercase mb-4 text-[var(--color-brand-safety-orange)]">
                                ÖZEL PROJE TESPİT EDİLDİ
                            </h2>
                            <p className="font-mono text-sm mb-6 opacity-80">
                                Standart dışı, tamamen mekanınıza özel bir boyut ve oran belirlediniz. Bu tür butik üretimler için uzman ekibimizle görüşerek fiyat almanız gerekmektedir.
                            </p>
                            <div className="space-y-3">
                                <a
                                    href="https://wa.me/905555555555"
                                    target="_blank"
                                    className="w-full py-4 bg-[#25D366] text-white font-black font-mono text-lg flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all"
                                >
                                    <MessageSquare className="w-6 h-6" /> WHATSAPP İLE FİYAT AL
                                </a>
                                <a
                                    href="tel:+905555555555"
                                    className="w-full py-4 bg-white text-black font-black font-mono text-lg flex items-center justify-center gap-3 hover:bg-slate-200 transition-all"
                                >
                                    <Phone className="w-6 h-6" /> TELEFON İLE GÖRÜŞ
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-black text-white p-8 shadow-brutal border-l-8 border-[var(--color-brand-safety-orange)]">
                            <div className="flex flex-col mb-6">
                                <span className="text-xs font-mono opacity-50 mb-1 uppercase tracking-widest">HESAPLANAN BİRİM MALİYET</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-[Archivo Black]">₺{totalPrice}</span>
                                    <span className="text-sm font-mono text-white/60">/ ADET</span>
                                </div>
                            </div>
                            <span className="block text-xs font-mono text-[var(--color-brand-safety-orange)] mb-6">● STOKTA MEVCUT (İZMİR DEPODAN GÖNDERİM)</span>

                            <button
                                onClick={handleAddToCart}
                                className={`w-full py-6 text-2xl font-black font-[Archivo Black] uppercase transition-all flex items-center justify-center gap-4 shadow-[6px_6px_0px_0px_white] active:translate-x-1 active:translate-y-1 active:shadow-none border-2 border-white ${isAdded
                                    ? "bg-[#4CAF50] text-white"
                                    : "bg-white text-black hover:bg-[var(--color-brand-safety-orange)] hover:text-white"
                                    }`}
                            >
                                {isAdded ? (
                                    <>SEPETE EKLENDİ <Check className="w-8 h-8" /></>
                                ) : (
                                    <>SEPETE EKLE <ShoppingCart className="w-8 h-8" /></>
                                )}
                            </button>
                        </div>
                    )}


                    <div className="pt-8 border-t-4 border-black">
                        <h3 className="font-[Archivo Black] text-xl uppercase mb-4">TASARIM HİKAYESİ</h3>
                        <div className="prose prose-slate font-sans leading-relaxed text-black/80">
                            {product.story ? (
                                product.story.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="mb-4 text-justify text-[16px] md:text-base">{paragraph}</p>
                                ))
                            ) : (
                                <p className="text-[16px] md:text-base">Bu ürün için detaylı hikaye verisi yüklenmektedir.</p>
                            )}
                        </div>
                    </div>

                    {/* POP ART FEATURE SHOWCASE - CENTERED */}
                    <div className="pt-8 border-t-4 border-black">
                        <div className="max-w-lg mx-auto">
                            <div className="bg-gradient-to-r from-[#FF1493] via-[#FFD700] to-[#00CED1] p-1">
                                <div className="bg-black p-6">
                                    <h3 className="font-[Archivo Black] text-2xl uppercase text-white mb-6 flex items-center justify-center gap-3">
                                        <span className="bg-[#FFD700] text-black px-3 py-1 rotate-[-2deg]">NEDEN</span>
                                        <span className="text-[#FF1493]">METAL</span>
                                        <span className="text-[#00CED1]">POSTER?</span>
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Feature 1 */}
                                        <div className="bg-[#FF1493] p-4 border-4 border-white transform rotate-[-1deg] hover:rotate-0 transition-transform">
                                            <div className="text-white font-[Archivo Black] text-3xl mb-2">100+</div>
                                            <div className="text-white/90 font-mono text-xs font-bold uppercase">YIL DAYANIKLILIK</div>
                                        </div>

                                        {/* Feature 2 */}
                                        <div className="bg-[#00CED1] p-4 border-4 border-white transform rotate-[1deg] hover:rotate-0 transition-transform">
                                            <div className="text-white font-[Archivo Black] text-3xl mb-2">1.5</div>
                                            <div className="text-white/90 font-mono text-xs font-bold uppercase">MM ALÜMİNYUM</div>
                                        </div>

                                        {/* Feature 3 */}
                                        <div className="bg-[#FFD700] p-4 border-4 border-black transform rotate-[1deg] hover:rotate-0 transition-transform">
                                            <div className="text-black font-[Archivo Black] text-3xl mb-2">∞</div>
                                            <div className="text-black/90 font-mono text-xs font-bold uppercase">SOLMAZ RENK</div>
                                        </div>

                                        {/* Feature 4 */}
                                        <div className="bg-[#9400D3] p-4 border-4 border-white transform rotate-[-1deg] hover:rotate-0 transition-transform">
                                            <div className="text-white font-[Archivo Black] text-3xl mb-2">H₂O</div>
                                            <div className="text-white/90 font-mono text-xs font-bold uppercase">SU GEÇİRMEZ</div>
                                        </div>
                                    </div>

                                    {/* Comic style burst */}
                                    <div className="mt-6 relative">
                                        <div className="absolute -top-3 -right-2 bg-[#FF1493] text-white font-[Archivo Black] text-xs px-3 py-1 transform rotate-[5deg] border-2 border-white">
                                            WOW!
                                        </div>
                                        <div className="bg-white border-4 border-black p-4 font-mono text-sm text-center">
                                            <span className="font-black">ÜCRETSİZ KARGO</span> + <span className="text-[#FF1493] font-black">ÖMÜR BOYU GARANTİ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RELATED PRODUCTS SECTION */}
            {!customImage && (
                <div className="mt-24 pt-12 border-t-8 border-black">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-black text-white px-4 py-2 font-[Archivo Black] text-xl uppercase">
                            BENZER MODELLER
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {PRODUCTS
                            .filter(p => p.category === product.category && p.id !== product.id)
                            .slice(0, 3)
                            .map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/koleksiyon/${relatedProduct.category}/${relatedProduct.slug}`}
                                    className="border-4 border-black bg-white group hover:shadow-brutal-orange transition-all"
                                >
                                    <div className="relative aspect-[4/3] bg-black border-b-4 border-black overflow-hidden">
                                        <Image
                                            src={relatedProduct.image}
                                            alt={relatedProduct.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute top-2 right-2 bg-black text-white text-[10px] font-mono px-2 py-1 font-bold border border-white">
                                            ID: {relatedProduct.id}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-[Archivo Black] text-lg uppercase leading-tight mb-4 line-clamp-2 min-h-[3rem]">
                                            {relatedProduct.name.split("|")[1]?.trim() || relatedProduct.name}
                                        </h4>
                                        <div className="flex justify-between items-center bg-[#E5E7EB] p-2 font-mono font-bold text-sm">
                                            <span>₺{relatedProduct.price}</span>
                                            <div className="flex items-center gap-1 group-hover:text-[var(--color-brand-safety-orange)]">
                                                İNCELE <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </div >
    );
}
