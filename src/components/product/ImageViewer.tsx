"use client"

import * as React from "react"
import { ZoomIn, ZoomOut, Maximize2, X, RefreshCcw } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageViewerProps {
    src: string
    alt: string
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt }) => {
    const [scale, setScale] = React.useState(1)
    const [position, setPosition] = React.useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = React.useState(false)
    const [startPos, setStartPos] = React.useState({ x: 0, y: 0 })
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Reset zoom on close
    React.useEffect(() => {
        if (!isOpen) {
            setScale(1)
            setPosition({ x: 0, y: 0 })
        }
    }, [isOpen])

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY * -0.001
        const newScale = Math.min(Math.max(1, scale + delta), 4)
        setScale(newScale)
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true)
            setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            e.preventDefault()
            const newX = e.clientX - startPos.x
            const newY = e.clientY - startPos.y
            setPosition({ x: newX, y: newY })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    // Mobile Pinch Zoom Logic (basic implementation)
    // For a robust extensive solution, one might use a library like react-zoom-pan-pinch,
    // but per instructions we implement a "lightweight" version or at least safe standard events.
    // Since 'touchstart' is not fully typed in React.MouseEvent, we'll keep it simple for now or assume pointer events if needed.
    // For now, implementing buttons for mobile zoom effectively.

    const zoomIn = () => setScale(s => Math.min(s + 0.5, 4))
    const zoomOut = () => setScale(s => Math.max(1, s - 0.5))
    const reset = () => {
        setScale(1)
        setPosition({ x: 0, y: 0 })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <div className="relative group overflow-hidden rounded-xl bg-muted/20 border border-border">
                {/* Main Image Trigger */}
                <DialogTrigger asChild>
                    <div className="cursor-zoom-in relative aspect-square">
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                    </div>
                </DialogTrigger>
            </div>

            <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden bg-black/95 border-none">
                {/* Toolbar */}
                <div className="absolute top-4 right-4 z-50 flex gap-2">
                    <Button variant="secondary" size="icon" onClick={zoomIn} className="rounded-full bg-black/50 hover:bg-black/80 text-white border-white/20">
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={zoomOut} className="rounded-full bg-black/50 hover:bg-black/80 text-white border-white/20">
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={reset} className="rounded-full bg-black/50 hover:bg-black/80 text-white border-white/20">
                        <RefreshCcw className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => setIsOpen(false)} className="rounded-full">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Viewport */}
                <div
                    ref={containerRef}
                    className={cn(
                        "w-full h-full flex items-center justify-center overflow-hidden touch-none",
                        scale > 1 ? "cursor-move" : "cursor-default"
                    )}
                    onWheel={handleWheel}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <img
                        src={src}
                        alt={alt}
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                        }}
                        className="max-w-full max-h-full object-contain select-none pointer-events-none"
                        draggable={false}
                    />
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                    <p className="text-white/50 text-xs">
                        {scale > 1 ? "Sürükleyerek gezinin" : "Yakınlaştırmak için tekerleği kullanın veya butonlara basın"}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
