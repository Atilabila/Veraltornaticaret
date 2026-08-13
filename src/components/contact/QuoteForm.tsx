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
    "bg-[#f4f4f4] border-[#c6c6c6] pl-12 h-14 focus:border-[var(--color-brand-accent)] transition-all rounded-none text-[#161616]";
const labelClass = "text-xs font-mono font-semibold uppercase tracking-wider text-[#525252]";

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
        if (step === 1) {
            if (!formData.fullName || !formData.email || !formData.phone) {
                toast({ title: "Uyarı", description: "Lütfen zorunlu alanları doldurunuz." });
                return;
            }
        }
        if (step === 2) {
            if (!formData.serviceType || !formData.description) {
                toast({ title: "Uyarı", description: "Lütfen zorunlu proje detaylarını giriniz." });
                return;
            }
        }
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
                className="bg-white border border-[#c6c6c6] p-12 text-center space-y-8 max-w-2xl"
            >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold text-[#161616]">{config.successTitle}</h2>
                <p className="text-[#525252] text-lg max-w-lg mx-auto leading-relaxed">{config.successMessage}</p>
                <div className="bg-[#f4f4f4] border border-[#c6c6c6] p-6 max-w-xs mx-auto">
                    <span className="block text-xs text-[#525252] font-mono font-semibold uppercase tracking-wider mb-1">Takip numarası</span>
                    <span className="text-2xl font-mono text-[var(--color-brand-accent)] font-bold">{quoteNumber}</span>
                </div>
                <Button
                    onClick={() => window.location.href = "/"}
                    className="bg-[var(--color-brand-accent)] hover:bg-[#0043ce] text-white font-semibold h-12 px-10 rounded-none"
                >
                    Ana sayfaya dön
                </Button>
            </m.div>
        );
    }

    return (
        <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 bg-white border border-[#c6c6c6] overflow-hidden shadow-sm">
                <div className="h-1 w-full bg-[#e0e0e0] flex">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={cn(
                                "flex-1 transition-all duration-500",
                                step >= i ? "bg-[var(--color-brand-accent)]" : "bg-transparent"
                            )}
                        />
                    ))}
                </div>

                <div className="p-8 lg:p-10">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <m.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-[#161616] flex items-center gap-3">
                                        <User className="text-[var(--color-brand-accent)] w-5 h-5" /> {config.contactSectionTitle}
                                    </h3>
                                    <p className="text-[#525252] text-sm">İletişim için temel bilgileri doldurun.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.nameLabel} *</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                            <Input value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} placeholder={config.namePlaceholder} className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.companyLabel}</Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                            <Input value={formData.company} onChange={(e) => updateField('company', e.target.value)} placeholder={config.companyPlaceholder} className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.emailLabel} *</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                            <Input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder={config.emailPlaceholder} className={inputClass} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.phoneLabel} *</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                            <Input value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder={config.phonePlaceholder} className={inputClass} />
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {step === 2 && (
                            <m.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-[#161616] flex items-center gap-3">
                                        <Settings className="text-[var(--color-brand-accent)] w-5 h-5" /> {config.projectSectionTitle}
                                    </h3>
                                    <p className="text-[#525252] text-sm">Projenizin teknik ayrıntılarını belirtin.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.serviceLabel} *</Label>
                                        <Select onValueChange={(val) => updateField('serviceType', val)} value={formData.serviceType}>
                                            <SelectTrigger className={`${inputClass} pl-4`}>
                                                <SelectValue placeholder="Bir hizmet seçiniz" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-[#c6c6c6] text-[#161616]">
                                                {config.serviceOptions.map(opt => (
                                                    <SelectItem key={opt} value={opt} className="focus:bg-[var(--color-brand-accent)] focus:text-white">{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.descriptionLabel} *</Label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#8d8d8d]" />
                                            <Textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder={config.descriptionPlaceholder} className={`${inputClass} pl-12 min-h-[150px] resize-none`} />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className={labelClass}>{config.quantityLabel}</Label>
                                            <div className="relative">
                                                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                                <Input value={formData.quantity} onChange={(e) => updateField('quantity', e.target.value)} placeholder={config.quantityPlaceholder} className={inputClass} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className={labelClass}>{config.materialLabel}</Label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d8d8d]" />
                                                <Input value={formData.materialType} onChange={(e) => updateField('materialType', e.target.value)} placeholder={config.materialPlaceholder} className={inputClass} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </m.div>
                        )}

                        {step === 3 && (
                            <m.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-[#161616] flex items-center gap-3">
                                        <Upload className="text-[var(--color-brand-accent)] w-5 h-5" /> {config.uploadSectionTitle}
                                    </h3>
                                    <p className="text-[#525252] text-sm">{config.fileDescription}</p>
                                </div>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-[#c6c6c6] bg-[#f4f4f4] p-12 text-center hover:border-[var(--color-brand-accent)] transition-colors cursor-pointer group"
                                >
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
                                    <Upload className="w-10 h-10 text-[#8d8d8d] group-hover:text-[var(--color-brand-accent)] mx-auto mb-4 transition-colors" />
                                    <p className="text-[#161616] font-semibold mb-2">{config.fileLabel}</p>
                                    <p className="text-xs text-[#525252]">Sürükle bırak veya tıkla (Maks. {config.maxFiles} dosya, her biri {config.maxSizeMB}MB)</p>
                                </div>
                                {files.length > 0 && (
                                    <div className="grid gap-3">
                                        {files.map((f, i) => (
                                            <div key={i} className="flex items-center justify-between bg-[#f4f4f4] p-4 border border-[#c6c6c6]">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white border border-[#c6c6c6] overflow-hidden flex items-center justify-center">
                                                        {f.file.type.startsWith('image/') ? (
                                                            <img src={f.preview} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Layers className="w-5 h-5 text-[#8d8d8d]" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-[#161616] truncate max-w-[200px]">{f.file.name}</p>
                                                        <p className="text-xs text-[#525252]">{(f.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFile(i)} className="text-[#8d8d8d] hover:text-red-600 transition-colors p-2">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </m.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between pt-10 mt-10 border-t border-[#c6c6c6]">
                        {step > 1 ? (
                            <Button variant="ghost" onClick={prevStep} className="text-[#525252] hover:text-[#161616] flex items-center gap-2 group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri
                            </Button>
                        ) : <div />}

                        {step < 3 ? (
                            <Button onClick={nextStep} className="bg-[var(--color-brand-accent)] hover:bg-[#0043ce] text-white font-semibold h-12 px-10 rounded-none flex items-center gap-2 group">
                                Sonraki adım <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        ) : (
                            <Button disabled={isSubmitting} onClick={handleSubmit} className="bg-[var(--color-brand-accent)] hover:bg-[#0043ce] text-white font-semibold h-12 px-10 rounded-none flex items-center gap-2">
                                {isSubmitting ? (
                                    <>Lütfen bekleyin <Loader2 className="w-4 h-4 animate-spin" /></>
                                ) : (
                                    <>{config.submitButtonText} <ArrowRight className="w-4 h-4" /></>
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
                                className="bg-white border border-[#c6c6c6] p-6 hover:border-[var(--color-brand-accent)] transition-colors group"
                            >
                                <div className="w-10 h-10 bg-[#f4f4f4] text-[var(--color-brand-accent)] flex items-center justify-center mb-4 group-hover:bg-[var(--color-brand-accent)] group-hover:text-white transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-[#161616] mb-2">{block.title}</h4>
                                <p className="text-[#525252] text-sm leading-relaxed">{block.description}</p>
                            </m.div>
                        );
                    })}
                </div>

                <div className="bg-white border border-[#c6c6c6] p-8 space-y-4">
                    <div className="w-10 h-1 bg-[var(--color-brand-accent)]" />
                    <h4 className="text-xl font-bold text-[#161616]">Acil bir talebiniz mi var?</h4>
                    <p className="text-[#525252] text-sm">WhatsApp üzerinden teknik ekibimize doğrudan ulaşın.</p>
                    <a href={`https://wa.me/${content.whatsappNumber}`} className="inline-flex items-center gap-2 text-[var(--color-brand-accent)] font-semibold text-sm hover:underline">
                        WhatsApp ile yazın <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};
