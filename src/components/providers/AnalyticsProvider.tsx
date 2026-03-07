"use client";

import { useAnalytics } from "@/hooks/useAnalytics";

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
    useAnalytics();
    return (
        <>
            {children}
        </>
    );
};
