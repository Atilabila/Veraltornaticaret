import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getDeviceType(ua: string): string {
    if (/mobile|android|iphone|ipad|ipod/i.test(ua)) return "mobile";
    if (/tablet|ipad/i.test(ua)) return "tablet";
    return "desktop";
}

function getBrowser(ua: string): string {
    if (/edg/i.test(ua)) return "Edge";
    if (/chrome/i.test(ua)) return "Chrome";
    if (/firefox/i.test(ua)) return "Firefox";
    if (/safari/i.test(ua)) return "Safari";
    if (/opera|opr/i.test(ua)) return "Opera";
    return "Other";
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { pagePath, pageTitle, referrer, sessionId } = body;

        if (!pagePath) {
            return NextResponse.json({ error: "pagePath required" }, { status: 400 });
        }

        const userAgent = request.headers.get("user-agent") || "";
        const forwarded = request.headers.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "0.0.0.0";

        // Skip bots
        if (/bot|crawler|spider|googlebot|bingbot/i.test(userAgent)) {
            return NextResponse.json({ ok: true, skipped: true });
        }

        const { error } = await supabase.from("page_views").insert({
            page_path: pagePath,
            page_title: pageTitle || null,
            referrer: referrer || null,
            user_agent: userAgent,
            ip_address: ip,
            device_type: getDeviceType(userAgent),
            browser: getBrowser(userAgent),
            session_id: sessionId || null,
        });

        if (error) {
            console.error("Analytics insert error:", error);
            return NextResponse.json({ error: "Failed to record" }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Analytics API error:", err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
