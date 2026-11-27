"use client";

import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
    User, Building2, Mail, Phone,
    Settings, MessageSquare, Layers,
    Upload, Trash2, CheckCircle, ArrowRight, ArrowLeft,
    Loader2
} from 'lucide-react';
import { useContentStore } from '@/store/useContentStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { submitQuote, uploadQuoteAttachment } from '@/lib/actions/quotes.actions';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { QUOTE_SERVICES, priceAskUrl } from '@/lib/public-copy';
import { PUBLIC_ADDRESS, PUBLIC_HOURS } from '@/lib/public-facts';
import { PUBLIC_PHONE_DISPLAY, toTelHref } from '@/lib/contact';

const inputClass =
    "bg-atl-bg border-atl-line pl-12 h-14 text-atl-text placeholder:text-atl-muted/60 focus:border-atl-brass focus:outline-none focus:ring-1 focus:ring-atl-brass aria-invalid:border-red-400 aria-invalid:ring-red-400 transition-all rounded-xl";
const labelClass = "text-xs font-mono font-semibold uppercase tracking-wider text-atl-muted";

export const QuoteForm = () => {
    const { content } = useContentStore();
    const config = content.quotePage;
    const searchParams = useSearchParams();

    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [quoteNumber, setQuoteNumber] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        serviceType: "",
        description: "",
        quantity: "",
        materialType: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [files, setFiles] = useState<{
        file: File;
        preview: string;
        isUploading: boolean;
        url?: string;
        path?: string;
    }[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const slug = searchParams.get('hizmet');
        if (!slug) return;
        const match = QUOTE_SERVICES.find((item) => item.slug === slug);
        if (!match) return;
        setFormData((prev) => (prev.serviceType ? prev : { ...prev, serviceType: match.label }));
    }, [searchParams]);

    if (!config) return null;

    const priceAskHref = priceAskUrl(formData.serviceType || "imalat");

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => {
            if (!prev[field]) return prev;
            const next = { ...prev };
            delete next[field];
            return next;
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);

        if (files.length + selectedFiles.length > config.maxFiles) {
            toast({
                title: "Hata",
                description: `Maksimum ${config.maxFiles} dosya yükleyebilirsiniz.`,
                variant: "destructive"
            });
            return;
        }

        const newFiles = selectedFiles.map(file => {
            if (file.size > config.maxSizeMB * 1024 * 1024) {
                toast({
                    title: "Hata",
                    description: `${file.name} çok büyük. Maksimum ${config.maxSizeMB}MB yükleyebilirsiniz.`,
                    variant: "destructive"
                });
                return null;
            }
            return {
                file,
                preview: URL.createObjectURL(file),
                isUploading: false
            };
        }).filter(Boolean) as typeof files;

        setFiles(prev => [...prev, ...newFiles]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const removeFile = (index: number) => {
        setFiles(prev => {
            const newFiles = [...prev];
            URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const validateStep = (current: number) => {
        const next: Record<string, string> = {};
        if (current === 1) {
            if (!formData.serviceType) next.serviceType = "Ürün seçin.";
            if (!formData.quantity.trim()) next.quantity = "Adet gerekli.";
        }
        if (current === 2) {
            if (!formData.fullName.trim()) next.fullName = "Ad soyad gerekli.";
            if (!formData.phone.trim()) next.phone = "Telefon gerekli.";
            if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
                next.email = "E-posta hatalı.";
            }
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const nextStep = () => {
        if (!validateStep(step)) return;
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        if (!validateStep(2)) return;
        setIsSubmitting(true);
        try {
            const uploadedFiles = [];
            for (const f of files) {
                const uploadData = new FormData();
                uploadData.append("file", f.file);

                const res = await uploadQuoteAttachment(uploadData);
                if (!res.success || !res.url) {
                    toast({
                        title: "Hata",
                        description: res.error || "Dosya yüklenemedi.",
                        variant: "destructive",
                    });
                    return;
                }

                uploadedFiles.push({
                    name: f.file.name,
                    type: f.file.type,
                    size: f.file.size,
                    url: res.url,
                    path: res.url.split("/").pop() || "",
                });
            }

            const result = await submitQuote({
                ...formData,
                email: formData.email.trim(),
                description: formData.description.trim() || `Adet: ${formData.quantity.trim()}`,
                files: uploadedFiles as any
            });

            if (result.success) {
                setQuoteNumber(result.quoteNumber || "");
                setIsSuccess(true);
            } else {
                toast({ title: "Hata", description: result.error, variant: "destructive" });
            }
        } catch {
            toast({ title: "Hata", description: "Bir hata oluştu.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-atl-surface border border-atl-line rounded-3xl p-10 md:p-14 text-center space-y-8 max-w-2xl mx-auto shadow-xl"
            >
                <div className="w-16 h-16 bg-emerald-950/40 text-emerald-300 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/30 shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-display text-atl-text tracking-tight">{config.successTitle}</h2>
                <p className="text-atl-muted text-base md:text-lg max-w-lg mx-auto leading-relaxed">Talebiniz alındı. Sizi ararız.</p>
                <div className="bg-atl-surface-2 border border-atl-line rounded-2xl p-6 max-w-xs mx-auto">
                    <span className="block text-xs text-atl-muted font-mono font-semibold uppercase tracking-wider mb-1">Teklif Takip Numarası</span>
                    <span className="text-2xl font-mono text-atl-brass font-black">{quoteNumber}</span>
                </div>
                <Button
                    onClick={() => window.location.href = "/"}
                    className="bg-atl-brass hover:bg-atl-brass-light text-atl-bg font-bold h-12 px-10 rounded-xl transition-all shadow-md shadow-black/20"
                >
                    Ana Sayfaya Dön
                </Button>
            </m.div>
        );
    }

    return (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8 bg-atl-surface border border-atl-line rounded-3xl overflow-hidden shadow-sm">
                <div className="h-1.5 w-full bg-atl-surface-2 flex">
                    {[1, 2].map(i => (
                        <div
                            key={i}
                            className={cn(
                                "flex-1 transition-all duration-500",
                                step >= i ? "bg-atl-brass" : "bg-transparent"
                            )}
                        />
                    ))}
                </div>

                <div className="p-8 lg:p-12">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <m.div key="step1" initial={false} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black text-atl-text flex items-center gap-3">
                                        <Settings className="text-atl-brass w-6 h-6" /> Ürün ve adet
                                    </h2>
                                    <p className="text-atl-muted text-sm">Önce ürün ve adet.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label id="quote-service-label" className={labelClass}>Ürün *</Label>
                                        <Select onValueChange={(val) => updateField('serviceType', val)} value={formData.serviceType}>
                                            <SelectTrigger aria-labelledby="quote-service-label" aria-invalid={Boolean(errors.serviceType)} className={`${inputClass} pl-4 min-h-14 data-[placeholder]:text-atl-muted/60`}>
                                                <SelectValue placeholder="Ürün seçin" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-atl-surface border-atl-line text-atl-text rounded-xl shadow-lg">
                                                {QUOTE_SERVICES.map(opt => (
                                                    <SelectItem key={opt.slug} value={opt.label} className="min-h-11 focus:bg-atl-brass focus:text-atl-bg rounded-lg">{opt.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.serviceType ? <p role="alert" className="text-sm text-red-300">{errors.serviceType}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-quantity" className={labelClass}>Adet *</Label>
                                        <div className="relative">
                                            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-quantity" inputMode="numeric" aria-invalid={Boolean(errors.quantity)} value={formData.quantity} onChange={(e) => updateField('quantity', e.target.value)} placeholder="Adet" className={inputClass} />
                                        </div>
                                        {errors.quantity ? <p role="alert" className="text-sm text-red-300">{errors.quantity}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-description" className={labelClass}>Ölçü notu</Label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-atl-muted" />
                                            <Textarea id="quote-description" value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Ölçü veya kısa not" className={`${inputClass} pl-12 min-h-[120px] resize-none pt-4`} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-dashed border-atl-line px-4 text-sm font-semibold text-atl-text hover:border-atl-brass"
                                        >
                                            <Upload className="h-4 w-4" /> Fotoğraf ekle
                                        </button>
                                        <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
                                        {files.length > 0 && (
                                            <ul className="grid gap-2">
                                                {files.map((f, i) => (
                                                    <li key={i} className="flex items-center justify-between gap-3 border border-atl-line px-3 py-2">
                                                        <span className="truncate text-sm">{f.file.name}</span>
                                                        <button type="button" onClick={() => removeFile(i)} aria-label={`${f.file.name} dosyasını kaldır`} className="inline-flex h-11 w-11 items-center justify-center">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {step === 2 && (
                            <m.div key="step2" initial={false} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black text-atl-text flex items-center gap-3">
                                        <User className="text-atl-brass w-6 h-6" /> Ad ve telefon
                                    </h2>
                                    <p className="text-atl-muted text-sm">Arama bu numaradan yapılır. E-posta zorunlu değil.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-name" className={labelClass}>Ad soyad *</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.fullName)} value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder="Ad soyad" className={inputClass} />
                                        </div>
                                        {errors.fullName ? <p role="alert" className="text-sm text-red-300">{errors.fullName}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-phone" className={labelClass}>Telefon *</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-phone" name="tel" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="05xx xxx xx xx" className={inputClass} />
                                        </div>
                                        {errors.phone ? <p role="alert" className="text-sm text-red-300">{errors.phone}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-email" className={labelClass}>E-posta</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="İsteğe bağlı" className={inputClass} />
                                        </div>
                                        {errors.email ? <p role="alert" className="text-sm text-red-300">{errors.email}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-company" className={labelClass}>Firma</Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-company" name="organization" autoComplete="organization" value={formData.company} onChange={(e) => updateField('company', e.target.value)} placeholder="İsteğe bağlı" className={inputClass} />
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-atl-line">
                        {step > 1 ? (
                            <Button variant="ghost" onClick={prevStep} className="text-atl-muted hover:text-atl-text flex items-center gap-2 group rounded-xl">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri
                            </Button>
                        ) : <div />}

                        {step < 2 ? (
                            <Button onClick={nextStep} className="bg-atl-brass hover:bg-atl-brass-light text-atl-bg font-bold h-12 px-8 rounded-xl flex items-center gap-2 group transition-all shadow-md shadow-black/20">
                                Sonraki Adım <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        ) : (
                            <Button disabled={isSubmitting} onClick={handleSubmit} className="bg-atl-brass hover:bg-atl-brass-light text-atl-bg font-bold h-12 px-8 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-black/20">
                                {isSubmitting ? (
                                    <>Lütfen bekleyin <Loader2 className="w-4 h-4 animate-spin" /></>
                                ) : (
                                    <>{config.submitButtonText || "Teklifi Gönder"} <ArrowRight className="w-4 h-4" /></>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <aside className="lg:col-span-4 space-y-4">
                <div className="border border-atl-line bg-atl-surface p-6 space-y-2 text-sm">
                    <h2 className="text-lg font-bold text-atl-text">Atölye</h2>
                    <p className="whitespace-pre-line text-atl-muted">{PUBLIC_ADDRESS}</p>
                    <p className="text-atl-muted">{PUBLIC_HOURS}</p>
                    <a href={toTelHref(PUBLIC_PHONE_DISPLAY)} className="inline-flex min-h-11 items-center font-semibold text-atl-text">{PUBLIC_PHONE_DISPLAY}</a>
                </div>
                <a
                    href={priceAskHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                    WhatsApp&apos;tan fiyat sor
                </a>
            </aside>
        </div>
    );
};
