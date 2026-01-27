// MP-07: Quote Request Form Page

"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useQuoteStore, ServiceType } from '@/store/useQuoteStore';
import { SERVICES } from '@/data/services';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'dwg'];

export default function TeklifAlPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { createQuote } = useQuoteStore();

    // Form state
    const [fullName, setFullName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [serviceType, setServiceType] = useState<ServiceType>('diger');
    const [description, setDescription] = useState('');
    const [fileMetadata, setFileMetadata] = useState<{
        fileName: string;
        fileSize: number;
        fileType: string;
    } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Pre-select service if coming from service detail page (READ-ONLY)
    const preSelectedService = searchParams.get('service');
    const isServiceLocked = !!preSelectedService;

    useEffect(() => {
        if (preSelectedService) {
            setServiceType(preSelectedService as ServiceType);
        }
    }, [preSelectedService]);

    // Load draft from localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const draft = localStorage.getItem('metal-poster-quote-draft');
            if (draft && !preSelectedService) {
                const parsed = JSON.parse(draft);
                setFullName(parsed.fullName || '');
                setCompany(parsed.company || '');
                setEmail(parsed.email || '');
                setPhone(parsed.phone || '');
                setServiceType(parsed.serviceType || 'diger');
                setDescription(parsed.description || '');
                if (parsed.fileMetadata) {
                    setFileMetadata(parsed.fileMetadata);
                }
            }
        } catch (error) {
            console.error('Failed to load draft:', error);
        }
    }, [preSelectedService]);

    // Auto-save draft
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window === 'undefined') return;

            const draft = {
                fullName,
                company,
                email,
                phone,
                serviceType,
                description,
                fileMetadata,
                lastUpdated: new Date().toISOString()
            };

            try {
                localStorage.setItem('metal-poster-quote-draft', JSON.stringify(draft));
            } catch (error) {
                console.error('Failed to save draft:', error);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [fullName, company, email, phone, serviceType, description, fileMetadata]);

    // File upload handler (MP-07: Metadata only, NO base64)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            setFileMetadata(null);
            return;
        }

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            setErrors(prev => ({ ...prev, file: 'Dosya boyutu 5MB\'dan büyük olamaz' }));
            setFileMetadata(null);
            return;
        }

        // Validate file type
        const extension = file.name.split('.').pop()?.toLowerCase();
        if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
            setErrors(prev => ({ ...prev, file: 'Sadece PDF, JPG, PNG ve DWG dosyaları kabul edilir' }));
            setFileMetadata(null);
            return;
        }

        // Store metadata only (NO base64)
        setFileMetadata({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type || `application/${extension}`
        });

        setErrors(prev => ({ ...prev, file: '' }));
    };

    const removeFile = () => {
        setFileMetadata(null);
    };

    // Validation
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!fullName.trim()) newErrors.fullName = 'Ad Soyad gerekli';
        if (!email.trim()) newErrors.email = 'E-posta gerekli';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Geçerli bir e-posta girin';
        if (!phone.trim()) newErrors.phone = 'Telefon gerekli';
        else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(phone)) newErrors.phone = 'Geçerli bir telefon numarası girin';
        if (!description.trim()) newErrors.description = 'Proje açıklaması gerekli';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);
        setUploadStatus('idle');

        let uploadSuccess = true; // Declare uploadSuccess here

        try {
            // 1. Create quote in local state + trigger silent sync
            const quote = createQuote({
                fullName: fullName.trim(),
                company: company.trim() || undefined,
                email: email.trim(),
                phone: phone.trim(),
                serviceType,
                description: description.trim(),
                fileMetadata: fileMetadata || undefined,
            });

            // 2. Clear draft
            if (typeof window !== 'undefined') {
                localStorage.removeItem('metal-poster-quote-draft');
            }

            // 3. Handle Actual File Upload (MP-09)
            const fileInput = document.getElementById('file') as HTMLInputElement;
            const file = fileInput?.files?.[0];

            if (file && fileMetadata) {
                setUploadStatus('uploading');

                const { uploadQuoteAttachment, recordQuoteAttachment } = await import('@/lib/supabase/storage');

                const uploadResult = await uploadQuoteAttachment(quote.referenceNumber, file);

                if (uploadResult.success && uploadResult.path) {
                    const recordRes = await recordQuoteAttachment({
                        quoteReference: quote.referenceNumber,
                        filePath: uploadResult.path,
                        fileName: file.name,
                        fileType: file.type || 'application/octet-stream',
                        fileSize: file.size
                    });

                    if (recordRes) {
                        setUploadStatus('success');
                    } else {
                        setUploadStatus('error');
                        uploadSuccess = false;
                    }
                } else {
                    setUploadStatus('error');
                    uploadSuccess = false;
                }
            }

            // Redirect to success page
            router.push(`/teklif-al/basarili?ref=${quote.referenceNumber}${file ? `&upload=${uploadSuccess ? 'ok' : 'fail'}` : ''}`);
        } catch (error) {
            console.error('Quote submission error:', error);
            setErrors({ submit: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="bg-black text-white py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 font-mono text-sm mb-6 hover:text-[var(--color-brand-safety-orange)] transition-colors"
                    >
                        ← Hizmetler
                    </Link>

                    <h1 className="font-[Archivo_Black] text-3xl md:text-5xl uppercase mb-4">
                        TEKLİF FORMU
                    </h1>
                    <p className="font-mono text-white/80">
                        Projeniz için detaylı teklif almak üzere formu doldurun. 24 saat içinde dönüş yapıyoruz.
                    </p>
                </div>
            </section>

            {/* Form */}
            <section className="py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Info */}
                        <div className="border-4 border-black p-6">
                            <h2 className="font-[Archivo_Black] text-xl uppercase mb-6">
                                İLETİŞİM BİLGİLERİ
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block font-mono font-bold text-sm mb-2">
                                        AD SOYAD *
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className={`w-full border-4 ${errors.fullName ? 'border-red-500' : 'border-black'} p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]`}
                                        placeholder="Ahmet Yılmaz"
                                    />
                                    {errors.fullName && <p className="text-red-500 font-mono text-xs mt-1">{errors.fullName}</p>}
                                </div>

                                <div>
                                    <label htmlFor="company" className="block font-mono font-bold text-sm mb-2">
                                        FİRMA ADI (Opsiyonel)
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                        placeholder="ABC Makine San. Tic. Ltd. Şti."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block font-mono font-bold text-sm mb-2">
                                        E-POSTA *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full border-4 ${errors.email ? 'border-red-500' : 'border-black'} p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]`}
                                        placeholder="ahmet@firma.com"
                                    />
                                    {errors.email && <p className="text-red-500 font-mono text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block font-mono font-bold text-sm mb-2">
                                        TELEFON *
                                    </label>
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={`w-full border-4 ${errors.phone ? 'border-red-500' : 'border-black'} p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]`}
                                        placeholder="0532 123 45 67"
                                    />
                                    {errors.phone && <p className="text-red-500 font-mono text-xs mt-1">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="border-4 border-black p-6">
                            <h2 className="font-[Archivo_Black] text-xl uppercase mb-6">
                                PROJE DETAYLARI
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="serviceType" className="block font-mono font-bold text-sm mb-2">
                                        HİZMET TİPİ *
                                    </label>
                                    <select
                                        id="serviceType"
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value as ServiceType)}
                                        disabled={isServiceLocked}
                                        className={`w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)] ${isServiceLocked ? 'bg-black/5 cursor-not-allowed' : ''}`}
                                    >
                                        {SERVICES.map((service) => (
                                            <option key={service.id} value={service.slug}>
                                                {service.name}
                                            </option>
                                        ))}
                                        <option value="diger">Diğer</option>
                                    </select>
                                    {isServiceLocked && (
                                        <p className="text-xs font-mono mt-1 text-black/60">
                                            Hizmet türü sayfadan otomatik seçildi
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="description" className="block font-mono font-bold text-sm mb-2">
                                        PROJE AÇIKLAMASI *
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={6}
                                        className={`w-full border-4 ${errors.description ? 'border-red-500' : 'border-black'} p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)] resize-none`}
                                        placeholder="Projenizi detaylı anlatın: malzeme, boyutlar, miktar, toleranslar..."
                                    />
                                    {errors.description && <p className="text-red-500 font-mono text-xs mt-1">{errors.description}</p>}
                                </div>

                                {/* MP-09: Single File Upload */}
                                <div>
                                    <label htmlFor="file" className="block font-mono font-bold text-sm mb-2">
                                        TEKNİK ÇİZİM / FOTOĞRAF
                                    </label>

                                    {!fileMetadata ? (
                                        <div>
                                            <input
                                                type="file"
                                                id="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.dwg"
                                                onChange={handleFileChange}
                                                className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                            />
                                            <p className="text-xs font-mono mt-2 text-black/60">
                                                PDF, JPG, PNG, DWG (Max 5MB). Teknik çizimleriniz gizlidir.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className={`flex items-center justify-between p-4 border-4 border-black ${uploadStatus === 'error' ? 'bg-red-50' : 'bg-black/5'}`}>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-mono text-sm font-bold truncate">{fileMetadata.fileName}</p>
                                                    {uploadStatus === 'success' && <span className="text-green-500 text-xs font-bold text-[10px] uppercase">YÜKLENDİ</span>}
                                                    {uploadStatus === 'uploading' && <span className="text-blue-500 text-xs font-bold animate-pulse text-[10px] uppercase">YÜKLENİYOR...</span>}
                                                    {uploadStatus === 'error' && <span className="text-red-500 text-xs font-bold text-[10px] uppercase">HATA!</span>}
                                                </div>
                                                <p className="font-mono text-xs text-black/60">
                                                    {(fileMetadata.fileSize / 1024).toFixed(1)} KB
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                disabled={isSubmitting}
                                                className="ml-4 text-red-500 hover:text-red-700 font-bold"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}

                                    {errors.file && <p className="text-red-500 font-mono text-xs mt-1">{errors.file}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Trust Message */}
                        <div className="bg-black/5 border-2 border-black p-4">
                            <p className="font-mono text-sm text-black/80">
                                Bilgileriniz üçüncü kişilerle paylaşılmaz. Teknik verileriniz endüstriyel gizlilik protokolü ile korunur.
                            </p>
                        </div>

                        {/* Submit */}
                        {errors.submit && (
                            <div className="bg-red-100 border-4 border-red-500 p-4 font-mono text-red-700">
                                {errors.submit}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[var(--color-brand-safety-orange)] text-black py-4 px-6 font-mono font-black text-lg uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploadStatus === 'uploading' ? 'DOSYA YÜKLENİYOR...' :
                                isSubmitting ? 'İŞLENİYOR...' : 'TEKLİF TALEBİ GÖNDER →'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
