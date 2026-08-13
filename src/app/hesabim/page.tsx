"use client";

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { User, Package, LogOut, Mail, Lock, ArrowRight, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';
import { useAuthStore } from '@/store/useAuthStore';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import { OrderService } from '@/lib/supabase/orders.service';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

const inputClass = "w-full bg-[#f4f4f4] border border-[#c6c6c6] py-3.5 pl-12 pr-4 text-[#161616] focus:outline-none focus:border-[var(--color-brand-accent)] transition-all placeholder:text-[#8d8d8d] rounded-none";

export default function HesabimPage() {
    const { user, loading, signOut } = useAuthStore();
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    const supabase = createBrowserSupabaseClient();

    useEffect(() => {
        if (user?.email) fetchOrders();
    }, [user]);

    const fetchOrders = async () => {
        if (!user?.email) return;
        setOrdersLoading(true);
        try {
            const data = await OrderService.getOrdersByEmail(user.email);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            if (authMode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                toast({ title: "Giriş başarılı", description: "Hesabınıza hoş geldiniz." });
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                toast({ title: "Kayıt başarılı", description: "Hesabınız oluşturuldu." });
                setAuthMode('login');
            }
        } catch (error: any) {
            toast({ title: "Hata", description: error.message || "Bir sorun oluştu.", variant: "destructive" });
        } finally {
            setAuthLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-[#c6c6c6] border-t-[var(--color-brand-accent)] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <PageShell variant="muted">
            <PageContainer>
                <AnimatePresence mode="wait">
                    {!user ? (
                        <m.div key="auth" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
                            <div className="bg-white border border-[#c6c6c6] p-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-[#f4f4f4] border border-[#c6c6c6] flex items-center justify-center">
                                        <User className="text-[var(--color-brand-accent)] w-6 h-6" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-[#161616]">{authMode === 'login' ? 'Giriş yap' : 'Kayıt ol'}</h1>
                                        <p className="text-[#525252] text-sm mt-1">Siparişlerinizi takip edin</p>
                                    </div>
                                </div>

                                <form onSubmit={handleAuth} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252]">E-posta</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="ornek@email.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252]">Şifre</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={authLoading} className="w-full h-12 bg-[var(--color-brand-accent)] hover:bg-[#0043ce] text-white font-semibold rounded-none">
                                        {authLoading ? "..." : authMode === 'login' ? 'Oturum aç' : 'Hesap oluştur'}
                                    </Button>
                                </form>

                                <div className="mt-6 pt-6 border-t border-[#c6c6c6] text-center">
                                    <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-sm text-[#525252] hover:text-[var(--color-brand-accent)]">
                                        {authMode === 'login' ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
                                    </button>
                                </div>
                            </div>
                        </m.div>
                    ) : (
                        <m.div key="profile" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-[#c6c6c6] p-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-[#f4f4f4] border border-[#c6c6c6] flex items-center justify-center">
                                        <User className="text-[var(--color-brand-accent)] w-8 h-8" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-[#161616]">Hesabım</h1>
                                        <p className="text-[#525252] text-sm mt-1">{user.email}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 bg-[#f4f4f4] border border-[#c6c6c6] text-[#525252]">
                                                <Clock className="w-3 h-3" /> Üye: {formatDate(user.created_at)}
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700">
                                                <ShieldCheck className="w-3 h-3" /> Doğrulandı
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={signOut} className="inline-flex items-center gap-2 px-5 h-11 border border-[#c6c6c6] text-[#525252] hover:border-red-300 hover:text-red-600 text-sm font-semibold transition-colors">
                                    <LogOut className="w-4 h-4" /> Çıkış yap
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <Package className="text-[var(--color-brand-accent)] w-6 h-6" />
                                    <h2 className="text-xl font-bold text-[#161616]">Siparişlerim</h2>
                                </div>

                                {ordersLoading ? (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {[1, 2].map((i) => <div key={i} className="h-40 bg-white border border-[#c6c6c6] animate-pulse" />)}
                                    </div>
                                ) : orders.length > 0 ? (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {orders.map((order) => (
                                            <div key={order.id} className="bg-white border border-[#c6c6c6] p-5 hover:border-[var(--color-brand-accent)] transition-colors">
                                                <span className="text-xs font-mono text-[var(--color-brand-accent)] uppercase">{order.status}</span>
                                                <h3 className="text-lg font-bold text-[#161616] mt-2">#{order.order_number}</h3>
                                                <p className="text-xs text-[#525252] mt-1">{formatDate(order.created_at)}</p>
                                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e0e0e0]">
                                                    <span className="font-bold text-[#161616]">{formatPrice(order.total)}</span>
                                                    <CreditCard className="w-4 h-4 text-[#8d8d8d]" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white border border-dashed border-[#c6c6c6] p-12 text-center">
                                        <Package className="w-10 h-10 text-[#c6c6c6] mx-auto mb-4" />
                                        <h3 className="font-bold text-[#161616] mb-2">Henüz siparişiniz yok</h3>
                                        <p className="text-[#525252] text-sm mb-6">Katalogdan ürün seçebilir veya toptan teklif alabilirsiniz.</p>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Button asChild className="bg-[var(--color-brand-accent)] hover:bg-[#0043ce] text-white rounded-none">
                                                <Link href="/urunler">Kataloğu gör</Link>
                                            </Button>
                                            <Button asChild variant="outline" className="border-[#c6c6c6] rounded-none">
                                                <Link href="/teklif-al">Teklif al</Link>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </m.div>
                    )}
                </AnimatePresence>
            </PageContainer>
        </PageShell>
    );
}
