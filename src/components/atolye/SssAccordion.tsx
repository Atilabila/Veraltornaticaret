"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "@/components/motion/Reveal";

export type SssItem = {
    category: string;
    question: string;
    answer: string;
};

export function SssAccordion({ items }: { items: SssItem[] }) {
    return (
        <Reveal>
            <Separator className="mb-2 bg-atl-line" />
            <Accordion type="single" collapsible className="w-full">
                {items.map((item, index) => (
                    <AccordionItem
                        key={`${item.category}-${index}`}
                        value={`sss-${index}`}
                        className="border-atl-line"
                    >
                        <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline [&[data-state=open]]:text-atl-brass-light">
                            <span className="space-y-1.5 pr-2">
                                <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-atl-brass">
                                    {item.category}
                                </span>
                                <span className="block font-display text-lg leading-snug text-atl-text sm:text-xl">
                                    {item.question}
                                </span>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-sm leading-relaxed text-atl-muted sm:text-base">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </Reveal>
    );
}
