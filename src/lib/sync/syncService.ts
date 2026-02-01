// MP-08: Hybrid Sync Service
// Handles localStorage → Supabase synchronization with fallback

import { supabase } from '@/lib/supabase/client';

// =====================================================
// TYPES
// =====================================================

export interface SyncResult {
    success: boolean;
    synced: number;
    failed: number;
    errors: Array<{ id: string; error: string }>;
}

export interface SyncStatus {
    isSyncing: boolean;
    lastSyncAt: string | null;
    pendingCount: number;
}

// =====================================================
// SYNC TRACKING (localStorage)
// =====================================================

const SYNC_STATUS_KEY = 'metal-poster-sync-status';
const SYNC_QUEUE_KEY = 'metal-poster-sync-queue';

function getSyncStatus(): SyncStatus {
    if (typeof window === 'undefined') {
        return { isSyncing: false, lastSyncAt: null, pendingCount: 0 };
    }

    try {
        const stored = localStorage.getItem(SYNC_STATUS_KEY);
        return stored ? JSON.parse(stored) : { isSyncing: false, lastSyncAt: null, pendingCount: 0 };
    } catch {
        return { isSyncing: false, lastSyncAt: null, pendingCount: 0 };
    }
}

function setSyncStatus(status: Partial<SyncStatus>): void {
    if (typeof window === 'undefined') return;

    const current = getSyncStatus();
    const updated = { ...current, ...status };
    localStorage.setItem(SYNC_STATUS_KEY, JSON.stringify(updated));
}

// =====================================================
// ORDER SYNC
// =====================================================

export async function syncOrderToSupabase(orderData: any): Promise<boolean> {
    try {
        // Transform localStorage order to DB format
        const dbOrder = {
            order_number: orderData.orderNumber,
            customer_name: orderData.shipping.fullName,
            customer_email: orderData.shipping.email,
            customer_phone: orderData.shipping.phone,
            shipping_address: orderData.shipping, // Store full JSON
            subtotal: Number(orderData.subtotal),
            shipping_cost: Number(orderData.shippingCost),
            total: Number(orderData.total),
            payment_method: orderData.paymentMethod || 'credit_card',
            payment_status: orderData.paymentStatus || (orderData.status === 'paid' ? 'paid' : 'pending'),
            status: orderData.status || 'created',
            synced_from_local: true,
            sync_error: null,
            created_at: orderData.createdAt,
            updated_at: orderData.updatedAt || orderData.createdAt,
        };

        // Upsert order (idempotent - won't create duplicates)
        const { data: order, error: orderError } = await (supabase
            .from('orders') as any)
            .upsert(dbOrder, {
                onConflict: 'order_number',
                ignoreDuplicates: false,
            })
            .select()
            .single();

        if (orderError) {
            console.error('[SYNC] Order sync failed:', orderError);
            return false;
        }

        if (!order) {
            console.error('[SYNC] Order sync returned no data');
            return false;
        }

        // Sync order items
        if (orderData.items && orderData.items.length > 0) {
            const dbItems = orderData.items.map((item: any) => ({
                order_id: order.id,
                product_id: item.productId || item.id,
                product_slug: item.slug,
                product_name: item.name,
                size: item.size,
                orientation: item.orientation,
                unit_price: Number(item.price),
                quantity: Number(item.quantity),
                subtotal: Number(item.price) * Number(item.quantity),
            }));

            // Delete existing items for this order (in case of re-sync)
            await (supabase.from('order_items') as any).delete().eq('order_id', order.id);

            // Insert new items
            const { error: itemsError } = await (supabase.from('order_items') as any).insert(dbItems);

            if (itemsError) {
                console.error('[SYNC] Order items sync failed:', itemsError);
                return false;
            }
        }

        console.log('[SYNC] Order synced successfully:', orderData.orderNumber);
        return true;
    } catch (error) {
        console.error('[SYNC] Unexpected error syncing order:', error);
        return false;
    }
}

// =====================================================
// QUOTE SYNC
// =====================================================

