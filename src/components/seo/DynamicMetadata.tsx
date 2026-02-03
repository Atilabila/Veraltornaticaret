"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useContentStore } from '@/store/useContentStore'

export const DynamicMetadata = () => {
    const pathname = usePathname()
    const { content } = useContentStore()

    useEffect(() => {
        if (!content) return;

        // Find page settings for current path
        const pageConfig = content.pageSettings?.find(p => p.path === pathname) ||
            content.pageSettings?.find(p => p.path !== '/' && pathname?.startsWith(p.path));

        // Default Title / Description
        const defaultTitle = `${content.siteName || 'VERAL'} | İzmir Metal Poster, Takvim Tenekesi & İmalat`;
        const defaultDesc = `VERAL Metal İzmir - Takvim tenekesi, dosya teli, metal poster, mıknatıslı magnet ve tef zili imalatı. Alsancak merkezli endüstriyel metal ve özel tasarım çözümleri.`;

        // Effective Title / Description
        const title = pageConfig?.seoTitle || defaultTitle;
        const description = pageConfig?.seoDescription || defaultDesc;

        // Update Document Title
        document.title = title;

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

    }, [pathname, content])

    return null; // This component doesn't render anything
}
