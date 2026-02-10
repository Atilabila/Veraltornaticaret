"use client";

import React from "react";
import { LazyMotion } from "framer-motion";

const loadFeatures = () =>
    import("@/lib/motionFeatures").then((mod) => mod.default);

export const MotionProvider = ({ children }: { children: React.ReactNode }) => (
    <LazyMotion features={loadFeatures} strict>
        {children}
    </LazyMotion>
);
