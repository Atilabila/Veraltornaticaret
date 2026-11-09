"use client";

import { useRef, type ReactNode } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    once?: boolean;
    as?: "div" | "section" | "li" | "article";
};

export function Reveal({
    children,
    className,
    delay = 0,
    y = 22,
    once = true,
    as = "div",
}: RevealProps) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, margin: "-8% 0px -8% 0px" });
    const reduce = useReducedMotion();
    const motionProps = {
        ref,
        className: cn(className),
        initial: reduce ? false : { opacity: 0, y },
        animate: reduce || inView ? { opacity: 1, y: 0 } : { opacity: 0, y },
        transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
    };

    if (as === "li") return <m.li {...motionProps}>{children}</m.li>;
    if (as === "section") return <m.section {...motionProps}>{children}</m.section>;
    if (as === "article") return <m.article {...motionProps}>{children}</m.article>;
    return <m.div {...motionProps}>{children}</m.div>;
}
