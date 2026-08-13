"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
    const supabase = createBrowserSupabaseClient();

    async function logout() {
        await supabase.auth.signOut();
        window.location.href = "/admin-login";
    }

    return (
        <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 w-full border border-red-200 bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 transition-colors"
        >
            <LogOut className="w-4 h-4" />
            Çıkış yap
        </button>
    );
}
