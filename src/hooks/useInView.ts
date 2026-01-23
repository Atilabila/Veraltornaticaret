// =====================================================
// USE IN VIEW HOOK
// Intersection Observer for Scroll-Triggered Animations
// =====================================================
"use client"

import { useState, useEffect, useRef, RefObject } from "react"

interface UseInViewOptions {
    threshold?: number
    rootMargin?: string
    triggerOnce?: boolean
}

interface UseInViewReturn {
    ref: RefObject<HTMLDivElement | null>
    isInView: boolean
    hasAnimated: boolean
}

/**
 * Custom hook to detect when an element enters the viewport
 * Uses Intersection Observer API for performance
 */
export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
    const {
        threshold = 0.2,
        rootMargin = "0px",
        triggerOnce = true
    } = options

    const ref = useRef<HTMLDivElement | null>(null)
    const [isInView, setIsInView] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        // Skip if already animated and triggerOnce is true
        if (triggerOnce && hasAnimated) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    if (triggerOnce) {
                        setHasAnimated(true)
                        observer.unobserve(element)
                    }
                } else if (!triggerOnce) {
                    setIsInView(false)
                }
            },
            {
                threshold,
                rootMargin
            }
        )

        observer.observe(element)

        return () => {
            observer.unobserve(element)
        }
    }, [threshold, rootMargin, triggerOnce, hasAnimated])

    return { ref, isInView, hasAnimated }
}

/**
 * Hook for staggered animation delays
 * Returns delay in ms based on index
 */
export function useStaggerDelay(index: number, baseDelay: number = 100): number {
    return index * baseDelay
}

export default useInView
