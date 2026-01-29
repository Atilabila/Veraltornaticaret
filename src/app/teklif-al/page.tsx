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
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-[var(--color-brand-safety-orange)] selection:text-black pt-20 md:pt-24">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 pointer-events-none" />

            {/* Hero */}
            <section className="relative py-12 px-4 overflow-hidden border-b border-white/5">
                <div className="max-w-3xl mx-auto relative z-10">
                    <Link
                        href="/hizmetler"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-6 text-white/40 hover:text-[var(--color-brand-safety-orange)] transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Geri: Hizmetler
                    </Link>

                    <h1 className="font-[Archivo_Black] text-4xl md:text-6xl uppercase mb-6 tracking-tighter italic">
                        TEKLİF <span className="text-[var(--color-brand-safety-orange)]">FORMU</span>
                    </h1>
                    <div className="p-4 bg-[var(--color-brand-safety-orange)]/10 border-l-4 border-[var(--color-brand-safety-orange)]">
                        <p className="font-mono text-sm text-[var(--color-brand-safety-orange)] font-bold">
                            Endüstriyel metal işleme ve özel üretim talepleriniz için 24 saat içinde detaylı teknik dönüş yapıyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="relative py-16 px-4">
                <div className="max-w-3xl mx-auto relative z-10">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Personal Info */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-black font-mono">01</span>
                                <h2 className="font-[Archivo_Black] text-xl uppercase tracking-wider">
                                    İLETİŞİM BİLGİLERİ
                                </h2>
                                <div className="flex-1 h-px bg-white/5" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="block font-mono font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">
                                        AD SOYAD *
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className={`w-full bg-white/5 border-2 ${errors.fullName ? 'border-red-500/50' : 'border-white/10'} p-4 font-mono text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)] transition-all placeholder:text-white/10`}
                                        placeholder="Ahmet Yılmaz"
                                    />
                                    {errors.fullName && <p className="text-red-500 font-mono text-[10px] mt-1 uppercase font-bold">{errors.fullName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="company" className="block font-mono font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">
                                        FİRMA ADI (Opsiyonel)
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="w-full bg-white/5 border-2 border-white/10 p-4 font-mono text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)] transition-all placeholder:text-white/10"
                                        placeholder="ABC Makine LTD."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block font-mono font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">
                                        E-POSTA *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full bg-white/5 border-2 ${errors.email ? 'border-red-500/50' : 'border-white/10'} p-4 font-mono text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)] transition-all placeholder:text-white/10`}
                                        placeholder="ahmet@firma.com"
                                    />
                                    {errors.email && <p className="text-red-500 font-mono text-[10px] mt-1 uppercase font-bold">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block font-mono font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">
                                        TELEFON *
                                    </label>
                                    <input
                                        type="tel"
                                        inputMode="numeric"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className={`w-full bg-white/5 border-2 ${errors.phone ? 'border-red-500/50' : 'border-white/10'} p-4 font-mono text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)] transition-all placeholder:text-white/10`}
                                        placeholder="0532 123 45 67"
                                    />
                                    {errors.phone && <p className="text-red-500 font-mono text-[10px] mt-1 uppercase font-bold">{errors.phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-black font-mono">02</span>
                                <h2 className="font-[Archivo_Black] text-xl uppercase tracking-wider">
                                    PROJE DETAYLARI
                                </h2>
                                <div className="flex-1 h-px bg-white/5" />
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <label htmlFor="serviceType" className="block font-mono font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">
                                        HİZMET TİPİ *
                                    </label>
                                    <select
                                        id="serviceType"
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value as ServiceType)}
                                        disabled={isServiceLocked}
                                        className={`w-full bg-slate-900 border-2 border-white/10 p-4 font-mono text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)] transition-all appearance-none ${isServiceLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {SERVICES.map((service) => (
                                            <option key={service.id} value={service.slug}>
                                                {service.name}
                                            </option>
                                        ))}
                                        <option value="diger">Diğer</option>
                                    </select>
                                    {isServiceLocked && (
                                        <p className="text-[10px] font-mono mt-2 text-[var(--color-brand-safety-orange)] uppercase font-bold">
                                            ✓ Hizmet türü seçili sayfadan otomatik kilitlendi
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="description" className="block font-mono font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">
                                        PROJE AÇIKLAMASI *
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={6}
                                        className={`w-full bg-white/5 border-2 ${errors.description ? 'border-red-500/50' : 'border-white/10'} p-4 font-mono text-sm focus:outline-none focus:border-[var(--color-brand-safety-orange)] transition-all resize-none placeholder:text-white/10`}
                                        placeholder="Malzeme tipi, boyutlar, miktar ve tolerans beklentilerinizi belirtiniz..."
                                    />
                                    {errors.description && <p className="text-red-500 font-mono text-[10px] mt-1 uppercase font-bold">{errors.description}</p>}
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <label htmlFor="file" className="block font-mono font-black text-[10px] uppercase tracking-widest text-white/40 mb-2">
                                        TEKNİK ÇİZİM / DOSYA EKLE
                                    </label>

                                    {!fileMetadata ? (
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                id="file"
                                                accept=".pdf,.jpg,.jpeg,.png,.dwg"
                                                onChange={handleFileChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="border-2 border-dashed border-white/10 p-8 text-center group-hover:border-[var(--color-brand-safety-orange)]/50 group-hover:bg-white/[0.02] transition-all">
                                                <div className="text-[var(--color-brand-safety-orange)] mb-2">↑</div>
                                                <p className="font-mono text-xs text-white/40 uppercase tracking-widest font-black">
                                                    Çizimlerinizi buraya bırakın veya tıklayın
                                                </p>
                                                <p className="text-[9px] font-mono mt-2 text-white/20 uppercase">
                                                    PDF, JPG, PNG, DWG (Max 5MB)
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`flex items-center justify-between p-4 bg-white/5 border-2 ${uploadStatus === 'error' ? 'border-red-500/50' : 'border-[var(--color-brand-safety-orange)]/30'}`}>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded font-mono text-[10px] font-bold">DOC</div>
                                                    <div>
                                                        <p className="font-mono text-xs font-bold truncate text-white">{fileMetadata.fileName}</p>
                                                        <p className="font-mono text-[10px] text-white/40 uppercase">
                                                            {(fileMetadata.fileSize / 1024).toFixed(1)} KB — {uploadStatus === 'success' ? 'YÜKLENDİ' : uploadStatus === 'uploading' ? 'YÜKLENİYOR...' : uploadStatus === 'error' ? 'HATA!' : 'HAZIR'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                disabled={isSubmitting}
                                                className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}

                                    {errors.file && <p className="text-red-500 font-mono text-[10px] mt-1 uppercase font-bold">{errors.file}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="space-y-8 pt-8 border-t border-white/5">
                            <div className="bg-slate-900 border border-white/5 p-6 flex gap-4 items-start">
                                <div className="text-[var(--color-brand-safety-orange)] text-lg">🛡</div>
                                <p className="font-mono text-[11px] text-white/40 uppercase leading-relaxed tracking-wider">
                                    Bilgileriniz ve teknik verileriniz endüstriyel gizlilik protokolü ile korunur. Formu göndererek hizmet şartlarımızı kabul etmiş sayılırsınız.
                                </p>
                            </div>

                            {errors.submit && (
                                <div className="bg-red-500/10 border-2 border-red-500/50 p-4 font-mono text-red-500 text-xs font-bold uppercase tracking-widest text-center">
                                    {errors.submit}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative w-full bg-[var(--color-brand-safety-orange)] text-black py-6 px-8 font-black text-xl uppercase tracking-tighter transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-4">
                                    {uploadStatus === 'uploading' ? 'DOSYA YÜKLENİYOR...' :
                                        isSubmitting ? 'İŞLENİYOR...' : 'SİSTEME GÖNDER'}
                                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20" />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
