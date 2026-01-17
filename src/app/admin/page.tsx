"use client";

import { useState, useEffect } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Lock } from "lucide-react";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Sayfa yüklendiğinde session kontrolü
    useEffect(() => {
        const auth = sessionStorage.getItem("admin_authenticated");
        if (auth === "true") {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Kullanıcı adı ve şifre kontrolü
        if (username === "veraltic" && password === "895623Oo.") {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_authenticated", "true");
        } else {
            setError("Kullanıcı adı veya şifre hatalı!");
            setPassword("");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("admin_authenticated");
        setUsername("");
        setPassword("");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <div className="text-2xl font-mono font-bold">Yükleniyor...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white border-4 border-black shadow-brutal p-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                                <Lock className="w-8 h-8" />
                            </div>
                            <h1 className="text-3xl font-[Archivo Black] uppercase mb-2">
                                Admin Girişi
                            </h1>
                            <p className="font-mono text-sm text-black/60">
                                VERAL TORNA & TENEKE
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block font-mono font-bold text-sm mb-2">
                                    KULLANICI ADI
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                    placeholder="Kullanıcı adınızı girin"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-mono font-bold text-sm mb-2">
                                    ŞİFRE
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border-4 border-black font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                    placeholder="Şifrenizi girin"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="bg-red-100 border-4 border-red-500 p-4 font-mono font-bold text-red-700 text-sm">
                                    ⚠️ {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 px-6 font-mono font-bold text-lg border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-none"
                            >
                                GİRİŞ YAP
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="font-mono text-xs text-black/40">
                                Güvenli Bağlantı • v4.5.11
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Logout Button */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 font-mono font-bold border-4 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-none"
                >
                    ÇIKIŞ YAP
                </button>
            </div>
            <AdminDashboard />
        </div>
    );
}
