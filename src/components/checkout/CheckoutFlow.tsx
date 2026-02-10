"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from 'framer-motion';
import { useCartStore } from "@/store/useCartStore";
import { CreditCard, Truck, User, ChevronLeft, CheckCircle2, Terminal, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "@/components/ui/use-toast";

export const CheckoutFlow = () => {
    const cartStore = useCartStore();
    const { items, clearCart } = cartStore;
    const total = cartStore.getTotal();
    const { user } = useAuthStore();

    const [step, setStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    });

    // Effect to pre-fill user data
    useEffect(() => {
        if (user && !shippingInfo.email) {
            setShippingInfo(prev => ({
                ...prev,
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleComplete = async () => {
        setIsSaving(true);
        try {
            const { OrderService } = await import('@/lib/supabase/orders.service');

            // 1. Prepare Data
            const orderData = {
                order_number: `VER-${Date.now()}`,
                customer_name: shippingInfo.name,
                customer_email: shippingInfo.email,
                customer_phone: shippingInfo.phone,
                shipping_address: `${shippingInfo.address}, ${shippingInfo.city}`,
                subtotal: cartStore.getSubtotal(),
                shipping_cost: cartStore.getShippingCost(),
                total: total,
                payment_method: 'credit_card',
                payment_status: 'paid',
                status: 'pending'
            };

            const orderItems = items.map(item => ({
                product_id: item.productId,
                product_name: item.name,
                product_slug: item.slug,
                size: item.size,
                orientation: item.orientation,
                quantity: item.quantity,
                unit_price: item.price,
                subtotal: item.price * item.quantity
            }));

            // 2. Save everything
            // @ts-ignore
            await OrderService.createOrder(orderData, orderItems);

            // 3. Success Feedback
            const { default: confetti } = await import("canvas-confetti");
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#D4AF37', '#000000', '#ffffff']
            });

            setStep(4);
            setTimeout(() => {
                clearCart();
            }, 5000);
        } catch (error: any) {
            console.error("Order creation failed:", error);
            toast({
                title: "Sipariş Hatası",
                description: error.message || "Sipariş oluşturulurken bir hata oluştu.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-24 px-6">
            {/* STEP_INDICATOR_TERMINAL */}
            {step < 4 && (
                <div className="flex justify-between items-center mb-16 relative border-8 border-black bg-white p-8 shadow-brutal">
                    <div className="absolute top-1/2 left-0 w-full h-2 bg-black -translate-y-1/2 -z-10" />
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-16 h-16 flex items-center justify-center border-4 font-[Archivo Black] text-2xl transition-none ${step >= s
                                ? 'bg-black text-white border-black shadow-[4px_4px_0px_0px_#D4AF37]'
                                : 'bg-white text-black/20 border-black/10'
                                }`}
                        >
                            {step > s ? <CheckCircle2 className="w-8 h-8" /> : `0${s}`}
                        </div>
                    ))}
                    <div className="absolute -bottom-6 left-8 font-mono text-[10px] font-black uppercase text-[#D4AF37]">
                        SİSTEM AŞAMASI: 0{step} VERİ GİRİŞİ
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <m.div
                        key="step1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                    >
                        <div className="flex items-center gap-6 border-l-8 border-[#D4AF37] pl-8">
                            <User className="w-12 h-12 text-black" />
                            <div>
                                <h2 className="text-4xl font-[Archivo Black] uppercase">TESLİMAT BİLGİLERİ</h2>
                                <p className="font-mono text-xs font-black text-black/40 uppercase">ALICI KİMLİK VE ADRES VERİLERİ</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 bg-white border-8 border-black p-12 shadow-brutal">
                            <Input label="AD SOYAD" placeholder="TAM İSİM GİRİNİZ" value={shippingInfo.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, name: e.target.value }))} />
                            <Input label="E-POSTA" type="email" placeholder="TERMİNAL@ADRES.COM" value={shippingInfo.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, email: e.target.value }))} />
                            <div className="md:col-span-2">
                                <Input label="AÇIK ADRES" placeholder="SOKAK, NO, DAİRE BİLGİSİ" value={shippingInfo.address} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, address: e.target.value }))} />
                            </div>
                            <Input label="ŞEHİR" placeholder="ŞEHİR SEÇİN" value={shippingInfo.city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, city: e.target.value }))} />
                            <Input label="TELEFON" placeholder="05XX XXX XX XX" value={shippingInfo.phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShippingInfo(prev => ({ ...prev, phone: e.target.value }))} />
                        </div>

                        <div className="flex justify-end pt-8">
                            <button
                                onClick={handleNext}
                                disabled={!shippingInfo.name || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city || !shippingInfo.phone}
                                className="bg-[#D4AF37] text-white border-4 border-black shadow-brutal px-12 py-6 uppercase font-black flex items-center gap-4 disabled:opacity-50 disabled:grayscale transition-transform active:translate-x-1 active:translate-y-1"
                            >
                                KARGO BİLGİLERİNE GEÇ <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </m.div>
                )}

                {step === 2 && (
                    <m.div
                        key="step2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                    >
                        <div className="flex items-center gap-6 border-l-8 border-[#D4AF37] pl-8">
                            <Truck className="w-12 h-12 text-black" />
                            <div>
                                <h2 className="text-4xl font-[Archivo Black] uppercase">LOJİSTİK SEÇİMİ</h2>
                                <p className="font-mono text-xs font-black text-black/40 uppercase">GÖNDERİM HIZI VE TAŞIMA SEÇİMİ</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <ShippingCard
                                title="STANDART LOJİSTİK"
                                price="ÜCRETSİZ"
                                time="5-7 İŞ GÜNÜ"
                                selected
                            />
                            <ShippingCard
                                title="EKSPRES DAĞITIM"
                                price="₺149.90"
                                time="2-3 İŞ GÜNÜ"
                            />
                        </div>

                        <div className="flex justify-between pt-8">
                            <button onClick={handleBack} className="flex items-center gap-2 font-mono font-black uppercase text-sm hover:underline">
                                <ChevronLeft className="w-5 h-5" /> GERİ DÖN
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-[#D4AF37] text-white border-4 border-black shadow-brutal px-12 py-6 uppercase font-black flex items-center gap-4 text-xl transition-transform active:translate-x-1 active:translate-y-1"
                            >
                                ÖDEME ADIMINA GEÇ <ArrowRight className="w-6 h-6" />
                            </button>
                        </div>
                    </m.div>
                )}

                {step === 3 && (
                    <m.div
                        key="step3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-12"
                    >
                        <div className="flex items-center gap-6 border-l-8 border-[#D4AF37] pl-8">
                            <CreditCard className="w-12 h-12 text-black" />
                            <div>
                                <h2 className="text-4xl font-[Archivo Black] uppercase">FİNANSAL ONAY</h2>
                                <p className="font-mono text-xs font-black text-black/40 uppercase">SİPARİŞ ÖZETİ VE GÜVENLİ ÖDEME</p>
                            </div>
                        </div>

                        <div className="border-8 border-black bg-white p-12 shadow-brutal">
                            <h4 className="font-[Archivo Black] text-xl mb-8 uppercase border-b-4 border-black pb-2 inline-block italic">SİPARİŞ ÖZETİ</h4>
                            <div className="space-y-4">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-4 border-b-2 border-dashed border-black/20 font-mono">
                                        <div className="flex flex-col">
                                            <span className="font-black">[{item.productId}] {item.name}</span>
                                            <span className="text-xs opacity-50">{item.size} // MODÜL_BİRİMİ</span>
                                        </div>
                                        <span className="font-black text-xl text-[#D4AF37]">₺{item.price.toLocaleString('tr-TR')}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between pt-8 mt-4 border-t-8 border-black">
                                <span className="text-3xl font-[Archivo Black] uppercase">TOPLAM TUTAR</span>
                                <span className="text-4xl font-[Archivo Black] text-[#D4AF37]">₺{total.toLocaleString('tr-TR')}</span>
                            </div>
                        </div>

                        <div className="p-8 border-8 border-black bg-black text-white flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <Activity className="w-8 h-8 text-[#D4AF37]" />
                                <div className="font-mono">
                                    <p className="font-black uppercase">IYZICO_SECURE_GATEWAY_v2.4</p>
                                    <p className="text-[10px] opacity-40">256-BIT_AES_ENCRYPTION_ACTIVE</p>
                                </div>
                            </div>
                            <div className="flex gap-4 opacity-50 transition-none">
                                <div className="w-12 h-8 bg-white/20 border border-white/40" />
                                <div className="w-12 h-8 bg-white/20 border border-white/40" />
                                <div className="w-12 h-8 bg-white/20 border border-white/40" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-8">
                            <button onClick={handleBack} disabled={isSaving} className="flex items-center gap-2 font-mono font-black uppercase text-sm hover:underline disabled:opacity-50">
                                <ChevronLeft className="w-5 h-5" /> GERİ DÖN
                            </button>
                            <button
                                onClick={handleComplete}
                                disabled={isSaving}
                                className="bg-black text-white border-4 border-black shadow-brutal px-16 py-8 uppercase font-black text-2xl flex items-center gap-4 group disabled:opacity-50"
                            >
                                {isSaving ? 'İŞLENİYOR...' : 'ŞİMDİ ÖDE'} <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </m.div>
                )}

                {step === 4 && (
                    <m.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-white border-8 border-black p-12 shadow-brutal relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Terminal className="w-64 h-64 text-black" />
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-32 h-32 bg-[#D4AF37] text-white p-6 border-4 border-black shadow-brutal mb-12 animate-bounce">
                                <CheckCircle2 className="w-full h-full" />
                            </div>
                            <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-[Archivo Black] mb-8 uppercase leading-none">
                                İŞLEM <span className="text-[#D4AF37]">ONAYLANDI!</span>
                            </h2>
                            <div className="max-w-xl mx-auto space-y-6 mb-16">
                                <p className="font-mono text-xl font-bold uppercase leading-relaxed">
                                    SATTIN ALIM PROTOKOLÜ BAŞARIYLA TAMAMLANDI. ÜRETİM HATTI SİPARİŞİNİZİ İŞLEMEYE BAŞLADI.
                                </p>
                                <div className="p-6 bg-[#E5E7EB] border-4 border-black font-mono text-xs font-black uppercase text-left">
                                    <p className="border-b-2 border-black/10 pb-2 mb-2">[ SİSTEM KAYITLARI ]</p>
                                    <p>{`> DOĞRULAMA KODU: VRL_${Math.random().toString(36).substr(2, 9).toUpperCase()}`}</p>
                                    <p>{`> E-POSTA BİLDİRİMİ: ${shippingInfo.email} ADRESİNE GÖNDERİLDİ`}</p>
                                    <p>{`>{' '}_DURUM: AKTİF ÜRETİM SIRASINDADIR`}</p>
                                </div>
                            </div>
                            <Link
                                href="/"
                                className="bg-black text-white border-4 border-black shadow-brutal px-12 py-6 uppercase font-black text-xl inline-flex items-center gap-4"
                            >
                                ANA SAYFAYA DÖN <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>
        </div >
    );
};

const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="space-y-4">
        <label className="font-mono text-xs font-black text-black/50 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D4AF37]" /> {label}
        </label>
        <input
            className="w-full bg-[#E5E7EB] border-4 border-black p-4 font-mono font-bold text-lg focus:outline-none focus:bg-[#D4AF37] focus:text-white transition-none placeholder:text-black/20"
            {...props}
        />
    </div>
);

const ShippingCard = ({ title, price, time, selected }: { title: string, price: string, time: string, selected?: boolean }) => (
    <div className={`p-8 border-8 transition-none cursor-pointer flex flex-col md:flex-row justify-between items-center gap-4 ${selected
        ? 'border-black bg-black text-white shadow-brutal translate-x-1 translate-y-1'
        : 'border-black bg-white hover:bg-[#D4AF37]'
        }`}>
        <div className="flex items-center gap-6">
            <div className={`w-8 h-8 border-4 border-black ${selected ? 'bg-[#D4AF37]' : 'bg-transparent'}`} />
            <div>
                <span className="block font-[Archivo Black] text-2xl uppercase tracking-tighter">{title}</span>
                <span className={`font-mono text-xs font-black uppercase ${selected ? 'text-white/60' : 'text-black/40'}`}>{time}</span>
            </div>
        </div>
        <span className={`font-[Archivo Black] text-3xl ${selected ? 'text-[#D4AF37]' : 'text-black'}`}>{price}</span>
    </div>
);
