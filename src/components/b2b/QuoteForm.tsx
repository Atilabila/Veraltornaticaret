'use client';

// MP-07: Quote Request Form

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FileUpload from './FileUpload';
import { QuoteRequest, QuoteDraft } from '@/lib/b2b/types';
import { saveQuote, saveDraft, getDraft, clearDraft } from '@/lib/b2b/storage';
import { generateQuoteReference } from '@/lib/b2b/reference';
import { getAllServices } from '@/lib/b2b/services';

export default function QuoteForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preSelectedService = searchParams.get('service');

    const [formData, setFormData] = useState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        serviceType: preSelectedService || '',
        description: ''
    });

    const [fileMetadata, setFileMetadata] = useState<{
        fileName: string;
        fileSize: number;
        fileType: string;
    } | null>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load draft on mount
    useEffect(() => {
        const draft = getDraft();
        if (draft && !preSelectedService) {
            setFormData({
                fullName: draft.fullName || '',
                company: draft.company || '',
                email: draft.email || '',
                phone: draft.phone || '',
                serviceType: draft.serviceType || '',
                description: draft.description || ''
            });
            if (draft.fileMetadata) {
                setFileMetadata(draft.fileMetadata);
            }
        }
    }, [preSelectedService]);

    // Auto-save draft on form change
    useEffect(() => {
        const timer = setTimeout(() => {
            const draft: QuoteDraft = {
                ...formData,
                fileMetadata: fileMetadata || undefined,
                lastUpdated: new Date().toISOString()
            };
            saveDraft(draft);
        }, 1000);

        return () => clearTimeout(timer);
    }, [formData, fileMetadata]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Ad Soyad gereklidir';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'E-posta gereklidir';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Geçerli bir e-posta adresi girin';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Telefon gereklidir';
        } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Geçerli bir telefon numarası girin';
        }

        if (!formData.serviceType) {
            newErrors.serviceType = 'Hizmet türü seçiniz';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Proje açıklaması gereklidir';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            // Scroll to first error
            const firstErrorField = Object.keys(errors)[0];
            document.getElementById(firstErrorField)?.focus();
            return;
        }

        setIsSubmitting(true);

        try {
            // Generate reference number
            const reference = generateQuoteReference();

            // Create quote request
            const quote: QuoteRequest = {
                id: reference,
                fullName: formData.fullName.trim(),
                company: formData.company.trim() || undefined,
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                serviceType: formData.serviceType,
                description: formData.description.trim(),
                fileMetadata: fileMetadata || undefined,
                createdAt: new Date().toISOString(),
                status: 'pending'
            };

            // Save to localStorage
            saveQuote(quote);

            // Clear draft
            clearDraft();

            // Navigate to success page with reference
            router.push(`/teklif-al/basarili?ref=${reference}`);
        } catch (error) {
            console.error('Quote submission error:', error);
            alert('Teklif gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
            setIsSubmitting(false);
        }
    };

    const services = getAllServices();
    const isServiceLocked = !!preSelectedService;

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            {/* Full Name */}
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-neutral-900 mb-2">
                    Ad Soyad <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 ${errors.fullName ? 'border-red-500' : 'border-neutral-300'
                        }`}
                    placeholder="Adınız ve soyadınız"
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
            </div>

            {/* Company (Optional) */}
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-900 mb-2">
                    Firma Adı
                </label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    placeholder="Firma adınız (opsiyonel)"
                />
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-900 mb-2">
                    E-posta <span className="text-red-600">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 ${errors.email ? 'border-red-500' : 'border-neutral-300'
                        }`}
                    placeholder="ornek@firma.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-900 mb-2">
                    Telefon <span className="text-red-600">*</span>
                </label>
                <input
                    type="tel"
                    inputMode="numeric"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 ${errors.phone ? 'border-red-500' : 'border-neutral-300'
                        }`}
                    placeholder="0532 123 45 67"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Service Type */}
            <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-neutral-900 mb-2">
                    Hizmet Türü <span className="text-red-600">*</span>
                </label>
                <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    disabled={isServiceLocked}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 ${errors.serviceType ? 'border-red-500' : 'border-neutral-300'
                        } ${isServiceLocked ? 'bg-neutral-100 cursor-not-allowed' : ''}`}
                >
                    <option value="">Hizmet seçiniz</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.title}
                        </option>
                    ))}
                </select>
                {errors.serviceType && <p className="mt-1 text-sm text-red-600">{errors.serviceType}</p>}
                {isServiceLocked && (
                    <p className="mt-1 text-xs text-neutral-500">
                        Hizmet türü sayfadan otomatik seçildi
                    </p>
                )}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-neutral-900 mb-2">
                    Proje Açıklaması <span className="text-red-600">*</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none ${errors.description ? 'border-red-500' : 'border-neutral-300'
                        }`}
                    placeholder="Projeniz hakkında detaylı bilgi verin: miktar, malzeme, toleranslar, teslimat süresi vb."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* File Upload */}
            <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Teknik Çizim / Dosya
                </label>
                <FileUpload onFileSelect={setFileMetadata} currentFile={fileMetadata} />
            </div>

            {/* Trust Message */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                <p className="text-sm text-neutral-700">
                    Bilgileriniz üçüncü kişilerle paylaşılmaz.
                </p>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-neutral-900 text-white font-medium py-4 rounded-lg hover:bg-neutral-800 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Gönderiliyor...' : 'TEKLİF TALEBİ GÖNDER'}
            </button>
        </form>
    );
}
