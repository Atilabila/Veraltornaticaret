"use server";

import { requireAdmin } from "@/lib/auth/requireAdmin";
import { logAdminAction } from "@/lib/audit/logAdminAction";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/database.types";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Quote = Database["public"]["Tables"]["quotes"]["Row"];
type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

// =====================================================
// ORDER ACTIONS
// =====================================================

export async function getAdminOrders(limit = 50) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await admin
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) throw new Error("Failed to fetch orders");
    return { success: true, data };
}

export async function getAdminOrderStats() {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data: orders, error } = await admin
        .from("orders")
        .select("status, total");

    if (error) throw new Error("Failed to fetch order stats");

    const ordersArray = (orders || []) as Array<{ status: string; total: number }>;

    const stats = {
        total: ordersArray.length,
        pending: ordersArray.filter((o) => o.status === "pending").length,
        processing: ordersArray.filter((o) => o.status === "processing").length,
        shipped: ordersArray.filter((o) => o.status === "shipped").length,
        delivered: ordersArray.filter((o) => o.status === "delivered").length,
        cancelled: ordersArray.filter((o) => o.status === "cancelled").length,
        totalRevenue: ordersArray.reduce((sum, o) => sum + Number(o.total || 0), 0),
    };

    return { success: true, data: stats };
}

export async function updateAdminOrderStatus(orderId: string, status: string) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await (admin as any)
        .from("orders")
        .update({ status })
        .eq("id", orderId)
        .select()
        .single();

    if (error) throw new Error("Failed to update order status");

    await logAdminAction({
        adminUserId: userId,
        action: "ORDER_STATUS_UPDATE",
        entity: "orders",
        entityId: orderId,
        payload: { newStatus: status },
    });

    return { success: true, data };
}

// =====================================================
// QUOTE ACTIONS
// =====================================================

export async function getAdminQuotes(limit = 50) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await admin
        .from("quotes")
        .select("*, quote_attachments(*)")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) throw new Error("Failed to fetch quotes");
    return { success: true, data };
}

export async function getQuoteSignedUrl(filePath: string) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await admin.storage
        .from("quote-attachments")
        .createSignedUrl(filePath, 3600); // 1 hour

    if (error) throw new Error("Failed to generate signed URL");

    await logAdminAction({
        adminUserId: userId,
        action: "QUOTE_VIEW_SIGNED_URL_CREATE",
        entity: "quote_attachments",
        entityId: filePath,
        payload: { bucket: "quote-attachments", expiresIn: 3600 },
    });

    return { success: true, url: data.signedUrl };
}

export async function getAdminQuoteStats() {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data: quotes, error } = await admin.from("quotes").select("status");

    if (error) throw new Error("Failed to fetch quote stats");

    const quotesArray = (quotes || []) as Array<{ status: string }>;

    const stats = {
        total: quotesArray.length,
        pending: quotesArray.filter((q) => q.status === "pending").length,
        completed: quotesArray.filter(
            (q) => q.status === "completed" || q.status === "sent"
        ).length,
        cancelled: quotesArray.filter(
            (q) => q.status === "cancelled" || q.status === "rejected"
        ).length,
    };

    return { success: true, data: stats };
}

export async function updateAdminQuoteStatus(quoteId: string, status: string) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await (admin as any)
        .from("quotes")
        .update({ status })
        .eq("id", quoteId)
        .select()
        .single();

    if (error) throw new Error("Failed to update quote status");

    await logAdminAction({
        adminUserId: userId,
        action: "QUOTE_STATUS_UPDATE",
        entity: "quotes",
        entityId: quoteId,
        payload: { newStatus: status },
    });

    return { success: true, data };
}

// =====================================================
// PRODUCT ACTIONS
// =====================================================

export async function getAdminProducts() {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await admin
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error("Failed to fetch products");
    return { success: true, data };
}

export async function upsertAdminProduct(product: ProductInsert) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await (admin as any)
        .from("products")
        .upsert(product)
        .select()
        .single();

    if (error) throw new Error("Failed to save product");

    await logAdminAction({
        adminUserId: userId,
        action: "PRODUCT_UPSERT",
        entity: "products",
        entityId: data?.id || "new",
        payload: product,
    });

    return { success: true, data };
}

export async function deleteAdminProduct(productId: string) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { error } = await admin.from("products").delete().eq("id", productId);

    if (error) throw new Error("Failed to delete product");

    await logAdminAction({
        adminUserId: userId,
        action: "PRODUCT_DELETE",
        entity: "products",
        entityId: productId,
    });

    return { success: true };
}

// =====================================================
// CATEGORY ACTIONS
// =================================0====================

export async function upsertAdminCategory(category: any) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await (admin as any)
        .from("categories")
        .upsert(category)
        .select()
        .single();

    if (error) throw new Error("Failed to save category");

    await logAdminAction({
        adminUserId: userId,
        action: "CATEGORY_UPSERT",
        entity: "categories",
        entityId: data?.id || "new",
        payload: category,
    });

    return { success: true, data };
}

export async function deleteAdminCategory(categoryId: string) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { error } = await admin
        .from("categories")
        .delete()
        .eq("id", categoryId);

    if (error) throw new Error("Failed to delete category");

    await logAdminAction({
        adminUserId: userId,
        action: "CATEGORY_DELETE",
        entity: "categories",
        entityId: categoryId,
    });

    return { success: true };
}

// =====================================================
// CONTENT ACTIONS
// =====================================================

export async function upsertAdminContent(content: any) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await (admin as any)
        .from("site_content")
        .upsert(
            {
                key: "main_config",
                data: content,
                updated_at: new Date().toISOString(),
            },
            { onConflict: "key" }
        )
        .select()
        .single();

    if (error) throw new Error("Failed to save site content");

    await logAdminAction({
        adminUserId: userId,
        action: "CONTENT_UPDATE",
        entity: "site_content",
        entityId: "main_config",
    });

    return { success: true, data };
}

// =====================================================
// AUDIT LOG ACTIONS
// =====================================================

export async function getAdminLogs(limit = 100) {
    const { userId } = await requireAdmin();
    const admin = createAdminSupabaseClient();

    const { data, error } = await admin
        .from("admin_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) throw new Error("Failed to fetch audit logs");
    return { success: true, data };
}
