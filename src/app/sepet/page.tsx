"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react";
import { useCartStore, useCartItemCount } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
    const { items, isHydrated, removeItem, updateQuantity, getSubtotal, getShippingCost, getTotal, clearCart } = useCartStore();
    const itemCount = useCartItemCount();

    // SSR-safe: show skeleton until hydrated
    if (!isHydrated) {
        return (
            <main className="min-h-screen bg-background pt-24 pb-16">
                <div className="container max-w-5xl mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-muted rounded w-48" />
                        <div className="h-64 bg-muted rounded" />
                    </div>
                </div>
            </main>
        );
    }

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-background pt-24 pb-16">
                <div className="container max-w-5xl mx-auto px-4">
                    <div className="text-center py-24 space-y-8">
                        <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-4">Sepetiniz Boş</h1>
                            <p className="text-muted-foreground mb-8">
                                Henüz sepetinize ürün eklemediniz. Koleksiyonumuzu keşfedin.
                            </p>
                            <Link href="/urunler">
                                <Button size="lg" className="gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Ürünleri Keşfet
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const subtotal = getSubtotal();
    const shipping = getShippingCost();
    const total = getTotal();

    return (
        <main className="min-h-screen bg-background pt-24 pb-16">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight mb-2">Sepetim</h1>
                        <p className="text-muted-foreground">{itemCount} ürün</p>
                    </div>
                    <Button variant="ghost" onClick={clearCart} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Sepeti Temizle
                    </Button>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-6 p-6 bg-card rounded-xl border border-border"
                            >
                                {/* Image */}
                                <div className="w-28 h-28 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-contain p-2"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1 truncate">{item.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {item.size} • {item.orientation === 'vertical' ? 'Dikey' : 'Yatay'}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeItem(item.id)}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* Quantity */}
                                        <div className="flex items-center gap-2 border rounded-lg">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {/* Price */}
                                        <div className="text-right">
                                            {item.price <= 0 ? (
                                                <div className="flex items-center gap-2 text-destructive">
                                                    <AlertTriangle className="w-4 h-4" />
                                                    <span className="font-bold">Fiyat Hatası</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatPrice(item.price)} / adet
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-card border border-border rounded-xl p-6 space-y-6">
                            <h2 className="text-xl font-bold">Sipariş Özeti</h2>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Ara Toplam</span>
                                    <span className="font-medium">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Kargo</span>
                                    {shipping === 0 ? (
                                        <span className="text-green-600 font-medium">Ücretsiz</span>
                                    ) : (
                                        <span className="font-medium">{formatPrice(shipping)}</span>
                                    )}
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        {formatPrice(500 - subtotal)} daha ekleyin, ücretsiz kargo kazanın!
                                    </p>
                                )}
                                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                                    <span>Toplam</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Link href="/odeme" className="block">
                                <Button size="lg" className="w-full gap-2 h-14 text-base font-bold">
                                    Ödemeye Geç
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>

                            <Link href="/urunler" className="block">
                                <Button variant="outline" size="lg" className="w-full gap-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    Alışverişe Devam Et
                                </Button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                    </div>
                                    Güvenli Ödeme (SSL)
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                    </div>
                                    14 Gün İade Garantisi
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
