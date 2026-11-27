"use client";

import { SectionHeading } from "@/components/atolye/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const STEPS = [
    {
        title: "Ürün",
        text: "Ne lazım olduğunu söylersiniz.",
    },
    {
        title: "Adet",
        text: "Kaç adet olduğunu söylersiniz.",
    },
    {
        title: "Telefon",
        text: "Adınızı ve telefonunuzu bırakırsınız.",
    },
    {
        title: "Fiyat",
        text: "Fiyatı size yazarız.",
    },
];

export function ProcessSteps() {
    return (
        <section className="atl-workshop-lit-warm border-b border-atl-line py-10 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                <Reveal>
                    <SectionHeading
                        eyebrow="Nasıl çalışıyoruz"
                        title="Nasıl sorarsınız"
                        description="Ürün, adet, ad ve telefon."
                    />
                </Reveal>
                <ol className="mt-6 grid grid-cols-1 border-l border-t border-atl-line sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step, index) => (
                        <Reveal key={step.title} as="li" delay={0.06 * index} className="border-b border-r border-atl-line p-4 sm:p-6 lg:p-8">
                            <span className="font-mono text-xs text-atl-brass">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-3 font-display text-xl leading-tight text-atl-text sm:mt-5 sm:text-2xl">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-atl-muted sm:mt-3">{step.text}</p>
                        </Reveal>
                    ))}
                </ol>
            </div>
        </section>
    );
}
