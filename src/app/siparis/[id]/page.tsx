"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, Package, Truck, MapPin, Mail, Phone, ArrowRight, Printer, Copy, Check, CheckCircle2 } from "lucide-react";
import { useOrderStore, getOrderFromStorage, Order, OrderStatus } from "@/store/useOrderStore";
import { useCartStore } from "@/store/useCartStore";
import { useContentStore } from "@/store/useContentStore";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { m } from 'framer-motion';

const statusConfig: Record<OrderStatus, { icon: any; color: string; label: string; description: string; bgColor: string; borderColor: string; iconBg: string }> = {
    created: { icon: Clock, color: "text-yellow-600", label: "Oluşturuldu", description: "Siparişiniz sisteme kaydedildi.", bgColor: "bg-yellow-50", borderColor: "border-yellow-100", iconBg: "bg-yellow-100" },
    payment_pending: { icon: Clock, color: "text-amber-600", label: "Ödeme Bekleniyor", description: "Ödeme işlemi doğrulanıyor.", bgColor: "bg-amber-50", borderColor: "border-amber-100", iconBg: "bg-amber-100" },
    paid: { icon: CheckCircle2, color: "text-emerald-600", label: "Ödeme Alındı", description: "Siparişiniz onaylandı, paketleme aşamasına geçiliyor.", bgColor: "bg-emerald-50", borderColor: "border-emerald-100", iconBg: "bg-emerald-100" },
    failed: { icon: XCircle, color: "text-red-600", label: "Başarısız", description: "Ödeme işlemi sırasında bir hata oluştu.", bgColor: "bg-red-50", borderColor: "border-red-100", iconBg: "bg-red-100" },
    shipped: { icon: Truck, color: "text-blue-600", label: "Kargoya Verildi", description: "Siparişiniz paketlendi ve kuryeye teslim edildi.", bgColor: "bg-blue-50", borderColor: "border-blue-100", iconBg: "bg-blue-100" },
    delivered: { icon: Package, color: "text-emerald-700", label: "Teslim Edildi", description: "Siparişiniz size ulaştı. Keyfini çıkarın!", bgColor: "bg-emerald-50", borderColor: "border-emerald-100", iconBg: "bg-emerald-100" },
    cancelled: { icon: XCircle, color: "text-zinc-500", label: "İptal Edildi", description: "Sipariş talebiniz üzerine iptal edildi.", bgColor: "bg-zinc-50", borderColor: "border-zinc-100", iconBg: "bg-zinc-100" },
};

