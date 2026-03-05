"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { CookieConsent } from "@/components/ui/CookieConsent";

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
    useAnalytics();
    return (
        <>
            {children}
            <CookieConsent />
        </>
    );
};
