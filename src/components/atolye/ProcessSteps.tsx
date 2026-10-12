import { SectionHeading } from "@/components/atolye/SectionHeading";

const STEPS = [
    { title: "Ölçü veya çizim gönderin", text: "Teknik resim, numune ya da ölçü bilgisini teklif formundan veya WhatsApp üzerinden iletin." },
    { title: "Numune ve fiyat", text: "Malzeme ve kalınlığı birlikte netleştirip numune ve fiyat teklifi hazırlıyoruz." },
    { title: "Seri üretim", text: "Onaylanan numuneye göre atölyemizde seri üretime geçiyoruz." },
    { title: "Paketleme ve sevkiyat", text: "Koli veya palet halinde paketleyip kargo ya da ambar ile gönderiyoruz." },
];

export function ProcessSteps() {
    return (
        <section className="border-b border-atl-line bg-atl-bg py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <SectionHeading eyebrow="Nasıl çalışıyoruz" title="Teklif usulüyle seri üretim" />
                <ol className="mt-14 grid grid-cols-1 border-l border-t border-atl-line sm:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step, index) => (
                        <li key={step.title} className="border-b border-r border-atl-line p-8">
                            <span className="font-mono text-xs text-atl-brass">{String(index + 1).padStart(2, "0")}</span>
                            <h3 className="mt-6 font-display text-2xl leading-tight text-atl-text">{step.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-atl-muted">{step.text}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
