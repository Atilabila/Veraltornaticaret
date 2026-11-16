"use client";

import React from "react";
import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () =>
    import("@/lib/motionFeatures").then((mod) => mod.default);

export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
    <MotionConfig reducedMotion="user">
        <LazyMotion features={loadFeatures} strict>
            {children}
        </LazyMotion>
    </MotionConfig>
);