export async function syncQuoteToSupabase(quoteData: any): Promise<boolean> {
    try {
        // Transform localStorage quote to DB format
        const dbQuote = {
            quote_number: quoteData.referenceNumber || quoteData.id,
            full_name: quoteData.fullName,
            company: quoteData.company || null,
            email: quoteData.email,
            phone: quoteData.phone,
            service_type: quoteData.serviceType,
            description: quoteData.description,
            file_metadata: quoteData.fileMetadata || null,
            status: quoteData.status || 'pending',
            synced_from_local: true,
            sync_error: null,
            created_at: quoteData.createdAt,
            updated_at: quoteData.updatedAt || quoteData.createdAt,
        };

        // Upsert quote (idempotent)
        const { error } = await (supabase
            .from('quotes') as any)
            .upsert(dbQuote, {
                onConflict: 'quote_number',
                ignoreDuplicates: false,
            });

        if (error) {
            console.error('[SYNC] Quote sync failed:', error);
            return false;
        }

        console.log('[SYNC] Quote synced successfully:', quoteData.referenceNumber);
        return true;
    } catch (error) {
        console.error('[SYNC] Unexpected error syncing quote:', error);
        return false;
    }
}

// =====================================================
// BATCH SYNC (Auto-migration on app load)
// =====================================================

export async function syncAllLocalData(): Promise<SyncResult> {
    if (typeof window === 'undefined') {
        return { success: false, synced: 0, failed: 0, errors: [] };
    }

    // Prevent concurrent syncs
    const status = getSyncStatus();
    if (status.isSyncing) {
        console.log('[SYNC] Sync already in progress, skipping');
        return { success: false, synced: 0, failed: 0, errors: [] };
    }

    setSyncStatus({ isSyncing: true });

    const result: SyncResult = {
        success: true,
        synced: 0,
        failed: 0,
        errors: [],
    };

    try {
        // Sync orders
        const ordersJson = localStorage.getItem('metal-poster-orders');
        if (ordersJson) {
            const orders = JSON.parse(ordersJson);
            for (const order of orders) {
                const success = await syncOrderToSupabase(order);
                if (success) {
                    result.synced++;
                } else {
                    result.failed++;
                    result.errors.push({ id: order.orderNumber, error: 'Order sync failed' });
                }
            }
        }

        // Sync quotes
        const quotesJson = localStorage.getItem('metal-poster-quotes');
        if (quotesJson) {
            const quotes = JSON.parse(quotesJson);
            for (const quote of quotes) {
                const success = await syncQuoteToSupabase(quote);
                if (success) {
                    result.synced++;
                } else {
                    result.failed++;
                    result.errors.push({ id: quote.referenceNumber, error: 'Quote sync failed' });
                }
            }
        }

        setSyncStatus({
            isSyncing: false,
            lastSyncAt: new Date().toISOString(),
            pendingCount: result.failed,
        });

        console.log('[SYNC] Batch sync complete:', result);
        return result;
    } catch (error) {
        console.error('[SYNC] Batch sync error:', error);
        setSyncStatus({ isSyncing: false });
        return { success: false, synced: 0, failed: 0, errors: [{ id: 'batch', error: String(error) }] };
    }
}

// =====================================================
// BACKGROUND SYNC (Silent, non-blocking)
// =====================================================

export function startBackgroundSync(): void {
    if (typeof window === 'undefined') return;

    // Run sync on app load (after 2 seconds to avoid blocking initial render)
    setTimeout(() => {
        syncAllLocalData().catch((error) => {
            console.error('[SYNC] Background sync failed:', error);
        });
    }, 2000);

    // Optional: Periodic sync every 5 minutes
    setInterval(() => {
        syncAllLocalData().catch((error) => {
            console.error('[SYNC] Periodic sync failed:', error);
        });
    }, 5 * 60 * 1000);
}

// =====================================================
// EXPORT
// =====================================================

export const syncService = {
    syncOrderToSupabase,
    syncQuoteToSupabase,
    syncAllLocalData,
    startBackgroundSync,
    getSyncStatus,
};
