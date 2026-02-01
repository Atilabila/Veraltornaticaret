"use client"

import { usePathname } from "next/navigation"
import { useContentStore } from "@/store/useContentStore"
import { useEffect, useState } from "react"

export const useThemeDetection = () => {
    const pathname = usePathname()
    const { content } = useContentStore()
    const [isDarkPage, setIsDarkPage] = useState(true)
    const [headerMode, setHeaderMode] = useState<'inherit' | 'auto' | 'translucent'>('inherit');
    const [gridOverride, setGridOverride] = useState<'inherit' | 'on' | 'off'>('inherit');

    useEffect(() => {
        // 1. Check Page Settings (Exact Match or Prefix for dynamic routes?)
        // For now, let's do exact match or basic startswith for sub-sections if needed.
        // We'll prioritize exact match first.

        let pathConfig = content.pageSettings?.find(p => p.path === pathname);

        // If not exact match, check for partial matches (longest prefix wins?)
        if (!pathConfig) {
            // Basic fallback for product pages etc if explicitly defined in pageSettings 
            // e.g. /product/123 -> matches /product if defined?
            // Implementing simple logic: find any config where pathname starts with it (excluding root unless distinct)
            pathConfig = content.pageSettings?.find(p => p.path !== '/' && pathname?.startsWith(p.path));
        }

        if (pathConfig) {
            setIsDarkPage(pathConfig.theme === 'dark');
            setHeaderMode(pathConfig.headerModeOverride);
            setGridOverride(pathConfig.gridOverride);
            return;
        }

        // 2. Fallback to Legacy Theme Config (darkPaths)
        if (content.themeConfig) {
            const darkPaths = content.themeConfig.darkPaths || ['/', '/metal-tablolar', '/urunler', '/teklif-al'];
            const isDark = darkPaths.some(path => {
                if (!path) return false;
                const cleanPath = path.trim();
                if (cleanPath === '/' && pathname === '/') return true;
                if (cleanPath !== '/' && pathname?.startsWith(cleanPath)) return true;
                return false;
            }) || pathname === '/';

            setIsDarkPage(isDark);
            setHeaderMode('inherit');
            setGridOverride('inherit');
        }

    }, [pathname, content.pageSettings, content.themeConfig])

    return { isDarkPage, headerMode, gridOverride }
}
