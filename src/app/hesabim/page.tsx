"use client";

import React from "react";
import Link from "next/link";
import { UserCheck, Package, ChevronRight, ShoppingBag, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Order, OrderStatus } from "@/store/useOrderStore";
import { formatPrice } from "@/lib/utils";

const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
    created: { color: "bg-yellow-100 text-yellow-800", label: "Oluşturuldu" },
    payment_pending: { color: "bg-yellow-100 text-yellow-800", label: "Ödeme Bekleniyor" },
    paid: { color: "bg-green-100 text-green-800", label: "Ödeme Alındı" },
    failed: { color: "bg-red-100 text-red-800", label: "Başarısız" },
    shipped: { color: "bg-blue-100 text-blue-800", label: "Kargoya Verildi" },
    delivered: { color: "bg-green-100 text-green-800", label: "Teslim Edildi" },
    cancelled: { color: "bg-gray-100 text-gray-800", label: "İptal Edildi" },
};

export default function HesabimPage() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("metal-poster-orders") || "[]");
        // Sort by newest first
        const sorted = storedOrders.sort((a: Order, b: Order) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(sorted);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32">
                <div className="max-w-4xl mx-auto animate-pulse space-y-8">
                    <div className="h-10 w-48 bg-muted rounded" />
                    <div className="h-64 bg-muted rounded-xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-widest text-[#0A0A0A] dark:text-white border-l-4 border-[#D4AF37] pl-4 mb-2">
                            HESABIM
                        </h1>
                        <p className="text-muted-foreground">Bu cihaz üzerinden verdiğiniz siparişleri buradan takip edebilirsiniz.</p>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/siparis-sorgula">
                            <Button variant="outline" className="gap-2">
                                <Search className="w-4 h-4" />
                                Sipariş Sorgula
                            </Button>
                        </Link>
                    </div>
                </div>

                {orders.length > 0 ? (
                    <div className="grid gap-6">
                        <div className="flex items-center gap-2 mb-2 font-bold text-lg px-2">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            <h2>Sipariş Geçmişi ({orders.length})</h2>
                        </div>

                        {orders.map((order) => (
                            <Link key={order.id} href={`/siparis/${order.id}`}>
                                <div className="group bg-card border border-border rounded-2xl p-6 transition-all hover:border-primary hover:shadow-lg">
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-20 bg-muted rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-border/50">
                                                {order.items[0]?.image ? (
                                                    <img src={order.items[0].image} alt="" className="w-full h-full object-contain p-2" />
                                                ) : (
                                                    <Package className="w-8 h-8 text-muted-foreground" />
                                                )}
                                                {order.items.length > 1 && (
                                                    <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 rounded-full">
                                                        +{order.items.length - 1}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-bold text-lg">{order.orderNumber}</span>
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${statusConfig[order.status]?.color}`}>
                                                        {statusConfig[order.status]?.label}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(order.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <span className="font-bold text-primary">{formatPrice(order.total)}</span>
                                                    <span className="text-xs text-muted-foreground">{order.items.length} Ürün</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                                Detayları Gör
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-card border border-border rounded-3xl p-12 text-center shadow-sm">
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Henüz siparişiniz yok</h2>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            Bu cihaz üzerinden henüz bir sipariş vermediniz. Eğer başka bir cihazdan sipariş verdiyseniz "Sipariş Sorgula" butonunu kullanarak siparişinizi bulabilirsiniz.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/urunler">
                                <Button size="lg" className="px-10 font-bold uppercase tracking-wider">
                                    Alışverişe Başla
                                </Button>
                            </Link>
                            <Link href="/siparis-sorgula">
                                <Button size="lg" variant="outline" className="px-10 font-bold uppercase tracking-wider">
                                    Sipariş Sorgula
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* FAQ / Support Section */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 border border-border/50 rounded-2xl bg-muted/20">
                        <Clock className="w-8 h-8 mx-auto mb-4 text-primary" />
                        <h3 className="font-bold mb-2 uppercase text-sm tracking-widest">Hızlı Teslimat</h3>
                        <p className="text-xs text-muted-foreground">Siparişleriniz 2-4 iş günü içerisinde hazırlanır ve kargolanır.</p>
                    </div>
                    <div className="text-center p-6 border border-border/50 rounded-2xl bg-muted/20">
                        <Package className="w-8 h-8 mx-auto mb-4 text-primary" />
                        <h3 className="font-bold mb-2 uppercase text-sm tracking-widest">Kolay İade</h3>
                        <p className="text-xs text-muted-foreground">Ürünlerimizde üretim hatası olması durumunda kolay iade imkanı.</p>
                    </div>
                    <div className="text-center p-6 border border-border/50 rounded-2xl bg-muted/20">
                        <UserCheck className="w-8 h-8 mx-auto mb-4 text-primary" />
                        <h3 className="font-bold mb-2 uppercase text-sm tracking-widest">Destek Hattı</h3>
                        <p className="text-xs text-muted-foreground">Her türlü sorunuz için bize info@metalposter.co üzerinden ulaşın.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
