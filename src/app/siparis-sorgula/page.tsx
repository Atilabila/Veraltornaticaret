"use client";

import React from "react";
import { Search, ArrowRight, Package, Mail, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getOrderFromStorage, Order } from "@/store/useOrderStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
        <main className="min-h-screen bg-background pt-32 pb-16">
            <div className="container max-w-xl mx-auto px-4">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Sipariş Sorgula</h1>
                    <p className="text-muted-foreground">
                        Siparişinizin durumunu öğrenmek için e-posta ve sipariş numaranızı girin.
                    </p>
                </div>

                <div className="bg-white border border-zinc-200 shadow-xl rounded-2xl p-8">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-900">
                                <Mail className="w-4 h-4 text-primary" />
                                E-Posta Adresi
                            </label>
                            <Input
                                type="email"
                                placeholder="ornek@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 bg-white text-zinc-900 border-zinc-300 placeholder:text-zinc-400"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-zinc-900">
                                <Hash className="w-4 h-4 text-primary" />
                                Sipariş Numarası
                            </label>
                            <Input
                                type="text"
                                placeholder="VRL2401-XXXXXX"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                className="h-12 bg-white text-zinc-900 border-zinc-300 placeholder:text-zinc-400"
                                required
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full h-12 text-lg font-bold uppercase" disabled={loading}>
                            {loading ? "Sorgulanıyor..." : "Siparişi Bul"}
                            {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
                        </Button>
                    </form>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-100 p-6 rounded-xl border border-zinc-200 flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                            <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 text-zinc-900">Hesabım Yok?</h3>
                            <p className="text-sm text-zinc-600">Siparişinizi sorgulamak için üye olmanıza gerek yoktur.</p>
                        </div>
                    </div>
                    <div className="bg-zinc-100 p-6 rounded-xl border border-zinc-200 flex items-start gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                            <Search className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold mb-1 text-zinc-900">Yardım Lazım?</h3>
                            <p className="text-sm text-zinc-600">Bilgilerinize ulaşamıyorsanız <Link href="/iletisim" className="text-primary underline">destek</Link> alın.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
