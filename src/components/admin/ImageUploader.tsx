"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, Check, Loader2, Image as LucideImage } from 'lucide-react';
import { uploadImage } from '@/lib/supabase/storage.service';

interface ImageUploaderProps {
    currentImage?: string;
    onImageUploaded: (url: string) => void;
    folder?: string;
    label?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
    currentImage,
    onImageUploaded,
    folder = "uploads",
    label = "Görsel Yükle"
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError("Lütfen geçerli bir resim dosyası seçin (PNG, JPG, WEBP)");
            return;
        }

        setIsUploading(true);
        setError(null);

        try {
            const publicUrl = await uploadImage(file, folder);
            onImageUploaded(publicUrl);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "Yükleme başarısız oldu.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-400 mb-2">
                {label}
            </label>

            <div className="flex gap-6 items-start">
                <div
                    className={`relative flex-1 border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center gap-4 cursor-pointer
                        ${dragActive ? "border-[var(--color-brand-safety-orange)] bg-slate-800/80" : "border-slate-700 bg-slate-900/50 hover:bg-slate-800"}
                        ${error ? "border-red-500 bg-red-500/10" : ""}
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleChange}
                    />

                    {isUploading ? (
                        <>
                            <Loader2 className="w-10 h-10 text-[var(--color-brand-safety-orange)] animate-spin" />
                            <p className="text-slate-400 font-mono text-sm animate-pulse">YÜKLENİYOR...</p>
                        </>
                    ) : (
                        <>
                            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-[var(--color-brand-safety-orange)] transition-colors">
                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-white" />
                            </div>
                            <div className="text-center">
                                <p className="text-slate-300 font-bold mb-1">Tıkla veya Sürükle</p>
                                <p className="text-slate-500 text-xs">PNG, JPG, WEBP (Max 5MB)</p>
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="mt-2 text-red-500 text-xs font-bold bg-red-500/10 px-3 py-1 rounded-full">
                            ⚠️ {error}
                        </div>
                    )}
                </div>

                {/* Preview */}
                <div className="relative w-32 aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    {currentImage ? (
                        <img
                            src={currentImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                            <LucideImage className="w-8 h-8" />
                        </div>
                    )}
                </div>
            </div>

            {/* Direct URL Input fallback */}
            <div className="text-xs text-slate-600 font-mono">
                veya doğrudan URL girin:
                <input
                    type="text"
                    value={currentImage || ""}
                    onChange={(e) => onImageUploaded(e.target.value)}
                    className="ml-2 bg-transparent border-b border-slate-700 focus:border-[var(--color-brand-safety-orange)] outline-none w-64 text-slate-400"
                />
            </div>
        </div>
    );
};
