"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
    const router = useRouter();
    const { isHydrated, setCartOpen } = useCartStore();

    useEffect(() => {
        if (isHydrated) {
            // Premium deneyim için doğrudan ana sayfaya yönlendir ve sepeti aç
            router.replace("/");
            setCartOpen(true);
        }
    }, [isHydrated, router, setCartOpen]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">Yönlendiriliyorsunuz...</p>
            </div>
        </div>
    );
}
