"use client";

import React from "react";
import { Search, ArrowRight, Package, Mail, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Order } from "@/store/useOrderStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";

export default function SiparisSorgulaPage() {
    const [email, setEmail] = React.useState("");
    const [orderNumber, setOrderNumber] = React.useState("");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !orderNumber) {
            setError("Lütfen tüm alanları doldurun.");
            setLoading(false);
            return;
        }

        const orders = JSON.parse(localStorage.getItem('metal-poster-orders') || '[]');
        const foundOrder = orders.find((o: Order) =>
            o.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase() &&
            o.shipping.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (foundOrder) {
            router.push(`/siparis/${foundOrder.id}`);
        } else {
            setError("Sipariş bulunamadı. Lütfen bilgileri kontrol edip tekrar deneyin.");
            setLoading(false);
        }
    };

    const inputClass = "h-14 bg-[#f4f4f4] border-[#c6c6c6] text-[#161616] placeholder:text-[#8d8d8d] focus:border-[var(--color-brand-accent)] rounded-none";

    return (
        <PageShell variant="muted">
            <PageContainer className="max-w-xl">
                <div className="text-center mb-10 space-y-4">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-accent)]">
                        Sipariş takibi
                    </p>
                    <h1 className="text-4xl font-bold text-[#161616] leading-tight">
                        Sipariş sorgula
                    </h1>
                    <p className="text-[#525252] text-lg">
                        Üretim ve sevkiyat durumunuzu sipariş numaranız ile kontrol edin.
                    </p>
                </div>

                <div className="bg-white border border-[#c6c6c6] p-8 lg:p-10">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" />
                                Müşteri e-posta
                            </label>
                            <Input
                                type="email"
                                placeholder="kayitli@e-posta.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] flex items-center gap-2">
                                <Hash className="w-3.5 h-3.5" />
                                Sipariş no
                            </label>
                            <Input
                                type="text"
                                placeholder="VRL2501-XXXX"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full h-14 bg-[var(--color-brand-accent)] text-white font-semibold text-sm hover:bg-[#0043ce] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? "Sorgulanıyor..." : "Siparişi bul"}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-[#c6c6c6] p-6 flex items-start gap-4">
                        <div className="w-10 h-10 border border-[#c6c6c6] flex items-center justify-center text-[var(--color-brand-accent)] shrink-0">
                            <Package size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#161616] mb-1">Hızlı sorgulama</h3>
                            <p className="text-sm text-[#525252] leading-relaxed">Hesap oluşturmadan sipariş numaranız ile durum kontrolü.</p>
                        </div>
                    </div>
                    <div className="bg-white border border-[#c6c6c6] p-6 flex items-start gap-4">
                        <div className="w-10 h-10 border border-[#c6c6c6] flex items-center justify-center text-[var(--color-brand-accent)] shrink-0">
                            <Search size={18} />
                        </div>
                        <div>
                            <h3 className="font-bold text-[#161616] mb-1">Destek</h3>
                            <p className="text-sm text-[#525252] leading-relaxed">
                                Veriler eşleşmiyorsa{" "}
                                <Link href="/iletisim" className="text-[var(--color-brand-accent)] hover:underline">iletişim</Link>
                                {" "}sayfasından bize ulaşın.
                            </p>
                        </div>
                    </div>
                </div>
            </PageContainer>
            <MobileStickyBar />
        </PageShell>
    );
}
