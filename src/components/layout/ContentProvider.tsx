"use client";

import { useEffect } from 'react';
import { useContentStore, SiteContent } from '@/store/useContentStore';

export const ContentProvider = ({
    children,
    initialContent
}: {
    children: React.ReactNode,
    initialContent?: Partial<SiteContent>
}) => {
    const { fetchContent, updateContent } = useContentStore();

    useEffect(() => {
        if (initialContent) {
            updateContent(initialContent);
        }
        // Site yüklendiğinde en güncel içeriği Supabase'den çek
        fetchContent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
};
