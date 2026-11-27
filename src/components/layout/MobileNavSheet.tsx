"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { isNavHrefActive, type ProductionLine } from "@/lib/production-lines";

type MobileNavSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productionLinks: ProductionLine[];
    companyLinks: ProductionLine[];
    whatsappHref: string;
    ctaText: string;
    ctaLink: string;
};

export function MobileNavSheet({
    open,
    onOpenChange,
    productionLinks,
    companyLinks,
    whatsappHref,
    ctaText,
    ctaLink,
}: MobileNavSheetProps) {
    const pathname = usePathname();
    const close = () => onOpenChange(false);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="z-[100001] flex w-full flex-col border-atl-line bg-atl-bg p-0 text-atl-text sm:max-w-md [&>button]:hidden"
            >
                <SheetHeader className="space-y-1 border-b border-atl-line px-5 py-4 text-left">
                    <SheetTitle className="font-sans text-xs font-semibold uppercase tracking-[0.05em] text-atl-brass">
                        Menü
                    </SheetTitle>
                    <SheetDescription className="text-sm text-atl-muted">
                        Üretim hatları ve iletişim
                    </SheetDescription>
                </SheetHeader>

                <ScrollArea className="flex-1">
                    <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Mobil menü">
                        <Link
                            href="/"
                            onClick={close}
                            className={cn(
                                "flex min-h-12 items-center px-3 font-display text-2xl transition-colors",
                                pathname === "/" ? "text-atl-brass-light" : "text-atl-text active:text-atl-brass-light"
                            )}
                        >
                            Ana Sayfa
                        </Link>

                        <p className="mt-3 px-3 font-sans text-xs font-semibold uppercase tracking-[0.05em] text-atl-brass">
                            Üretim
                        </p>
                        {productionLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={close}
                                className={cn(
                                    "flex min-h-12 items-center px-3 font-display text-xl transition-colors",
                                    isNavHrefActive(pathname, link.href)
                                        ? "text-atl-brass-light"
                                        : "text-atl-text active:text-atl-brass-light"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Separator className="my-3 bg-atl-line" />

                        {companyLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={close}
                                className={cn(
                                    "flex min-h-12 items-center px-3 font-display text-2xl transition-colors",
                                    isNavHrefActive(pathname, link.href)
                                        ? "text-atl-brass-light"
                                        : "text-atl-text active:text-atl-brass-light"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link
                            href="/sss"
                            onClick={close}
                            className="flex min-h-12 items-center px-3 text-base text-atl-muted active:text-atl-brass-light"
                        >
                            SSS
                        </Link>
                        <Link
                            href="/kvkk"
                            onClick={close}
                            className="flex min-h-12 items-center px-3 text-base text-atl-muted active:text-atl-brass-light"
                        >
                            KVKK
                        </Link>
                        <Link
                            href="/on-bilgilendirme"
                            onClick={close}
                            className="flex min-h-12 items-center px-3 text-base text-atl-muted active:text-atl-brass-light"
                        >
                            Ön Bilgilendirme
                        </Link>
                        <Link
                            href="/cerez"
                            onClick={close}
                            className="flex min-h-12 items-center px-3 text-base text-atl-muted active:text-atl-brass-light"
                        >
                            Çerez
                        </Link>
                    </nav>
                </ScrollArea>

                <div
                    className="mt-auto space-y-2 border-t border-atl-line px-4 pt-4"
                    style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
                >
                    <Separator className="mb-3 bg-atl-line" />
                    <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="flex min-h-12 items-center justify-center gap-2 border border-atl-line font-sans text-sm font-semibold tracking-normal text-atl-text"
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                    </a>
                    <Link
                        href={ctaLink}
                        onClick={close}
                        className="flex min-h-12 items-center justify-center bg-atl-brass font-sans text-sm font-semibold tracking-normal text-atl-bg"
                    >
                        {ctaText}
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
};
