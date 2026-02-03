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

    // Increased opacity for better visibility
    const opacity = isDarkPage ? (config.intensityDark * 1.5) : (config.intensityLight * 1.5);

    // More visible grid colors
    const gridColor = isDarkPage ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)';
    const ambientColor = isDarkPage ? 'rgba(212, 175, 55, 0.05)' : 'rgba(212, 175, 55, 0.03)';

    return (
        <div
            className="fixed inset-0 pointer-events-none select-none overflow-hidden"
            style={{
                zIndex: 0, // Changed from -1 to 0 to appear above background but below content
            }}
        >
            {/* Ambient Background Base */}
            <div className={cn(
                "absolute inset-0 transition-colors duration-1000",
                isDarkPage ? "bg-[#0A0A0A]" : "bg-[#F8F8F8]"
            )} style={{ zIndex: 1 }} />

            {/* Premium Ambient Lights */}
            <div
                className="absolute inset-0 opacity-100"
                style={{
                    zIndex: 2,
                    background: `
                        radial-gradient(circle at 20% 30%, ${ambientColor} 0%, transparent 70%),
                        radial-gradient(circle at 80% 70%, ${ambientColor} 0%, transparent 70%),
                        radial-gradient(circle at 50% 50%, ${isDarkPage ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'} 0%, transparent 100%)
                    `
                }}
            />

            {/* Grid Layer - Now more visible */}
            <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                    zIndex: 3,
                    opacity: Math.min(opacity / 100, 0.6) // Cap at 60% opacity
                }}
            >
                {config.style === 'lines' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(to right, ${gridColor} 1.5px, transparent 1.5px), linear-gradient(to bottom, ${gridColor} 1.5px, transparent 1.5px)`,
                            backgroundSize: '32px 32px', // Smaller grid for more visibility
                        }}
                    />
                )}

                {config.style === 'dots' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(${gridColor} 2px, transparent 2px)`,
                            backgroundSize: '20px 20px', // Smaller spacing
                        }}
                    />
                )}

                {config.style === 'squares' && (
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
                            backgroundSize: '16px 16px', // Smaller squares
                        }}
                    />
                )}
            </div>

            {/* Vignette Overlay for Depth */}
            <div
                className="absolute inset-0"
                style={{
                    zIndex: 4,
                    background: isDarkPage
                        ? 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
                        : 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.02) 100%)'
                }}
            />
        </div>
    );
};
