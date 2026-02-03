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

    // Grid will adapt to section backgrounds automatically
    const gridColorLight = 'rgba(0, 0, 0, 0.08)'; // For white backgrounds
    const gridColorDark = 'rgba(255, 255, 255, 0.08)'; // For black backgrounds

    return (
        <>
            {/* Grid for WHITE sections */}
            <div
                className="fixed inset-0 pointer-events-none select-none overflow-hidden"
                style={{ zIndex: 1 }}
            >
                {config.style === 'lines' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${gridColorLight} 1px, transparent 1px), linear-gradient(to bottom, ${gridColorLight} 1px, transparent 1px)`,
                            backgroundSize: '32px 32px',
                            opacity: config.intensityLight / 100,
                            mixBlendMode: 'multiply', // Blend with white backgrounds
                        }}
                    />
                )}

                {config.style === 'dots' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(${gridColorLight} 1.5px, transparent 1.5px)`,
                            backgroundSize: '20px 20px',
                            opacity: config.intensityLight / 100,
                            mixBlendMode: 'multiply',
                        }}
                    />
                )}

                {config.style === 'squares' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(${gridColorLight} 1px, transparent 1px), linear-gradient(90deg, ${gridColorLight} 1px, transparent 1px)`,
                            backgroundSize: '16px 16px',
                            opacity: config.intensityLight / 100,
                            mixBlendMode: 'multiply',
                        }}
                    />
                )}
            </div>

            {/* Grid for BLACK sections */}
            <div
                className="fixed inset-0 pointer-events-none select-none overflow-hidden"
                style={{ zIndex: 1 }}
            >
                {config.style === 'lines' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${gridColorDark} 1px, transparent 1px), linear-gradient(to bottom, ${gridColorDark} 1px, transparent 1px)`,
                            backgroundSize: '32px 32px',
                            opacity: config.intensityDark / 100,
                            mixBlendMode: 'screen', // Blend with black backgrounds
                        }}
                    />
                )}

                {config.style === 'dots' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(${gridColorDark} 1.5px, transparent 1.5px)`,
                            backgroundSize: '20px 20px',
                            opacity: config.intensityDark / 100,
                            mixBlendMode: 'screen',
                        }}
                    />
                )}

                {config.style === 'squares' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(${gridColorDark} 1px, transparent 1px), linear-gradient(90deg, ${gridColorDark} 1px, transparent 1px)`,
                            backgroundSize: '16px 16px',
                            opacity: config.intensityDark / 100,
                            mixBlendMode: 'screen',
                        }}
                    />
                )}
            </div>
        </>
    );
};
