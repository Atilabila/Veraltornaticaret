"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// =====================================================
// CART TYPES
// =====================================================

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  size: string;
  orientation: 'vertical' | 'horizontal';
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isHydrated: boolean;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity' | 'id'>) => { success: boolean; error?: string };
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setHydrated: (state: boolean) => void;

  // Computed (selectors)
  getItemCount: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

// =====================================================
// BUSINESS RULES
// =====================================================

const SHIPPING_THRESHOLD = 500; // Free shipping above this amount
const FLAT_SHIPPING_COST = 29.90;

function validateProduct(item: Omit<CartItem, 'quantity' | 'id'>): { valid: boolean; error?: string } {
  // CRITICAL: Block zero/missing price
  if (!item.price || item.price <= 0) {
    console.error('[CART] BLOCKED: Product has invalid price', { productId: item.productId, price: item.price });
    return { valid: false, error: 'Bu ürünün fiyatı geçersiz. Lütfen müşteri hizmetleri ile iletişime geçin.' };
  }

  // Block missing required fields
  if (!item.name || !item.productId) {
    console.error('[CART] BLOCKED: Product missing required fields', item);
    return { valid: false, error: 'Ürün bilgileri eksik.' };
  }

  return { valid: true };
}

// =====================================================
// CART STORE WITH PERSISTENCE
// =====================================================

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isHydrated: false,

      addItem: (item) => {
        const validation = validateProduct(item);
        if (!validation.valid) {
          return { success: false, error: validation.error };
        }

        const cartItemId = `${item.productId}-${item.size}-${item.orientation}`;
        const existingItem = get().items.find(i => i.id === cartItemId);

        if (existingItem) {
          // Update quantity if same variant exists
          set((state) => ({
            items: state.items.map(i =>
              i.id === cartItemId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          // Add new item
          set((state) => ({
            items: [...state.items, { ...item, id: cartItemId, quantity: 1 }],
          }));
        }

        return { success: true };
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(i => i.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      setHydrated: (state) => set({ isHydrated: state }),

      // Selectors
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },

      getShippingCost: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_COST;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingCost();
      },
    }),
    {
      name: 'metal-poster-cart',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);

// =====================================================
// SSR-SAFE HOOK
// =====================================================

export function useCartItemCount() {
  const items = useCartStore((state) => state.items);
  const isHydrated = useCartStore((state) => state.isHydrated);

  // Return 0 during SSR to prevent hydration mismatch
  if (!isHydrated) return 0;

  return items.reduce((sum, item) => sum + item.quantity, 0);
}
