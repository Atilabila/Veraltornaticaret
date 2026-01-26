"use client"

import * as React from "react"
import { ZoomIn, ZoomOut, Maximize2, X, RefreshCcw } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageViewerProps {
    src: string
    alt: string
    aspectRatio?: string
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt, aspectRatio = "aspect-[2/3]" }) => {
    const [scale, setScale] = React.useState(1)
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = React.useState(false)
    const [startPan, setStartPan] = React.useState({ x: 0, y: 0 })
    const [isOpen, setIsOpen] = React.useState(false)

    // Touch handling state
    const lastTouchDistance = React.useRef<number | null>(null)
    const contentRef = React.useRef<HTMLDivElement>(null)

    // Reset on close
    React.useEffect(() => {
        if (!isOpen) {
            resetZoom()
        }
    }, [isOpen])

    const resetZoom = () => {
        setScale(1)
        setPosition({ x: 0, y: 0 })
    }

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const delta = e.deltaY * -0.002
        const newScale = Math.min(Math.max(1, scale + delta), 5)
        setScale(newScale)
        if (newScale === 1) setPosition({ x: 0, y: 0 })
    }

    // Mouse Pan
    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true)
            setStartPan({ x: e.clientX - position.x, y: e.clientY - position.y })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            e.preventDefault()
            const newX = e.clientX - startPan.x
            const newY = e.clientY - startPan.y
            limitPosition(newX, newY, scale)
        }
    }

    const handleMouseUp = () => setIsDragging(false)

    // Touch Pinch & Pan
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            // Pinch start
            const dist = getTouchDistance(e.touches[0], e.touches[1])
            lastTouchDistance.current = dist
        } else if (e.touches.length === 1 && scale > 1) {
            // Pan start
            setIsDragging(true)
            setStartPan({
                x: e.touches[0].clientX - position.x,
                y: e.touches[0].clientY - position.y
            })
        }
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        // Prevent default to stop page scrolling while zooming/panning
        if (scale > 1 || e.touches.length > 1) {
            // e.preventDefault() // Note: React synthetic events might not support this in all cases, best handled by CSS touch-action
        }

        if (e.touches.length === 2 && lastTouchDistance.current !== null) {
            // Pinch Move
            const dist = getTouchDistance(e.touches[0], e.touches[1])
            const delta = dist - lastTouchDistance.current
            const sensitivity = 0.01 // Adjust for speed
            const newScale = Math.min(Math.max(1, scale + (delta * sensitivity)), 5)

            setScale(newScale)
            lastTouchDistance.current = dist
        } else if (e.touches.length === 1 && scale > 1 && isDragging) {
            // Pan Move
            const newX = e.touches[0].clientX - startPan.x
            const newY = e.touches[0].clientY - startPan.y
            limitPosition(newX, newY, scale)
        }
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
        lastTouchDistance.current = null
        if (scale < 1) resetZoom()
    }

    const getTouchDistance = (t1: React.Touch, t2: React.Touch) => {
        const dx = t1.clientX - t2.clientX
        const dy = t1.clientY - t2.clientY
        return Math.sqrt(dx * dx + dy * dy)
    }

    const limitPosition = (x: number, y: number, s: number) => {
        // Simple bounds logic could be added here
        // For now, infinite pan is less jarring than jumpy bounds
        setPosition({ x, y })
    }

    const zoomIn = () => setScale(s => Math.min(s + 0.5, 5))
    const zoomOut = () => {
        setScale(s => {
            const n = Math.max(1, s - 0.5)
            if (n === 1) setPosition({ x: 0, y: 0 })
            return n
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className="relative group overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl">
                {/* Main Image Trigger */}
                <DialogTrigger asChild>
                    <div className={cn("cursor-zoom-in relative w-full overflow-hidden bg-zinc-800", aspectRatio)}>
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 will-change-transform"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 shadow-2xl">
                                <Maximize2 className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
            </div>

            <DialogContent className="max-w-[100vw] w-screen h-screen p-0 m-0 border-none bg-black/95 duration-200"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogTitle className="sr-only">{alt}</DialogTitle>

                {/* Toolbar */}
                <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                    <div className="pointer-events-auto">
                        <span className="text-white/80 font-mono text-xs px-2 py-1 rounded bg-white/10">{Math.round(scale * 100)}%</span>
                    </div>
                    <div className="flex gap-2 pointer-events-auto">
                        <Button variant="ghost" size="icon" onClick={zoomOut} className="text-white hover:bg-white/20 rounded-full h-10 w-10">
                            <ZoomOut className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={zoomIn} className="text-white hover:bg-white/20 rounded-full h-10 w-10">
                            <ZoomIn className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={resetZoom} className="text-white hover:bg-white/20 rounded-full h-10 w-10">
                            <RefreshCcw className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-full h-10 w-10 ml-2">
                            <X className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                {/* Viewport */}
                <div
                    ref={contentRef}
                    className={cn(
                        "w-full h-full flex items-center justify-center overflow-hidden touch-none select-none",
                        scale > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
                    )}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <img
                        src={src}
                        alt={alt}
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            transition: isDragging ? 'none' : 'transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)'
                        }}
                        className="max-w-full max-h-full object-contain pointer-events-none"
                        draggable={false}
                    />
                </div>

                {/* Hint */}
                <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                    <p className="text-white/40 text-xs uppercase tracking-widest font-medium animate-pulse">
                        {scale > 1 ? "Gezinmek için Sürükleyin" : "Yakınlaştırmak için Çift Tıkla veya Çimdikle"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
