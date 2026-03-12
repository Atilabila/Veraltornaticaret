"use client";

import { Suspense } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
    return (
        <div className="relative">
            <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white font-mono">Panel Yükleniyor...</div>}>
                <AdminDashboard />
            </Suspense>
        </div>
    );
}
