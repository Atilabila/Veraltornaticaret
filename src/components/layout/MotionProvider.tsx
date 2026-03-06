"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { usePerformanceDetection } from "@/hooks/usePerformanceDetection";

export const MotionProvider = ({ children }: { children: React.ReactNode }) => {
    const { shouldReduceVisuals } = usePerformanceDetection();

    return (
        <MotionConfig reducedMotion={shouldReduceVisuals ? "always" : "never"}>
            {children}
        </MotionConfig>
    );
};
