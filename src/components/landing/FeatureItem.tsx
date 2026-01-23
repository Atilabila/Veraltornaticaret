// =====================================================
// FEATURE ITEM COMPONENT - METAL ART EDITION
// Drop Animation with Impact Shake Effect
// =====================================================
"use client"

import * as React from "react"
import { motion, useAnimation } from "framer-motion"
import * as LucideIcons from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductFeature } from "@/lib/supabase/metal-products.types"

interface FeatureItemProps {
    feature: ProductFeature
    index: number
    isInView: boolean
    variant?: "light" | "dark"
}

// Map of icon names to components
const getIcon = (iconName: string | null) => {
    if (!iconName) return LucideIcons.Sparkles
    const Icon = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[iconName]
    return Icon || LucideIcons.Sparkles
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
    feature,
    index,
    isInView,
    variant = "dark"
}) => {
    const Icon = getIcon(feature.feature_icon)
    const controls = useAnimation()
    const [hasImpacted, setHasImpacted] = React.useState(false)

    const delay = index * 0.18 // Staggered delay
    const isDark = variant === "dark"

    // Trigger impact shake after drop animation
    React.useEffect(() => {
        if (isInView && !hasImpacted) {
            const timer = setTimeout(() => {
                controls.start({
                    y: [0, 3, -2, 1, 0],
                    rotate: [0, -0.8, 0.5, -0.3, 0],
                    transition: { duration: 0.4, ease: "easeOut" }
                })
                setHasImpacted(true)
            }, (delay + 0.5) * 1000) // After drop completes

            return () => clearTimeout(timer)
        }
    }, [isInView, hasImpacted, delay, controls])

    return (
        <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1
            } : {
                opacity: 0,
                y: -40,
                scale: 0.95
            }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.22, 1, 0.36, 1] // Custom easing - heavy drop
            }}
        >
            <motion.div
                animate={controls}
                className={cn(
                    "flex items-center gap-4 px-5 py-4",
                    "transition-all duration-300",
                    // Sharp industrial edges
                    "rounded-sm",
                    // Metal surface effect
                    isDark
                        ? "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                        : "bg-black/5 border border-black/10 hover:bg-black/10 hover:border-black/20",
                    // Embossed shadow
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                )}
            >
                {/* Icon Container - Laser Cut Style */}
                <motion.div
                    initial={{ rotate: -45, scale: 0 }}
                    animate={isInView ? { rotate: 0, scale: 1 } : { rotate: -45, scale: 0 }}
                    transition={{ delay: delay + 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                    className={cn(
                        "w-12 h-12 flex items-center justify-center shrink-0",
                        // Sharp corners - industrial
                        "rounded-sm",
                        // Metallic gradient
                        isDark
                            ? "bg-gradient-to-br from-zinc-300 to-zinc-500 text-zinc-900"
                            : "bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-100",
                        // Subtle metal shine
                        "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(0,0,0,0.3)]"
                    )}
                >
                    <Icon className="w-5 h-5" />
                </motion.div>

                {/* Feature Text */}
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ delay: delay + 0.2, duration: 0.4 }}
                    className={cn(
                        "font-medium text-base tracking-wide",
                        isDark ? "text-zinc-200" : "text-zinc-800"
                    )}
                >
                    {feature.feature_text}
                </motion.span>

                {/* Decorative Line - Brushed Metal Effect */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: delay + 0.3, duration: 0.5 }}
                    className={cn(
                        "flex-1 h-px origin-left",
                        isDark
                            ? "bg-gradient-to-r from-white/20 via-white/10 to-transparent"
                            : "bg-gradient-to-r from-black/20 via-black/10 to-transparent"
                    )}
                />

                {/* Metal Rivet Decoration */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: delay + 0.4, duration: 0.3 }}
                    className={cn(
                        "w-2 h-2 rounded-full shrink-0",
                        isDark
                            ? "bg-gradient-to-br from-zinc-400 to-zinc-600 shadow-inner"
                            : "bg-gradient-to-br from-zinc-500 to-zinc-700 shadow-inner"
                    )}
                />
            </motion.div>
        </motion.div>
    )
}

export default FeatureItem
