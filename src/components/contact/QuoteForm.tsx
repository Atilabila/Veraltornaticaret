"use client";

import React, { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
    User, Building2, Mail, Phone,
    Settings, MessageSquare, Layers,
    Upload, Trash2, CheckCircle, ArrowRight, ArrowLeft,
    Clock, Search, ShieldCheck, Loader2
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
import { getServiceBySlug } from '@/lib/b2b/services';

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
        if (!config) return;

        const slug = searchParams.get('hizmet');
        if (!slug) return;

        const service = getServiceBySlug(slug);
        if (!service) return;

        const match = config.serviceOptions.find(
            (opt) => opt === service.title || opt.toLowerCase().includes(service.title.split(' ')[0].toLowerCase())
        );

        if (match) {
            setFormData((prev) => (prev.serviceType ? prev : { ...prev, serviceType: match }));
        }
    }, [searchParams, config]);

    if (!config) return null;

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

    const nextStep = () => {
        const next: Record<string, string> = {};
        if (step === 1) {
            if (!formData.fullName.trim()) next.fullName = "Ad soyad yazın.";
            if (!formData.email.trim()) next.email = "E-posta yazın.";
            if (!formData.phone.trim()) next.phone = "Telefon yazın.";
        }
        if (step === 2) {
            if (!formData.serviceType) next.serviceType = "Hizmet seçin.";
            if (!formData.description.trim()) next.description = "Proje notunu yazın.";
        }
        setErrors(next);
        if (Object.keys(next).length > 0) return;
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
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
                <p className="text-atl-muted text-base md:text-lg max-w-lg mx-auto leading-relaxed">{config.successMessage}</p>
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
                    {[1, 2, 3].map(i => (
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
                            <m.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-atl-text flex items-center gap-3">
                                        <User className="text-atl-brass w-6 h-6" /> {config.contactSectionTitle}
                                    </h3>
                                    <p className="text-atl-muted text-sm">İletişim ve kurumsal firma bilgilerinizi belirtin.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-name" className={labelClass}>{config.nameLabel} *</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-name" name="name" autoComplete="name" aria-invalid={Boolean(errors.fullName)} value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder={config.namePlaceholder} className={inputClass} />
                                        </div>
                                        {errors.fullName ? <p role="alert" className="text-sm text-red-300">{errors.fullName}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-company" className={labelClass}>{config.companyLabel}</Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-company" name="organization" autoComplete="organization" value={formData.company} onChange={(e) => updateField('company', e.target.value)} placeholder={config.companyPlaceholder} className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-email" className={labelClass}>{config.emailLabel} *</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder={config.emailPlaceholder} className={inputClass} />
                                        </div>
                                        {errors.email ? <p role="alert" className="text-sm text-red-300">{errors.email}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-phone" className={labelClass}>{config.phoneLabel} *</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                            <Input id="quote-phone" name="tel" type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder={config.phonePlaceholder} className={inputClass} />
                                        </div>
                                        {errors.phone ? <p role="alert" className="text-sm text-red-300">{errors.phone}</p> : null}
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {step === 2 && (
                            <m.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-atl-text flex items-center gap-3">
                                        <Settings className="text-atl-brass w-6 h-6" /> {config.projectSectionTitle}
                                    </h3>
                                    <p className="text-atl-muted text-sm">Projenizin teknik ayrıntılarını ve ölçü gereksinimlerini belirtin.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label id="quote-service-label" className={labelClass}>{config.serviceLabel} *</Label>
                                        <Select onValueChange={(val) => updateField('serviceType', val)} value={formData.serviceType}>
                                            <SelectTrigger aria-labelledby="quote-service-label" aria-invalid={Boolean(errors.serviceType)} className={`${inputClass} pl-4 data-[placeholder]:text-atl-muted/60`}>
                                                <SelectValue placeholder="Bir hizmet seçiniz" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-atl-surface border-atl-line text-atl-text rounded-xl shadow-lg">
                                                {config.serviceOptions.map(opt => (
                                                    <SelectItem key={opt} value={opt} className="focus:bg-atl-brass focus:text-atl-bg rounded-lg">{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                            </Select>
                                        {errors.serviceType ? <p role="alert" className="text-sm text-red-300">{errors.serviceType}</p> : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quote-description" className={labelClass}>{config.descriptionLabel} *</Label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-atl-muted" />
                                            <Textarea id="quote-description" aria-invalid={Boolean(errors.description)} value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder={config.descriptionPlaceholder} className={`${inputClass} pl-12 min-h-[140px] resize-none pt-4`} />
                                        </div>
                                        {errors.description ? <p role="alert" className="text-sm text-red-300">{errors.description}</p> : null}
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="quote-quantity" className={labelClass}>{config.quantityLabel}</Label>
                                            <div className="relative">
                                                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                                <Input id="quote-quantity" inputMode="numeric" value={formData.quantity} onChange={(e) => updateField('quantity', e.target.value)} placeholder={config.quantityPlaceholder} className={inputClass} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="quote-material" className={labelClass}>{config.materialLabel}</Label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-atl-muted" />
                                                <Input id="quote-material" value={formData.materialType} onChange={(e) => updateField('materialType', e.target.value)} placeholder={config.materialPlaceholder} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {step === 3 && (
                            <m.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-atl-text flex items-center gap-3">
                                        <Upload className="text-atl-brass w-6 h-6" /> {config.uploadSectionTitle}
                                    </h3>
                                    <p className="text-atl-muted text-sm">{config.fileDescription || "CAD, DXF, DWG, PDF veya yüksek çözünürlüklü teknik çizim yükleyebilirsiniz."}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full border-2 border-dashed border-atl-line bg-atl-surface-2 rounded-2xl p-10 text-center hover:border-atl-brass hover:bg-atl-brass-tint/20 transition-all cursor-pointer group"
                                >
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
                                    <Upload className="w-10 h-10 text-atl-muted group-hover:text-atl-brass mx-auto mb-3 transition-colors" />
                                    <p className="text-atl-text font-bold mb-1">{config.fileLabel}</p>
                                    <p className="text-xs text-atl-muted font-mono">Dosya seç (en fazla {config.maxFiles} dosya, her biri {config.maxSizeMB} MB)</p>
                                </button>
                                {files.length > 0 && (
                                    <div className="grid gap-3">
                                        {files.map((f, i) => (
                                            <div key={i} className="flex items-center justify-between bg-atl-surface-2 p-4 border border-atl-line rounded-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-atl-surface border border-atl-line rounded-lg overflow-hidden flex items-center justify-center shadow-xs">
                                                        {f.file.type.startsWith('image/') ? (
                                                            <img src={f.preview} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Layers className="w-5 h-5 text-atl-brass" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-atl-text truncate max-w-[200px]">{f.file.name}</p>
                                                        <p className="text-xs font-mono text-atl-muted">{(f.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={() => removeFile(i)} aria-label={`${f.file.name} dosyasını kaldır`} className="inline-flex h-11 w-11 items-center justify-center text-atl-muted hover:text-red-400 transition-colors">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </m.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-atl-line">
                        {step > 1 ? (
                            <Button variant="ghost" onClick={prevStep} className="text-atl-muted hover:text-atl-text flex items-center gap-2 group rounded-xl">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri
                            </Button>
                        ) : <div />}

                        {step < 3 ? (
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

            <div className="lg:col-span-4 space-y-6">
                <div className="grid gap-4">
                    {config.trustBlocks.map((block, i) => {
                        const Icon = block.icon === 'Clock' ? Clock :
                            block.icon === 'Search' ? Search :
                                block.icon === 'CheckCircle' ? CheckCircle : ShieldCheck;

                        return (
                            <m.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="bg-atl-surface border border-atl-line rounded-2xl p-6 shadow-sm hover:border-atl-brass transition-colors group"
                            >
                                <div className="w-10 h-10 bg-atl-brass-tint text-atl-brass rounded-xl flex items-center justify-center mb-3 group-hover:bg-atl-brass group-hover:text-atl-bg transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-atl-text mb-1">{block.title}</h4>
                                <p className="text-atl-muted text-sm leading-relaxed">{block.description}</p>
                            </m.div>
                        );
                    })}
                </div>

                <div className="bg-atl-surface border border-atl-line rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="inline-flex items-center gap-2 rounded border border-emerald-500/40 bg-emerald-950/40 px-2.5 py-1 font-sans text-xs font-semibold tracking-normal text-emerald-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Hızlı iletişim
                    </div>
                    <h4 className="text-lg font-bold text-atl-text">Acil bir talebiniz mi var?</h4>
                    <p className="text-atl-muted text-sm leading-relaxed">
                        Alsancak atölyemizdeki imalat şefimizle WhatsApp üzerinden teknik detayları doğrudan görüşebilirsiniz.
                    </p>
                    <a
                        href="https://wa.me/905071651315"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 font-sans text-sm font-semibold tracking-normal text-white shadow-sm transition-colors hover:bg-emerald-700"
                    >
                        <span>WhatsApp Usta Hattı</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};
