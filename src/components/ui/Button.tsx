"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import React, { useRef, useState } from "react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    magnetic?: boolean;
}

export const Button = ({
    className,
    variant = "primary",
    size = "md",
    loading,
    magnetic = false,
    children,
    ...props
}: ButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const variants = {
        primary: "bg-white text-slate-950 hover:bg-slate-100 shadow-[0_0_30px_rgba(255,255,255,0.15)]",
        secondary: "bg-slate-800 text-white hover:bg-slate-700 border border-white/10",
        outline: "border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40",
        ghost: "text-slate-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg font-semibold",
    };

    // Magnetic effect handler
    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!magnetic || !buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Magnetic pull strength
        const strength = 0.3;

        setPosition({
            x: distanceX * strength,
            y: distanceY * strength
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={magnetic ? { x: position.x, y: position.y } : undefined}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
                "relative overflow-hidden inline-flex items-center justify-center rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium tracking-wide",
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
                (children as React.ReactNode)
            )}

            {/* Shine overlay for primary variant */}
            {variant === "primary" && (
                <div className="absolute inset-0 metallic-shine opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            )}

            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity pointer-events-none bg-gradient-to-t from-transparent via-white/5 to-white/10" />
        </motion.button>
    );
};
