"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package, LogOut, Mail, Lock, ArrowRight, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/store/useAuthStore';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';
import { OrderService } from '@/lib/supabase/orders.service';
import { formatPrice, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function HesabimPage() {
    const { user, loading, signOut } = useAuthStore();
    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [orders, setOrders] = useState<any[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    const supabase = createBrowserSupabaseClient();

    // Fetch orders if user is logged in
    useEffect(() => {
        if (user?.email) {
            fetchOrders();
        }
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
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast({ title: "Giriş Başarılı", description: "Hesabınıza hoş geldiniz." });
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                toast({ title: "Kayıt Başarılı", description: "Hesabınız oluşturuldu. Giriş yapabilirsiniz." });
                setAuthMode('login');
            }
        } catch (error: any) {
            toast({
                title: "Hata",
                description: error.message || "Bir sorun oluştu.",
                variant: "destructive"
            });
        } finally {
            setAuthLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-zinc-800 border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-950">
            <Navigation />

            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {!user ? (
                        <motion.div
                            key="auth-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-md mx-auto"
                        >
                            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                                {/* Industrial accents */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700">
                                            <User className="text-[#D4AF37] w-6 h-6" />
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
                                                {authMode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
                                            </h1>
                                            <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
                                                Hesabına eriş ve siparişlerini yönet
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleAuth} className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">E-POSTA</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-600"
                                                    placeholder="ornek@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest pl-1">ŞİFRE</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                                <input
                                                    type="password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-zinc-600"
                                                    placeholder="••••••••"
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={authLoading}
                                            className="w-full h-14 bg-[#D4AF37] hover:bg-[#B89831] text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-[#D4AF37]/10"
                                        >
                                            {authLoading ? (
                                                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    {authMode === 'login' ? 'OTURUM AÇ' : 'HESAP OLUŞTUR'}
                                                    <ArrowRight className="w-4 h-4" />
                                                </span>
                                            )}
                                        </Button>
                                    </form>

                                    <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
                                        <button
                                            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                                            className="text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                                        >
                                            {authMode === 'login' ? 'Henüz hesabın yok mu? Kayıt Ol' : 'Zaten hesabın var mı? Giriş Yap'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="profile-view"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            {/* Profile Header */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-3xl pointer-events-none" />

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-zinc-800 rounded-2xl flex items-center justify-center border-2 border-[#D4AF37]/20 shadow-xl">
                                            <User className="text-[#D4AF37] w-10 h-10" />
                                        </div>
                                        <div>
                                            <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
                                                Hesabım
                                            </h1>
                                            <p className="text-zinc-500 font-mono text-sm mt-2">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <div className="px-4 py-2 bg-zinc-800/80 border border-zinc-700 rounded-full flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#D4AF37]" />
                                            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Üye Tarihi: {formatDate(user.created_at)}</span>
                                        </div>
                                        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Hesap Doğrulandı</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={signOut}
                                    className="flex items-center gap-3 px-8 py-4 bg-zinc-800 hover:bg-red-500/10 hover:text-red-500 border border-zinc-700 hover:border-red-500/30 text-zinc-400 font-black text-xs uppercase tracking-widest rounded-xl transition-all relative z-10"
                                >
                                    <LogOut className="w-4 h-4" />
                                    ÇIKIŞ YAP
                                </button>
                            </div>

                            {/* Orders Section */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center">
                                        <Package className="text-[#D4AF37] w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Siparişlerim</h2>
                                </div>

                                {ordersLoading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="h-48 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse" />
                                        ))}
                                    </div>
                                ) : orders.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {orders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37]/30 p-6 rounded-2xl transition-all group overflow-hidden relative"
                                            >
                                                {/* Status Indicator */}
                                                <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#D4AF37] text-black text-[9px] font-black uppercase tracking-widest rounded-bl-xl">
                                                    {order.status}
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="pb-4 border-b border-zinc-800">
                                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Sipariş No</span>
                                                        <h3 className="text-xl font-black text-white italic tracking-tighter mt-1">#{order.order_number}</h3>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">Tarih</span>
                                                            <span className="text-xs text-zinc-300 font-medium">{formatDate(order.created_at)}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest block">Ödeme</span>
                                                            <span className="text-xs text-[#D4AF37] font-bold uppercase">{order.payment_status}</span>
                                                        </div>
                                                    </div>

                                                    <div className="pt-4 flex items-center justify-between border-t border-zinc-800">
                                                        <div className="flex items-center gap-2">
                                                            <CreditCard className="w-4 h-4 text-zinc-500" />
                                                            <span className="text-xl font-black text-white tracking-tighter">{formatPrice(order.total)}</span>
                                                        </div>
                                                        <Button variant="outline" size="sm" className="bg-zinc-800 border-zinc-700 text-xs font-bold uppercase tracking-widest h-9 px-4 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37]">
                                                            DETAY
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-zinc-900 border border-zinc-800 border-dashed p-16 rounded-3xl text-center">
                                        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Package className="text-zinc-600 w-10 h-10" />
                                        </div>
                                        <h3 className="text-xl font-black text-white uppercase tracking-tighter italic">Henüz Siparişin Yok</h3>
                                        <p className="text-zinc-500 text-sm mt-2 mb-8">Noble koleksiyonumuzdan ilk eserini seçmeye ne dersin?</p>
                                        <Button asChild className="bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-widest px-8">
                                            <a href="/urunler">KOLEKSİYONU KEŞFET</a>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Footer />
        </main>
    );
}
