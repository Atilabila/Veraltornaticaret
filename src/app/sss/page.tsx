import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';

const faqs = [
    {
        q: "Toptan dosya teli minimum sipariş miktarı nedir?",
        a: "Miktar ve ölçüye göre değişir. Teklif formundan veya WhatsApp hattından net bilgi alabilirsiniz.",
    },
    {
        q: "Teklif ne kadar sürede gelir?",
        a: "Standart taleplerde 24 saat içinde dönüş hedefliyoruz.",
    },
    {
        q: "Özel ölçü üretim yapıyor musunuz?",
        a: "Evet. Dosya teli ve ilgili metal hatlarda özel ölçü seri imalat yapıyoruz.",
    },
    {
        q: "Kargo ve teslimat nasıl?",
        a: "Onaylanan siparişler anlaşmalı kargo ile Türkiye geneline gönderilir. Toptan sevkiyat detayı teklifte belirtilir.",
    },
];

export default function SSSPage() {
    return (
        <PageShell variant="muted">
            <PageContainer className="max-w-3xl">
                <header className="mb-10">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-accent)] mb-3">SSS</p>
                    <h1 className="text-3xl font-bold text-[#161616] mb-3">Sıkça sorulan sorular</h1>
                    <p className="text-[#525252]">Toptan imalat ve teklif süreci hakkında kısa yanıtlar.</p>
                </header>

                <div className="space-y-4 mb-10">
                    {faqs.map((item) => (
                        <details key={item.q} className="bg-white border border-[#c6c6c6] group">
                            <summary className="cursor-pointer p-5 font-semibold text-[#161616] list-none flex items-center justify-between gap-4">
                                {item.q}
                                <span className="text-[var(--color-brand-accent)] text-lg leading-none group-open:rotate-45 transition-transform">+</span>
                            </summary>
                            <div className="px-5 pb-5 text-sm text-[#525252] leading-relaxed border-t border-[#e0e0e0] pt-4">
                                {item.a}
                            </div>
                        </details>
                    ))}
                </div>

                <Link href="/teklif-al" className="inline-flex items-center gap-2 h-12 px-6 bg-[var(--color-brand-accent)] text-white font-semibold hover:bg-[#0043ce] transition-colors">
                    Teklif al <ArrowRight className="w-4 h-4" />
                </Link>
            </PageContainer>
        </PageShell>
    );
}
