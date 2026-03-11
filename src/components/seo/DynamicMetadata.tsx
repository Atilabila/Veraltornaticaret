"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContentStore } from '@/store/useContentStore'

export const DynamicMetadata = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { content } = useContentStore()

    useEffect(() => {
        if (!content) return;

        // Find page settings for current path
        const pageConfig = content.pageSettings?.find(p => p.path === pathname) ||
            content.pageSettings?.find(p => p.path !== '/' && pathname?.startsWith(p.path));

        // Default Title / Description
        const defaultTitle = `${content.siteName || 'VERAL'} | Dosya Teli İmalatı, Takvim Tenekesi ve Metal Posterler`;
        const defaultDesc = `VERAL Metal İzmir - Toptan dosya teli üretimi, takvim tenekesi, metal poster, mıknatıslı magnet ve tef zili imalatı. Yüksek kaliteli endüstriyel metal çözümleri.`;

        // Effective Title / Description
        const title = pageConfig?.seoTitle || defaultTitle;
        const description = pageConfig?.seoDescription || defaultDesc;

        // Update Document Title
        document.title = title;

        // Update Canonical
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://veralteneketicaret.com';
        
        // Normalize path: if /product/... translate to /urunler/...
        let normalizedPath = pathname || '/';
        if (normalizedPath.startsWith('/product/')) {
            normalizedPath = normalizedPath.replace('/product/', '/urunler/');
        }

        // Include search params only for valid category filters (as seen in sitemap)
        const categoryId = searchParams.get('cat') || searchParams.get('category');
        const finalUrl = categoryId 
            ? `${baseUrl}${normalizedPath}?cat=${categoryId}`
            : `${baseUrl}${normalizedPath}`;

        canonicalLink.setAttribute('href', finalUrl);

        // Update Meta Meta Description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);

        // Update OpenGraph Title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', title);

        // Ensure GEO Meta tags are present (GEO focus: İzmir / Alsancak)
        const geoTags = [
            { name: "geo.region", content: "TR-35" },
            { name: "geo.placename", content: "İzmir, Alsancak" },
            { name: "geo.position", content: "38.4382;27.1418" },
            { name: "ICBM", content: "38.4382, 27.1418" }
        ];

        geoTags.forEach(tag => {
            let meta = document.querySelector(`meta[name="${tag.name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('name', tag.name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', tag.content);
        });

        // SAFETY: Remove any errant noindex tags on valid public pages
        const noindexMeta = document.querySelector('meta[name="robots"][content*="noindex"]');
        if (noindexMeta && !pathname?.startsWith('/admin')) {
            noindexMeta.remove();
            // Replace with index/follow
            const robots = document.createElement('meta');
            robots.setAttribute('name', 'robots');
            robots.setAttribute('content', 'index, follow, max-image-preview:large');
            document.head.appendChild(robots);
        }

    }, [pathname, content])

    return null; // This component doesn't render anything
}
