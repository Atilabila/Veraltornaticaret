"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
    if (typeof window === "undefined") return "";
    let sid = sessionStorage.getItem("veral_sid");
    if (!sid) {
        sid = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem("veral_sid", sid);
    }
    return sid;
}

function hasAnalyticsConsent(): boolean {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("veral_cookie_consent") === "accepted" || localStorage.getItem("cookie-consent") === "accepted";
}

export function useAnalytics() {
    const pathname = usePathname();
    const lastPath = useRef("");

    useEffect(() => {
        if (!hasAnalyticsConsent()) return;
        if (pathname === lastPath.current) return;
        lastPath.current = pathname;

        const timer = setTimeout(() => {
            fetch("/api/visit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pagePath: pathname,
                    pageTitle: document.title,
                    referrer: document.referrer || null,
                    sessionId: getSessionId(),
                }),
            }).catch(() => { });
        }, 300);

        return () => clearTimeout(timer);
    }, [pathname]);
}
