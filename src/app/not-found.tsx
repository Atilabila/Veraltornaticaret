import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Search, FileText, HelpCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageContainer } from "@/components/layout/PageContainer";

export const metadata: Metadata = {
    title: "Sayfa bulunamadı",
    description: "Bu adres yayında değil. Üretim hatları, teknik yazılar veya teklif formuna dönebilirsiniz.",
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <PageShell variant="muted" padded={false}>
            <PageContainer className="min-h-[75vh] flex flex-col items-center justify-center text-center py-20 px-4">
                <div className="space-y-6 max-w-xl">
                    <span className="inline-block rounded border border-atl-brass/40 bg-atl-brass-tint px-3 py-1 font-sans text-xs font-semibold uppercase tracking-[0.05em] text-atl-brass">
                        [ HATA KODU: 404 // SAYFA MEVCUT DEĞİL ]
                    </span>

                    <h1 className="font-display text-3xl text-atl-text md:text-5xl">
                        Aradığınız Sayfa Bulunamadı
                    </h1>

                    <p className="text-atl-muted text-base md:text-lg leading-relaxed">
                        Ulaşmaya çalıştığınız içerik taşınmış, adı değiştirilmiş veya yayından kaldırılmış olabilir. Aşağıdaki hızlı bağlantıları kullanarak aradığınız ürüne veya imalat hattına hemen ulaşabilirsiniz.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
                        <Link
                            href="/hizmetler"
                            className="p-4 rounded-xl border border-atl-line bg-atl-surface hover:border-atl-brass/50 hover:bg-atl-surface-2 transition-all group"
                        >
                            <Search className="w-5 h-5 text-atl-brass-light mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-semibold text-atl-text">Üretim Hatları</span>
                            <span className="text-xs text-atl-muted">Dosya teli, takvim tenekesi, tef zili ve sac kesim hizmetleri</span>
                        </Link>

                        <Link
                            href="/blog"
                            className="p-4 rounded-xl border border-atl-line bg-atl-surface hover:border-atl-brass/50 hover:bg-atl-surface-2 transition-all group"
                        >
                            <FileText className="w-5 h-5 text-atl-brass-light mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-semibold text-atl-text">Teknik Yazılar</span>
                            <span className="text-xs text-atl-muted">Atölyeden raporlar</span>
                        </Link>

                        <Link
                            href="/sss"
                            className="p-4 rounded-xl border border-atl-line bg-atl-surface hover:border-atl-brass/50 hover:bg-atl-surface-2 transition-all group"
                        >
                            <HelpCircle className="w-5 h-5 text-atl-brass-light mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-semibold text-atl-text">Sıkça Sorulanlar</span>
                            <span className="text-xs text-atl-muted">Mıknatıs & kargo</span>
                        </Link>

                        <Link
                            href="/teklif-al"
                            className="p-4 rounded-xl border border-atl-line bg-atl-surface hover:border-atl-brass/50 hover:bg-atl-surface-2 transition-all group"
                        >
                            <Phone className="w-5 h-5 text-atl-brass-light mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-semibold text-atl-text">Hızlı Teklif</span>
                            <span className="text-xs text-atl-muted">Toptan fiyat al</span>
                        </Link>
                    </div>

                    <div className="pt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-atl-brass text-atl-bg font-semibold text-sm hover:bg-atl-brass-light transition-colors shadow-lg shadow-black/20"
                        >
                            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
                        </Link>
                    </div>
                </div>
            </PageContainer>
        </PageShell>
    );
}
