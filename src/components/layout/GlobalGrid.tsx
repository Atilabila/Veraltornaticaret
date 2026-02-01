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

    const opacity = isDarkPage ? config.intensityDark : config.intensityLight;
    // For visual debugging of grid color
    const gridColor = isDarkPage ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)';

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none select-none"
            style={{
                zIndex: -1,
                opacity: opacity / 100
            }}
        >
            {config.style === 'lines' && (
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
                    }}
                />
            )}

            {config.style === 'dots' && (
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(${gridColor} 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                        maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                    }}
                />
            )}

            {config.style === 'squares' && (
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `linear-gradient(${gridColor} 0.5px, transparent 0.5px), linear-gradient(90deg, ${gridColor} 0.5px, transparent 0.5px)`,
                        backgroundSize: '20px 20px',
                    }}
                />
            )}
        </div>
    );
};
