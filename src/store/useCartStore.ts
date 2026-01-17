import { create } from 'zustand';

interface ProductConfig {
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
}

interface CartState {
  items: ProductConfig[];
  total: number;
  addItem: (product: ProductConfig) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  
  // Checkout flow state
  step: number;
  setStep: (step: number) => void;
  shippingInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    phone: string;
  };
  setShippingInfo: (info: Partial<CartState['shippingInfo']>) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (product) => set((state) => ({
    items: [...state.items, product],
    total: state.total + product.price,
  })),
  removeItem: (id) => set((state) => {
    const itemToRemove = state.items.find(i => i.id === id);
    return {
      items: state.items.filter(i => i.id !== id),
      total: state.total - (itemToRemove?.price || 0),
    };
  }),
  clearCart: () => set({ items: [], total: 0 }),
  
  step: 1,
  setStep: (step) => set({ step }),
  shippingInfo: {
    name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
  },
  setShippingInfo: (info) => set((state) => ({
    shippingInfo: { ...state.shippingInfo, ...info }
  })),
}));