export default function OrderConfirmationPage() {
    const params = useParams();
    const orderId = params.id as string;
    const [order, setOrder] = React.useState<Order | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [copied, setCopied] = React.useState(false);
    const getOrder = useOrderStore((state) => state.getOrder);
    const addItem = useCartStore((state) => state.addItem);
    const { content } = useContentStore();
    const router = useRouter();

    const checkoutCMS = content.checkoutPage;

    React.useEffect(() => {
        const found = getOrder(orderId) || getOrderFromStorage(orderId);
        setOrder(found || null);
        setLoading(false);
    }, [orderId, getOrder]);

    const copyOrderNumber = () => {
        if (order) {
            navigator.clipboard.writeText(order.orderNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReorder = () => {
        if (!order) return;

        order.items.forEach(item => {
            addItem({
                productId: item.productId,
                slug: item.slug,
                name: item.name,
                size: item.size,
                orientation: item.orientation,
                price: item.price,
                image: item.image
            });
        });

        router.push('/sepet');
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-40 bg-zinc-200 rounded-3xl" />
                        <div className="h-20 bg-zinc-200 rounded-3xl" />
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="h-40 bg-zinc-200 rounded-3xl" />
                            <div className="h-40 bg-zinc-200 rounded-3xl" />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="text-center py-24 space-y-6 bg-white rounded-3xl border border-zinc-200 shadow-sm">
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                            <Package className="w-10 h-10 text-zinc-300" />
                        </div>
                        <h1 className="text-2xl font-black uppercase tracking-tight">Sipariş Bulunamadı</h1>
                        <p className="text-zinc-500 max-w-sm mx-auto text-sm">
                            Bu sipariş numarasına ait bir kayıt sisteme henüz düşmemiş olabilir veya bağlantınız kesilmiş olabilir.
                        </p>
                        <Link href="/">
                            <Button className="rounded-full px-10 h-12 bg-black hover:bg-zinc-800 text-xs font-bold tracking-widest uppercase">Ana Sayfaya Dön</Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const status = statusConfig[order.status];
    const StatusIcon = status.icon;
    const isSuccess = order.status === 'paid' || order.status === 'shipped' || order.status === 'delivered';

    return (
        <main className="min-h-screen bg-[#f8f8f8] pt-32 pb-24">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Status Banner */}
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-10 p-10 rounded-[2.5rem] text-center border overflow-hidden relative ${status.bgColor} ${status.borderColor}`}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -ml-32 -mb-32" />

                    <div className={`w-24 h-24 mx-auto rounded-3xl ${status.iconBg} flex items-center justify-center mb-6 relative z-10 border border-white/50 shadow-inner`}>
                        <StatusIcon className={`w-12 h-12 ${status.color}`} />
                    </div>

                    <h1 className={`text-4xl font-black mb-3 tracking-tighter uppercase relative z-10 ${isSuccess ? 'text-zinc-900' : 'text-red-700'}`}>
                        {isSuccess ? (checkoutCMS?.successTitle || 'SİPARİŞ ALINDI') : 'ÖDEME HATASI'}
                    </h1>

                    <p className={`text-sm font-medium uppercase tracking-wider relative z-10 ${isSuccess ? 'text-zinc-600' : 'text-red-600'}`}>
                        {isSuccess ? (checkoutCMS?.successMessage || status.description) : status.description}
                    </p>
                </m.div>

                {/* Order Meta */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2 bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm group">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                            <div>
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">SİPARİŞ PROTOKOLÜ</p>
                                <div className="flex items-center gap-3">
                                    <p className="text-3xl font-mono font-black text-zinc-900 tracking-tighter">{order.orderNumber}</p>
                                    <button
                                        onClick={copyOrderNumber}
                                        className="p-2 rounded-xl bg-zinc-50 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-all border border-zinc-100"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full sm:w-auto">
                                <Button variant="outline" size="sm" onClick={() => window.print()} className="rounded-xl border-zinc-100 text-[10px] font-bold tracking-widest uppercase h-10 gap-2 hover:bg-zinc-50">
                                    <Printer className="w-4 h-4" />
                                    BELGEYİ YAZDIR
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleReorder} className="rounded-xl border-zinc-100 text-[10px] font-bold tracking-widest uppercase h-10 gap-2 hover:bg-zinc-50">
                                    <ArrowRight className="w-4 h-4" />
                                    AYNISINI AL
                                </Button>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-zinc-50 text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                            <span>Kayıt Tarihi: {new Date(order.createdAt).toLocaleString('tr-TR')}</span>
                            <span className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                                {status.label}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm flex flex-col justify-center items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100 mb-4">
                            <Clock className="w-6 h-6 text-zinc-400" />
                        </div>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">E-POSTA DOĞRULAMASI</p>
                        <p className="text-xs font-bold text-zinc-900 uppercase">GÖNDERİLDİ</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Shipping Address */}
                    <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                                <MapPin className="w-5 h-5 text-zinc-900" />
                            </div>
                            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">TESLİMAT ADRESİ</h2>
                        </div>
                        <div className="space-y-3">
                            <p className="font-black text-xs text-zinc-900 uppercase tracking-tight">{order.shipping.fullName}</p>
                            <p className="text-xs text-zinc-500 font-medium uppercase leading-relaxed tracking-wider">
                                {order.shipping.address}<br />
                                {order.shipping.district} / {order.shipping.city}<br />
                                {order.shipping.postalCode}
                            </p>
                        </div>
                    </div>

                    {/* Contact Detail */}
                    <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100">
                                <Mail className="w-5 h-5 text-zinc-900" />
                            </div>
                            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">İLETİŞİM HATTI</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest min-w-[60px]">E-POSTA</span>
                                <span className="text-xs font-bold text-zinc-900 uppercase">{order.shipping.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest min-w-[60px]">TELEFON</span>
                                <span className="text-xs font-bold text-zinc-900 uppercase">{order.shipping.phone}</span>
                            </div>
                        </div>
                        {order.shipping.notes && (
                            <div className="mt-6 pt-6 border-t border-zinc-50">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">NOT</p>
                                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{order.shipping.notes}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Items Summary */}
                <div className="bg-white border border-zinc-200/60 rounded-3xl p-8 shadow-sm mb-10">
                    <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-8">SİPARİŞ MATERYALLERİ</h2>
                    <div className="space-y-8">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-6 group">
                                <div className="w-24 h-24 flex-shrink-0 bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 flex items-center justify-center p-3">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <p className="font-black text-sm text-zinc-900 uppercase tracking-tight mb-1">{item.name}</p>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 px-2 py-0.5 rounded-md">
                                            {item.size}
                                        </span>
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-50 px-2 py-0.5 rounded-md">
                                            {item.orientation === 'vertical' ? 'DİKEY' : 'YATAY'}
                                        </span>
                                        <span className="text-[10px] font-bold text-zinc-900 uppercase tracking-widest">
                                            ADET: {item.quantity}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-black text-lg text-zinc-900 tracking-tighter">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 pt-10 border-t border-zinc-50 grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">ARA TOPLAM</span>
                                <span className="font-bold text-sm text-zinc-900">{formatPrice(order.subtotal)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">KARGO</span>
                                {order.shippingCost === 0 ? (
                                    <span className="text-emerald-600 font-black text-[10px] uppercase tracking-widest">ÜCRETSİZ</span>
                                ) : (
                                    <span className="font-bold text-sm text-zinc-900">{formatPrice(order.shippingCost)}</span>
                                )}
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">İNDİRİM</span>
                                    <span className="font-bold text-sm text-emerald-600">-{formatPrice(order.discount)}</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-zinc-900 rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-2">TOPLAM ÖDENEN</p>
                            <p className="text-4xl font-black tracking-tighter">{formatPrice(order.total)}</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/urunler" className="flex-1 max-w-[240px]">
                        <Button variant="outline" size="lg" className="w-full rounded-2xl h-14 text-xs font-black tracking-widest uppercase border-zinc-200 hover:bg-white hover:border-black transition-all gap-3">
                            ALIŞVERİŞE DEVAM
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/" className="flex-1 max-w-[240px]">
                        <Button size="lg" className="w-full rounded-2xl h-14 text-xs font-black tracking-widest uppercase bg-black hover:bg-zinc-800 text-white transition-all">
                            ANA SAYFA
                        </Button>
                    </Link>
                </div>

                {/* Support Matrix */}
                <div className="mt-16 text-center">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                        TEKNİK DESTEK VEYA İPTAL TALEPLERİ İÇİN<br />
                        <Link href="/iletisim" className="text-black underline mx-1">
                            İLETİŞİM PANELİ
                        </Link>
                        VEYA
                        <a href="mailto:destek@veral.com.tr" className="text-black underline ml-1">
                            destek@veral.com.tr
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
