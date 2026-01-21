import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging tailwind classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// === HAZARD BUTTON ===
interface HazardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    icon?: LucideIcon;
    variant?: "solid" | "outline";
}

export const HazardButton: React.FC<HazardButtonProps> = ({
    label,
    icon: Icon,
    variant = "solid",
    className,
    ...props
}) => {
    return (
        <button
            className={cn(
                "btn-hazard flex items-center gap-2",
                variant === "outline" && "bg-transparent text-near-black hover:bg-paper-white",
                className
            )}
            {...props}
        >
            {label}
            {Icon && <Icon className="w-4 h-4" />}
        </button>
    );
};

// === BRUTAL CARD ===
// A generic container with hard borders and brutal shadow
interface BrutalCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
    children,
    className,
    hoverEffect = true,
}) => {
    return (
        <div
            className={cn(
                "card-brutal p-6",
                !hoverEffect && "hover:transform-none hover:shadow-[4px_4px_0px_0px_var(--shadow-color)]",
                className
            )}
        >
            {children}
        </div>
    );
};

// === SYSTEM LABEL ===
// Monospace, small, technical label
interface SystemLabelProps {
    text: string;
    active?: boolean;
    className?: string;
}

export const SystemLabel: React.FC<SystemLabelProps> = ({
    text,
    active = false,
    className,
}) => {
    return (
        <span
            className={cn(
                "system-label",
                active && "active",
                className
            )}
        >
            {text}
        </span>
    );
};

// === TECH BADGE ===
// Used for displaying specs like "ALUMINUM 1.5MM"
export const TechBadge: React.FC<{ label: string; value: string }> = ({
    label,
    value,
}) => (
    <div className="flex flex-col border-l-2 border-near-black pl-3 py-1">
        <span className="text-[10px] uppercase font-bold text-steel-gray tracking-wider">
            {label}
        </span>
        <span className="font-mono text-xs font-bold text-near-black uppercase">
            {value}
        </span>
    </div>
);

// === SECTION HEADER ===
// Standardized H2 with industrial underline/accent
export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({
    title,
    subtitle,
}) => (
    <div className="mb-12 flex flex-col gap-2">
        <h2 className="text-4xl font-black uppercase tracking-tighter relative inline-block w-fit">
            {title}
            <div className="absolute -bottom-2 left-0 w-1/3 h-2 bg-safety-orange" />
        </h2>
        {subtitle && (
            <p className="font-mono text-steel-gray uppercase tracking-widest text-sm mt-2">
        // {subtitle}
            </p>
        )}
    </div>
);
