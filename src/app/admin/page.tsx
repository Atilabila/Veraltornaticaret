"use client";

import { Suspense } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
    return (
        <div className="relative">
            <Suspense fallback={<div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center text-[#525252]">Panel yükleniyor...</div>}>
                <AdminDashboard />
            </Suspense>
        </div>
    );
}
