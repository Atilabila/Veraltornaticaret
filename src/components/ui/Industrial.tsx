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
    price?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, oneLiner, href, tag, image, price }) => (
    <Link href={href} className="archive-card group h-full flex flex-col border-4 border-near-black p-0 overflow-hidden shadow-brutal-dark hover:shadow-none transition-all">
        <div className="p-4 flex justify-between items-start bg-fog-gray/30 border-b-2 border-near-black">
            <SystemLabel text={tag || "MODÜL"} active />
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-hazard-orange font-bold">
                VIEW →
            </div>
        </div>

        {image && (
            <div className="relative w-full aspect-[2/3] bg-white flex items-center justify-center overflow-hidden border-b-2 border-near-black">
                <img
                    src={image}
                    alt={title}
                    className="object-contain w-full h-full p-2 transition-all group-hover:scale-105"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
                {/* Status Badge */}
                <div className="absolute top-2 right-2 bg-signal-yellow text-near-black px-2 py-1 text-[8px] font-black border-2 border-near-black uppercase tracking-tighter z-10">
                    VERAL ID / REGISTERED
                </div>
            </div>
        )}

        <div className="p-6 flex flex-col gap-4 flex-grow bg-white">
            <h2 className="text-lg font-black font-space leading-tight uppercase group-hover:text-hazard-orange transition-colors line-clamp-2 min-h-[3rem]">
                {title}
            </h2>

            <div className="mt-auto pt-4 border-t-2 border-fog-gray flex justify-between items-end">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-steel-gray uppercase opacity-50">RECORD ID</span>
                    <span className="text-[11px] font-mono font-bold">#{title.slice(0, 4).toUpperCase()}</span>
                </div>
                {price && (
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-steel-gray uppercase opacity-50">UNIT PRICE</span>
                        <span className="text-xl font-black font-space text-hazard-orange">₺{price}</span>
                    </div>
                )}
            </div>
        </div>
    </Link>
);
