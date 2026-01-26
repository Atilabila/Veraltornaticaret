'use server';

import { supabaseAdmin } from '@/lib/supabase/admin';
import type { Database } from '@/lib/supabase/database.types';

type Order = Database['public']['Tables']['orders']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

// =====================================================
// ORDER ACTIONS
// =====================================================

export async function getAdminOrders(limit = 50) {
    try {
        const { data, error } = await (supabaseAdmin as any)
            .from('orders')
            .select('*, order_items(*)')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Admin Order Fetch Error:', error);
        return { success: false, error: 'Failed to fetch orders' };
    }
}

export async function getAdminOrderStats() {
    try {
        const { data: orders, error } = await (supabaseAdmin as any)
            .from('orders')
            .select('status, total_amount');

        if (error) throw error;

        const stats = {
            total: orders.length,
            pending: orders.filter((o: any) => o.status === 'pending').length,
            processing: orders.filter((o: any) => o.status === 'processing').length,
            shipped: orders.filter((o: any) => o.status === 'shipped').length,
            delivered: orders.filter((o: any) => o.status === 'delivered').length,
            cancelled: orders.filter((o: any) => o.status === 'cancelled').length,
            totalRevenue: orders.reduce((sum: number, o: any) => sum + Number(o.total_amount), 0),
        };

        return { success: true, data: stats };
    } catch (error) {
        console.error('Admin Stats Error:', error);
        return { success: false, error: 'Failed to fetch stats' };
    }
}

export async function updateAdminOrderStatus(orderId: string, status: string) {
    try {
        const { data, error } = await (supabaseAdmin as any)
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Admin Order Update Error:', error);
        return { success: false, error: 'Failed to update status' };
    }
}

// =====================================================
// PRODUCT ACTIONS
// =====================================================

export async function getAdminProducts() {
    try {
        const { data, error } = await (supabaseAdmin as any)
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Admin Product Fetch Error:', error);
        return { success: false, error: 'Failed to fetch products' };
    }
}

export async function upsertAdminProduct(product: ProductInsert) {
    try {
        const { data, error } = await (supabaseAdmin as any)
            .from('products')
            .upsert(product)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Admin Product Upsert Error:', error);
        return { success: false, error: 'Failed to save product' };
    }
}

export async function deleteAdminProduct(productId: string) {
    try {
        const { error } = await (supabaseAdmin as any)
            .from('products')
            .delete()
            .eq('id', productId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete product' };
    }
}

// =====================================================
// CATEGORY ACTIONS
// =====================================================

export async function upsertAdminCategory(category: any) {
    try {
        const { data, error } = await (supabaseAdmin as any)
            .from('categories')
            .upsert(category)
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Admin Category Upsert Error:', error);
        return { success: false, error: 'Failed to save category' };
    }
}

export async function deleteAdminCategory(categoryId: string) {
    try {
        const { error } = await (supabaseAdmin as any)
            .from('categories')
            .delete()
            .eq('id', categoryId);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error('Admin Category Delete Error:', error);
        return { success: false, error: 'Failed to delete category' };
    }
}

// =====================================================
// CONTENT ACTIONS
// =====================================================

export async function upsertAdminContent(content: any) {
    try {
        const { data, error } = await (supabaseAdmin as any)
            .from('site_content')
            .upsert({
                key: 'main_config',
                data: content,
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' })
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Admin Content Upsert Error:', error);
        return { success: false, error: 'Failed to save site content' };
    }
}
