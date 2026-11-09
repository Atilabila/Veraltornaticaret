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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string };

type MobileNavSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dosyaLinks: NavLink[];
    navLinks: NavLink[];
    whatsappHref: string;
    ctaText: string;
    ctaLink: string;
};

export function MobileNavSheet({
    open,
    onOpenChange,
    dosyaLinks,
    navLinks,
    whatsappHref,
    ctaText,
    ctaLink,
}: MobileNavSheetProps) {
    const pathname = usePathname();
    const isActive = (href: string) =>
        pathname === href || (href !== "/hizmetler" && pathname?.startsWith(href));

    const close = () => onOpenChange(false);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="z-[100001] flex w-full flex-col border-atl-line bg-atl-bg p-0 text-atl-text sm:max-w-md [&>button]:hidden"
            >
                <SheetHeader className="space-y-1 border-b border-atl-line px-5 py-4 text-left">
                    <SheetTitle className="font-mono text-[11px] uppercase tracking-[0.28em] text-atl-brass">
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

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="dosya" className="border-none">
                                <AccordionTrigger className="min-h-12 px-3 py-3 font-display text-2xl text-atl-text hover:no-underline data-[state=open]:text-atl-brass-light [&[data-state=open]>svg]:text-atl-brass">
                                    Dosya Teli
                                </AccordionTrigger>
                                <AccordionContent className="pb-2 pt-0">
                                    <div className="ml-3 flex flex-col border-l border-atl-line pl-3">
                                        {dosyaLinks.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={close}
                                                className={cn(
                                                    "flex min-h-11 items-center text-base transition-colors",
                                                    isActive(item.href)
                                                        ? "text-atl-brass-light"
                                                        : "text-atl-muted active:text-atl-brass-light"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={close}
                                className={cn(
                                    "flex min-h-12 items-center px-3 font-display text-2xl transition-colors",
                                    isActive(link.href)
                                        ? "text-atl-brass-light"
                                        : "text-atl-text active:text-atl-brass-light"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link
                            href="/blog"
                            onClick={close}
                            className="flex min-h-12 items-center px-3 text-base text-atl-muted active:text-atl-brass-light"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/sss"
                            onClick={close}
                            className="flex min-h-12 items-center px-3 text-base text-atl-muted active:text-atl-brass-light"
                        >
                            SSS
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
                        className="flex min-h-12 items-center justify-center gap-2 border border-atl-line font-mono text-xs font-semibold uppercase tracking-[0.18em] text-atl-text"
                    >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                    </a>
                    <Link
                        href={ctaLink}
                        onClick={close}
                        className="flex min-h-12 items-center justify-center bg-atl-brass font-mono text-xs font-semibold uppercase tracking-[0.18em] text-atl-bg"
                    >
                        {ctaText}
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}
