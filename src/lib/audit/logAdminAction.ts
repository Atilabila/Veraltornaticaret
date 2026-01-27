import "server-only";
import { headers } from "next/headers";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

type LogArgs = {
    adminUserId: string;
    action: string;
    entity: string;
    entityId?: string | null;
    payload?: any;
};

/**
 * Records an administrative action to the audit log.
 * 
 * Captures:
 * - Admin user ID (from requireAdmin)
 * - Action type (e.g., "ORDER_STATUS_UPDATE")
 * - Entity affected (e.g., "orders")
 * - Entity ID (e.g., order UUID)
 * - Optional payload (action-specific metadata)
 * - IP address (from x-forwarded-for or x-real-ip)
 * - User agent
 * 
 * @param args - Audit log parameters
 */
export async function logAdminAction(args: LogArgs): Promise<void> {
    const h = await headers();

    // Extract IP (handle proxy scenarios)
    const ip =
        h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        h.get("x-real-ip") ||
        null;

    const userAgent = h.get("user-agent") || null;

    const admin = createAdminSupabaseClient();

    await admin.from("admin_logs").insert({
        admin_user_id: args.adminUserId,
        action: args.action,
        entity: args.entity,
        entity_id: args.entityId ?? null,
        payload: args.payload ?? null,
        ip,
        user_agent: userAgent,
    });
}
