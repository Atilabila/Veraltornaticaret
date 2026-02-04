"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useAdminStore } from '@/store/useAdminStore';
import { useContentStore } from '@/store/useContentStore';
import { Minus, Plus, Bold, Italic, Palette, RefreshCcw } from 'lucide-react';

interface TextInspectorProps {
    children: React.ReactElement;
    label: string; // Now mandatory for persistent styles
}

export const TextInspector: React.FC<TextInspectorProps> = ({ children, label }) => {
    const { isAdmin, debugMode } = useAdminStore();
    const { content, updateTypography } = useContentStore();
    const containerRef = useRef<HTMLDivElement>(null);

    // Get live computed styles for the HUD
    const [computed, setComputed] = useState<{
        fontSize: string;
        fontWeight: string;
        color: string;
        fontFamily: string;
        lineHeight: string;
        fontStyle: string;
    } | null>(null);

    // Get persisted overrides from store
    const overrides = content.typographyOverrides?.[label] || {};

    useEffect(() => {
        if (!isAdmin || !debugMode) return;

        const updateComputed = () => {
            if (containerRef.current) {
                const target = containerRef.current.firstElementChild;
                if (target) {
                    const comp = window.getComputedStyle(target);
                    const rgb = comp.color.match(/\d+/g);
                    const hex = rgb ? `#${rgb.map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}` : comp.color;

                    setComputed({
                        fontSize: comp.fontSize,
                        fontWeight: comp.fontWeight,
                        color: hex.toUpperCase(),
                        fontFamily: comp.fontFamily.split(',')[0].replace(/"/g, ''),
                        lineHeight: comp.lineHeight !== 'normal' ? comp.lineHeight : 'Normal',
                        fontStyle: comp.fontStyle,
                    });
                }
            }
        };

        updateComputed();
        window.addEventListener('resize', updateComputed);
        const timer = setTimeout(updateComputed, 100);
        return () => {
            window.removeEventListener('resize', updateComputed);
            clearTimeout(timer);
        };
    }, [isAdmin, debugMode, children, overrides]);

    // Apply overrides to the child element
    const styledChild = React.cloneElement(children as React.ReactElement<any>, {
        style: {
            ...(children as React.ReactElement<any>).props.style,
            ...overrides,
            // Small hack to ensure transition when editing
            transition: 'all 0.2s ease-out',
        }
    });

    if (!isAdmin || !debugMode) return styledChild;

    const changeSize = (delta: number) => {
        const currentSize = parseInt(computed?.fontSize || '16');
        updateTypography(label, { fontSize: `${currentSize + delta}px` });
    };

    const toggleBold = () => {
        const isBold = computed?.fontWeight === '800' || computed?.fontWeight === '900' || computed?.fontWeight === 'bold';
        updateTypography(label, { fontWeight: isBold ? '400' : '900' });
    };

    const toggleItalic = () => {
        const isItalic = computed?.fontStyle === 'italic';
        updateTypography(label, { fontStyle: isItalic ? 'normal' : 'italic' });
    };

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTypography(label, { color: e.target.value });
    };

    const resetStyles = () => {
        updateTypography(label, {
            fontSize: undefined,
            fontWeight: undefined,
            color: undefined,
            fontStyle: undefined,
            lineHeight: undefined
        });
    };

    return (
        <div ref={containerRef} className="relative group/inspector inline-block w-full">
            {styledChild}

            {/* Visual Editor HUD */}
            <div className="absolute -top-10 left-0 right-0 pointer-events-auto z-[100] flex flex-wrap gap-1 items-center animate-in fade-in slide-in-from-bottom-2">

                {/* ID Tag */}
                <div className="px-2 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest mr-1">
                    {label}
                </div>

                {/* Size Controls */}
                <div className="flex items-center bg-white border border-black/10 shadow-sm">
                    <button onClick={() => changeSize(-2)} className="p-1 hover:bg-gray-100 text-black border-r border-black/5"><Minus className="w-3 h-3" /></button>
                    <span className="px-2 text-[10px] font-bold font-mono">{computed?.fontSize}</span>
                    <button onClick={() => changeSize(2)} className="p-1 hover:bg-gray-100 text-black border-l border-black/5"><Plus className="w-3 h-3" /></button>
                </div>

                {/* Style Toggles */}
                <div className="flex items-center bg-white border border-black/10 shadow-sm">
                    <button
                        onClick={toggleBold}
                        className={`p-1.5 border-r border-black/5 transition-colors ${overrides.fontWeight ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-black'}`}
                    >
                        <Bold className="w-3 h-3" />
                    </button>
                    <button
                        onClick={toggleItalic}
                        className={`p-1.5 border-r border-black/5 transition-colors ${overrides.fontStyle === 'italic' ? 'bg-orange-500 text-white' : 'hover:bg-gray-100 text-black'}`}
                    >
                        <Italic className="w-3 h-3" />
                    </button>
                    <div className="relative p-1.5 hover:bg-gray-100 text-black flex items-center justify-center">
                        <Palette className="w-3 h-3" />
                        <input
                            type="color"
                            onChange={changeColor}
                            value={computed?.color || '#000000'}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Reset Button */}
                <button
                    onClick={resetStyles}
                    className="p-1.5 bg-white border border-black/10 shadow-sm hover:bg-red-50 text-red-500 transition-colors"
                >
                    <RefreshCcw className="w-3 h-3" />
                </button>
            </div>

            {/* Outline when HUD is active */}
            <div className="absolute inset-x-[-4px] inset-y-[-4px] border border-orange-500/30 pointer-events-none" />
        </div>
    );
};
