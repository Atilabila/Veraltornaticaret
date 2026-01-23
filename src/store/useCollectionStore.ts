// =====================================================
// CART (COLLECTION) STORE
// Minimalist Cart with Zustand
// =====================================================

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { MetalProduct } from "@/lib/supabase/metal-products.types"

// =====================================================
// TYPES
// =====================================================
export interface CartItem {
    product: MetalProduct
    quantity: number
    addedAt: Date
}

interface CartState {
    items: CartItem[]
    isOpen: boolean

    // Actions
    addItem: (product: MetalProduct, quantity?: number) => void
    removeItem: (productId: string) => void
    updateQuantity: (productId: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void

    // Computed
    totalItems: () => number
    totalPrice: () => number
    hasItem: (productId: string) => boolean
}

// =====================================================
// STORE
// =====================================================
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            // Add item to cart
            addItem: (product, quantity = 1) => {
                const { items } = get()
                const existingIndex = items.findIndex(
                    (item) => item.product.id === product.id
                )

                if (existingIndex > -1) {
                    // Update quantity if exists
                    const newItems = [...items]
                    newItems[existingIndex].quantity += quantity
                    set({ items: newItems })
                } else {
                    // Add new item
                    set({
                        items: [
                            ...items,
                            {
                                product,
                                quantity,
                                addedAt: new Date()
                            }
                        ]
                    })
                }
            },

            // Remove item
            removeItem: (productId) => {
                set({
                    items: get().items.filter(
                        (item) => item.product.id !== productId
                    )
                })
            },

            // Update quantity
            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                    return
                }

                const newItems = get().items.map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity }
                        : item
                )
                set({ items: newItems })
            },

            // Clear cart
            clearCart: () => set({ items: [] }),

            // Toggle sidebar
            toggleCart: () => set({ isOpen: !get().isOpen }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            // Computed: Total items count
            totalItems: () => {
                return get().items.reduce((acc, item) => acc + item.quantity, 0)
            },

            // Computed: Total price
            totalPrice: () => {
                return get().items.reduce(
                    (acc, item) => acc + item.product.price * item.quantity,
                    0
                )
            },

            // Check if item exists
            hasItem: (productId) => {
                return get().items.some((item) => item.product.id === productId)
            }
        }),
        {
            name: "metal-art-cart",
            // Only persist items, not UI state
            partialize: (state) => ({ items: state.items })
        }
    )
)

export default useCartStore
