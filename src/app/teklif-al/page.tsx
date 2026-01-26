"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useQuoteStore, ServiceType } from '@/store/useQuoteStore';
import { SERVICES } from '@/data/services';

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
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Pre-select service if coming from service detail page
    useEffect(() => {
        const serviceParam = searchParams.get('service');
        if (serviceParam) {
            setServiceType(serviceParam as ServiceType);
        }
    }, [searchParams]);

    // File upload handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).slice(0, 5); // Max 5 files
            setFiles(prev => [...prev, ...newFiles].slice(0, 5));
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Validation
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!fullName.trim()) newErrors.fullName = 'Ad Soyad gerekli';
        if (!email.trim()) newErrors.email = 'E-posta gerekli';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Geçerli bir e-posta girin';
        if (!phone.trim()) newErrors.phone = 'Telefon gerekli';
        if (!description.trim()) newErrors.description = 'Proje açıklaması gerekli';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Convert files to base64 for localStorage (MP-07 scope only)
            const fileData = await Promise.all(
                files.map(async (file) => {
                    const reader = new FileReader();
                    return new Promise<{ name: string; size: number; type: string; dataUrl?: string }>((resolve) => {
                        reader.onloadend = () => {
                            resolve({
                                name: file.name,
                                size: file.size,
                                type: file.type,
                                dataUrl: reader.result as string,
                            });
                        };
                        reader.readAsDataURL(file);
                    });
                })
            );

            const quote = createQuote({
                fullName,
                company,
                email,
                phone,
                serviceType,
                description,
                files: fileData,
            });

            // Redirect to success page
            router.push(`/teklif-al/basarili?ref=${quote.referenceNumber}`);
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                    >
                                        {SERVICES.map((service) => (
                                            <option key={service.id} value={service.slug}>
                                                {service.name}
                                            </option>
                                        ))}
                                        <option value="diger">Diğer</option>
                                    </select>
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

                                <div>
                                    <label htmlFor="files" className="block font-mono font-bold text-sm mb-2">
                                        TEKNİK ÇİZİM / FOTOĞRAF (Maks. 5 dosya)
                                    </label>
                                    <input
                                        type="file"
                                        id="files"
                                        multiple
                                        accept=".pdf,.jpg,.jpeg,.png,.dwg"
                                        onChange={handleFileChange}
                                        className="w-full border-4 border-black p-3 font-mono focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-safety-orange)]"
                                    />
                                    <p className="text-xs font-mono mt-2 text-black/60">
                                        PDF, JPG, PNG, DWG formatları desteklenir. Teknik çizimleriniz gizli tutulur.
                                    </p>

                                    {files.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-black/5 p-2 font-mono text-xs">
                                                    <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="text-red-500 hover:text-red-700 font-bold"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
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
                            {isSubmitting ? 'GÖNDERİLİYOR...' : 'TEKLİF TALEBİ GÖNDER →'}
                        </button>

                        <p className="text-center font-mono text-xs text-black/60">
                            Formu göndererek <Link href="/gizlilik" className="underline">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
}
