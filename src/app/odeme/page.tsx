"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Package, CreditCard, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { processPayment, setDevPaymentSimulation, getDevPaymentSimulation } from "@/lib/payment";
import { sendOrderConfirmationEmail } from "@/lib/actions/email.actions";

// =====================================================
// CHECKOUT PAGE
// =====================================================

export default function CheckoutPage() {
    const router = useRouter();
    const cart = useCartStore();
    const checkout = useCheckoutStore();
    const orderStore = useOrderStore();

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
            <main className="min-h-screen bg-background pt-24 pb-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-muted rounded w-48" />
                        <div className="h-96 bg-muted rounded" />
                    </div>
                </div>
            </main>
        );
    }

    // Validate no zero-price items
    const hasInvalidItems = cart.items.some(item => !item.price || item.price <= 0);

    if (hasInvalidItems) {
        return (
            <main className="min-h-screen bg-background pt-24 pb-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="text-center py-24 space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                            <AlertTriangle className="w-10 h-10 text-destructive" />
                        </div>
                        <h1 className="text-2xl font-bold text-destructive">Ödeme İşlemi Engellenmiştir</h1>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Sepetinizde geçersiz fiyatlı ürün(ler) bulunmaktadır. Lütfen bu ürünleri kaldırın veya müşteri hizmetleri ile iletişime geçin.
                        </p>
                        <Link href="/sepet">
                            <Button variant="outline">Sepete Dön</Button>
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
            return;
        }

        checkout.setProcessing(true);
        checkout.setError(null);

        try {
            // Set dev simulation mode
            setDevPaymentSimulation(devMode);

            // Create order
            const order = orderStore.createOrder({
                items: cart.items,
                shipping: checkout.shipping,
                billing: checkout.billing,
                subtotal: cart.getSubtotal(),
                shippingCost: cart.getShippingCost(),
                discount: checkout.couponDiscount,
                total: cart.getTotal() - checkout.couponDiscount,
            });

            // Update order status to payment_pending
            orderStore.updateOrderStatus(order.id, 'payment_pending');

            // Process payment
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

            // ... inside handleSubmit ...

            if (paymentResult.success) {
                // Update order status to paid
                orderStore.updateOrderStatus(order.id, 'paid', paymentResult.paymentId);

                // Send Confirmation Email (Async - don't block UI)
                const emailPromise = sendOrderConfirmationEmail({
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

                // Clear cart and checkout
                cart.clearCart();
                checkout.reset();

                // Redirect to confirmation
                router.push(`/siparis/${order.id}`);
            } else {
                // Update order status to failed
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
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/sepet" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Sepete Dön
                    </Link>
                    <h1 className="text-4xl font-black tracking-tight">Ödeme</h1>
                </div>

                {/* Dev Mode Toggle - Only in development */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-yellow-800 dark:text-yellow-200">🧪 Geliştirici Modu</p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-400">Ödeme simülasyonu: {devMode === 'success' ? 'BAŞARILI' : 'BAŞARISIZ'}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={devMode === 'success' ? 'default' : 'outline'}
                                    onClick={() => setDevMode('success')}
                                >
                                    Başarılı
                                </Button>
                                <Button
                                    size="sm"
                                    variant={devMode === 'fail' ? 'destructive' : 'outline'}
                                    onClick={() => setDevMode('fail')}
                                >
                                    Başarısız
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Form Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Shipping Info */}
                            <section className="bg-white border border-zinc-200 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Package className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-zinc-900">Teslimat Bilgileri</h2>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">Ad Soyad *</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.fullName}
                                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                                            className={`w-full h-12 px-4 border rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.fullName ? 'border-destructive' : 'border-zinc-300'}`}
                                            placeholder="Adınız Soyadınız"
                                        />
                                        {formErrors.fullName && <p className="text-sm text-destructive mt-1">{formErrors.fullName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">E-posta *</label>
                                        <input
                                            type="email"
                                            value={checkout.shipping.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full h-12 px-4 border rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.email ? 'border-destructive' : 'border-zinc-300'}`}
                                            placeholder="ornek@email.com"
                                        />
                                        {formErrors.email && <p className="text-sm text-destructive mt-1">{formErrors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">Telefon *</label>
                                        <input
                                            type="tel"
                                            value={checkout.shipping.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={`w-full h-12 px-4 border rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.phone ? 'border-destructive' : 'border-zinc-300'}`}
                                            placeholder="05XX XXX XX XX"
                                        />
                                        {formErrors.phone && <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">Adres *</label>
                                        <textarea
                                            value={checkout.shipping.address}
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            className={`w-full min-h-[100px] px-4 py-3 border rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${formErrors.address ? 'border-destructive' : 'border-zinc-300'}`}
                                            placeholder="Mahalle, cadde, sokak, bina no, daire no..."
                                        />
                                        {formErrors.address && <p className="text-sm text-destructive mt-1">{formErrors.address}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">İl *</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className={`w-full h-12 px-4 border rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.city ? 'border-destructive' : 'border-zinc-300'}`}
                                            placeholder="İstanbul"
                                        />
                                        {formErrors.city && <p className="text-sm text-destructive mt-1">{formErrors.city}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">İlçe *</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.district}
                                            onChange={(e) => handleInputChange('district', e.target.value)}
                                            className={`w-full h-12 px-4 border rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary ${formErrors.district ? 'border-destructive' : 'border-zinc-300'}`}
                                            placeholder="Kadıköy"
                                        />
                                        {formErrors.district && <p className="text-sm text-destructive mt-1">{formErrors.district}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">Posta Kodu</label>
                                        <input
                                            type="text"
                                            value={checkout.shipping.postalCode}
                                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                                            className="w-full h-12 px-4 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="34000"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium mb-2 text-zinc-900">Sipariş Notu</label>
                                        <textarea
                                            value={checkout.shipping.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            className="w-full min-h-[80px] px-4 py-3 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                            placeholder="Teslimat ile ilgili notlarınız (opsiyonel)"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Billing Type */}
                            <section className="bg-white border border-zinc-200 rounded-xl p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-zinc-900">Fatura Bilgileri</h2>
                                </div>

                                <div className="flex gap-4 mb-6">
                                    <button
                                        type="button"
                                        onClick={() => handleBillingTypeChange('individual')}
                                        className={`flex-1 p-4 border rounded-lg text-center transition-all ${checkout.billing.type === 'individual'
                                            ? 'border-primary bg-primary/5 ring-2 ring-primary text-zinc-900'
                                            : 'border-zinc-200 hover:border-primary/50 text-zinc-600'
                                            }`}
                                    >
                                        <p className="font-bold">Bireysel</p>
                                        <p className="text-sm text-zinc-500">Şahıs faturası</p>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleBillingTypeChange('company')}
                                        className={`flex-1 p-4 border rounded-lg text-center transition-all ${checkout.billing.type === 'company'
                                            ? 'border-primary bg-primary/5 ring-2 ring-primary text-zinc-900'
                                            : 'border-zinc-200 hover:border-primary/50 text-zinc-600'
                                            }`}
                                    >
                                        <p className="font-bold">Kurumsal</p>
                                        <p className="text-sm text-zinc-500">Şirket faturası</p>
                                    </button>
                                </div>

                                {checkout.billing.type === 'company' && (
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm font-medium mb-2 text-zinc-900">Şirket Adı</label>
                                            <input
                                                type="text"
                                                value={checkout.billing.companyName || ''}
                                                onChange={(e) => checkout.setBilling({ companyName: e.target.value })}
                                                className="w-full h-12 px-4 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="Şirket Ünvanı"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-zinc-900">Vergi Dairesi</label>
                                            <input
                                                type="text"
                                                value={checkout.billing.taxOffice || ''}
                                                onChange={(e) => checkout.setBilling({ taxOffice: e.target.value })}
                                                className="w-full h-12 px-4 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="Vergi Dairesi"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 text-zinc-900">Vergi No</label>
                                            <input
                                                type="text"
                                                value={checkout.billing.taxNumber || ''}
                                                onChange={(e) => checkout.setBilling({ taxNumber: e.target.value })}
                                                className="w-full h-12 px-4 border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary"
                                                placeholder="Vergi Numarası"
                                            />
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 bg-white border border-zinc-200 rounded-xl p-6 space-y-6">
                                <h2 className="text-xl font-bold text-zinc-900">Sipariş Özeti</h2>

                                {/* Items */}
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex gap-3">
                                            <div className="w-16 h-16 flex-shrink-0 bg-zinc-100 rounded-lg overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate text-zinc-900">{item.name}</p>
                                                <p className="text-xs text-zinc-500">{item.size} × {item.quantity}</p>
                                            </div>
                                            <p className="font-medium text-sm text-zinc-900">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-zinc-100 pt-4 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600">Ara Toplam</span>
                                        <span className="text-zinc-900">{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600">Kargo</span>
                                        {shipping === 0 ? (
                                            <span className="text-green-600">Ücretsiz</span>
                                        ) : (
                                            <span className="text-zinc-900">{formatPrice(shipping)}</span>
                                        )}
                                    </div>
                                    {checkout.couponDiscount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>İndirim</span>
                                            <span>-{formatPrice(checkout.couponDiscount)}</span>
                                        </div>
                                    )}
                                    <div className="border-t border-zinc-100 pt-3 flex justify-between text-lg font-bold">
                                        <span className="text-zinc-900">Toplam</span>
                                        <span className="text-zinc-900">{formatPrice(total)}</span>
                                    </div>
                                </div>

                                {checkout.error && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{checkout.error}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full gap-2 h-14 text-base font-bold"
                                    disabled={checkout.isProcessing}
                                >
                                    {checkout.isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            İşleniyor...
                                        </>
                                    ) : (
                                        <>
                                            Siparişi Tamamla
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-zinc-500 text-center">
                                    Siparişi tamamlayarak <Link href="/kosullar" className="underline hover:text-zinc-900">Satış Sözleşmesi</Link>'ni kabul etmiş olursunuz.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
