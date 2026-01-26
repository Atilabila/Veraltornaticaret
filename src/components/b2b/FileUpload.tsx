'use client';

// MP-07: File Upload Component (Metadata Only)

import { useState, useRef } from 'react';

interface FileMetadata {
    fileName: string;
    fileSize: number;
    fileType: string;
}

interface FileUploadProps {
    onFileSelect: (metadata: FileMetadata | null) => void;
    currentFile?: FileMetadata | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/dwg',
    'application/acad',
    'application/x-acad',
    'application/x-dwg'
];

export default function FileUpload({ onFileSelect, currentFile }: FileUploadProps) {
    const [error, setError] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setError('');

        if (!file) {
            onFileSelect(null);
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setError('Dosya boyutu 5MB\'dan büyük olamaz');
            onFileSelect(null);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        // Validate file type
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const isValidType = ALLOWED_TYPES.includes(file.type) ||
            ['pdf', 'jpg', 'jpeg', 'png', 'dwg'].includes(fileExtension || '');

        if (!isValidType) {
            setError('Sadece PDF, JPG, PNG ve DWG dosyaları kabul edilir');
            onFileSelect(null);
            if (inputRef.current) inputRef.current.value = '';
            return;
        }

        // Store metadata only (NO base64)
        const metadata: FileMetadata = {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type || `application/${fileExtension}`
        };

        onFileSelect(metadata);
    };

    const handleRemove = () => {
        onFileSelect(null);
        setError('');
        if (inputRef.current) inputRef.current.value = '';
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="space-y-3">
            {/* File Input */}
            {!currentFile && (
                <div>
                    <label
                        htmlFor="file-upload"
                        className="block w-full cursor-pointer"
                    >
                        <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-neutral-900 transition-colors">
                            <svg
                                className="mx-auto h-12 w-12 text-neutral-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="mt-2 text-sm font-medium text-neutral-900">
                                Dosya Seç
                            </p>
                            <p className="mt-1 text-xs text-neutral-500">
                                PDF, JPG, PNG, DWG (Max 5MB)
                            </p>
                        </div>
                    </label>
                    <input
                        ref={inputRef}
                        id="file-upload"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.dwg"
                        onChange={handleFileChange}
                        className="sr-only"
                    />
                </div>
            )}

            {/* Selected File Display */}
            {currentFile && (
                <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <svg
                            className="w-8 h-8 text-neutral-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                                {currentFile.fileName}
                            </p>
                            <p className="text-xs text-neutral-500">
                                {formatFileSize(currentFile.fileSize)}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="ml-3 text-neutral-400 hover:text-red-600 transition-colors flex-shrink-0"
                        aria-label="Dosyayı kaldır"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

            {/* Trust Message */}
            <p className="text-xs text-neutral-500 leading-relaxed">
                Teknik çizimleriniz gizlidir. Dosyalar yalnızca teklif değerlendirmesi için kullanılır.
            </p>

            {/* MP-07 Info */}
            {currentFile && (
                <p className="text-xs text-neutral-600 bg-blue-50 border border-blue-200 rounded p-2">
                    Dosya bilgisi kaydedildi. Dosyanız teklif sırasında ekibimizle güvenli şekilde paylaşılacaktır.
                </p>
            )}
        </div>
    );
}
