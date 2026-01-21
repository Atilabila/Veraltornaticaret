import React from 'react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

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

export const PrimaryButton: React.FC<ButtonProps> = ({ label, iconRight: Icon, size = 'md', onClick, className = '', href }) => {
    const content = (
        <>
            {label}
            {Icon && <Icon size={size === 'sm' ? 14 : 18} />}
        </>
    );

    const baseClass = `btn-hazard flex items-center justify-center gap-2 ${className}`;

    if (href) {
        return (
            <Link href={href} className={baseClass}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={baseClass}>
            {content}
        </button>
    );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ label, onClick, className = '', href }) => {
    const baseClass = `btn-hazard bg-transparent text-near-black hover:bg-paper-white shadow-none hover:shadow-brutal-sm ${className}`;

    if (href) {
        return (
            <Link href={href} className={baseClass}>
                {label}
            </Link>
        );
    }
    return (
        <button onClick={onClick} className={baseClass}>
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
    <div className="flex flex-col gap-2 p-4 border-2 border-fog-gray bg-white group hover:border-near-black transition-colors card-brutal shadow-none hover:shadow-brutal">
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
    <div className="flex flex-col gap-4 border-l-2 border-fog-gray pl-6 py-4 relative group">
        <div className="absolute -left-[2px] top-6 w-[2px] h-0 bg-hazard-orange group-hover:h-24 transition-all duration-500" />
        <span className="font-mono text-xs text-hazard-orange font-bold">{stepNumber}</span>
        <div className="flex flex-col gap-2">
            <h3 className="font-space text-lg font-bold uppercase">{title}</h3>
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
    price?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, oneLiner, href, tag, image, price }) => (
    <Link href={href} className="group flex h-full flex-col card-brutal p-4">
        <div className="flex justify-between items-start min-w-0 mb-3">
            <SystemLabel text={tag || "CATALOG"} active />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-hazard-orange font-bold font-mono text-xs">
                VIEW →
            </div>
        </div>

        {image && (
            <div className="relative w-full aspect-[4/5] overflow-hidden border-2 border-near-black bg-zinc-100 mb-4">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
        )}

        <div className="flex flex-col gap-3 flex-grow min-w-0">
            <h2 className="text-lg font-black font-space leading-tight uppercase group-hover:text-hazard-orange transition-colors line-clamp-2">
                {title}
            </h2>
            <p className="text-xs font-mono text-steel-gray line-clamp-2 uppercase tracking-wide">{oneLiner}</p>

            <div className="mt-auto pt-4 border-t-2 border-fog-gray flex justify-between items-end min-w-0">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-steel-gray uppercase opacity-50">ID</span>
                    <span className="text-[11px] font-mono font-bold">#{title.slice(0, 4).toUpperCase()}</span>
                </div>
                {price && (
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-steel-gray uppercase opacity-50">PRICE</span>
                        <span className="text-xl font-black font-space text-hazard-orange">{price} TL</span>
                    </div>
                )}
            </div>
        </div>
    </Link>
);


