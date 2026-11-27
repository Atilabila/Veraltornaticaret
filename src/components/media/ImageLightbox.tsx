"use client";

import * as React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
    src: string;
    alt: string;
    className?: string;
    children: React.ReactNode;
};

/**
 * Workshop photo zoom. Esc / X / backdrop close. Focus returns to trigger.
 */
export function ImageLightbox({ src, alt, className, children }: ImageLightboxProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>
                <button
                    type="button"
                    className={cn(
                        "group/lightbox relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atl-brass focus-visible:ring-offset-2 focus-visible:ring-offset-atl-bg",
                        className
                    )}
                    aria-label={`${alt} — büyüt`}
                >
                    {children}
                </button>
            </DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className="fixed inset-0 z-[200] bg-black/90 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none"
                />
                <DialogPrimitive.Content
                    className="fixed inset-0 z-[201] flex items-center justify-center p-4 outline-none sm:p-8"
                    onPointerDownOutside={() => setOpen(false)}
                    onEscapeKeyDown={() => setOpen(false)}
                >
                    <DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
                    <DialogPrimitive.Description className="sr-only">
                        Görseli kapatmak için Esc, X veya dışarı tıklayın.
                    </DialogPrimitive.Description>
                    <DialogPrimitive.Close
                        className="absolute right-3 top-3 z-[202] inline-flex h-11 w-11 items-center justify-center border border-white/25 bg-black/50 text-white transition-colors hover:border-atl-brass hover:text-atl-brass-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atl-brass sm:right-6 sm:top-6"
                        aria-label="Kapat"
                    >
                        <X className="h-5 w-5" />
                    </DialogPrimitive.Close>
                    <div
                        className="relative h-[min(85dvh,900px)] w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(min-width: 1024px) 1024px, 96vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                    <button
                        type="button"
                        aria-label="Arka plana tıklayarak kapat"
                        className="absolute inset-0 -z-10 cursor-zoom-out"
                        onClick={() => setOpen(false)}
                    />
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
