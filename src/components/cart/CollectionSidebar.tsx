// =====================================================
// COLLECTION SIDEBAR (CART)
// Minimalist Industrial Design
// =====================================================
"use client"

import * as React from "react"
import { m, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import { useCartStore } from "@/store/useCollectionStore"
import { cn, formatPrice } from "@/lib/utils"

export const CollectionSidebar: React.FC = () => {
    const {
        items,
        isOpen,
        closeCart,
        removeItem,
        updateQuantity,
        totalItems,
        totalPrice,
        clearCart
    } = useCartStore()

    // Close on escape
    React.useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) closeCart()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [isOpen, closeCart])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar */}
                    <m.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "fixed right-0 top-0 bottom-0 w-full max-w-md z-50",
                            "bg-zinc-950 border-l border-zinc-800",
                            "flex flex-col"
                        )}
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-zinc-400" />
                                <h2 className="font-['Syne',sans-serif] text-xl font-bold text-white">
                                    Koleksiyon
                                </h2>
                                <span className="px-2 py-0.5 text-xs font-bold bg-zinc-800 text-zinc-400 rounded-sm">
                                    {totalItems()}
                                </span>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 rounded-sm hover:bg-zinc-800 transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-400" />
                            </button>
                        </header>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
                                        <ShoppingBag className="w-8 h-8 text-zinc-700" />
                                    </div>
                                    <p className="text-zinc-500 mb-2">Koleksiyonunuz boş</p>
                                    <p className="text-xs text-zinc-600">
                                        Ürünleri keşfetmeye başlayın
                                    </p>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <m.div
                                            key={item.product.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className={cn(
                                                "flex gap-4 p-4 rounded-sm",
                                                "bg-zinc-900 border border-zinc-800"
                                            )}
                                        >
                                            {/* Image */}
                                            <div
                                                className="w-20 h-20 rounded-sm overflow-hidden shrink-0 flex items-center justify-center"
                                                style={{ backgroundColor: item.product.background_color }}
                                            >
                                                {item.product.image_url && (
                                                    <img
                                                        src={item.product.image_url}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-white truncate">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-zinc-500 mb-2">
                                                    {item.product.category?.name}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center bg-zinc-800 rounded-sm">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="p-1.5 hover:bg-zinc-700 transition-colors rounded-l-sm"
                                                        >
                                                            <Minus className="w-3 h-3 text-zinc-400" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="p-1.5 hover:bg-zinc-700 transition-colors rounded-r-sm"
                                                        >
                                                            <Plus className="w-3 h-3 text-zinc-400" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="p-1.5 hover:bg-red-500/10 rounded-sm transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-right shrink-0">
                                                <p className="font-bold text-white">
                                                    {formatPrice(item.product.price * item.quantity)}
                                                </p>
                                                {item.quantity > 1 && (
                                                    <p className="text-xs text-zinc-500">
                                                        {formatPrice(item.product.price)} / adet
                                                    </p>
                                                )}
                                            </div>
                                        </m.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <footer className="border-t border-zinc-800 p-6 space-y-4">
                                {/* Total */}
                                <div className="flex items-center justify-between">
                                    <span className="text-zinc-400">Toplam</span>
                                    <span className="text-2xl font-bold text-white">
                                        {formatPrice(totalPrice())}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="grid gap-3">
                                    <button
                                        className={cn(
                                            "flex items-center justify-center gap-2 px-6 py-4",
                                            "rounded-sm font-bold text-sm uppercase tracking-wider",
                                            "bg-gradient-to-r from-zinc-200 to-zinc-300 text-zinc-900",
                                            "hover:from-zinc-100 hover:to-zinc-200",
                                            "transition-all duration-300"
                                        )}
                                    >
                                        Siparişi Tamamla
                                        <ArrowRight className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={clearCart}
                                        className={cn(
                                            "flex items-center justify-center gap-2 px-4 py-2",
                                            "rounded-sm text-xs uppercase tracking-wider",
                                            "text-zinc-500 hover:text-zinc-400",
                                            "transition-colors"
                                        )}
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        Koleksiyonu Temizle
                                    </button>
                                </div>
                            </footer>
                        )}
                    </m.aside>
                </>
            )}
        </AnimatePresence>
    )
}

// =====================================================
// CART BUTTON (Floating)
// =====================================================
export const CollectionButton: React.FC = () => {
    const { openCart, totalItems } = useCartStore()
    const count = totalItems()

    return (
        <m.button
            onClick={openCart}
            className={cn(
                "fixed bottom-6 right-6 z-40",
                "w-14 h-14 rounded-sm",
                "bg-zinc-900 border border-zinc-700",
                "flex items-center justify-center",
                "hover:bg-zinc-800 hover:border-zinc-600",
                "transition-all duration-300",
                "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <ShoppingBag className="w-6 h-6 text-zinc-300" />

            {count > 0 && (
                <m.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                        "absolute -top-2 -right-2",
                        "w-6 h-6 rounded-full",
                        "bg-white text-zinc-900",
                        "text-xs font-bold",
                        "flex items-center justify-center"
                    )}
                >
                    {count}
                </m.span>
            )}
        </m.button>
    )
}

export default CollectionSidebar
