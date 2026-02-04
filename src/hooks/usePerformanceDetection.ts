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

        // 2. Heuristic for "Slow" devices: Check hardwareConcurrency or Device Memory if available
        const isSlowDevice =
            (navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency <= 4 ||
            (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4;

        // 3. Simple Frame Rate Check could be done, but let's stick to these for now
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
