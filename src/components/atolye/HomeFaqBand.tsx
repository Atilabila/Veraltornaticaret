"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/atolye/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const FAQS = [
    {
        q: "İzmir'de toptan dosya teli imalatı nerede yapılır?",
        a: "Veral Torna & Teneke Ticaret, İzmir Alsancak 1471 Sokak No:12/A adresindeki atölyesinde toptan dosya teli imalatı yapar.",
    },
    {
        q: "Takvim tenekesi siparişi nasıl verilir?",
        a: "Ölçü, adet ve askılı/askısız tercihinizi teklif formundan veya WhatsApp üzerinden iletin; yazılı fiyat ve termin bildirilir.",
    },
    {
        q: "İzmir dışına sevkiyat yapıyor musunuz?",
        a: "Evet, Alsancak atölyesinden Türkiye geneline kargo veya ambar ile toptan sevkiyat yapılır.",
    },
    {
        q: "Mıknatıslı metal posterler nasıl monte edilir?",
        a: "Duvara yapıştırılan manyetik tutucu ped ile çivi çakmadan asılır; kafe, ofis ve dekorasyon projelerine uygundur.",
    },
];

export function HomeFaqBand() {
    return (
        <section className="border-b border-atl-line bg-atl-bg py-10 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                <Reveal>
                    <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-8 sm:gap-5 md:flex-row md:items-end">
                        <SectionHeading
                            eyebrow="Sık sorulanlar"
                            title="İzmir metal imalat hakkında hızlı cevaplar"
                            description="Dosya teli, takvim tenekesi ve sevkiyat süreçleriyle ilgili en çok sorulanlar."
                        />
                        <Link
                            href="/sss"
                            className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light hover:text-atl-text md:self-auto"
                        >
                            Tüm SSS <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </Reveal>

                <Reveal delay={0.08}>
                    <Separator className="mb-2 bg-atl-line" />
                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((item, index) => (
                            <AccordionItem
                                key={item.q}
                                value={`faq-${index}`}
                                className="border-atl-line"
                            >
                                <AccordionTrigger className="py-5 text-left font-display text-lg text-atl-text hover:no-underline hover:text-atl-brass-light data-[state=open]:text-atl-brass-light sm:text-xl">
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 text-sm leading-relaxed text-atl-muted sm:text-base">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </Reveal>
            </div>
        </section>
    );
}
