// =====================================================
// METAL IMAGE COMPONENT
// SVG Injection with CSS Interactions & Ambient Glow
// =====================================================
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MetalImageProps {
    src: string
    alt: string
    backgroundColor?: string
    className?: string
    glowColor?: string
    showAmbientGlow?: boolean
    priority?: boolean
}

export const MetalImage: React.FC<MetalImageProps> = ({
    src,
    alt,
    backgroundColor = "#1a1a1e",
    className,
    glowColor,
    showAmbientGlow = true,
    priority = false
}) => {
    const [svgContent, setSvgContent] = React.useState<string | null>(null)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isHovered, setIsHovered] = React.useState(false)
    const [hasError, setHasError] = React.useState(false)

    const isSvg = src?.endsWith('.svg')

    // Fetch and inject SVG for CSS interactions
    React.useEffect(() => {
        if (!isSvg || !src) {
            setIsLoaded(true)
            return
        }

        fetch(src)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load SVG')
                return res.text()
            })
            .then(text => {
                // Clean up SVG and add our classes
                let svg = text
                    .replace(/width="[^"]*"/g, 'width="100%"')
                    .replace(/height="[^"]*"/g, 'height="100%"')
                    .replace(/<svg/, '<svg class="metal-svg"')

                setSvgContent(svg)
                setIsLoaded(true)
                setHasError(false)
            })
            .catch((err) => {
                console.error('SVG load error:', err)
                setHasError(true)
                setIsLoaded(true)
            })
    }, [src, isSvg])

    // Determine ambient glow color
    const ambientColor = glowColor || getGlowFromBackground(backgroundColor)

    return (
        <div
            className={cn(
                "relative group",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Ambient Glow Layer */}
            {showAmbientGlow && (
                <motion.div
                    className="absolute inset-0 blur-3xl opacity-30 -z-10"
                    style={{ backgroundColor: ambientColor }}
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                        opacity: isHovered ? 0.5 : 0.3
                    }}
                    transition={{ duration: 0.4 }}
                />
            )}

            {/* Image Container */}
            <motion.div
                className="relative w-full h-full"
                animate={{
                    scale: isHovered ? 1.02 : 1
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {!isLoaded ? (
                    // Loading placeholder
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-zinc-700 border-t-zinc-400 rounded-full animate-spin" />
                    </div>
                ) : hasError && isSvg ? (
                    // Error fallback - try as regular image
                    <img
                        src={src}
                        alt={alt}
                        className={cn(
                            "w-full h-full object-contain",
                            "drop-shadow-2xl transition-all duration-300",
                            isHovered && "brightness-110"
                        )}
                        loading={priority ? "eager" : "lazy"}
                        onError={(e) => {
                            console.error('Image failed to load:', src)
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                ) : isSvg && svgContent ? (
                    // Injected SVG for CSS interactions
                    <div
                        className={cn(
                            "w-full h-full transition-all duration-300",
                            "[&_.metal-svg]:w-full [&_.metal-svg]:h-full",
                            "[&_.metal-svg]:drop-shadow-2xl",
                            isHovered && "metal-shimmer-active"
                        )}
                        dangerouslySetInnerHTML={{ __html: svgContent }}
                    />
                ) : (
                    // Regular image with Next.js optimization
                    <img
                        src={src}
                        alt={alt}
                        className={cn(
                            "w-full h-full object-contain",
                            "drop-shadow-2xl transition-all duration-300",
                            isHovered && "brightness-110"
                        )}
                        loading={priority ? "eager" : "lazy"}
                        onLoad={() => setIsLoaded(true)}
                        onError={(e) => {
                            console.error('Image failed to load:', src)
                            setHasError(true)
                            // Show placeholder icon instead
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                )}

                {/* Show placeholder if image failed */}
                {hasError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto text-zinc-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs text-zinc-500">Resim yüklenemedi</p>
                        </div>
                    </div>
                )}

                {/* Metallic Shimmer Overlay on Hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(
                            105deg,
                            transparent 40%,
                            rgba(255, 255, 255, 0.1) 45%,
                            rgba(255, 255, 255, 0.2) 50%,
                            rgba(255, 255, 255, 0.1) 55%,
                            transparent 60%
                        )`
                    }}
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    )
}

// Helper: Get glow color from background
function getGlowFromBackground(bg: string): string {
    // Light backgrounds -> warm glow
    if (bg.includes("f0f4f8") || bg.includes("ffffff") || bg.includes("f8f")) {
        return "#d4af37" // Gold
    }
    // Purple backgrounds
    if (bg.includes("533483") || bg.includes("9c27b0")) {
        return "#9c27b0"
    }
    // Blue backgrounds
    if (bg.includes("16213e") || bg.includes("0f3460")) {
        return "#3b82f6"
    }
    // Red/pink backgrounds  
    if (bg.includes("e94560")) {
        return "#ef4444"
    }
    // Default steel glow
    return "#71717a"
}

export default MetalImage
