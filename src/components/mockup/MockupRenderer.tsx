"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Template } from "@/data/templates";
import { useConfiguratorStore } from "@/store/useConfiguratorStore";

export function MockupRenderer({
    template,
    sizeCm,
    posterPreviewSrc,
    manualOffset = { x: 0, y: 0 },
    manualRot = 0,
    imageScale = 1,
    imageFit = "cover",
    onDragStart,
    onDragMove,
    onDragEnd,
}: {
    template: Template;
    sizeCm: { dimA: number; dimB: number };
    posterPreviewSrc: string;
    manualOffset?: { x: number; y: number };
    manualRot?: number;
    imageScale?: number;
    imageFit?: "cover" | "contain";
    onDragStart?: () => void;
    onDragMove?: (delta: { x: number; y: number }) => void;
    onDragEnd?: () => void;
}) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const [wrap, setWrap] = useState({ w: 0, h: 0 });
    const [isDraggingPoster, setIsDraggingPoster] = useState(false);
    const [dragPoint, setDragPoint] = useState<"A" | "B" | "C" | "D" | null>(null);
    const [imageAspect, setImageAspect] = useState(1.5); // Default 3:2
    const dragStartRef = useRef({ x: 0, y: 0 });

    const { showCalibrator, calibrations, updateCalibration } = useConfiguratorStore();
    const calib = calibrations[template.id] || {
        refA: template.refA, refB: template.refB, refCm: template.sofaCm,
        refC: template.refC, refD: template.refD, refHeightCm: template.sofaHeightCm
    };

    // GÖRSELİN GERÇEK ORANINI BUL (OTOMATİK ÖLÇEK İÇİN)
    useEffect(() => {
        const img = new (window as any).Image();
        img.onload = () => {
            const aspect = img.naturalWidth / img.naturalHeight;
            if (aspect > 0) setImageAspect(aspect);
        };
        img.src = posterPreviewSrc;
    }, [posterPreviewSrc]);

    useEffect(() => {
        if (!wrapRef.current) return;
        const el = wrapRef.current;

        const ro = new ResizeObserver(() => {
            const r = el.getBoundingClientRect();
            setWrap({ w: r.width, h: r.height });
        });
        ro.observe(el);

        const r = el.getBoundingClientRect();
        setWrap({ w: r.width, h: r.height });

        return () => ro.disconnect();
    }, []);

    const poster = useMemo(() => {
        if (!wrap.w || !wrap.h) return null;

        // A-B piksel koordinatları (Genişlik)
        const Ax = calib.refA.x * wrap.w;
        const Ay = calib.refA.y * wrap.h;
        const Bx = calib.refB.x * wrap.w;
        const By = calib.refB.y * wrap.h;
        const refWPx = Math.hypot(Bx - Ax, By - Ay);

        // C-D piksel koordinatları (Yükseklik)
        const Cx = calib.refC.x * wrap.w;
        const Cy = calib.refC.y * wrap.h;
        const Dx = calib.refD.x * wrap.w;
        const Dy = calib.refD.y * wrap.h;
        const refHPx = Math.hypot(Dx - Cx, Dy - Cy);

        // OTOMATİK ÖLÇEK ALGORİTMASI
        const isPortrait = imageAspect < 1;
        const posterWcm = isPortrait ? Math.min(sizeCm.dimA, sizeCm.dimB) : Math.max(sizeCm.dimA, sizeCm.dimB);

        // Genişlik üzerinden ölçekle
        const scaleW = posterWcm / (calib.refCm || 1);
        const posterWpx = refWPx * scaleW;
        const posterHpx = posterWpx / imageAspect;

        // wallBox içinde ortala (veya manual offset uygula)
        const box = template.wallBox;
        const boxPx = {
            x: box.x * wrap.w,
            y: box.y * wrap.h,
            w: box.w * wrap.w,
            h: box.h * wrap.h,
        };

        const left = boxPx.x + boxPx.w / 2 + (manualOffset.x * wrap.w) / 100;
        const top = boxPx.y + boxPx.h / 2 + (manualOffset.y * wrap.h) / 100;

        return {
            left,
            top,
            w: posterWpx,
            h: posterHpx,
            aspectRatio: imageAspect
        };
    }, [wrap.w, wrap.h, calib, sizeCm, manualOffset, imageAspect, template.wallBox]);

    const handleMouseDown = (e: React.MouseEvent, type: "POSTER" | "A" | "B" | "C" | "D") => {
        e.stopPropagation();
        dragStartRef.current = { x: e.clientX, y: e.clientY };

        if (type === "POSTER") {
            setIsDraggingPoster(true);
            onDragStart?.();
        } else {
            setDragPoint(type);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!wrap.w || !wrap.h) return;

        if (isDraggingPoster) {
            const deltaX = ((e.clientX - dragStartRef.current.x) / wrap.w) * 100;
            const deltaY = ((e.clientY - dragStartRef.current.y) / wrap.h) * 100;
            onDragMove?.({ x: deltaX, y: deltaY });
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            return;
        }

        if (dragPoint) {
            const rect = wrapRef.current!.getBoundingClientRect();
            const x = (e.clientX - rect.left) / wrap.w;
            const y = (e.clientY - rect.top) / wrap.h;

            updateCalibration(template.id, {
                [dragPoint === "A" ? "refA" : dragPoint === "B" ? "refB" : dragPoint === "C" ? "refC" : "refD"]: { x, y }
            });
        }
    };

    const handleMouseUp = () => {
        setIsDraggingPoster(false);
        setDragPoint(null);
        onDragEnd?.();
    };

    return (
        <div
            ref={wrapRef}
            className="relative w-full aspect-square overflow-hidden bg-[#1a1a1a] border-4 border-black shadow-2xl"
            style={{ perspective: "2000px" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="absolute inset-0">
                <Image
                    src={template.src}
                    alt={template.name}
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                    unoptimized
                />
                <div className="absolute inset-0 bg-black/5" />
            </div>

            {poster && !showCalibrator && (
                <div
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out z-30 ${isDraggingPoster ? "cursor-grabbing scale-[1.02]" : "cursor-grab"
                        }`}
                    style={{
                        left: poster.left,
                        top: poster.top,
                        width: poster.w,
                        height: poster.h,
                        transform: `translate(-50%, -50%) rotateY(${template.perspective?.rotY || 0 + manualRot}deg) rotateX(${template.perspective?.rotX || 0}deg) translateZ(50px)`,
                        transformStyle: "preserve-3d",
                    }}
                    onMouseDown={(e) => handleMouseDown(e, "POSTER")}
                >
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-300"
                        style={{ transform: "translateZ(-4px)", filter: "blur(1px)" }}
                    />
                    <div className="absolute inset-4 bg-black/50 blur-3xl -z-10 translate-x-12 translate-y-6 opacity-60" />

                    <div
                        className="relative overflow-hidden bg-zinc-950 shadow-2xl border-[0.5px] border-white/10"
                        style={{
                            transform: "translateZ(1px)",
                            aspectRatio: poster.aspectRatio
                        }}
                    >
                        <div className="absolute inset-0 z-10 overflow-hidden">
                            <Image
                                src={posterPreviewSrc}
                                alt=""
                                fill
                                priority
                                quality={100}
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/10 to-transparent mix-blend-screen pointer-events-none opacity-30" />
                    </div>
                </div>
            )}

            {showCalibrator && (
                <div className="absolute inset-0 z-50 bg-black/20 pointer-events-none">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* GENİŞLİK CETVELİ (A-B) */}
                        <line
                            x1={calib.refA.x * wrap.w} y1={calib.refA.y * wrap.h}
                            x2={calib.refB.x * wrap.w} y2={calib.refB.y * wrap.h}
                            stroke="#D4AF37" strokeWidth="2" strokeDasharray="4 4"
                        />
                        <line x1={calib.refA.x * wrap.w} y1={calib.refA.y * wrap.h - 10} x2={calib.refA.x * wrap.w} y2={calib.refA.y * wrap.h + 10} stroke="#D4AF37" strokeWidth="3" />
                        <line x1={calib.refB.x * wrap.w} y1={calib.refB.y * wrap.h - 10} x2={calib.refB.x * wrap.w} y2={calib.refB.y * wrap.h + 10} stroke="#D4AF37" strokeWidth="3" />

                        <foreignObject x={Math.min(calib.refA.x, calib.refB.x) * wrap.w} y={(calib.refA.y * wrap.h + calib.refB.y * wrap.h) / 2 - 40} width={Math.abs(calib.refB.x - calib.refA.x) * wrap.w} height="40">
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="bg-black text-[#D4AF37] px-3 py-1 font-mono text-[10px] font-black border border-[#D4AF37] shadow-xl whitespace-nowrap">
                                    {template.refName} GENİŞLİĞİ: {calib.refCm} CM
                                </div>
                            </div>
                        </foreignObject>

                        {/* YÜKSEKLİK CETVELİ (C-D) */}
                        <line
                            x1={calib.refC.x * wrap.w} y1={calib.refC.y * wrap.h}
                            x2={calib.refD.x * wrap.w} y2={calib.refD.y * wrap.h}
                            stroke="#3498db" strokeWidth="2" strokeDasharray="4 4"
                        />
                        <line x1={calib.refC.x * wrap.w - 10} y1={calib.refC.y * wrap.h} x2={calib.refC.x * wrap.w + 10} y2={calib.refC.y * wrap.h} stroke="#3498db" strokeWidth="3" />
                        <line x1={calib.refD.x * wrap.w - 10} y1={calib.refD.y * wrap.h} x2={calib.refD.x * wrap.w + 10} y2={calib.refD.y * wrap.h} stroke="#3498db" strokeWidth="3" />

                        <foreignObject x={calib.refC.x * wrap.w + 15} y={Math.min(calib.refC.y, calib.refD.y) * wrap.h} width="200" height={Math.abs(calib.refD.y - calib.refC.y) * wrap.h}>
                            <div className="w-full h-full flex items-center justify-start">
                                <div className="bg-black text-[#3498db] px-3 py-1 font-mono text-[10px] font-black border border-[#3498db] shadow-xl whitespace-nowrap">
                                    {template.refName} YÜKSEKLİĞİ: {calib.refHeightCm} CM
                                </div>
                            </div>
                        </foreignObject>
                    </svg>

                    {/* Point A-B (Genişlik) */}
                    <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-move pointer-events-auto" style={{ left: `${calib.refA.x * 100}%`, top: `${calib.refA.y * 100}%` }} onMouseDown={(e) => handleMouseDown(e, "A")}>
                        <div className="w-full h-full bg-[#D4AF37] rounded-full border-2 border-white shadow-xl flex items-center justify-center font-bold text-black text-[10px] animate-pulse">A</div>
                    </div>
                    <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-move pointer-events-auto" style={{ left: `${calib.refB.x * 100}%`, top: `${calib.refB.y * 100}%` }} onMouseDown={(e) => handleMouseDown(e, "B")}>
                        <div className="w-full h-full bg-[#D4AF37] rounded-full border-2 border-white shadow-xl flex items-center justify-center font-bold text-black text-[10px] animate-pulse">B</div>
                    </div>

                    {/* Point C-D (Yükseklik) */}
                    <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-move pointer-events-auto" style={{ left: `${calib.refC.x * 100}%`, top: `${calib.refC.y * 100}%` }} onMouseDown={(e) => handleMouseDown(e, "C")}>
                        <div className="w-full h-full bg-[#3498db] rounded-full border-2 border-white shadow-xl flex items-center justify-center font-bold text-white text-[10px] animate-pulse">C</div>
                    </div>
                    <div className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 cursor-move pointer-events-auto" style={{ left: `${calib.refD.x * 100}%`, top: `${calib.refD.y * 100}%` }} onMouseDown={(e) => handleMouseDown(e, "D")}>
                        <div className="w-full h-full bg-[#3498db] rounded-full border-2 border-white shadow-xl flex items-center justify-center font-bold text-white text-[10px] animate-pulse">D</div>
                    </div>

                    <div className="absolute top-10 left-1/2 -translate-x-1/2 text-white font-mono text-center bg-black/80 backdrop-blur-md p-4 border-2 border-[#D4AF37] shadow-2xl">
                        <div className="text-xl font-black mb-1 tracking-tighter uppercase whitespace-nowrap">Çift Akslı Sistematik Kalibrasyon</div>
                        <div className="text-[9px] uppercase font-bold opacity-80">A-B ile Genişliği, C-D ile Yüksekliği belirleyin</div>
                    </div>
                </div>
            )}
        </div>
    );
}
