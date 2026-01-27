"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Mail, ArrowRight, CheckCircle, AlertCircle, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const supabase = createBrowserSupabaseClient();
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState<string | null>(null);

    async function handleLogin() {
        if (!username || !password) return;

        setStatus("loading");
        setMessage(null);

        // Map username 'veraltic' to the specific email
        const emailToUse = username.trim().toLowerCase() === 'veraltic'
            ? 'veraltic@metalposter.pro'
            : username; // Allow direct email input too

        const { error } = await supabase.auth.signInWithPassword({
            email: emailToUse,
            password: password
        });

        if (error) {
            setStatus("error");
            setMessage("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
            console.error(error);
        } else {
            setStatus("success");
            setMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
            setTimeout(() => {
                router.push("/admin");
            }, 1000);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-black text-white mb-4">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-[Archivo_Black] uppercase mb-2 leading-none">
                            ADMİN GİRİŞİ
                        </h1>
                        <p className="font-mono text-xs text-black/60 tracking-widest">
                            VERAL TORNA & TENEKE TİCARET
                        </p>
                    </div>

                    {/* Status Messages */}
                    {status === "success" && (
                        <div className="bg-green-100 border-4 border-green-500 p-4 mb-6 font-mono font-bold text-green-700 text-sm flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{message}</span>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="bg-red-100 border-4 border-red-500 p-4 mb-6 font-mono font-bold text-red-700 text-sm flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <div className="space-y-6">
                        <div>
                            <label className="block font-mono font-bold text-xs mb-2 uppercase">
                                KULLANICI ADI
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    // onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                    className="w-full pl-12 pr-4 py-3 border-4 border-black font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                    placeholder="Kullanıcı Adı"
                                    disabled={status === "loading"}
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-mono font-bold text-xs mb-2 uppercase">
                                ŞİFRE
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                                    className="w-full pl-12 pr-4 py-3 border-4 border-black font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                    placeholder="••••••••"
                                    disabled={status === "loading"}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={status === "loading" || !username || !password}
                            className="w-full bg-[var(--color-brand-safety-orange)] text-black py-4 px-6 font-mono font-bold text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === "loading" ? (
                                "GİRİŞ YAPILIYOR..."
                            ) : (
                                <>
                                    GİRİŞ YAP
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t-2 border-dashed border-black/10 text-center">
                        <p className="font-mono text-[9px] text-black/40 uppercase tracking-widest">
                            GÜVENLİ YÖNETİM PANELİ • MP-10
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
