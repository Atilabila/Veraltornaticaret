"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Package, CreditCard, CheckCircle, AlertTriangle, Loader2, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useOrderStore } from "@/store/useOrderStore";
import { useContentStore } from "@/store/useContentStore";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { processPayment, setDevPaymentSimulation } from "@/lib/payment";
import { sendOrderConfirmationEmail } from "@/lib/actions/email.actions";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const IconComponent = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
    return <Icon className={className} />;
};

const CartProgressBar = ({ step }: { step: number }) => {
    const steps = [
        { id: 1, label: "Sepet" },
        { id: 2, label: "Adres" },
        { id: 3, label: "Ödeme" },
        { id: 4, label: "Tamamlandı" }
    ];

    return (
        <div className="mb-12">
            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                <div className="absolute top-5 left-0 w-full h-[1px] bg-zinc-200 z-0" />
                <div
                    className="absolute top-5 left-0 h-[1px] bg-black z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                />

                {steps.map((s) => (
                    <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 ${s.id <= step
                                ? "bg-black border-black text-white"
                                : "bg-white border-zinc-200 text-zinc-400"
                                }`}
                        >
                            {s.id < step ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : (
                                <span className="font-mono text-sm">{s.id.toString().padStart(2, '0')}</span>
                            )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${s.id <= step ? "text-black" : "text-zinc-400"}`}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function CheckoutPage() {
    const router = useRouter();
    const cart = useCartStore();
    const checkout = useCheckoutStore();
    const orderStore = useOrderStore();
    const { content } = useContentStore();

    const checkoutCMS = content.checkoutPage;

    const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
    const [devMode, setDevMode] = React.useState<'success' | 'fail'>('success');

    // Redirect if cart is empty
    React.useEffect(() => {
        if (cart.isHydrated && cart.items.length === 0) {
            router.push('/sepet');
        }
    }, [cart.isHydrated, cart.items.length, router]);

    // SSR-safe loading
    if (!cart.isHydrated) {
        return (
            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16">
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-10 bg-zinc-200 rounded w-48" />
                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="h-[600px] bg-zinc-200 rounded-2xl" />
                            </div>
                            <div className="h-80 bg-zinc-200 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Validate no zero-price items
    const hasInvalidItems = cart.items.some(item => !item.price || item.price <= 0);

    if (hasInvalidItems) {
        return (
            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="text-center py-24 space-y-6 bg-white rounded-3xl border border-zinc-200 shadow-sm">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                            <AlertTriangle className="w-10 h-10 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-black uppercase tracking-tight text-red-600">Ödeme İşlemi Engellenmiştir</h1>
                        <p className="text-zinc-500 max-w-md mx-auto text-sm">
                            Sepetinizde geçersiz fiyatlı ürün(ler) bulunmaktadır. Lütfen bu ürünleri kaldırın veya müşteri hizmetleri ile iletişime geçin.
                        </p>
                        <Link href="/sepet">
                            <Button variant="outline" className="rounded-full px-8">Sepete Dön</Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const handleInputChange = (field: keyof typeof checkout.shipping, value: string) => {
        checkout.setShipping({ [field]: value });
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleBillingTypeChange = (type: 'individual' | 'company') => {
        checkout.setBilling({ type });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form
        const validation = checkout.validateShipping();
        if (!validation.valid) {
            setFormErrors(validation.errors);
            // Scroll to first error
            const firstErrorField = Object.keys(validation.errors)[0];
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        checkout.setProcessing(true);
        checkout.setError(null);

        try {
            setDevPaymentSimulation(devMode);

            const order = orderStore.createOrder({
                items: cart.items,
                shipping: checkout.shipping,
                billing: checkout.billing,
                subtotal: cart.getSubtotal(),
                shippingCost: cart.getShippingCost(),
                discount: checkout.couponDiscount,
                total: cart.getTotal() - checkout.couponDiscount,
            });

            orderStore.updateOrderStatus(order.id, 'payment_pending');

            const paymentResult = await processPayment(
                order.id,
                order.orderNumber,
                order.total,
                {
                    name: checkout.shipping.fullName,
                    email: checkout.shipping.email,
                    phone: checkout.shipping.phone,
                    address: checkout.shipping.address,
                    city: checkout.shipping.city,
                },
                cart.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            );

            if (paymentResult.success) {
                orderStore.updateOrderStatus(order.id, 'paid', paymentResult.paymentId);

                await sendOrderConfirmationEmail({
                    to: checkout.shipping.email,
                    orderNumber: order.orderNumber,
                    customerName: checkout.shipping.fullName,
                    items: cart.items.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    })),
                    total: cart.getTotal() - checkout.couponDiscount,
                    address: `${checkout.shipping.address} ${checkout.shipping.district}/${checkout.shipping.city}`,
                    date: new Date().toLocaleDateString('tr-TR')
                }).catch(err => console.error('Email sending failed:', err));

                cart.clearCart();
                checkout.reset();
                router.push(`/siparis/${order.id}`);
            } else {
                orderStore.updateOrderStatus(order.id, 'failed');
                checkout.setError(paymentResult.error || 'Ödeme işlemi başarısız oldu.');
            }
        } catch (error) {
            console.error('[CHECKOUT] Error:', error);
            checkout.setError('Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            checkout.setProcessing(false);
        }
    };

    const subtotal = cart.getSubtotal();
    const shipping = cart.getShippingCost();
    const total = cart.getTotal() - checkout.couponDiscount;

    return (
        <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-24">
            <div className="container max-w-7xl mx-auto px-4">
                <CartProgressBar step={2} />

                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-10">
                    <div>
                        <Link href="/sepet" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-black mb-4 transition-colors">
                            <ArrowLeft className="w-3 h-3 mr-2" />
                            SEPETE DÖN
                        </Link>
                        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">{checkoutCMS?.title || "ÖDEME PROTOKOLÜ"}</h1>
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-md tracking-widest uppercase">
                                SSL GÜVENLİ
                            </span>
                            <div className="h-1 w-1 rounded-full bg-zinc-300" />
                            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">VERİ ŞİFRELEME AKTİF</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-12 gap-10">
                        {/* Form Section */}
                        <div className="lg:col-span-8 space-y-10">
                            {/* Dev Mode Toggle */}
                            {process.env.NODE_ENV === 'development' && (
                                <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="text-center sm:text-left">
                                            <p className="font-bold text-yellow-700 text-xs tracking-widest uppercase">🧪 GELİŞTİRİCİ SİMÜLASYONU</p>
                                            <p className="text-[10px] text-yellow-600 uppercase font-medium mt-1">Ödeme Sonucu: {devMode === 'success' ? 'BAŞARILI' : 'BAŞARISIZ'}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant={devMode === 'success' ? 'default' : 'outline'}
                                                className="rounded-full text-[10px] h-8"
                                                onClick={() => setDevMode('success')}
                                            >
                                                SUCCESS
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant={devMode === 'fail' ? 'destructive' : 'outline'}
                                                className="rounded-full text-[10px] h-8"
                                                onClick={() => setDevMode('fail')}
                                            >
                                                FAIL
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Shipping Info */}
                            <section className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    {checkoutCMS?.showStepLabels && (
                                        <span className="text-2xl font-black text-zinc-100 tracking-tighter">01</span>
                                    )}
                                    <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                                        {checkoutCMS?.stepLabels?.shipping || "TESLİMAT BİLGİLERİ"}
                                    </h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">AD SOYAD *</label>
                                        <input
                                            name="fullName"
                                            type="text"
                                            value={checkout.shipping.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            className={`w-full h-14 px-5 border rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all ${formErrors.fullName ? 'border-red-500' : 'border-zinc-100 hover:border-zinc-200'}`}
                                            placeholder="John Doe"
                                        />
                                        {formErrors.fullName && <p className="text-[10px] font-bold text-red-500 ml-1">{formErrors.fullName.toUpperCase()}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">E-POSTA *</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={checkout.shipping.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full h-14 px-5 border rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all ${formErrors.email ? 'border-red-500' : 'border-zinc-100 hover:border-zinc-200'}`}
                                            placeholder="john@example.com"
                                        />
                                        {formErrors.email && <p className="text-[10px] font-bold text-red-500 ml-1">{formErrors.email.toUpperCase()}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">TELEFON *</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            value={checkout.shipping.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={`w-full h-14 px-5 border rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all ${formErrors.phone ? 'border-red-500' : 'border-zinc-100 hover:border-zinc-200'}`}
                                            placeholder="05XX XXX XX XX"
                                        />
                                        {formErrors.phone && <p className="text-[10px] font-bold text-red-500 ml-1">{formErrors.phone.toUpperCase()}</p>}
                                    </div>

                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">ADRES *</label>
                                        <textarea
                                            name="address"
                                            value={checkout.shipping.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className={`w-full min-h-[120px] px-5 py-4 border rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black resize-none transition-all ${formErrors.address ? 'border-red-500' : 'border-zinc-100 hover:border-zinc-200'}`}
                                            placeholder="Siparişinizin teslim edileceği açık adres..."
                                        />
                                        {formErrors.address && <p className="text-[10px] font-bold text-red-500 ml-1">{formErrors.address.toUpperCase()}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">İL *</label>
                                        <input
                                            name="city"
                                            type="text"
                                            value={checkout.shipping.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className={`w-full h-14 px-5 border rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all ${formErrors.city ? 'border-red-500' : 'border-zinc-100 hover:border-zinc-200'}`}
                                            placeholder="İstanbul"
                                        />
                                        {formErrors.city && <p className="text-[10px] font-bold text-red-500 ml-1">{formErrors.city.toUpperCase()}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">İLÇE *</label>
                                        <input
                                            name="district"
                                            type="text"
                                            value={checkout.shipping.district}
                                            onChange={(e) => handleInputChange('district', e.target.value)}
                                            className={`w-full h-14 px-5 border rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all ${formErrors.district ? 'border-red-500' : 'border-zinc-100 hover:border-zinc-200'}`}
                                            placeholder="Kadıköy"
                                        />
                                        {formErrors.district && <p className="text-[10px] font-bold text-red-500 ml-1">{formErrors.district.toUpperCase()}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">POSTA KODU</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.postalCode}
                                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                            className="w-full h-14 px-5 border border-zinc-100 hover:border-zinc-200 rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                            placeholder="34000"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">SİPARİŞ NOTU</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            className="w-full h-14 px-5 border border-zinc-100 hover:border-zinc-200 rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium placeholder:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-black transition-all"
                                            placeholder="Örn: Kapıya bırakın"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Billing Info */}
                            <section className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    {checkoutCMS?.showStepLabels && (
                                        <span className="text-2xl font-black text-zinc-100 tracking-tighter">02</span>
                                    )}
                                    <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
                                        {checkoutCMS?.stepLabels?.billing || "FATURA BİLGİLERİ"}
                                    </h2>
                                </div>

                                <div className="flex gap-4 mb-8">
                                    <button
                                        type="button"
                                        onClick={() => handleBillingTypeChange('individual')}
                                        className={`flex-1 p-5 border rounded-2xl text-left transition-all relative overflow-hidden group ${checkout.billing.type === 'individual'
                                            ? 'border-black bg-black text-white'
                                            : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200 text-zinc-400'
                                            }`}
                                    >
                                        <p className="font-black text-xs uppercase tracking-widest">BİREYSEL</p>
                                        <CheckCircle2 className={`absolute top-4 right-4 w-4 h-4 transition-opacity ${checkout.billing.type === 'individual' ? 'opacity-100' : 'opacity-0'}`} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleBillingTypeChange('company')}
                                        className={`flex-1 p-5 border rounded-2xl text-left transition-all relative overflow-hidden group ${checkout.billing.type === 'company'
                                            ? 'border-black bg-black text-white'
                                            : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200 text-zinc-400'
                                            }`}
                                    >
                                        <p className="font-black text-xs uppercase tracking-widest">KURUMSAL</p>
                                        <CheckCircle2 className={`absolute top-4 right-4 w-4 h-4 transition-opacity ${checkout.billing.type === 'company' ? 'opacity-100' : 'opacity-0'}`} />
                                    </button>
                                </div>

                                <AnimatePresence mode="wait">
                                    {checkout.billing.type === 'company' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="grid sm:grid-cols-2 gap-6"
                                        >
                                            <div className="sm:col-span-2 space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">ŞİRKET ÜNVANI</label>
                                                <input
                                                    type="text"
                                                    value={checkout.billing.companyName || ''}
                                                    onChange={(e) => checkout.setBilling({ companyName: e.target.value })}
                                                    className="w-full h-14 px-5 border border-zinc-100 rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                                    placeholder="VERAL METAL A.Ş."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">VERGİ DAİRESİ</label>
                                                <input
                                                    type="text"
                                                    value={checkout.billing.taxOffice || ''}
                                                    onChange={(e) => checkout.setBilling({ taxOffice: e.target.value })}
                                                    className="w-full h-14 px-5 border border-zinc-100 rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                                    placeholder="Boğaziçi V.D."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">VERGİ NO / TC NO</label>
                                                <input
                                                    type="text"
                                                    value={checkout.billing.taxNumber || ''}
                                                    onChange={(e) => checkout.setBilling({ taxNumber: e.target.value })}
                                                    className="w-full h-14 px-5 border border-zinc-100 rounded-2xl bg-zinc-50/50 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-black"
                                                    placeholder="000 000 0000"
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </section>
                        </div>

                        {/* Order Summary (Sticky) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-6">
                                <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-sm">
                                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-6 pb-4 border-b border-zinc-50">SİPARİŞ ÖZETİ</h2>

                                    {/* Items List */}
                                    <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {cart.items.map((item) => (
                                            <div key={item.id} className="flex gap-4 group">
                                                <div className="w-16 h-16 flex-shrink-0 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-100 flex items-center justify-center p-2">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" />
                                                </div>
                                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                    <p className="font-bold text-xs truncate text-zinc-900 uppercase tracking-tight">{item.name}</p>
                                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{item.size} × {item.quantity}</p>
                                                    <p className="font-black text-xs text-zinc-900 mt-1">{formatPrice(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">ARA TOPLAM</span>
                                            <span className="font-bold text-sm text-zinc-900">{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">KARGO</span>
                                            {shipping === 0 ? (
                                                <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">ÜCRETSİZ</span>
                                            ) : (
                                                <span className="font-bold text-sm text-zinc-900">{formatPrice(shipping)}</span>
                                            )}
                                        </div>
                                        {checkout.couponDiscount > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">İNDİRİM</span>
                                                <span className="font-bold text-sm text-emerald-600">-{formatPrice(checkout.couponDiscount)}</span>
                                            </div>
                                        )}
                                        <div className="h-[1px] bg-zinc-100 my-2" />
                                        <div className="flex justify-between items-center text-xl font-black italic">
                                            <span className="text-zinc-900 tracking-tighter uppercase">TOPLAM</span>
                                            <span className="text-zinc-900 tracking-tighter">{formatPrice(total)}</span>
                                        </div>
                                    </div>

                                    {checkout.error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                                            <div className="flex gap-3">
                                                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                                                <p className="text-[10px] font-bold text-red-600 uppercase tracking-wide leading-relaxed">{checkout.error}</p>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full bg-black hover:bg-zinc-800 text-white h-16 rounded-2xl flex items-center justify-center gap-3 group transition-all"
                                        disabled={checkout.isProcessing}
                                    >
                                        {checkout.isProcessing ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span className="font-black tracking-widest uppercase text-xs">İŞLENİYOR...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="font-black tracking-widest uppercase text-xs">{checkoutCMS?.completeButtonText || "SİPARİŞİ TAMAMLA"}</span>
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </>
                                        )}
                                    </Button>

                                    <div
                                        className="mt-6 text-[10px] text-zinc-400 text-center font-medium leading-relaxed uppercase tracking-wider"
                                        dangerouslySetInnerHTML={{ __html: checkoutCMS?.legalText || "Siparişi tamamlayarak <a href='/kosullar' class='underline'>Satış Sözleşmesi</a>'ni kabul etmiş olursunuz." }}
                                    />

                                    {/* Trust Blocks */}
                                    <div className="mt-8 pt-8 border-t border-zinc-50 flex flex-wrap justify-center gap-6">
                                        {checkoutCMS?.trustBlocks?.map((block: any, i: number) => (
                                            <div key={i} className="flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                                                    <IconComponent name={block.icon} className="w-5 h-5 text-zinc-900" />
                                                </div>
                                                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest text-center max-w-[80px] leading-tight">
                                                    {block.title}
                                                </span>
                                            </div>
                                        )) || (
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
                                                        <Lock className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">GÜVENLİ ÖDEME</span>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
