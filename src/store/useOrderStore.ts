"use client";

import { create } from 'zustand';
import { CartItem } from './useCartStore';
import { ShippingInfo, BillingInfo } from './useCheckoutStore';

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
    }) => Order;

    updateOrderStatus: (orderId: string, status: OrderStatus, paymentId?: string) => void;
    getOrder: (orderId: string) => Order | undefined;
    setCurrentOrder: (order: Order | null) => void;
}

// =====================================================
// HELPERS
// =====================================================

function generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `VRL${year}${month}-${random}`;
}

function generateOrderId(): string {
    return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// =====================================================
// ORDER STORE (Mock DB - In Memory)
// =====================================================

export const useOrderStore = create<OrderState>((set, get) => ({
    orders: [],
    currentOrder: null,

    createOrder: (data) => {
        const now = new Date().toISOString();

        const order: Order = {
            id: generateOrderId(),
            orderNumber: generateOrderNumber(),
            status: 'created',
            items: data.items.map(item => ({
                productId: item.productId,
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
            createdAt: now,
            updatedAt: now,
        };

        set((state) => ({
            orders: [...state.orders, order],
            currentOrder: order,
        }));

        // Persist to localStorage for demo purposes
        if (typeof window !== 'undefined') {
            const existingOrders = JSON.parse(localStorage.getItem('metal-poster-orders') || '[]');
            localStorage.setItem('metal-poster-orders', JSON.stringify([...existingOrders, order]));
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
