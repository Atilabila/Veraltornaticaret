import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface SystemLabelProps {
    text: string;
    active?: boolean;
}

export const SystemLabel: React.FC<SystemLabelProps> = ({ text, active }) => (
    <span className={`system-label ${active ? 'active' : ''}`}>
        {text}
    </span>
);

interface ButtonProps {
    label: string;
    iconRight?: LucideIcon;
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    className?: string;
    href?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ label, iconRight: Icon, size = 'md', onClick, className, href }) => {
    const content = (
        <>
            {label}
            {Icon && <Icon size={size === 'sm' ? 14 : 18} />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={`btn-primary ${className}`}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`btn-primary ${className}`}>
            {content}
        </button>
    );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ label, onClick, className, href }) => {
    if (href) {
        return (
            <Link href={href} className={`btn-secondary ${className}`}>
                {label}
            </Link>
        );
    }
    return (
        <button onClick={onClick} className={`btn-secondary ${className}`}>
            {label}
        </button>
    );
};

interface TrustChipProps {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}

export const TrustChip: React.FC<TrustChipProps> = ({ icon: Icon, title, subtitle }) => (
    <div className="flex flex-col gap-2 p-4 border border-fog-gray bg-white group hover:border-near-black transition-colors">
        <div className="text-hazard-orange">
            <Icon size={24} />
        </div>
        <div className="flex flex-col">
            <span className="font-space font-bold text-sm uppercase tracking-tight">{title}</span>
            <span className="text-xs text-steel-gray">{subtitle}</span>
        </div>
    </div>
);

interface ProcessStepProps {
    stepNumber: string;
    title: string;
    desc: string;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({ stepNumber, title, desc }) => (
    <div className="flex flex-col gap-4 border-l border-fog-gray pl-6 py-4 relative group">
        <div className="absolute -left-[1px] top-6 w-[1px] h-0 bg-hazard-orange group-hover:h-24 transition-all duration-500" />
        <span className="font-ibm-plex text-xs text-hazard-orange font-bold">{stepNumber}</span>
        <div className="flex flex-col gap-2">
            <h3 className="font-space text-lg font-bold">{title}</h3>
            <p className="text-sm text-steel-gray max-w-[280px]">{desc}</p>
        </div>
    </div>
);

interface ProductCardProps {
    title: string;
    oneLiner: string;
    href: string;
    tag?: string;
    image?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, oneLiner, href, tag, image }) => (
    <Link href={href} className="archive-card group h-full">
        <div className="flex justify-between items-start mb-4">
            <SystemLabel text={tag || "MODÜL"} />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-hazard-orange">
                →
            </div>
        </div>

        {image && (
            <div className="w-full aspect-square bg-fog-gray mb-6 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                <img src={image} alt={title} className="object-cover w-full h-full" />
            </div>
        )}

        <div className="flex flex-col gap-2 mt-auto">
            <h2 className="text-xl font-bold font-space group-hover:text-hazard-orange transition-colors">
                {title}
            </h2>
            <p className="text-sm text-steel-gray">
                {oneLiner}
            </p>
        </div>
    </Link>
);
