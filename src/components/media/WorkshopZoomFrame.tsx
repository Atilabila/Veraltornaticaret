"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ImageLightbox } from "@/components/media/ImageLightbox";
import { serviceImageFit } from "@/lib/service-stock-images";

type WorkshopZoomFrameProps = {
    src: string;
    alt: string;
    priority?: boolean;
    sizes?: string;
    fitClassName?: string;
    className?: string;
    overlay?: ReactNode;
};

/** Server-page friendly workshop photo with Esc/X/backdrop lightbox. */
export function WorkshopZoomFrame({
    src,
    alt,
    priority,
    sizes = "(max-width: 1024px) 100vw, 500px",
    fitClassName,
    className,
    overlay,
}: WorkshopZoomFrameProps) {
    const fit = fitClassName ?? serviceImageFit(src);

    return (
        <div className={className ?? "relative aspect-[4/3] overflow-hidden bg-atl-surface-2"}>
            <ImageLightbox src={src} alt={alt} className="absolute inset-0 h-full">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={sizes}
                    className={fit}
                />
            </ImageLightbox>
            {overlay ? (
                <div className="pointer-events-none absolute inset-0 z-[1] flex flex-col justify-end">
                    {overlay}
                </div>
            ) : null}
        </div>
    );
}
