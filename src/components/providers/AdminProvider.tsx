"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useAdminStore } from "@/store/useAdminStore";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const setAdmin = useAdminStore((state) => state.setAdmin);

    // Create client inside component or use a singleton
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const role = (user.app_metadata as any)?.role;
                if (role === 'admin') {
                    setAdmin(true);
                    return;
                }

                // Fallback check against the admins table
                const { data: adminRow } = await supabase
                    .from('admins')
                    .select('is_active')
                    .eq('email', user.email)
                    .maybeSingle();

                if (adminRow?.is_active) {
                    setAdmin(true);
                } else {
                    setAdmin(false);
                }
            } else {
                setAdmin(false);
            }
        };

        checkAdmin();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            checkAdmin();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, setAdmin]);

    return <>{children}</>;
};
