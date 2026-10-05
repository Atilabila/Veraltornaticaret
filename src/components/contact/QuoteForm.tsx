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
    "bg-zinc-50 border-zinc-200 pl-12 h-14 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-all rounded-xl text-zinc-900";
const labelClass = "text-xs font-mono font-semibold uppercase tracking-wider text-zinc-700";

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
                className="bg-white border border-zinc-200 rounded-3xl p-10 md:p-14 text-center space-y-8 max-w-2xl mx-auto shadow-xl"
            >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight">{config.successTitle}</h2>
                <p className="text-zinc-600 text-base md:text-lg max-w-lg mx-auto leading-relaxed">{config.successMessage}</p>
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 max-w-xs mx-auto">
                    <span className="block text-xs text-zinc-500 font-mono font-semibold uppercase tracking-wider mb-1">Teklif Takip Numarası</span>
                    <span className="text-2xl font-mono text-amber-700 font-black">{quoteNumber}</span>
                </div>
                <Button
                    onClick={() => window.location.href = "/"}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 px-10 rounded-xl transition-all shadow-md shadow-amber-600/20"
                >
                    Ana Sayfaya Dön
                </Button>
            </m.div>
        );
    }

    return (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="h-1.5 w-full bg-zinc-100 flex">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={cn(
                                "flex-1 transition-all duration-500",
                                step >= i ? "bg-amber-600" : "bg-transparent"
                            )}
                        />
                    ))}
                </div>

                <div className="p-8 lg:p-12">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <m.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
                                        <User className="text-amber-600 w-6 h-6" /> {config.contactSectionTitle}
                                    </h3>
                                    <p className="text-zinc-600 text-sm">İletişim ve kurumsal firma bilgilerinizi belirtin.</p>
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
                                    <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
                                        <Settings className="text-amber-600 w-6 h-6" /> {config.projectSectionTitle}
                                    </h3>
                                    <p className="text-zinc-600 text-sm">Projenizin teknik ayrıntılarını ve ölçü gereksinimlerini belirtin.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.serviceLabel} *</Label>
                                        <Select onValueChange={(val) => updateField('serviceType', val)} value={formData.serviceType}>
                                            <SelectTrigger className={`${inputClass} pl-4`}>
                                                <SelectValue placeholder="Bir hizmet seçiniz" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-zinc-200 text-zinc-900 rounded-xl shadow-lg">
                                                {config.serviceOptions.map(opt => (
                                                    <SelectItem key={opt} value={opt} className="focus:bg-amber-600 focus:text-white rounded-lg">{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className={labelClass}>{config.descriptionLabel} *</Label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-zinc-400" />
                                            <Textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder={config.descriptionPlaceholder} className={`${inputClass} pl-12 min-h-[140px] resize-none pt-4`} />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className={labelClass}>{config.quantityLabel}</Label>
                                            <div className="relative">
                                                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                                <Input value={formData.quantity} onChange={(e) => updateField('quantity', e.target.value)} placeholder={config.quantityPlaceholder} className={inputClass} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className={labelClass}>{config.materialLabel}</Label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
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
                                    <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
                                        <Upload className="text-amber-600 w-6 h-6" /> {config.uploadSectionTitle}
                                    </h3>
                                    <p className="text-zinc-600 text-sm">{config.fileDescription || "CAD, DXF, DWG, PDF veya yüksek çözünürlüklü teknik çizim yükleyebilirsiniz."}</p>
                                </div>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-zinc-300 bg-zinc-50 rounded-2xl p-10 text-center hover:border-amber-600 hover:bg-amber-50/20 transition-all cursor-pointer group"
                                >
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />
                                    <Upload className="w-10 h-10 text-zinc-400 group-hover:text-amber-600 mx-auto mb-3 transition-colors" />
                                    <p className="text-zinc-900 font-bold mb-1">{config.fileLabel}</p>
                                    <p className="text-xs text-zinc-500 font-mono">Sürükle bırak veya tıkla (Maks. {config.maxFiles} dosya, her biri {config.maxSizeMB}MB)</p>
                                </div>
                                {files.length > 0 && (
                                    <div className="grid gap-3">
                                        {files.map((f, i) => (
                                            <div key={i} className="flex items-center justify-between bg-zinc-50 p-4 border border-zinc-200 rounded-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white border border-zinc-200 rounded-lg overflow-hidden flex items-center justify-center shadow-xs">
                                                        {f.file.type.startsWith('image/') ? (
                                                            <img src={f.preview} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Layers className="w-5 h-5 text-amber-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-zinc-900 truncate max-w-[200px]">{f.file.name}</p>
                                                        <p className="text-xs font-mono text-zinc-500">{(f.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFile(i)} className="text-zinc-400 hover:text-red-600 transition-colors p-2">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </m.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-200">
                        {step > 1 ? (
                            <Button variant="ghost" onClick={prevStep} className="text-zinc-600 hover:text-zinc-900 flex items-center gap-2 group rounded-xl">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Geri
                            </Button>
                        ) : <div />}

                        {step < 3 ? (
                            <Button onClick={nextStep} className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 px-8 rounded-xl flex items-center gap-2 group transition-all shadow-md shadow-amber-600/20">
                                Sonraki Adım <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        ) : (
                            <Button disabled={isSubmitting} onClick={handleSubmit} className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 px-8 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-amber-600/20">
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
                                className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:border-amber-500 transition-colors group"
                            >
                                <div className="w-10 h-10 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h4 className="text-base font-bold text-zinc-900 mb-1">{block.title}</h4>
                                <p className="text-zinc-600 text-sm leading-relaxed">{block.description}</p>
                            </m.div>
                        );
                    })}
                </div>

                <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        HIZLI İLETİŞİM
                    </div>
                    <h4 className="text-lg font-bold text-zinc-900">Acil bir talebiniz mi var?</h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                        Alsancak atölyemizdeki imalat şefimizle WhatsApp üzerinden teknik detayları doğrudan görüşebilirsiniz.
                    </p>
                    <a
                        href="https://wa.me/905323794003"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                    >
                        <span>WhatsApp Usta Hattı</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
};
