import { supabase } from './client';
import type { Database } from './database.types';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];

/**
 * Order Service - Handles all order-related database operations
 */
export class OrderService {
    /**
     * Create a new order with items
     */
    static async createOrder(
        orderData: OrderInsert,
        items: Omit<OrderItemInsert, 'order_id'>[]
    ): Promise<{ order: Order; items: OrderItem[] }> {
        // Start a transaction by creating the order first
        // @ts-ignore
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert(orderData)
            .select()
            .single();

        if (orderError) {
            console.error('Error creating order:', orderError);
            throw orderError;
        }

        // Create order items
        const orderItems = items.map((item) => ({
            ...item,
            order_id: order.id,
        }));

        // @ts-ignore
        const { data: createdItems, error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)
            .select();

        if (itemsError) {
            console.error('Error creating order items:', itemsError);
            // Rollback: delete the order if items creation fails
            await supabase.from('orders').delete().eq('id', order.id);
            throw itemsError;
        }

        return {
            order,
            items: createdItems || [],
        };
    }

    /**
     * Get order by ID with items
     */
    static async getOrderById(orderId: string) {
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

        if (orderError) {
            console.error('Error fetching order:', orderError);
            throw orderError;
        }

        const { data: items, error: itemsError } = await supabase
            .from('order_items')
            .select('*, products(*)')
            .eq('order_id', orderId);

        if (itemsError) {
            console.error('Error fetching order items:', itemsError);
            throw itemsError;
        }

        return {
            ...order,
            items: items || [],
        };
    }

    /**
     * Get all orders (Admin only)
     */
    static async getAllOrders(
        status?: string,
        limit: number = 50
    ): Promise<Order[]> {
        let query = supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Update order status
     */
    static async updateOrderStatus(
        orderId: string,
        status: Order['status']
    ): Promise<Order> {
        // @ts-ignore
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) {
            console.error('Error updating order status:', error);
            throw error;
        }

        return data;
    }

    /**
     * Get orders by customer email
     */
    static async getOrdersByEmail(email: string): Promise<Order[]> {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_email', email)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching customer orders:', error);
            throw error;
        }

        return data || [];
    }

    /**
     * Get order statistics (Admin)
     */
    static async getOrderStats() {
        const { data: allOrders, error } = await supabase
            .from('orders')
            .select('status, total_amount');

        if (error) {
            console.error('Error fetching order stats:', error);
            throw error;
        }

        const stats = {
            total: allOrders?.length || 0,
            pending: allOrders?.filter((o) => o.status === 'pending').length || 0,
            processing:
                allOrders?.filter((o) => o.status === 'processing').length || 0,
            shipped: allOrders?.filter((o) => o.status === 'shipped').length || 0,
            delivered: allOrders?.filter((o) => o.status === 'delivered').length || 0,
            cancelled: allOrders?.filter((o) => o.status === 'cancelled').length || 0,
            totalRevenue:
                allOrders?.reduce((sum, o) => sum + Number(o.total_amount), 0) || 0,
        };

        return stats;
    }
}
