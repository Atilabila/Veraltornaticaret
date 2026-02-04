"use client";

import React, { useState } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { Type, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TypographyEditorProps {
    fieldId: string;
    label: string;
}

export const TypographyEditor: React.FC<TypographyEditorProps> = ({ fieldId, label }) => {
    const { content, updateTypography } = useContentStore();
    const [isOpen, setIsOpen] = useState(false);

    const styles = content.typographyOverrides?.[fieldId] || {};

    const handleChange = (key: string, value: any) => {
        updateTypography(fieldId, { [key]: value });
    };

    if (!isOpen) {
        return (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-2 py-1 text-[9px] font-black uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500 hover:text-white transition-all flex items-center gap-1"
                title="Font boyutu, renk ve stil ayarla"
            >
                <Type className="w-3 h-3" />
                Deneme
            </button>
        );
    }

    return (
        <div className="bg-slate-800/50 border border-orange-500/30 rounded-lg p-4 space-y-3 mt-2">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-orange-500 uppercase">{label} - Tipografi Ayarları</span>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-[10px]">Font Boyutu</Label>
                    <Input
                        type="text"
                        value={styles.fontSize || ''}
                        onChange={(e) => handleChange('fontSize', e.target.value)}
                        placeholder="16px"
                        className="h-8 text-xs"
                    />
                </div>

                <div className="space-y-1">
                    <Label className="text-[10px]">Renk (HEX)</Label>
                    <div className="flex gap-1">
                        <input
                            type="color"
                            value={styles.color || '#000000'}
                            onChange={(e) => handleChange('color', e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer"
                        />
                        <Input
                            type="text"
                            value={styles.color || ''}
                            onChange={(e) => handleChange('color', e.target.value)}
                            placeholder="#000000"
                            className="h-8 text-xs flex-1"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <Label className="text-[10px]">Kalınlık (Weight)</Label>
                    <select
                        value={styles.fontWeight || ''}
                        onChange={(e) => handleChange('fontWeight', e.target.value)}
                        className="w-full h-8 bg-slate-900 border border-slate-700 rounded px-2 text-xs"
                    >
                        <option value="">Varsayılan</option>
                        <option value="300">Light (300)</option>
                        <option value="400">Normal (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="600">Semibold (600)</option>
                        <option value="700">Bold (700)</option>
                        <option value="800">Extrabold (800)</option>
                        <option value="900">Black (900)</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <Label className="text-[10px]">Stil</Label>
                    <select
                        value={styles.fontStyle || ''}
                        onChange={(e) => handleChange('fontStyle', e.target.value)}
                        className="w-full h-8 bg-slate-900 border border-slate-700 rounded px-2 text-xs"
                    >
                        <option value="">Normal</option>
                        <option value="italic">Italic</option>
                    </select>
                </div>
            </div>

            <button
                onClick={() => {
                    updateTypography(fieldId, {
                        fontSize: undefined,
                        fontWeight: undefined,
                        color: undefined,
                        fontStyle: undefined
                    });
                }}
                className="w-full py-1.5 text-[10px] font-bold uppercase bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
            >
                Sıfırla
            </button>
        </div>
    );
};
