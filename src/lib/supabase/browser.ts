"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

/**
 * Creates a browser-side Supabase client with session persistence.
 * 
 * Safe for client components - uses ANON key only.
 */
export function createBrowserSupabaseClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    return createBrowserClient<Database>(url, anon);
}
