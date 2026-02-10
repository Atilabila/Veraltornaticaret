"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";
import { m, AnimatePresence } from 'framer-motion';
import Image from "next/image";

interface CMSPreviewProps {
    /** Field label to show in tooltip */
    label: string;
    /** Preview image path */
    previewImage: string;
    /** Optional description of where this appears */
    description?: string;
    /** Position of the preview button */
    position?: "right" | "top";
}

/**
 * CMS Preview Component
 * Shows a small preview icon next to input fields that displays
 * a screenshot of where that content appears on the website
 */
export const CMSPreview = ({
    label,
    previewImage,
    description,
    position = "right"
}: CMSPreviewProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Preview Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="group relative inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-400 hover:text-[var(--color-brand-safety-orange)] transition-colors rounded-lg hover:bg-slate-800/50"
                title={`${label} önizlemesi`}
            >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Önizle</span>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 shadow-xl z-10">
                    Sitede nerede görünür?
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-900" />
                </div>
            </button>

            {/* Preview Modal */}
            <AnimatePresence>
                {isOpen && (
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setIsOpen(false)}
                    >
                        <m.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full bg-slate-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-900 to-slate-800">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-[var(--color-brand-safety-orange)]" />
                                        {label}
                                    </h3>
                                    {description && (
                                        <p className="text-sm text-slate-400 mt-1">{description}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Preview Image */}
                            <div className="p-8 bg-slate-950">
                                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-slate-900">
                                    <Image
                                        src={previewImage}
                                        alt={`${label} önizlemesi`}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>

                                {/* Info Badge */}
                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Bu alan sitede yukarıdaki gibi görünecektir
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-slate-900/50 border-t border-white/5 flex items-center justify-between">
                                <p className="text-xs text-slate-500 italic">
                                    💡 İpucu: Değişikliklerinizi kaydetmeyi unutmayın
                                </p>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 bg-[var(--color-brand-safety-orange)] hover:bg-orange-600 text-white rounded-lg font-medium text-sm transition-colors"
                                >
                                    Kapat
                                </button>
                            </div>
                        </m.div>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
};

/**
 * Inline Preview - Smaller version that shows preview on hover
 */
export const CMSInlinePreview = ({
    label,
    previewImage
}: Pick<CMSPreviewProps, "label" | "previewImage">) => {
    return (
        <div className="group relative inline-block">
            <button
                type="button"
                className="p-1 text-slate-500 hover:text-[var(--color-brand-safety-orange)] transition-colors"
            >
                <Eye className="w-4 h-4" />
            </button>

            {/* Hover Preview */}
            <div className="absolute left-full top-0 ml-2 w-80 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                <div className="bg-slate-900 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className="p-2 bg-slate-800 border-b border-white/5">
                        <p className="text-xs font-medium text-white">{label}</p>
                    </div>
                    <div className="p-2">
                        <Image
                            src={previewImage}
                            alt={label}
                            width={320}
                            height={180}
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
