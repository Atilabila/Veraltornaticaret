"use client"

import React from 'react';
import { useContentStore } from '@/store/useContentStore';
import { useThemeDetection } from '@/hooks/useThemeDetection';
import { cn } from '@/lib/utils';

export const GlobalGrid = () => {
    const { content } = useContentStore();
    const { isDarkPage, gridOverride } = useThemeDetection();
    const config = content.globalGridConfig;

    const isGridEnabled = gridOverride === 'inherit' ? config?.enabled : gridOverride === 'on';

    if (!isGridEnabled) return null;

    const opacity = isDarkPage ? config.intensityDark : config.intensityLight;
    // For visual debugging of grid color
    const gridColor = isDarkPage ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
    const ambientColor = isDarkPage ? 'rgba(212, 175, 55, 0.03)' : 'rgba(212, 175, 55, 0.02)';

    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
            style={{
                zIndex: -1,
            }}
        >
            {/* Ambient Background Base */}
            <div className={cn(
                "absolute inset-0 transition-colors duration-1000",
                isDarkPage ? "bg-[#0A0A0A]" : "bg-[#F8F8F8]"
            )} />

            {/* Premium Ambient Lights */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, ${ambientColor} 0%, transparent 70%),
                        radial-gradient(circle at 80% 70%, ${ambientColor} 0%, transparent 70%),
                        radial-gradient(circle at 50% 50%, ${isDarkPage ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'} 0%, transparent 100%)
                    `
                }}
            />

            {/* Grid Layer */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    opacity: opacity / 100
                }}
            >
                {config.style === 'lines' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />
                )}

                {config.style === 'dots' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(${gridColor} 1px, transparent 1px)`,
                            backgroundSize: '24px 24px',
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

            {/* Vignette Overlay for Depth */}
            <div
                className="absolute inset-0"
                style={{
                    background: isDarkPage
                        ? 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
                        : 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.03) 100%)'
                }}
            />
        </div>
    );
};
