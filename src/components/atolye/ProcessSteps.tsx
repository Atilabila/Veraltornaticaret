import { SectionHeading } from "@/components/atolye/SectionHeading";

const STEPS = [
    {
        title: "Talep analizi",
        text: "Ürün ölçüleri, kullanım alanı, üretim adedi, malzeme ve teknik beklentiler birlikte netleştirilir.",
    },
    {
        title: "Teknik planlama",
        text: "Kesim, büküm, pres veya UV baskı süreci ürün yapısına uygun yöntemle planlanır.",
    },
    {
        title: "Numune ve onay",
        text: "Gerekli durumlarda numune üretilir; ölçü, form ve kalite kontrolünden sonra üretim onayı alınır.",
    },
    {
        title: "Seri üretim",
        text: "Onaylanan ürüne göre seri üretime geçilir; paketleme ve Türkiye geneline sevkiyat planlanır.",
    },
];

export function ProcessSteps() {
    return (
        <section className="border-b border-atl-line bg-atl-bg py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <SectionHeading
                    eyebrow="Nasıl çalışıyoruz"
                    title="Üretim sürecinizi baştan sona yönetiyoruz"
                    description="Talep analizinden numune onayına ve seri üretime kadar kaliteyi merkeze alan kontrollü bir iş akışı."
                />
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
