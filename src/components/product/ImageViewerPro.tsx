"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Move, Maximize2, RotateCcw, Smartphone, Monitor } from 'lucide-react';
import { SystemLabel } from '@/components/ui/Industrial';
import { m, AnimatePresence } from 'framer-motion';

interface ImageViewerProProps {
    images: string[];
    title?: string;
}

export const ImageViewerPro: React.FC<ImageViewerProProps> = ({ images, title }) => {
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => {
        setZoom(prev => {
            const newZoom = Math.max(prev - 0.5, 1);
            if (newZoom === 1) setPosition({ x: 0, y: 0 });
            return newZoom;
        });
    };

    const handleReset = () => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    };

    const onMouseDown = (e: React.MouseEvent) => {
        if (zoom <= 1) return;
        setIsDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || zoom <= 1) return;
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => setIsDragging(false);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative flex flex-col bg-fog-gray border border-near-black overflow-hidden select-none ${isFullscreen ? 'h-screen w-screen' : 'h-[500px] md:h-[600px] w-full'}`}
        >
            {/* Header Info */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start z-20 pointer-events-none">
                <div className="flex flex-col gap-2">
                    <SystemLabel text={`DOSYA: ${title || 'BELİRTİLMEDİ'}`} active />
                    <SystemLabel text={`IMG_ID: ${activeImageIdx + 1}/${images.length}`} />
                </div>
                <div className="flex items-center gap-2 pointer-events-auto">
                    <button
                        onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
                        className="bg-near-black text-white p-2 hover:bg-hazard-orange hover:text-near-black transition-colors flex items-center gap-2"
                    >
                        {orientation === 'portrait' ? <Monitor size={14} /> : <Smartphone size={14} />}
                        <span className="font-ibm-plex text-[10px] font-bold">VIEW: {orientation === 'portrait' ? 'H' : 'V'}</span>
                    </button>
                </div>
            </div>

            {/* Main Viewport */}
            <div
                className="flex-1 relative cursor-crosshair overflow-hidden flex items-center justify-center p-8"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
            >
                <div
                    className={`relative transition-transform duration-200 ease-out shadow-2xl bg-white
            ${orientation === 'portrait' ? 'aspect-[3/4] h-full max-w-full' : 'aspect-[4/3] w-full max-h-full'}`}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                        cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'crosshair'
                    }}
                >
                    <img
                        ref={imageRef}
                        src={images[activeImageIdx]}
                        alt={title}
                        className="w-full h-full object-cover grayscale active:grayscale-0 transition-all duration-300"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Industrial Controls */}
            <div className="bg-near-black p-4 flex flex-wrap justify-between items-center gap-4 border-t border-steel-gray z-20">
                <div className="flex items-center gap-1">
                    <ControlBtn icon={ZoomIn} label="ZOOM+" onClick={handleZoomIn} />
                    <ControlBtn icon={ZoomOut} label="ZOOM-" onClick={handleZoomOut} />
                    <ControlBtn icon={RotateCcw} label="RESET" onClick={handleReset} />
                    <div className="mx-2 w-px h-6 bg-steel-gray" />
                    <ControlBtn icon={Maximize2} label="FULL" onClick={toggleFullscreen} />
                </div>

                {/* Multi-angle Thumbnails */}
                <div className="flex gap-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImageIdx(idx)}
                            className={`w-12 h-12 border-2 transition-all ${activeImageIdx === idx ? 'border-hazard-orange opacity-100' : 'border-steel-gray opacity-40 hover:opacity-100'}`}
                        >
                            <img src={img} alt="Angle" className="w-full h-full object-cover grayscale" />
                        </button>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4 text-paper-white font-ibm-plex text-[10px] tracking-widest opacity-50">
                    <span>SİSTEM_KOORD: {position.x.toFixed(0)}, {position.y.toFixed(0)}</span>
                    <span>MAGNIFICATION: {zoom.toFixed(1)}X</span>
                </div>
            </div>
        </div>
    );
};

const ControlBtn = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-1 px-3 py-1 hover:bg-steel-gray transition-colors text-paper-white"
    >
        <Icon size={18} />
        <span className="text-[9px] font-bold font-ibm-plex">{label}</span>
    </button>
);
