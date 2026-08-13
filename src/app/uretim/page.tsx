import Link from 'next/link';
import { Hammer, ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';

export default function UretimPage() {
    return (
        <PageShell variant="muted">
            <PageContainer className="max-w-2xl text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#f4f4f4] border border-[#c6c6c6] mb-6 mx-auto">
                    <Hammer className="w-7 h-7 text-[var(--color-brand-accent)]" />
                </div>
                <h1 className="text-3xl font-bold text-[#161616] mb-3">Endüstriyel üretim</h1>
                <p className="text-[#525252] leading-relaxed mb-8">
                    Dosya teli, takvim tenekesi ve özel metal imalat hatlarımız ana sayfada ve hizmet detaylarında listeleniyor.
                    Toptan teklif için formu doldurun.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/teklif-al" className="inline-flex items-center justify-center gap-2 h-12 px-6 bg-[var(--color-brand-accent)] text-white font-semibold hover:bg-[#0043ce] transition-colors">
                        Teklif al <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link href="/#hizmetler" className="inline-flex items-center justify-center h-12 px-6 border border-[#c6c6c6] font-semibold hover:border-[var(--color-brand-accent)] transition-colors">
                        Hizmetleri gör
                    </Link>
                </div>
            </PageContainer>
        </PageShell>
    );
}
