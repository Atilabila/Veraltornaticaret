"use client";

import React from "react";
import { Search, ArrowRight, Package, Mail, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOrderFromStorage, Order } from "@/store/useOrderStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { SystemLabel } from "@/components/ui/Industrial";

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

        // Simple validation
        if (!email || !orderNumber) {
            setError("Lütfen tüm alanları doldurun.");
            setLoading(false);
            return;
        }

        // Mock lookup in localStorage
        // In a real scenario with DB, this would be an API call
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

    return (
        <main className="min-h-screen bg-[#0A0A0A] selection:bg-[#D4AF37] selection:text-white relative">
            <Navigation />

            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-metal opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#D4AF37]/5 blur-[150px] pointer-events-none" />

            <div className="container max-w-xl mx-auto px-6 pt-48 pb-24 relative z-10">
                <div className="text-center mb-16 flex flex-col items-center">
                    <SystemLabel text="SORGULAMA SİSTEMİ v2.1" active className="mb-6" />
                    <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none italic mb-4">
                        SİPARİŞ <span className="text-gold-gradient normal-case italic font-serif font-normal tracking-normal">Takibi</span>
                    </h1>
                    <p className="text-white/50 text-lg font-medium max-w-md">
                        Üretim ve sevkiyat durumunuzu anlık olarak bu terminal üzerinden takip edebilirsiniz.
                    </p>
                </div>

                <div className="bg-[#111111] border border-white/5 shadow-2xl p-10 lg:p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 transition-transform duration-1000 group-hover:scale-150" />

                    <form onSubmit={handleSearch} className="space-y-8 relative z-10">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] flex items-center gap-3">
                                <Mail className="w-3 h-3" />
                                Müşteri E-Posta
                            </label>
                            <Input
                                type="email"
                                placeholder="kayitli@e-posta.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-16 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#D4AF37] transition-all rounded-none"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] flex items-center gap-3">
                                <Hash className="w-3 h-3" />
                                Sipariş No
                            </label>
                            <Input
                                type="text"
                                placeholder="VRL2501-XXXX"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                className="h-16 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#D4AF37] transition-all rounded-none"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
                                [ HATA ]: {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full h-20 bg-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.4em] hover:bg-white transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-4"
                            disabled={loading}
                        >
                            {loading ? "SİSTEM TARANIYOR..." : "VERİLERİ ÇEK"}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-8 border border-white/5 flex items-start gap-6 group hover:bg-white/[0.08] transition-all">
                        <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                            <Package size={20} />
                        </div>
                        <div>
                            <h3 className="font-black text-white uppercase text-lg mb-2 tracking-tighter italic">HIZLI SORGULAMA</h3>
                            <p className="text-xs text-white/50 font-medium leading-relaxed uppercase tracking-wider">Hesap oluşturmadan sipariş numaranız ile anlık durum kontrolü.</p>
                        </div>
                    </div>
                    <div className="bg-white/5 p-8 border border-white/5 flex items-start gap-6 group hover:bg-white/[0.08] transition-all">
                        <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                            <Search size={20} />
                        </div>
                        <div>
                            <h3 className="font-black text-white uppercase text-lg mb-2 tracking-tighter italic">OPERASYON DESTEK</h3>
                            <p className="text-xs text-white/50 font-medium leading-relaxed uppercase tracking-wider">Verileriniz eşleşmiyorsa <Link href="/iletisim" className="text-[#D4AF37] underline">teknik birimimiz</Link> ile senkronize olun.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <MobileStickyBar />
        </main>
    );
}
