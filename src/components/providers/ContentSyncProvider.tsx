"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useContentStore } from "@/store/useContentStore";

/**
 * Content Sync Provider
 * Automatically fetches fresh content from Supabase on mount
 * This ensures mobile devices get the latest admin changes
 */
export function ContentSyncProvider({ children }: { children: React.ReactNode }) {
    const fetchContent = useContentStore((state) => state.fetchContent);
    const pathname = usePathname();

    useEffect(() => {
        // Fetch fresh content on mount
        fetchContent();

        // Don't poll on admin pages to prevent overwriting unsaved work
        // Admin pages manage their own state and syncing
        if (pathname?.startsWith("/admin")) return;

        // Set up periodic refresh (every 30 seconds)
        const interval = setInterval(() => {
            fetchContent();
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchContent, pathname]);

    return <>{children}</>;
}
