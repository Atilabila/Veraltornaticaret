import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url.startsWith("http") ? item.url : `https://veralteneketicaret.com${item.url}`,
        })),
    };

    return (
        <nav aria-label="Kırıntı Navigasyon" className={`my-4 ${className}`}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ol className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs font-mono text-zinc-400">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.url} className="flex items-center gap-1.5 md:gap-2">
                            {index > 0 && (
                                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                            )}
                            {isLast ? (
                                <span className="text-zinc-200 font-semibold truncate max-w-[220px] sm:max-w-none" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.url}
                                    className="hover:text-emerald-400 transition-colors hover:underline underline-offset-2"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
