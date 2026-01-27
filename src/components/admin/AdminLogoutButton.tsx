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
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-mono font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
            <LogOut className="w-4 h-4" />
            ÇIKIŞ
        </button>
    );
}
