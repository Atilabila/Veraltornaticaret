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

    const isSvg = src?.endsWith('.svg')

    // Fetch and inject SVG for CSS interactions
    React.useEffect(() => {
        if (!isSvg || !src) return

        fetch(src)
            .then(res => res.text())
            .then(text => {
                // Clean up SVG and add our classes
                let svg = text
                    .replace(/width="[^"]*"/g, 'width="100%"')
                    .replace(/height="[^"]*"/g, 'height="100%"')
                    .replace(/<svg/, '<svg class="metal-svg"')

                setSvgContent(svg)
                setIsLoaded(true)
            })
            .catch(() => setIsLoaded(true))
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
                {isSvg && svgContent ? (
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
                    />
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
