"use client";

import { create } from 'zustand';
import { CartItem } from './useCartStore';
import { ShippingInfo, BillingInfo } from './useCheckoutStore';
// NOTE: OrderService import removed - DB sync deferred to MP-08

// =====================================================
// ORDER TYPES
// =====================================================

export type OrderStatus =
    | 'created'
    | 'payment_pending'
    | 'paid'
    | 'failed'
    | 'shipped'
    | 'delivered'
    | 'cancelled';

export interface OrderItem {
    productId: string;
    slug: string;
    name: string;
    size: string;
    orientation: 'vertical' | 'horizontal';
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    items: OrderItem[];
    shipping: ShippingInfo;
    billing: BillingInfo;
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;
    paymentMethod?: string;
    paymentId?: string;
    createdAt: string;
    updatedAt: string;
}

interface OrderState {
    orders: Order[];
    currentOrder: Order | null;

    // Actions
    createOrder: (data: {
        items: CartItem[];
        shipping: ShippingInfo;
        billing: BillingInfo;
        subtotal: number;
        shippingCost: number;
        discount: number;
        total: number;
        paymentMethod?: string;
        status?: OrderStatus;
    }) => Order;

    updateOrderStatus: (orderId: string, status: OrderStatus, paymentId?: string) => void;
    getOrder: (orderId: string) => Order | undefined;
    setCurrentOrder: (order: Order | null) => void;
}

// =====================================================
// HELPERS
// =====================================================

// MP-08: Order number format ORD-YYYYMMDD-XXXX (LOCKED)
function generateOrderNumber(): string {
    const now = new Date();

    // Date part: YYYYMMDD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const datePart = `${year}${month}${day}`;

    // Random part: 4 alphanumeric characters (uppercase)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 4; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `ORD-${datePart}-${randomPart}`;
}

function generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// =====================================================
// ORDER STORE (localStorage + Silent Sync)
// =====================================================

export const useOrderStore = create<OrderState>((set, get) => ({
    orders: [],
    currentOrder: null,

    createOrder: (data) => {
        const now = new Date().toISOString();

        const order: Order = {
            id: generateOrderId(),
            orderNumber: generateOrderNumber(),
            status: data.status ?? 'created',
            items: data.items.map(item => ({
                productId: item.productId,
                slug: item.slug,
                name: item.name,
                size: item.size,
                orientation: item.orientation,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),
            shipping: data.shipping,
            billing: data.billing,
            subtotal: data.subtotal,
            shippingCost: data.shippingCost,
            discount: data.discount,
            total: data.total,
            paymentMethod: data.paymentMethod,
            createdAt: now,
            updatedAt: now,
        };

        set((state) => ({
            orders: [...state.orders, order],
            currentOrder: order,
        }));

        // Persist to localStorage (IMMEDIATE - user flow continues)
        if (typeof window !== 'undefined') {
            const existingOrders = JSON.parse(localStorage.getItem('metal-poster-orders') || '[]');
            localStorage.setItem('metal-poster-orders', JSON.stringify([...existingOrders, order]));
        }

        // MP-08: Silent Sync to Supabase (BACKGROUND - non-blocking)
        if (typeof window !== 'undefined') {
            import('@/lib/sync/syncService').then(({ syncOrderToSupabase }) => {
                syncOrderToSupabase(order).catch((error) => {
                    console.error('[ORDER] Silent sync failed (non-critical):', error);
                    // User flow NOT affected - order is in localStorage
                });
            });
        }

        console.log('[ORDER] Created:', order.orderNumber, order.id);
        return order;
    },

    updateOrderStatus: (orderId, status, paymentId) => {
        set((state) => ({
            orders: state.orders.map(order =>
                order.id === orderId
                    ? {
                        ...order,
                        status,
                        paymentId: paymentId || order.paymentId,
                        updatedAt: new Date().toISOString()
                    }
                    : order
            ),
            currentOrder: state.currentOrder?.id === orderId
                ? { ...state.currentOrder, status, paymentId: paymentId || state.currentOrder.paymentId, updatedAt: new Date().toISOString() }
                : state.currentOrder,
        }));

        // Update localStorage
        if (typeof window !== 'undefined') {
            const orders = JSON.parse(localStorage.getItem('metal-poster-orders') || '[]');
            const updated = orders.map((order: Order) =>
                order.id === orderId
                    ? { ...order, status, paymentId: paymentId || order.paymentId, updatedAt: new Date().toISOString() }
                    : order
            );
            localStorage.setItem('metal-poster-orders', JSON.stringify(updated));
        }

        console.log('[ORDER] Status updated:', orderId, status);
    },

    getOrder: (orderId) => {
        // First check in-memory
        let order = get().orders.find(o => o.id === orderId);

        // If not found, try localStorage
        if (!order && typeof window !== 'undefined') {
            const orders = JSON.parse(localStorage.getItem('metal-poster-orders') || '[]');
            order = orders.find((o: Order) => o.id === orderId);
        }

        return order;
    },

    setCurrentOrder: (order) => set({ currentOrder: order }),
}));

// =====================================================
// SERVER-SIDE COMPATIBLE HELPER
// =====================================================

export function getOrderFromStorage(orderId: string): Order | null {
    if (typeof window === 'undefined') return null;

    try {
        const orders = JSON.parse(localStorage.getItem('metal-poster-orders') || '[]');
        return orders.find((o: Order) => o.id === orderId) || null;
    } catch {
        return null;
    }
}
