"use client";

import { useState, useEffect, useCallback } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import {
    BarChart3, Users, Eye, Monitor, Smartphone, Globe, Clock,
    TrendingUp, ArrowUp, ArrowDown, RefreshCw, Calendar
} from "lucide-react";

interface PageViewRow {
    page_path: string;
    page_title: string | null;
    device_type: string;
    browser: string;
    ip_address: string;
    session_id: string;
    referrer: string | null;
    created_at: string;
}

interface DailyStat {
    date: string;
    views: number;
    uniques: number;
}

interface PageStat {
    path: string;
    views: number;
    uniques: number;
}

const PERIOD_OPTIONS = [
    { label: "Son 7 gün", days: 7 },
    { label: "Son 30 gün", days: 30 },
    { label: "Son 90 gün", days: 90 },
];

export const AnalyticsTab = () => {
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState(7);
    const [totalViews, setTotalViews] = useState(0);
    const [totalUniques, setTotalUniques] = useState(0);
    const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
    const [topPages, setTopPages] = useState<PageStat[]>([]);
    const [deviceStats, setDeviceStats] = useState<{ type: string; count: number }[]>([]);
    const [browserStats, setBrowserStats] = useState<{ name: string; count: number }[]>([]);
    const [recentVisitors, setRecentVisitors] = useState<PageViewRow[]>([]);
    const [todayViews, setTodayViews] = useState(0);
    const [yesterdayViews, setYesterdayViews] = useState(0);

    const fetchAnalytics = useCallback(async () => {
        setLoading(true);
        const supabase = createBrowserSupabaseClient();
        const since = new Date();
        since.setDate(since.getDate() - period);

        try {
            // Fetch all page views in period
            const { data, error } = await supabase
                .from("page_views" as any)
                .select("page_path, page_title, device_type, browser, ip_address, session_id, referrer, created_at")
                .gte("created_at", since.toISOString())
                .order("created_at", { ascending: false });

            if (error || !data) {
                console.error("Analytics fetch error:", error);
                setLoading(false);
                return;
            }

            const views = data as unknown as PageViewRow[];

            // Total views
            setTotalViews(views.length);

            // Unique sessions
            const uniqueSessions = new Set(views.map(v => v.session_id).filter(Boolean));
            setTotalUniques(uniqueSessions.size);

            // Today vs Yesterday
            const today = new Date().toISOString().split("T")[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
            setTodayViews(views.filter(v => v.created_at.startsWith(today)).length);
            setYesterdayViews(views.filter(v => v.created_at.startsWith(yesterday)).length);

            // Daily stats
            const dailyMap = new Map<string, { views: number; sessions: Set<string> }>();
            views.forEach(v => {
                const date = v.created_at.split("T")[0];
                if (!dailyMap.has(date)) dailyMap.set(date, { views: 0, sessions: new Set() });
                const d = dailyMap.get(date)!;
                d.views++;
                if (v.session_id) d.sessions.add(v.session_id);
            });
            const daily = Array.from(dailyMap.entries())
                .map(([date, d]) => ({ date, views: d.views, uniques: d.sessions.size }))
                .sort((a, b) => a.date.localeCompare(b.date));
            setDailyStats(daily);

            // Top pages
            const pageMap = new Map<string, { views: number; sessions: Set<string> }>();
            views.forEach(v => {
                if (!pageMap.has(v.page_path)) pageMap.set(v.page_path, { views: 0, sessions: new Set() });
                const p = pageMap.get(v.page_path)!;
                p.views++;
                if (v.session_id) p.sessions.add(v.session_id);
            });
            const pages = Array.from(pageMap.entries())
                .map(([path, p]) => ({ path, views: p.views, uniques: p.sessions.size }))
                .sort((a, b) => b.views - a.views)
                .slice(0, 15);
            setTopPages(pages);

            // Device stats
            const devMap = new Map<string, number>();
            views.forEach(v => devMap.set(v.device_type || "desktop", (devMap.get(v.device_type || "desktop") || 0) + 1));
            setDeviceStats(Array.from(devMap.entries()).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count));

            // Browser stats
            const brMap = new Map<string, number>();
            views.forEach(v => brMap.set(v.browser || "Other", (brMap.get(v.browser || "Other") || 0) + 1));
            setBrowserStats(Array.from(brMap.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));

            // Recent visitors (last 20)
            setRecentVisitors(views.slice(0, 20));
        } catch (err) {
            console.error("Analytics error:", err);
        }
        setLoading(false);
    }, [period]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    const growthPercent = yesterdayViews > 0
        ? Math.round(((todayViews - yesterdayViews) / yesterdayViews) * 100)
        : todayViews > 0 ? 100 : 0;

    const maxDailyViews = Math.max(...dailyStats.map(d => d.views), 1);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-32">
                <div className="text-center">
                    <RefreshCw className="w-8 h-8 text-[var(--color-brand-safety-orange)] animate-spin mx-auto mb-4" />
                    <p className="text-slate-500 font-bold">Analitik veriler yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">📊 Sayfa İstatistikleri</h1>
                    <p className="text-slate-500 mt-1">Ziyaretçi analizi ve trafik raporu</p>
                </div>
                <div className="flex items-center gap-3">
                    {PERIOD_OPTIONS.map(opt => (
                        <button
                            key={opt.days}
                            onClick={() => setPeriod(opt.days)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${period === opt.days
                                ? "bg-[var(--color-brand-safety-orange)] text-black shadow-lg"
                                : "bg-white/60 text-slate-600 hover:bg-white border border-slate-200"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                    <button
                        onClick={fetchAnalytics}
                        className="p-2.5 rounded-xl bg-white/60 border border-slate-200 hover:bg-white transition-all"
                        title="Yenile"
                    >
                        <RefreshCw className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard
                    icon={<Eye className="w-6 h-6" />}
                    label="Toplam Görüntülenme"
                    value={totalViews.toLocaleString("tr-TR")}
                    color="bg-blue-500"
                />
                <SummaryCard
                    icon={<Users className="w-6 h-6" />}
                    label="Tekil Ziyaretçi"
                    value={totalUniques.toLocaleString("tr-TR")}
                    color="bg-emerald-500"
                />
                <SummaryCard
                    icon={<TrendingUp className="w-6 h-6" />}
                    label="Bugünkü Ziyaret"
                    value={todayViews.toLocaleString("tr-TR")}
                    badge={
                        growthPercent !== 0 && (
                            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${growthPercent > 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                }`}>
                                {growthPercent > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                                {Math.abs(growthPercent)}%
                            </span>
                        )
                    }
                    color="bg-amber-500"
                />
                <SummaryCard
                    icon={<Monitor className="w-6 h-6" />}
                    label="Cihaz Oranı"
                    value={deviceStats[0] ? `${Math.round((deviceStats[0].count / totalViews) * 100)}% ${deviceStats[0].type === "desktop" ? "Masaüstü" : "Mobil"}` : "-"}
                    color="bg-purple-500"
                />
            </div>

            {/* Chart + Top Pages */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Daily Chart */}
                <div className="xl:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                        Günlük Ziyaretler
                    </h3>
                    {dailyStats.length === 0 ? (
                        <div className="text-center py-16 text-slate-400">
                            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p className="font-bold">Henüz veri yok</p>
                            <p className="text-sm mt-1">Ziyaretçi verisi toplandıkça grafik burada görünecek</p>
                        </div>
                    ) : (
                        <div className="flex items-end gap-1 h-48">
                            {dailyStats.map((day, i) => (
                                <div key={day.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                                    {/* Tooltip */}
                                    <div className="absolute -top-16 bg-zinc-900 text-white px-3 py-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl">
                                        <div>{new Date(day.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</div>
                                        <div className="text-blue-300">{day.views} görüntülenme</div>
                                        <div className="text-emerald-300">{day.uniques} tekil</div>
                                    </div>
                                    {/* Bar */}
                                    <div
                                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer min-h-[4px]"
                                        style={{ height: `${Math.max((day.views / maxDailyViews) * 100, 3)}%` }}
                                    />
                                    {/* Date label (show every 3rd) */}
                                    {(i % Math.ceil(dailyStats.length / 7) === 0 || i === dailyStats.length - 1) && (
                                        <span className="text-[9px] text-slate-400 font-bold mt-1">
                                            {new Date(day.date).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Top Pages */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                        En Çok Ziyaret Edilen
                    </h3>
                    <div className="space-y-3">
                        {topPages.length === 0 ? (
                            <p className="text-slate-400 text-sm text-center py-8">Veri yok</p>
                        ) : topPages.slice(0, 10).map((page, i) => (
                            <div key={page.path} className="flex items-center gap-3 group">
                                <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500">
                                    {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-700 truncate" title={page.path}>
                                        {page.path === "/" ? "Ana Sayfa" : page.path}
                                    </p>
                                    <div className="flex gap-3 mt-0.5">
                                        <span className="text-xs text-blue-600 font-bold">{page.views} görüntülenme</span>
                                        <span className="text-xs text-emerald-600 font-bold">{page.uniques} tekil</span>
                                    </div>
                                </div>
                                {/* Mini bar */}
                                <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${(page.views / (topPages[0]?.views || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Device & Browser + Recent Visitors */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Device & Browser */}
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                        Cihaz & Tarayıcı
                    </h3>

                    {/* Device */}
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Cihaz Türü</p>
                    <div className="space-y-2 mb-6">
                        {deviceStats.map(d => (
                            <div key={d.type} className="flex items-center gap-3">
                                <span className="text-sm font-bold text-slate-600 w-20 capitalize">
                                    {d.type === "desktop" ? "Masaüstü" : d.type === "mobile" ? "Mobil" : "Tablet"}
                                </span>
                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${d.type === "desktop" ? "bg-blue-500" : d.type === "mobile" ? "bg-emerald-500" : "bg-amber-500"}`}
                                        style={{ width: `${(d.count / totalViews) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-slate-500 w-10 text-right">
                                    {Math.round((d.count / totalViews) * 100)}%
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Browser */}
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Tarayıcı</p>
                    <div className="space-y-2">
                        {browserStats.slice(0, 5).map(b => (
                            <div key={b.name} className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-600">{b.name}</span>
                                <span className="text-xs font-bold text-slate-400">{b.count} ({Math.round((b.count / totalViews) * 100)}%)</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Visitors */}
                <div className="xl:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                        Son Ziyaretçiler
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left border-b border-slate-200">
                                    <th className="pb-3 font-bold text-xs text-slate-500 uppercase tracking-wider">Sayfa</th>
                                    <th className="pb-3 font-bold text-xs text-slate-500 uppercase tracking-wider">Cihaz</th>
                                    <th className="pb-3 font-bold text-xs text-slate-500 uppercase tracking-wider">Tarayıcı</th>
                                    <th className="pb-3 font-bold text-xs text-slate-500 uppercase tracking-wider">Zaman</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentVisitors.length === 0 ? (
                                    <tr><td colSpan={4} className="text-center py-8 text-slate-400">Henüz ziyaretçi verisi yok</td></tr>
                                ) : recentVisitors.map((v, i) => (
                                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-3 pr-4">
                                            <span className="font-bold text-slate-700 truncate block max-w-[200px]" title={v.page_path}>
                                                {v.page_path === "/" ? "Ana Sayfa" : v.page_path}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${v.device_type === "mobile" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                                                }`}>
                                                {v.device_type === "mobile" ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                                                {v.device_type === "desktop" ? "Masaüstü" : "Mobil"}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4 text-slate-500 font-medium">{v.browser}</td>
                                        <td className="py-3 text-slate-400 font-medium whitespace-nowrap">
                                            {new Date(v.created_at).toLocaleString("tr-TR", {
                                                day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Summary Card Component
const SummaryCard = ({
    icon, label, value, badge, color
}: {
    icon: React.ReactNode; label: string; value: string; badge?: React.ReactNode; color: string;
}) => (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${color} text-white flex items-center justify-center shadow-lg`}>
                {icon}
            </div>
            {badge}
        </div>
        <p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p>
        <p className="text-sm text-slate-500 font-medium mt-1">{label}</p>
    </div>
);
