"use client"

import { useEffect, useState } from "react";

export const usePerformanceDetection = () => {
    const [isLowPowerMode, setIsLowPowerMode] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // 1. Check for reduced motion preference (good proxy for performance needs)
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(motionQuery.matches);

        const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        motionQuery.addEventListener("change", handleMotionChange);

        // 2. Heuristic for "Slow" devices or Mobile (Mobile handles 1600px scaling with a perf hit)
        const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSlowDevice =
            isMobileDevice ||
            ((navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4) ||
            ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4);

        if (isSlowDevice) {
            setIsLowPowerMode(true);
        }

        return () => {
            motionQuery.removeEventListener("change", handleMotionChange);
        };
    }, []);

    const shouldReduceVisuals = isLowPowerMode || prefersReducedMotion;

    return { isLowPowerMode, prefersReducedMotion, shouldReduceVisuals };
};
