"use client";

import { useEffect } from 'react';
import { useContentStore } from '@/store/useContentStore';

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
    const { fetchContent } = useContentStore();

    useEffect(() => {
        // Site yüklendiğinde en güncel içeriği Supabase'den çek
        fetchContent();
    }, [fetchContent]);

    return <>{children}</>;
};
