"use client"

import React from 'react';
import { useContentStore } from '@/store/useContentStore';
import { useThemeDetection } from '@/hooks/useThemeDetection';

export const GlobalGrid = () => {
    const { content } = useContentStore();
    const { isDarkPage, gridOverride } = useThemeDetection();
    const config = content.globalGridConfig;

    const isGridEnabled = gridOverride === 'inherit' ? config?.enabled : gridOverride === 'on';

    if (!isGridEnabled) return null;

    // FORCE SQUARES PATTERN - Siyah kareler
    const gridColorLight = 'rgba(0, 0, 0, 0.15)'; // Beyaz arka planlarda siyah grid - Daha belirgin
    const gridColorDark = 'rgba(255, 255, 255, 0.15)'; // Siyah arka planlarda beyaz grid - Daha belirgin

    return (
        <>
            {/* Grid for WHITE sections - BLACK SQUARES */}
            <div
                className="fixed inset-0 pointer-events-none select-none overflow-hidden"
                style={{ zIndex: 50 }} // Sitting right above the background
            >
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(${gridColorLight} 1px, transparent 1px),
                            linear-gradient(90deg, ${gridColorLight} 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px', // Daha büyük, belirgin kareler
                        opacity: 1,
                        mixBlendMode: 'multiply',
                    }}
                />
            </div>

            {/* Grid for BLACK sections - WHITE SQUARES */}
            <div
                className="fixed inset-0 pointer-events-none select-none overflow-hidden"
                style={{ zIndex: 50 }} // Sitting right above the background
            >
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(${gridColorDark} 1px, transparent 1px),
                            linear-gradient(90deg, ${gridColorDark} 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px', // Daha büyük, belirgin kareler
                        opacity: 1,
                        mixBlendMode: 'screen',
                    }}
                />
            </div>
        </>
    );
};
