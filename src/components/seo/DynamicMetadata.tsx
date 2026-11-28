"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContentStore } from '@/store/useContentStore'
import { absUrl } from '@/lib/site'

export const DynamicMetadata = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { content } = useContentStore()

    useEffect(() => {
        if (!content) return;

        const pageConfig = content.pageSettings?.find(p => p.path === pathname);

        if (pageConfig?.seoTitle) {
            document.title = pageConfig.seoTitle;
        }

        // Update Canonical
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        // Normalize path: if /product/... translate to /urunler/...
        let normalizedPath = pathname || '/';
        if (normalizedPath.startsWith('/product/')) {
            normalizedPath = normalizedPath.replace('/product/', '/urunler/');
        }

        // Include search params only for valid category filters (as seen in sitemap)
        const categoryId = searchParams.get('cat') || searchParams.get('category');
        const finalUrl = categoryId
            ? `${absUrl(normalizedPath)}?cat=${categoryId}`
            : absUrl(normalizedPath);

        canonicalLink.setAttribute('href', finalUrl);

        if (pageConfig?.seoDescription) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', pageConfig.seoDescription);
        }

        if (pageConfig?.seoTitle) {
            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (!ogTitle) {
                ogTitle = document.createElement('meta');
                ogTitle.setAttribute('property', 'og:title');
                document.head.appendChild(ogTitle);
            }
            ogTitle.setAttribute('content', pageConfig.seoTitle);
        }

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

    }, [pathname, searchParams, content])

    return null; // This component doesn't render anything
}
