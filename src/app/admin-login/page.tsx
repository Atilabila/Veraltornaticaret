"use client";

import { useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { ArrowRight, CheckCircle, AlertCircle, Lock, User } from "lucide-react";
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

        const emailToUse = username.trim().toLowerCase() === 'veraltic'
            ? 'veraltic@metalposter.pro'
            : username;

        const { error } = await supabase.auth.signInWithPassword({
            email: emailToUse,
            password: password
        });

        if (error) {
            setStatus("error");
            setMessage("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
        } else {
            setStatus("success");
            setMessage("Giriş başarılı. Yönlendiriliyorsunuz...");
            setTimeout(() => router.push("/admin"), 1000);
        }
    }

    const inputClass = "w-full pl-12 pr-4 py-3 border border-[#c6c6c6] bg-[#f4f4f4] text-[#161616] focus:outline-none focus:border-[var(--color-brand-accent)] transition-colors";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4] p-4">
            <div className="w-full max-w-md">
                <div className="bg-white border border-[#c6c6c6] p-8 shadow-sm">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--color-brand-accent)] text-white mb-4">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#161616] mb-2">Admin girişi</h1>
                        <p className="text-sm text-[#525252]">Veral Torna & Teneke Ticaret</p>
                    </div>

                    {status === "success" && (
                        <div className="bg-emerald-50 border border-emerald-200 p-4 mb-6 text-sm text-emerald-700 flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    {status === "error" && (
                        <div className="bg-red-50 border border-red-200 p-4 mb-6 text-sm text-red-700 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] mb-2">Kullanıcı adı</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={inputClass} placeholder="Kullanıcı adı veya e-posta" disabled={status === "loading"} autoComplete="username" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] mb-2">Şifre</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} className={inputClass} placeholder="••••••••" disabled={status === "loading"} autoComplete="current-password" />
                            </div>
                        </div>

                        <button
                            onClick={handleLogin}
                            disabled={status === "loading" || !username || !password}
                            className="w-full bg-[var(--color-brand-accent)] text-white py-3.5 px-6 font-semibold hover:bg-[#0043ce] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {status === "loading" ? "Giriş yapılıyor..." : <>Giriş yap <ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </div>

                    <p className="text-center text-xs text-[#525252] mt-8">
                        <a href="/" className="text-[var(--color-brand-accent)] hover:underline">← Siteye dön</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
