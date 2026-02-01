"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { submitQuote } from '@/lib/actions/quotes.actions';
import { uploadSiteAsset } from '@/actions/admin';
import { cn } from '@/lib/utils';

export const QuoteForm = () => {
    const { content } = useContentStore();
    const config = content.quotePage;

    if (!config) return null;

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
        }).filter(Boolean) as any[];

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
            // 1. Upload files first
            const uploadedFiles = [];
            for (let i = 0; i < files.length; i++) {
                const f = files[i];
                const uploadData = new FormData();
                uploadData.append("file", f.file);
                uploadData.append("path", "quotes");

                const res = await uploadSiteAsset(uploadData);
                if (res.success) {
                    uploadedFiles.push({
                        name: f.file.name,
                        type: f.file.type,
                        size: f.file.size,
                        url: res.url,
                        // Extract path from URL or assume standard structure
                        path: res.url.split('/').pop() || ""
                    });
                }
            }

            // 2. Submit form
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
        } catch (error) {
            toast({ title: "Hata", description: "Bir hata oluştu.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-emerald-500/20 p-12 rounded-3xl text-center space-y-8"
            >
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter">
                    {config.successTitle}
                </h2>
                <p className="text-zinc-400 text-lg max-w-lg mx-auto leading-relaxed">
                    {config.successMessage}
                </p>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl max-w-xs mx-auto">
                    <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">TAKİP NUMARASI</span>
                    <span className="text-2xl font-mono text-emerald-400 font-bold uppercase">{quoteNumber}</span>
                </div>
                <Button
                    onClick={() => window.location.href = "/"}
                    className="bg-emerald-500 hover:bg-emerald-600 text-black font-black uppercase tracking-widest h-14 px-12"
                >
                    ANA SAYFAYA DÖN
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Form Section */}
            <div className="lg:col-span-8 bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-white/5 flex">
                    {[1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={cn(
                                "flex-1 transition-all duration-700",
                                step >= i ? "bg-orange-500" : "bg-transparent"
                            )}
                        />
                    ))}
                </div>

                <div className="p-8 lg:p-12">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                                        <User className="text-orange-500" /> {config.contactSectionTitle}
                                    </h3>
                                    <p className="text-zinc-500 text-sm">Lütfen sizinle iletişim kurabilmemiz için temel bilgileri doldurun.</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.nameLabel} *</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <Input
                                                value={formData.fullName}
                                                onChange={(e) => updateField('fullName', e.target.value)}
                                                placeholder={config.namePlaceholder}
                                                className="bg-black/20 border-white/10 pl-12 h-14 focus:border-orange-500 transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.companyLabel}</Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <Input
                                                value={formData.company}
                                                onChange={(e) => updateField('company', e.target.value)}
                                                placeholder={config.companyPlaceholder}
                                                className="bg-black/20 border-white/10 pl-12 h-14 focus:border-orange-500 transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.emailLabel} *</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => updateField('email', e.target.value)}
                                                placeholder={config.emailPlaceholder}
                                                className="bg-black/20 border-white/10 pl-12 h-14 focus:border-orange-500 transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.phoneLabel} *</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                            <Input
                                                value={formData.phone}
                                                onChange={(e) => updateField('phone', e.target.value)}
                                                placeholder={config.phonePlaceholder}
                                                className="bg-black/20 border-white/10 pl-12 h-14 focus:border-orange-500 transition-all rounded-xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                                        <Settings className="text-orange-500" /> {config.projectSectionTitle}
                                    </h3>
                                    <p className="text-zinc-500 text-sm">Projenizin teknik ayrıntılarını ve ihtiyaçlarınızı belirtin.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.serviceLabel} *</Label>
                                        <Select onValueChange={(val) => updateField('serviceType', val)} defaultValue={formData.serviceType}>
                                            <SelectTrigger className="bg-black/20 border-white/10 h-14 focus:border-orange-500 transition-all rounded-xl text-white">
                                                <SelectValue placeholder="Bir hizmet seçiniz" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                                {config.serviceOptions.map(opt => (
                                                    <SelectItem key={opt} value={opt} className="focus:bg-orange-500 focus:text-black">{opt}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.descriptionLabel} *</Label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-zinc-600" />
                                            <Textarea
                                                value={formData.description}
                                                onChange={(e) => updateField('description', e.target.value)}
                                                placeholder={config.descriptionPlaceholder}
                                                className="bg-black/20 border-white/10 pl-12 min-h-[150px] focus:border-orange-500 transition-all rounded-xl resize-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.quantityLabel}</Label>
                                            <div className="relative">
                                                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                                <Input
                                                    value={formData.quantity}
                                                    onChange={(e) => updateField('quantity', e.target.value)}
                                                    placeholder={config.quantityPlaceholder}
                                                    className="bg-black/20 border-white/10 pl-12 h-14 focus:border-orange-500 transition-all rounded-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs uppercase tracking-widest text-zinc-400">{config.materialLabel}</Label>
                                            <div className="relative">
                                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                                <Input
                                                    value={formData.materialType}
                                                    onChange={(e) => updateField('materialType', e.target.value)}
                                                    placeholder={config.materialPlaceholder}
                                                    className="bg-black/20 border-white/10 pl-12 h-14 focus:border-orange-500 transition-all rounded-xl"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
                                        <Upload className="text-orange-500" /> {config.uploadSectionTitle}
                                    </h3>
                                    <p className="text-zinc-500 text-sm">{config.fileDescription}</p>
                                </div>

                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-white/10 bg-black/20 rounded-2xl p-12 text-center hover:border-orange-500/50 hover:bg-black/40 transition-all cursor-pointer group"
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        multiple
                                        className="hidden"
                                    />
                                    <Upload className="w-12 h-12 text-zinc-700 group-hover:text-orange-500 mx-auto mb-4 transition-colors" />
                                    <p className="text-zinc-400 font-bold uppercase tracking-widest mb-2">{config.fileLabel}</p>
                                    <p className="text-xs text-zinc-600">Sürükle bırak veya tıkla (Maks. {config.maxFiles} dosya, her biri {config.maxSizeMB}MB)</p>
                                </div>

                                {files.length > 0 && (
                                    <div className="grid gap-3">
                                        {files.map((f, i) => (
                                            <div key={i} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                                                        {f.file.type.startsWith('image/') ? (
                                                            <img src={f.preview} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Layers className="w-5 h-5 text-zinc-600" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white truncate max-w-[200px]">{f.file.name}</p>
                                                        <p className="text-[10px] text-zinc-600 uppercase">{(f.file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeFile(i)} className="text-zinc-600 hover:text-red-500 transition-colors p-2">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-12 mt-12 border-t border-white/5">
                        {step > 1 ? (
                            <Button
                                variant="ghost"
                                onClick={prevStep}
                                className="text-zinc-400 hover:text-white flex items-center gap-2 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> GERİ
                            </Button>
                        ) : <div />}

                        {step < 3 ? (
                            <Button
                                onClick={nextStep}
                                className="bg-white text-black hover:bg-orange-500 transition-colors font-black uppercase tracking-widest h-14 px-12 rounded-xl flex items-center gap-3 group"
                            >
                                SONRAKİ ADIM <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        ) : (
                            <Button
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className="bg-orange-500 text-black hover:bg-emerald-500 transition-all duration-500 font-black uppercase tracking-widest h-14 px-12 rounded-xl flex items-center gap-3"
                            >
                                {isSubmitting ? (
                                    <>LÜTFEN BEKLEYİN <Loader2 className="w-4 h-4 animate-spin" /></>
                                ) : (
                                    <>{config.submitButtonText} <ArrowRight className="w-4 h-4" /></>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar Section */}
            <div className="lg:col-span-4 space-y-8">
                {/* Trust Blocks */}
                <div className="grid gap-4">
                    {config.trustBlocks.map((block, i) => {
                        const Icon = block.icon === 'Clock' ? Clock :
                            block.icon === 'Search' ? Search :
                                block.icon === 'CheckCircle' ? CheckCircle : ShieldCheck;

                        return (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:border-orange-500/30 transition-all group"
                            >
                                <div className="w-12 h-12 bg-white/5 text-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-black transition-all">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">{block.title}</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{block.description}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Direct Contact Card */}
                <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-1 rounded-3xl group cursor-pointer transition-all hover:scale-[1.02]">
                    <div className="bg-[#0A0A0A] p-10 rounded-[calc(1.5rem-1px)] space-y-6">
                        <div className="w-12 h-1 bg-orange-500" />
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Acil Bir Talebiniz Mi Var?</h4>
                        <p className="text-zinc-500 text-sm">Hemen bizi arayın veya WhatsApp üzerinden teknik ekibimize doğrudan ulaşın.</p>
                        <a
                            href={`https://wa.me/${content.whatsappNumber}`}
                            className="flex items-center justify-between group/wa"
                        >
                            <span className="text-orange-500 font-black tracking-widest uppercase text-xs">WHATSAPP İLE YAZIN</span>
                            <ArrowRight className="w-5 h-5 text-orange-500 group-hover/wa:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
