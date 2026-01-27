"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, Package, Truck, MapPin, Mail, Phone, ArrowRight, Printer, Copy, Check } from "lucide-react";
import { useOrderStore, getOrderFromStorage, Order, OrderStatus } from "@/store/useOrderStore";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

// =====================================================
// STATUS CONFIG
// =====================================================

const statusConfig: Record<OrderStatus, { icon: typeof CheckCircle; color: string; label: string; description: string }> = {
    created: { icon: Clock, color: "text-yellow-500", label: "Oluşturuldu", description: "Siparişiniz alındı" },
    payment_pending: { icon: Clock, color: "text-yellow-500", label: "Ödeme Bekleniyor", description: "Ödeme işlemi devam ediyor" },
    paid: { icon: CheckCircle, color: "text-green-500", label: "Ödeme Alındı", description: "Siparişiniz onaylandı" },
    failed: { icon: XCircle, color: "text-red-500", label: "Başarısız", description: "Ödeme başarısız oldu" },
    shipped: { icon: Truck, color: "text-blue-500", label: "Kargoya Verildi", description: "Siparişiniz yola çıktı" },
    delivered: { icon: Package, color: "text-green-500", label: "Teslim Edildi", description: "Siparişiniz teslim edildi" },
    cancelled: { icon: XCircle, color: "text-gray-500", label: "İptal Edildi", description: "Sipariş iptal edildi" },
};

// =====================================================
// ORDER CONFIRMATION PAGE
// =====================================================

export default function OrderConfirmationPage() {
    const params = useParams();
    const orderId = params.id as string;
    const [order, setOrder] = React.useState<Order | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [copied, setCopied] = React.useState(false);
    const getOrder = useOrderStore((state) => state.getOrder);
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();

    React.useEffect(() => {
        // Try to get order from store first, then localStorage
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
            <main className="min-h-screen bg-background pt-24 pb-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-24 bg-muted rounded-xl" />
                        <div className="h-64 bg-muted rounded-xl" />
                    </div>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="min-h-screen bg-background pt-24 pb-16">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="text-center py-24 space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
                            <Package className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold">Sipariş Bulunamadı</h1>
                        <p className="text-muted-foreground">
                            Bu sipariş numarasına ait bir kayıt bulunamadı.
                        </p>
                        <Link href="/">
                            <Button>Ana Sayfaya Dön</Button>
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
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className="container max-w-4xl mx-auto px-4">
                {/* Status Banner */}
                <div className={`mb-8 p-8 rounded-2xl text-center ${isSuccess ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
                    <div className={`w-20 h-20 mx-auto rounded-full ${isSuccess ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'} flex items-center justify-center mb-6`}>
                        <StatusIcon className={`w-10 h-10 ${status.color}`} />
                    </div>
                    <h1 className={`text-3xl font-black mb-2 ${isSuccess ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                        {isSuccess ? 'Siparişiniz Alındı!' : 'Ödeme Başarısız'}
                    </h1>
                    <p className={`text-lg ${isSuccess ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {status.description}
                    </p>
                </div>

                {/* Order Number */}
                <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-zinc-500 mb-1">Sipariş Numarası</p>
                            <p className="text-2xl font-mono font-bold text-zinc-900">{order.orderNumber}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={copyOrderNumber} className="border-zinc-200 text-zinc-700 hover:bg-zinc-50">
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => window.print()} className="border-zinc-200 text-zinc-700 hover:bg-zinc-50">
                                <Printer className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
                        <p className="text-sm text-zinc-500">
                            Sipariş Tarihi: {new Date(order.createdAt).toLocaleString('tr-TR')}
                        </p>
                        <Button variant="outline" size="sm" onClick={handleReorder} className="gap-2 border-primary text-primary hover:bg-primary/5">
                            <ArrowRight className="w-4 h-4" />
                            Aynısını Tekrar Satın Al
                        </Button>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Shipping Info */}
                    <div className="bg-white border border-zinc-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <MapPin className="w-5 h-5 text-primary" />
                            <h2 className="font-bold text-zinc-900">Teslimat Adresi</h2>
                        </div>
                        <div className="space-y-2 text-sm text-zinc-600">
                            <p className="font-medium text-zinc-900">{order.shipping.fullName}</p>
                            <p>{order.shipping.address}</p>
                            <p>{order.shipping.district}, {order.shipping.city}</p>
                            {order.shipping.postalCode && <p>{order.shipping.postalCode}</p>}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white border border-zinc-200 rounded-xl p-6">
                        <h2 className="font-bold mb-4 text-zinc-900">İletişim Bilgileri</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3 text-zinc-600">
                                <Mail className="w-4 h-4 text-zinc-400" />
                                <span>{order.shipping.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-600">
                                <Phone className="w-4 h-4 text-zinc-400" />
                                <span>{order.shipping.phone}</span>
                            </div>
                        </div>
                        {order.shipping.notes && (
                            <div className="mt-4 pt-4 border-t border-zinc-100">
                                <p className="text-sm text-zinc-600">Not: {order.shipping.notes}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
                    <h2 className="font-bold mb-6 text-zinc-900">Sipariş Detayları</h2>
                    <div className="space-y-4">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4 pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                                <div className="w-20 h-20 flex-shrink-0 bg-zinc-100 rounded-lg overflow-hidden">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-zinc-900">{item.name}</p>
                                    <p className="text-sm text-zinc-500">
                                        {item.size} • {item.orientation === 'vertical' ? 'Dikey' : 'Yatay'}
                                    </p>
                                    <p className="text-sm text-zinc-500">Adet: {item.quantity}</p>
                                </div>
                                <p className="font-medium text-zinc-900">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-6 pt-6 border-t border-zinc-100 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-600">Ara Toplam</span>
                            <span className="text-zinc-900">{formatPrice(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-600">Kargo</span>
                            {order.shippingCost === 0 ? (
                                <span className="text-green-600">Ücretsiz</span>
                            ) : (
                                <span className="text-zinc-900">{formatPrice(order.shippingCost)}</span>
                            )}
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>İndirim</span>
                                <span>-{formatPrice(order.discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-bold pt-3 border-t border-zinc-100">
                            <span className="text-zinc-900">Toplam</span>
                            <span className="text-zinc-900">{formatPrice(order.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/urunler">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                            Alışverişe Devam Et
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button size="lg" className="w-full sm:w-auto">
                            Ana Sayfaya Dön
                        </Button>
                    </Link>
                </div>

                {/* Help */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        Sorularınız için{' '}
                        <Link href="/iletisim" className="text-primary underline">
                            iletişim
                        </Link>
                        {' '}sayfamızı ziyaret edebilir veya{' '}
                        <a href="mailto:destek@veral.com.tr" className="text-primary underline">
                            destek@veral.com.tr
                        </a>
                        {' '}adresine e-posta gönderebilirsiniz.
                    </p>
                </div>
            </div>
        </main>
    );
}
