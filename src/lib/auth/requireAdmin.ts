import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

type RequireAdminResult = {
    userId: string;
    email?: string;
};

/**
 * Server-side authentication guard for admin routes.
 * 
 * Checks:
 * 1. Valid Supabase Auth session
 * 2. app_metadata.role === "admin" OR
 * 3. Email exists in admins whitelist table (is_active = true)
 * 
 * @throws Error with "UNAUTHENTICATED" or "FORBIDDEN" message
 * @returns Admin user info (userId, email)
 */
export async function requireAdmin(): Promise<RequireAdminResult> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const cookieStore = await cookies();

    // Create SSR-compatible Supabase client
    const supabase = createServerClient(url, anon, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll() {
                // Read-only mode: no cookie writes needed for auth checks
            },
        },
    });

    // 1. Verify session
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        throw new Error("UNAUTHENTICATED");
    }

    // 2. Check app_metadata.role (primary method)
    const role = (user.app_metadata as any)?.role;
    if (role === "admin") {
        return { userId: user.id, email: user.email ?? undefined };
    }

    // 3. Fallback: Check admins whitelist table
    const admin = createAdminSupabaseClient();
    const email = user.email?.toLowerCase();

    if (!email) {
        throw new Error("FORBIDDEN");
    }

    const { data: row } = await admin
        .from("admins")
        .select("email, is_active")
        .eq("email", email)
        .maybeSingle();

    if (row?.is_active) {
        return { userId: user.id, email };
    }

    throw new Error("FORBIDDEN");
}
