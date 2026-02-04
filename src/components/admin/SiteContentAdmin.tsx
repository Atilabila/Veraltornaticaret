"use client"

import * as React from "react"
import { useContentStore } from "@/store/useContentStore"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2, Plus, Trash2, Instagram, Star, MessageSquare, Repeat, Phone, Layout, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { InstagramAdmin } from "@/components/admin/InstagramAdmin"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CMSPreview } from "@/components/admin/CMSPreview"
import { TypographyEditor } from "@/components/admin/TypographyEditor"

export const SiteContentAdmin = ({ defaultTab = "global" }: { defaultTab?: string }) => {
    const store = useContentStore()
    const [loading, setLoading] = React.useState(false)
    const [saveSuccess, setSaveSuccess] = React.useState(false)

    // Load content on mount
    React.useEffect(() => {
        const load = async () => {
            await store.fetchContent()
        }
        load()
    }, [])

    const handleSave = async () => {
        setLoading(true)
        setSaveSuccess(false)
        try {
            const success = await store.saveToSupabase()
            if (success) {
                setSaveSuccess(true)
                setTimeout(() => setSaveSuccess(false), 3000)
            }
        } catch (error) {
            console.error("Save failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-2xl border border-white/5 sticky top-0 z-10 backdrop-blur-md">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        Site İçerik Yönetimi
                    </h2>
                    <p className="text-slate-400">
                        Sitenin tüm metin ve görsellerini buradan dinamik olarak yönetin.
                    </p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-safety-orange)] hover:bg-orange-600 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-500/20"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Save className="w-5 h-5" />
                    )}
                    {loading ? "Kaydediliyor..." : saveSuccess ? "Kaydedildi!" : "Değişiklikleri Kaydet"}
                </button>
            </div>

            <Tabs defaultValue={defaultTab} className="w-full space-y-6">
                <TabsList className="w-full bg-slate-900/50 p-1 rounded-xl border border-white/5 flex flex-wrap h-auto gap-1">
                    <TabsTrigger value="global" className="flex-1 min-w-[120px]">Global Ayarlar</TabsTrigger>
                    <TabsTrigger value="services" className="flex-1 min-w-[120px]">Hizmetler CMS</TabsTrigger>
                    <TabsTrigger value="pages" className="flex-1 min-w-[120px]">Sayfa Ayarları</TabsTrigger>
                    <TabsTrigger value="branding" className="flex-1 min-w-[120px]">Marka & Logo</TabsTrigger>
                    <TabsTrigger value="hero" className="flex-1 min-w-[120px]">Hero</TabsTrigger>
                    <TabsTrigger value="about" className="flex-1 min-w-[120px]">Hakkımızda</TabsTrigger>
                    <TabsTrigger value="stats" className="flex-1 min-w-[120px]">İstatistikler</TabsTrigger>
                    <TabsTrigger value="features" className="flex-1 min-w-[120px]">Özellikler</TabsTrigger>
                    <TabsTrigger value="reviews" className="flex-1 min-w-[120px]">Yorumlar</TabsTrigger>
                    <TabsTrigger value="process" className="flex-1 min-w-[120px]">Süreç</TabsTrigger>
                    <TabsTrigger value="showcase" className="flex-1 min-w-[120px]">Vitrin</TabsTrigger>
                    <TabsTrigger value="contact" className="flex-1 min-w-[120px]">İletişim</TabsTrigger>
                    <TabsTrigger value="quote" className="flex-1 min-w-[120px] text-orange-500 data-[state=active]:bg-orange-500 data-[state=active]:text-white">Teklif Sayfası</TabsTrigger>
                    <TabsTrigger value="cart" className="flex-1 min-w-[120px] text-emerald-500 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Sepet Sayfası</TabsTrigger>
                    <TabsTrigger value="checkout" className="flex-1 min-w-[120px] text-blue-500 data-[state=active]:bg-blue-500 data-[state=active]:text-white">Ödeme Sayfası</TabsTrigger>
                    <TabsTrigger value="instagram" className="flex-1 min-w-[120px] text-[#E1306C] data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">Instagram</TabsTrigger>
                </TabsList>

                {/* GLOBAL SETTINGS */}
                <TabsContent value="global">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Global Ayarlar (Header & Grid)</CardTitle>
                            <CardDescription>Sitenin genel görünümünü buradan yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* HEADER CONFIG */}
                            <div className="space-y-6 border-b border-white/5 pb-8">
                                <h3 className="text-lg font-bold text-white mb-4">Header (Üst Menü) Ayarları</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Header Modu</Label>
                                            <Select
                                                value={store.content.headerConfig?.mode || 'translucent'}
                                                onValueChange={(val: any) =>
                                                    store.updateContent({ headerConfig: { ...store.content.headerConfig, mode: val } })
                                                }
                                            >
                                                <SelectTrigger><SelectValue placeholder="Mod Seçin" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="translucent">Yarı Saydam (Tavsiye Edilen)</SelectItem>
                                                    <SelectItem value="auto">Otomatik Kontrast</SelectItem>
                                                    <SelectItem value="light">Zorunlu Açık (Dark BG'ye Uygun)</SelectItem>
                                                    <SelectItem value="dark">Zorunlu Koyu (Light BG'ye Uygun)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Saydamlık (%{store.content.headerConfig?.transparency || 90})</Label>
                                            <Input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={store.content.headerConfig?.transparency || 90}
                                                onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, transparency: parseInt(e.target.value) } })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Arka Plan Bulanıklığı (Blur: {store.content.headerConfig?.blur || 12}px)</Label>
                                            <Input
                                                type="range"
                                                min="0"
                                                max="40"
                                                value={store.content.headerConfig?.blur || 12}
                                                onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, blur: parseInt(e.target.value) } })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Gölge (Shadow)</Label>
                                            <Select
                                                value={store.content.headerConfig?.shadow || 'none'}
                                                onValueChange={(val: 'none' | 'sm' | 'md' | 'lg') =>
                                                    store.updateContent({ headerConfig: { ...store.content.headerConfig, shadow: val } })
                                                }
                                            >
                                                <SelectTrigger><SelectValue placeholder="Gölge Seçin" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Yok (None)</SelectItem>
                                                    <SelectItem value="sm">Hafif (Small)</SelectItem>
                                                    <SelectItem value="md">Orta (Medium)</SelectItem>
                                                    <SelectItem value="lg">Belirgin (Large)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <Input
                                                type="checkbox"
                                                className="w-4 h-4"
                                                checked={store.content.headerConfig?.showBorder || false}
                                                onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, showBorder: e.target.checked } })}
                                            />
                                            <Label>Alt Çizgi Göster</Label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <ImageUploader
                                            label="Logo (Açık Tema / Koyu Zemin İçin)"
                                            currentImage={store.content.headerConfig?.logoLight}
                                            onImageUploaded={(url) => store.updateContent({ headerConfig: { ...store.content.headerConfig, logoLight: url } })}
                                            folder="brand"
                                        />
                                        <ImageUploader
                                            label="Logo (Koyu Tema / Açık Zemin İçin)"
                                            currentImage={store.content.headerConfig?.logoDark}
                                            onImageUploaded={(url) => store.updateContent({ headerConfig: { ...store.content.headerConfig, logoDark: url } })}
                                            folder="brand"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>CTA Buton Metni</Label>
                                            <CMSPreview
                                                label="Header CTA Butonu"
                                                previewImage="/artifacts/header_preview_1770115069617.png"
                                                description="Sayfanın sağ üst köşesinde turuncu buton"
                                            />
                                        </div>
                                        <Input
                                            value={store.content.headerConfig?.ctaText}
                                            onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, ctaText: e.target.value } })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>CTA Buton Linki</Label>
                                        <Input
                                            value={store.content.headerConfig?.ctaLink}
                                            onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, ctaLink: e.target.value } })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="checkbox"
                                            className="w-4 h-4"
                                            checked={store.content.headerConfig?.announcementActive || false}
                                            onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, announcementActive: e.target.checked } })}
                                        />
                                        <Label>Duyuru Bandı Aktif</Label>
                                    </div>
                                    {store.content.headerConfig?.announcementActive && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Duyuru Metni</Label>
                                                <Input
                                                    value={store.content.headerConfig?.announcementText}
                                                    onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, announcementText: e.target.value } })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Duyuru Linki</Label>
                                                <Input
                                                    value={store.content.headerConfig?.announcementLink}
                                                    onChange={(e) => store.updateContent({ headerConfig: { ...store.content.headerConfig, announcementLink: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* GRID CONFIG */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white mb-4">Arka Plan Grid Sistemi</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <Input
                                        type="checkbox"
                                        className="w-4 h-4"
                                        checked={store.content.globalGridConfig?.enabled || false}
                                        onChange={(e) => store.updateContent({ globalGridConfig: { ...store.content.globalGridConfig, enabled: e.target.checked } })}
                                    />
                                    <Label>Grid Aktif</Label>
                                </div>

                                {store.content.globalGridConfig?.enabled && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <Label>Grid Stili</Label>
                                            <Select
                                                value={store.content.globalGridConfig?.style || 'lines'}
                                                onValueChange={(val: 'lines' | 'dots' | 'squares') =>
                                                    store.updateContent({ globalGridConfig: { ...store.content.globalGridConfig, style: val } })
                                                }
                                            >
                                                <SelectTrigger><SelectValue placeholder="Stil Seçin" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="lines">Çizgiler (Lines)</SelectItem>
                                                    <SelectItem value="dots">Noktalar (Dots)</SelectItem>
                                                    <SelectItem value="squares">Kareler (Squares)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Yoğunluk (Açık Tema): %{store.content.globalGridConfig?.intensityLight}</Label>
                                                <Input
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                    value={store.content.globalGridConfig?.intensityLight || 5}
                                                    onChange={(e) => store.updateContent({ globalGridConfig: { ...store.content.globalGridConfig, intensityLight: parseInt(e.target.value) } })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Yoğunluk (Koyu Tema): %{store.content.globalGridConfig?.intensityDark}</Label>
                                                <Input
                                                    type="range"
                                                    min="0"
                                                    max="50"
                                                    value={store.content.globalGridConfig?.intensityDark || 10}
                                                    onChange={(e) => store.updateContent({ globalGridConfig: { ...store.content.globalGridConfig, intensityDark: parseInt(e.target.value) } })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* THEME CONFIG */}
                            <div className="space-y-6 pt-8 border-t border-white/5">
                                <h3 className="text-lg font-bold text-white mb-4">Tema Ayarları</h3>
                                <div className="space-y-2">
                                    <Label>Koyu Tema Sayfaları (Virgülle veya boşlukla ayırın)</Label>
                                    <Textarea
                                        rows={3}
                                        value={store.content.themeConfig?.darkPaths?.join(', ') || ''}
                                        onChange={(e) => {
                                            const paths = e.target.value.split(/[\s,]+/).filter(Boolean).map(s => s.trim());
                                            store.updateContent({ themeConfig: { ...store.content.themeConfig, darkPaths: paths } });
                                        }}
                                        placeholder="/urunler, /metal-urunler, /teklif-al"
                                        className="font-mono text-sm"
                                    />
                                    <p className="text-xs text-slate-400">
                                        Bu rotalar (URL'ler) için Header ve Arka Plan otomatik olarak Koyu (Dark) modda çalışır.
                                        <br />
                                        Anasayfa (/) varsayılan olarak dahildir.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* SERVICES CMS */}
                <TabsContent value="services">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Hizmetler (Services) Yönetimi</CardTitle>
                            <CardDescription>SEO landing page olarak çalışacak dinamik hizmet sayfalarını yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-12">
                            {/* SERVICES PAGE HEADER */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8 border-b border-white/5">
                                <div className="space-y-2">
                                    <Label>Hizmetler Liste Başlığı (H1)</Label>
                                    <Input
                                        value={store.content.servicesPageHeader?.title || ''}
                                        onChange={(e) => store.updateContent({ servicesPageHeader: { ...store.content.servicesPageHeader, title: e.target.value } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Hizmetler Liste Alt Başlığı</Label>
                                    <Input
                                        value={store.content.servicesPageHeader?.subtitle || ''}
                                        onChange={(e) => store.updateContent({ servicesPageHeader: { ...store.content.servicesPageHeader, subtitle: e.target.value } })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-8">
                                {(store.content.services || []).sort((a, b) => a.order - b.order).map((service, index) => (
                                    <div key={service.id} className="bg-slate-800/30 p-8 rounded-2xl border border-white/5 space-y-8 relative">
                                        <button
                                            onClick={() => {
                                                const newServices = store.content.services.filter(s => s.id !== service.id);
                                                store.updateContent({ services: newServices });
                                            }}
                                            className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>

                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center font-bold text-white">#{service.order}</div>
                                            <h4 className="text-xl font-bold text-white uppercase tracking-widest">{service.title || 'Yeni Hizmet'}</h4>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {/* BASIC INFO */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2 p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <input
                                                        type="checkbox"
                                                        id={`active-${service.id}`}
                                                        className="w-5 h-5 accent-[var(--color-brand-safety-orange)]"
                                                        checked={service.isActive ?? true}
                                                        onChange={(e) => {
                                                            const n = [...store.content.services];
                                                            n[index].isActive = e.target.checked;
                                                            store.updateContent({ services: n });
                                                        }}
                                                    />
                                                    <Label htmlFor={`active-${service.id}`} className="cursor-pointer font-bold">Sitede Göster (Aktif)</Label>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Hizmet Başlığı</Label>
                                                    <Input value={service.title} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].title = e.target.value;
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>URL Slug</Label>
                                                    <Input value={service.slug} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].slug = e.target.value;
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>İkon (Lucide Name)</Label>
                                                    <Input value={service.icon} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].icon = e.target.value;
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Sıralama (Order)</Label>
                                                    <Input type="number" value={service.order} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].order = parseInt(e.target.value);
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                            </div>

                                            {/* CONTENT & MEDIA */}
                                            <div className="md:col-span-2 space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Kısa Açıklama (Vitrin için)</Label>
                                                    <Textarea value={service.shortDescription} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].shortDescription = e.target.value;
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Detaylı Açıklama (Full Description)</Label>
                                                    <Textarea rows={6} value={service.fullDescription} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].fullDescription = e.target.value;
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                                <ImageUploader
                                                    label="Hizmet Detay Görseli"
                                                    currentImage={service.image}
                                                    onImageUploaded={(url) => {
                                                        const n = [...store.content.services];
                                                        n[index].image = url;
                                                        store.updateContent({ services: n });
                                                    }}
                                                    folder="services"
                                                />
                                            </div>
                                        </div>

                                        {/* SEO SECTION */}
                                        <div className="bg-black/20 p-6 rounded-xl border border-white/5 space-y-4">
                                            <h5 className="font-bold text-slate-300 text-sm italic">SEO & Üst Bilgiler</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>SEO Title</Label>
                                                    <Input value={service.seoTitle} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].seoTitle = e.target.value;
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Meta Description</Label>
                                                    <Input value={service.seoDescription} onChange={(e) => {
                                                        const n = [...store.content.services];
                                                        n[index].seoDescription = e.target.value;
                                                        store.updateContent({ services: n });
                                                    }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* TECHNICAL SPECS & AREAS */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <Label>Teknik Özellikler (Hizmet Detayı Key/Value)</Label>
                                                {(service.features || []).map((f, fi) => (
                                                    <div key={fi} className="flex gap-2">
                                                        <Input placeholder="Örn: Hassasiyet" value={f.key} onChange={(e) => {
                                                            const n = [...store.content.services];
                                                            n[index].features[fi].key = e.target.value;
                                                            store.updateContent({ services: n });
                                                        }} />
                                                        <Input placeholder="Örn: 0.01mm" value={f.value} onChange={(e) => {
                                                            const n = [...store.content.services];
                                                            n[index].features[fi].value = e.target.value;
                                                            store.updateContent({ services: n });
                                                        }} />
                                                        <button onClick={() => {
                                                            const n = [...store.content.services];
                                                            n[index].features.splice(fi, 1);
                                                            store.updateContent({ services: n });
                                                        }}><Trash2 className="w-4 h-4 text-red-500" /></button>
                                                    </div>
                                                ))}
                                                <button
                                                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                                                    onClick={() => {
                                                        const n = [...store.content.services];
                                                        n[index].features.push({ key: '', value: '' });
                                                        store.updateContent({ services: n });
                                                    }}
                                                >
                                                    <Plus className="w-3 h-3" /> Özellik Ekle
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <Label>Kullanım Alanları (Liste)</Label>
                                                {(service.applicationAreas || []).map((area, ai) => (
                                                    <div key={ai} className="flex gap-2">
                                                        <Input value={area} onChange={(e) => {
                                                            const n = [...store.content.services];
                                                            n[index].applicationAreas[ai] = e.target.value;
                                                            store.updateContent({ services: n });
                                                        }} />
                                                        <button onClick={() => {
                                                            const n = [...store.content.services];
                                                            n[index].applicationAreas.splice(ai, 1);
                                                            store.updateContent({ services: n });
                                                        }}><Trash2 className="w-4 h-4 text-red-500" /></button>
                                                    </div>
                                                ))}
                                                <button
                                                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                                                    onClick={() => {
                                                        const n = [...store.content.services];
                                                        n[index].applicationAreas.push('Yeni Alan');
                                                        store.updateContent({ services: n });
                                                    }}
                                                >
                                                    <Plus className="w-3 h-3" /> Alan Ekle
                                                </button>
                                            </div>
                                        </div>

                                        {/* SLA & CTA */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                                            <div className="space-y-2">
                                                <Label>SLA / Güven Metni</Label>
                                                <Input value={service.slaText} onChange={(e) => {
                                                    const n = [...store.content.services];
                                                    n[index].slaText = e.target.value;
                                                    store.updateContent({ services: n });
                                                }} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>CTA Kutu Başlığı</Label>
                                                <Input value={service.ctaTitle} onChange={(e) => {
                                                    const n = [...store.content.services];
                                                    n[index].ctaTitle = e.target.value;
                                                    store.updateContent({ services: n });
                                                }} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>CTA Buton Metni</Label>
                                                <Input value={service.ctaLabel} onChange={(e) => {
                                                    const n = [...store.content.services];
                                                    n[index].ctaLabel = e.target.value;
                                                    store.updateContent({ services: n });
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    const newServices = [...(store.content.services || [])];
                                    const id = (Math.max(0, ...newServices.map(s => parseInt(s.id))) + 1).toString();
                                    newServices.push({
                                        id,
                                        slug: 'yeni-hizmet-' + id,
                                        title: '',
                                        shortDescription: '',
                                        fullDescription: '',
                                        icon: 'Settings',
                                        image: '',
                                        seoTitle: '',
                                        seoDescription: '',
                                        features: [],
                                        applicationAreas: [],
                                        slaText: '24 Saat İçinde Yanıt',
                                        ctaTitle: 'Projeniz İçin Teklif Alın',
                                        ctaLabel: 'Teklif İste',
                                        order: newServices.length + 1,
                                        isActive: true
                                    });
                                    store.updateContent({ services: newServices });
                                }}
                                className="w-full py-8 border-2 border-dashed border-white/10 rounded-2xl text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2 text-lg font-bold"
                            >
                                <Plus className="w-6 h-6" /> Yeni Hizmet Ekle (CMS Kaydı)
                            </button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PAGE SETTINGS */}
                <TabsContent value="pages">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Sayfa Özel Ayarları (Overrides)</CardTitle>
                            <CardDescription>Belirli sayfaların temasını ve görünümünü özelleştirin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                {(store.content.pageSettings || []).map((page, index) => (
                                    <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-white/5 space-y-4 relative group">
                                        <button
                                            onClick={() => {
                                                const newPages = [...store.content.pageSettings];
                                                newPages.splice(index, 1);
                                                store.updateContent({ pageSettings: newPages });
                                            }}
                                            className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="space-y-2">
                                                <Label>URL Rotası (Path)</Label>
                                                <Input
                                                    value={page.path}
                                                    placeholder="/hakkimizda"
                                                    onChange={(e) => {
                                                        const newPages = [...store.content.pageSettings];
                                                        newPages[index].path = e.target.value;
                                                        store.updateContent({ pageSettings: newPages });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Sayfa Teması</Label>
                                                <Select
                                                    value={page.theme}
                                                    onValueChange={(val: 'light' | 'dark') => {
                                                        const newPages = [...store.content.pageSettings];
                                                        newPages[index].theme = val;
                                                        store.updateContent({ pageSettings: newPages });
                                                    }}
                                                >
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="light">Light (Açık)</SelectItem>
                                                        <SelectItem value="dark">Dark (Koyu)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Header Modu Override</Label>
                                                <Select
                                                    value={page.headerModeOverride}
                                                    onValueChange={(val: 'inherit' | 'auto' | 'translucent') => {
                                                        const newPages = [...store.content.pageSettings];
                                                        newPages[index].headerModeOverride = val;
                                                        store.updateContent({ pageSettings: newPages });
                                                    }}
                                                >
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="inherit">Mirasyol (Inherit)</SelectItem>
                                                        <SelectItem value="auto">Auto Contrast</SelectItem>
                                                        <SelectItem value="translucent">Translucent</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Grid Override</Label>
                                                <Select
                                                    value={page.gridOverride}
                                                    onValueChange={(val: 'inherit' | 'on' | 'off') => {
                                                        const newPages = [...store.content.pageSettings];
                                                        newPages[index].gridOverride = val;
                                                        store.updateContent({ pageSettings: newPages });
                                                    }}
                                                >
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="inherit">Mirasyol (Inherit)</SelectItem>
                                                        <SelectItem value="on">Açık (Forced On)</SelectItem>
                                                        <SelectItem value="off">Kapalı (Forced Off)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                                            <div className="space-y-2">
                                                <Label>SEO Başlık (Opsiyonel)</Label>
                                                <Input
                                                    value={page.seoTitle || ''}
                                                    placeholder="Sayfa Başlığı | VERAL"
                                                    onChange={(e) => {
                                                        const newPages = [...store.content.pageSettings];
                                                        newPages[index].seoTitle = e.target.value;
                                                        store.updateContent({ pageSettings: newPages });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>SEO Açıklama (Opsiyonel)</Label>
                                                <Input
                                                    value={page.seoDescription || ''}
                                                    placeholder="Google arama sonuçlarında görünecek açıklama..."
                                                    onChange={(e) => {
                                                        const newPages = [...store.content.pageSettings];
                                                        newPages[index].seoDescription = e.target.value;
                                                        store.updateContent({ pageSettings: newPages });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => {
                                    const newPages = [...(store.content.pageSettings || [])];
                                    newPages.push({ path: '/yeni-sayfa', theme: 'light', headerModeOverride: 'inherit', gridOverride: 'inherit' });
                                    store.updateContent({ pageSettings: newPages });
                                }}
                                className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Yeni Sayfa Ayarı Ekle
                            </button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* BRANDING */}
                <TabsContent value="branding">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Marka Kimliği</CardTitle>
                            <CardDescription>Logo ve site ismi ayarları</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <ImageUploader
                                    label="Header Logo (Siyah/Renkli)"
                                    currentImage={store.content.headerLogo}
                                    onImageUploaded={(url) => store.updateContent({ headerLogo: url })}
                                    folder="brand"
                                />
                                <ImageUploader
                                    label="Footer Logo (Beyaz/Negatif)"
                                    currentImage={store.content.footerLogo}
                                    onImageUploaded={(url) => store.updateContent({ footerLogo: url })}
                                    folder="brand"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Site İsmi</Label>
                                <Input
                                    value={store.content.siteName}
                                    onChange={(e) => store.updateContent({ siteName: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* HERO SECTION */}
                <TabsContent value="hero">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Ana Sayfa Giriş (Hero)</CardTitle>
                            <CardDescription className="flex items-center gap-2 text-slate-400">
                                <Layout className="w-4 h-4" />
                                Her alanın yanındaki önizleme butonuna tıklayarak sitenin neresinde göründüğünü görebilirsiniz
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Ana Başlık</Label>
                                            <div className="flex items-center gap-2">
                                                <TypographyEditor fieldId="Hero-Headline" label="Ana Başlık" />
                                                <CMSPreview
                                                    label="Hero Ana Başlık"
                                                    previewImage="/artifacts/hero_section_preview_1770115021977.png"
                                                    description="Ana sayfanın en üstünde, büyük beyaz yazı ile görünür"
                                                />
                                            </div>
                                        </div>
                                        <Textarea value={store.content.heroTitle} onChange={(e) => store.updateContent({ heroTitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Slogan (Tekil)</Label>
                                            <div className="flex items-center gap-2">
                                                <TypographyEditor fieldId="Hero-Tagline" label="Slogan" />
                                                <CMSPreview
                                                    label="Hero Slogan"
                                                    previewImage="/artifacts/hero_section_preview_1770115021977.png"
                                                    description="Ana başlığın hemen altında, tek satır olarak görünür"
                                                />
                                            </div>
                                        </div>
                                        <Input value={store.content.heroTagline} onChange={(e) => store.updateContent({ heroTagline: e.target.value })} placeholder="VERAL" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Alt Başlık Listesi (Sloganlar)</Label>
                                            <CMSPreview
                                                label="Hero Alt Başlıklar"
                                                previewImage="/artifacts/hero_section_preview_1770115021977.png"
                                                description="Slogan listesi - geçişli olabilir"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 gap-2">
                                            <Input value={store.content.heroTagline1} onChange={(e) => store.updateContent({ heroTagline1: e.target.value })} placeholder="1. Slogan" />
                                            <Input value={store.content.heroTagline2} onChange={(e) => store.updateContent({ heroTagline2: e.target.value })} placeholder="2. Slogan" />
                                            <Input value={store.content.heroTagline3} onChange={(e) => store.updateContent({ heroTagline3: e.target.value })} placeholder="3. Slogan" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Özet Açıklama</Label>
                                            <div className="flex items-center gap-2">
                                                <TypographyEditor fieldId="Hero-Eyebrow" label="Özet Açıklama" />
                                                <CMSPreview
                                                    label="Hero Açıklama Metni"
                                                    previewImage="/artifacts/hero_section_preview_1770115021977.png"
                                                    description="CTA butonunun üstünde görünür"
                                                />
                                            </div>
                                        </div>
                                        <Textarea value={store.content.heroSubtitle} onChange={(e) => store.updateContent({ heroSubtitle: e.target.value })} rows={3} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <ImageUploader label="Ana Görsel" currentImage={store.content.heroImage} onImageUploaded={(url) => store.updateContent({ heroImage: url })} folder="hero" />
                                    <div className="space-y-2">
                                        <Label>Müşteri Sayısı (Görsel Altı)</Label>
                                        <Input value={store.content.heroCustomerCount} onChange={(e) => store.updateContent({ heroCustomerCount: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Başlangıç Fiyatı</Label>
                                            <CMSPreview
                                                label="Hero CTA Butonu"
                                                previewImage="/artifacts/hero_section_preview_1770115021977.png"
                                                description="Turuncu buton - sayfanın ortasında"
                                            />
                                        </div>
                                        <Input value={store.content.heroPrice} onChange={(e) => store.updateContent({ heroPrice: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ABOUT PAGE */}
                <TabsContent value="about">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Hakkımızda Sayfası Yönetimi</CardTitle>
                            <CardDescription>Hakkımızda sayfası metinlerini, istatistiklerini ve kilometre taşlarını yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Ana Başlık</Label>
                                            <TypographyEditor fieldId="About-Title" label="Hakkımızda Başlık" />
                                        </div>
                                        <Input value={store.content.aboutTitle} onChange={(e) => store.updateContent({ aboutTitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Alt Başlık</Label>
                                            <TypographyEditor fieldId="About-Subtitle" label="Hakkımızda Alt Başlık" />
                                        </div>
                                        <Input value={store.content.aboutSubtitle} onChange={(e) => store.updateContent({ aboutSubtitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Hikaye / İçerik</Label>
                                            <TypographyEditor fieldId="About-Content" label="Hakkımızda İçerik" />
                                        </div>
                                        <Textarea value={store.content.aboutContent} onChange={(e) => store.updateContent({ aboutContent: e.target.value })} rows={5} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <ImageUploader label="Hakkımızda Görseli" currentImage={store.content.aboutImage} onImageUploaded={(url) => store.updateContent({ aboutImage: url })} folder="about" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Alt Link Metni</Label>
                                            <Input value={store.content.aboutExploreText} onChange={(e) => store.updateContent({ aboutExploreText: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Alt Link URL</Label>
                                            <Input value={store.content.aboutExploreUrl} onChange={(e) => store.updateContent({ aboutExploreUrl: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ABOUT STATS */}
                            <div className="space-y-4 pt-8 border-t border-white/5">
                                <h3 className="text-lg font-bold text-white uppercase italic tracking-widest">İstatistikler</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {(store.content.aboutStats || []).map((stat, index) => (
                                        <div key={index} className="p-4 bg-slate-800/50 rounded-xl border border-white/5 space-y-2">
                                            <div className="space-y-2">
                                                <Label>Etiket</Label>
                                                <Input value={stat.label} onChange={(e) => {
                                                    const newStats = [...store.content.aboutStats];
                                                    newStats[index].label = e.target.value;
                                                    store.updateContent({ aboutStats: newStats });
                                                }} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Değer</Label>
                                                <Input value={stat.value} onChange={(e) => {
                                                    const newStats = [...store.content.aboutStats];
                                                    newStats[index].value = e.target.value;
                                                    store.updateContent({ aboutStats: newStats });
                                                }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* MILESTONES */}
                            <div className="space-y-6 pt-8 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-white uppercase italic tracking-widest">Kilometre Taşları (Tarihçe)</h3>
                                    <button
                                        onClick={() => {
                                            const newMilestones = [...(store.content.milestones || []), { year: "2024", title: "Yeni Milestone", desc: "", icon: "Award" }];
                                            store.updateContent({ milestones: newMilestones });
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all text-sm"
                                    >
                                        <Plus className="w-4 h-4" /> Ekle
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {(store.content.milestones || []).map((ms, index) => (
                                        <div key={index} className="p-6 bg-slate-800/50 rounded-xl border border-white/5 space-y-4 relative group">
                                            <button
                                                onClick={() => {
                                                    const newMilestones = store.content.milestones.filter((_, i) => i !== index);
                                                    store.updateContent({ milestones: newMilestones });
                                                }}
                                                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Yıl</Label>
                                                    <Input value={ms.year} onChange={(e) => {
                                                        const n = [...store.content.milestones];
                                                        n[index].year = e.target.value;
                                                        store.updateContent({ milestones: n });
                                                    }} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Başlık</Label>
                                                    <Input value={ms.title} onChange={(e) => {
                                                        const n = [...store.content.milestones];
                                                        n[index].title = e.target.value;
                                                        store.updateContent({ milestones: n });
                                                    }} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>İkon (Lucide)</Label>
                                                    <Input value={ms.icon} onChange={(e) => {
                                                        const n = [...store.content.milestones];
                                                        n[index].icon = e.target.value;
                                                        store.updateContent({ milestones: n });
                                                    }} />
                                                </div>
                                                <div className="md:col-span-3 space-y-2">
                                                    <Label>Açıklama</Label>
                                                    <Textarea value={ms.desc} onChange={(e) => {
                                                        const n = [...store.content.milestones];
                                                        n[index].desc = e.target.value;
                                                        store.updateContent({ milestones: n });
                                                    }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                {/* STATS MARQUEE */}
                <TabsContent value="stats">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Kayan İstatistik Bandı</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {store.content.statsItems.map((item, index) => (
                                <div key={index} className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-white/5 items-end">
                                    <div className="flex-1 space-y-2">
                                        <Label>Metin (Etiket)</Label>
                                        <Input value={item.label} onChange={(e) => {
                                            const newStats = [...store.content.statsItems];
                                            newStats[index].label = e.target.value;
                                            store.updateContent({ statsItems: newStats });
                                        }} />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label>Değer</Label>
                                        <Input value={item.value} onChange={(e) => {
                                            const newStats = [...store.content.statsItems];
                                            newStats[index].value = e.target.value;
                                            store.updateContent({ statsItems: newStats });
                                        }} />
                                    </div>
                                    <div className="w-32 space-y-2">
                                        <Label>İkon</Label>
                                        <Input value={item.icon} onChange={(e) => {
                                            const newStats = [...store.content.statsItems];
                                            newStats[index].icon = e.target.value;
                                            store.updateContent({ statsItems: newStats });
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* FEATURES SECTION */}
                <TabsContent value="features">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Özellikler (Features)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Bölüm Başlığı</Label>
                                        <TypographyEditor fieldId="Features-Title" label="Özellikler Başlık" />
                                    </div>
                                    <Input value={store.content.featuresTitle} onChange={(e) => store.updateContent({ featuresTitle: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Alt Başlık</Label>
                                        <TypographyEditor fieldId="Features-Subtitle" label="Özellikler Alt Başlık" />
                                    </div>
                                    <Input value={store.content.featuresSubtitle} onChange={(e) => store.updateContent({ featuresSubtitle: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-6">
                                {store.content.featureItems.map((item, index) => (
                                    <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-white/5 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <ImageUploader label="Görsel" currentImage={item.image} onImageUploaded={(url) => {
                                                const newItems = [...store.content.featureItems];
                                                newItems[index].image = url;
                                                store.updateContent({ featureItems: newItems });
                                            }} folder="features" />
                                            <div className="md:col-span-2 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2"><Label>Başlık</Label><Input value={item.title} onChange={(e) => { const n = [...store.content.featureItems]; n[index].title = e.target.value; store.updateContent({ featureItems: n }); }} /></div>
                                                    <div className="space-y-2"><Label>Tag</Label><Input value={item.tag} onChange={(e) => { const n = [...store.content.featureItems]; n[index].tag = e.target.value; store.updateContent({ featureItems: n }); }} /></div>
                                                </div>
                                                <Textarea value={item.description} onChange={(e) => { const n = [...store.content.featureItems]; n[index].description = e.target.value; store.updateContent({ featureItems: n }); }} />
                                                <Input value={item.stats} onChange={(e) => { const n = [...store.content.featureItems]; n[index].stats = e.target.value; store.updateContent({ featureItems: n }); }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* REVIEWS */}
                <TabsContent value="reviews">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Müşteri Yorumları</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Başlık</Label>
                                        <TypographyEditor fieldId="Reviews-Title" label="Yorumlar Başlık" />
                                    </div>
                                    <Input value={store.content.reviewsTitle} onChange={(e) => store.updateContent({ reviewsTitle: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Alt Başlık</Label>
                                        <TypographyEditor fieldId="Reviews-Subtitle" label="Yorumlar Alt Başlık" />
                                    </div>
                                    <Input value={store.content.reviewsSubtitle} onChange={(e) => store.updateContent({ reviewsSubtitle: e.target.value })} />
                                </div>
                                <div className="space-y-2"><Label>Toplam Skor Etiketi</Label><Input value={store.content.reviewsRatingLabel} onChange={(e) => store.updateContent({ reviewsRatingLabel: e.target.value })} /></div>
                            </div>
                            <div className="space-y-4">
                                {store.content.reviewItems.map((item, index) => (
                                    <div key={index} className="p-6 bg-slate-800/50 rounded-xl border border-white/5 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input placeholder="İsim" value={item.name} onChange={(e) => { const n = [...store.content.reviewItems]; n[index].name = e.target.value; store.updateContent({ reviewItems: n }); }} />
                                            <Input placeholder="Şehir" value={item.city} onChange={(e) => { const n = [...store.content.reviewItems]; n[index].city = e.target.value; store.updateContent({ reviewItems: n }); }} />
                                        </div>
                                        <Textarea placeholder="Yorum" value={item.text} onChange={(e) => { const n = [...store.content.reviewItems]; n[index].text = e.target.value; store.updateContent({ reviewItems: n }); }} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* PROCESS */}
                <TabsContent value="process">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Üretim Süreci (Etaplar)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Başlık</Label>
                                        <TypographyEditor fieldId="Process-Title" label="Süreç Başlık" />
                                    </div>
                                    <Input value={store.content.processTitle} onChange={(e) => store.updateContent({ processTitle: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Alt Başlık</Label>
                                        <TypographyEditor fieldId="Process-Subtitle" label="Süreç Alt Başlık" />
                                    </div>
                                    <Input value={store.content.processSubtitle} onChange={(e) => store.updateContent({ processSubtitle: e.target.value })} />
                                </div>
                            </div>
                            {store.content.processItems.map((item, index) => (
                                <div key={index} className="p-4 bg-slate-800/30 rounded-lg space-y-2">
                                    <div className="flex gap-2">
                                        <Input className="w-24" value={item.stepNumber} onChange={(e) => { const n = [...store.content.processItems]; n[index].stepNumber = e.target.value; store.updateContent({ processItems: n }); }} />
                                        <Input className="flex-1" value={item.title} onChange={(e) => { const n = [...store.content.processItems]; n[index].title = e.target.value; store.updateContent({ processItems: n }); }} />
                                    </div>
                                    <Textarea value={item.desc} onChange={(e) => { const n = [...store.content.processItems]; n[index].desc = e.target.value; store.updateContent({ processItems: n }); }} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* METAL SHOWCASE */}
                <TabsContent value="showcase">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Vitrin (Showcase) Öğeleri</CardTitle>
                            <CardDescription>Anasayfadaki 3'lü büyük vitrin kartlarını yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/5 pb-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Ana Başlık</Label>
                                            <TypographyEditor fieldId="Showcase-Title" label="Vitrin Başlık" />
                                        </div>
                                        <Input value={store.content.metalShowcaseTitle} onChange={(e) => store.updateContent({ metalShowcaseTitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label>Alt Başlık</Label>
                                            <TypographyEditor fieldId="Showcase-Subtitle" label="Vitrin Alt Başlık" />
                                        </div>
                                        <Textarea value={store.content.metalShowcaseSubtitle} onChange={(e) => store.updateContent({ metalShowcaseSubtitle: e.target.value })} />
                                    </div>
                                </div>
                                <ImageUploader label="Vitrin Arka Plan" currentImage={store.content.metalShowcaseHeroImage} onImageUploaded={(url) => store.updateContent({ metalShowcaseHeroImage: url })} folder="showcase" />
                            </div>

                            {/* TRUST BADGES MANAGEMENT */}
                            <div className="space-y-4 border-b border-white/5 pb-8">
                                <h4 className="font-bold text-slate-300">Güven Rozetleri (Header Badges)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {store.content.metalShowcaseTrustBadges?.map((badge, index) => (
                                        <div key={index} className="bg-slate-800 p-4 rounded-xl border border-white/5 space-y-2">
                                            <div className="space-y-2">
                                                <Label>İkon (Lucide Name)</Label>
                                                <Input
                                                    value={badge.icon}
                                                    onChange={(e) => {
                                                        const newBadges = [...(store.content.metalShowcaseTrustBadges || [])];
                                                        newBadges[index] = { ...badge, icon: e.target.value };
                                                        store.updateContent({ metalShowcaseTrustBadges: newBadges });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Metin</Label>
                                                <Input
                                                    value={badge.text}
                                                    onChange={(e) => {
                                                        const newBadges = [...(store.content.metalShowcaseTrustBadges || [])];
                                                        newBadges[index] = { ...badge, text: e.target.value };
                                                        store.updateContent({ metalShowcaseTrustBadges: newBadges });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PRODUCT CATEGORIES (HOME CARDS) */}
                            <div className="space-y-6 pt-12 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-xl font-bold text-white uppercase tracking-widest italic">ANA SAYFA KATEGORİ KARTLARI</h4>
                                    <button
                                        onClick={() => store.cat_add()}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all text-sm"
                                    >
                                        <Plus className="w-4 h-4" /> Kart Ekle
                                    </button>
                                </div>
                                <p className="text-sm text-slate-400">Üstteki 3 ana giriş kartını yönetin. (METAL TABLOLAR, TENEKE ÜRÜNLER vb.)</p>

                                <div className="grid grid-cols-1 gap-8">
                                    {store.content.productCategories?.map((cat, index) => (
                                        <div key={cat.id || index} className="bg-slate-800/40 p-6 rounded-2xl border border-white/10 space-y-6 relative group">
                                            <button
                                                onClick={() => store.cat_remove(index)}
                                                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <ImageUploader
                                                    label={`Kart Kapak Görseli`}
                                                    currentImage={cat.coverImage}
                                                    onImageUploaded={(url) => {
                                                        const n = { ...cat, coverImage: url };
                                                        store.cat_update(index, n);
                                                    }}
                                                    folder="categories"
                                                />
                                                <div className="md:col-span-2 space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Kart Başlığı</Label>
                                                            <Input value={cat.title} onChange={(e) => store.cat_update(index, { ...cat, title: e.target.value })} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Slug (Link için)</Label>
                                                            <Input value={cat.slug} onChange={(e) => store.cat_update(index, { ...cat, slug: e.target.value })} />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Kısa Açıklama</Label>
                                                        <Textarea value={cat.description} onChange={(e) => store.cat_update(index, { ...cat, description: e.target.value })} rows={2} />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>CTA Buton Metni</Label>
                                                            <Input value={cat.ctaLabel} onChange={(e) => store.cat_update(index, { ...cat, ctaLabel: e.target.value })} />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>CTA Buton Linki</Label>
                                                            <Input value={cat.ctaLink} onChange={(e) => store.cat_update(index, { ...cat, ctaLink: e.target.value })} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* LEGACY SHOWCASE ITEMS (Keep for internal pages if needed) */}
                            <div className="space-y-6 pt-12 border-t border-white/5">
                                <h4 className="text-xl font-bold text-slate-500 uppercase tracking-widest italic opacity-50">DİĞER VİTRİN ÖĞELERİ (TEF, TEL VB.)</h4>
                                <div className="grid grid-cols-1 gap-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                                    {store.content.metalShowcaseItems?.map((item, index) => (
                                        <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-white/5 space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <ImageUploader label={`İç Sayfa Kart ${index + 1}`} currentImage={item.image} onImageUploaded={(url) => {
                                                    const n = [...store.content.metalShowcaseItems];
                                                    n[index].image = url;
                                                    store.updateContent({ metalShowcaseItems: n });
                                                }} folder="showcase" />
                                                <div className="md:col-span-2 space-y-4">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2"><Label>Başlık</Label><Input value={item.title} onChange={(e) => { const n = [...store.content.metalShowcaseItems]; n[index].title = e.target.value; store.updateContent({ metalShowcaseItems: n }); }} /></div>
                                                        <div className="space-y-2"><Label>Kategori/Kod</Label><Input value={item.category} onChange={(e) => { const n = [...store.content.metalShowcaseItems]; n[index].category = e.target.value; store.updateContent({ metalShowcaseItems: n }); }} /></div>
                                                    </div>
                                                    <Label>Açıklama</Label>
                                                    <Textarea value={item.desc} onChange={(e) => { const n = [...store.content.metalShowcaseItems]; n[index].desc = e.target.value; store.updateContent({ metalShowcaseItems: n }); }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CONTACT */}
                <TabsContent value="contact">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>İletişim Bilgileri & Footer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <Label>Şirket Bilgileri</Label>
                                    <Input placeholder="Şirket Tam İsmi" value={store.content.footerCompanyName} onChange={(e) => store.updateContent({ footerCompanyName: e.target.value })} />
                                    <Textarea placeholder="Adres" value={store.content.footerAddress} onChange={(e) => store.updateContent({ footerAddress: e.target.value })} />
                                    <Input placeholder="Telefon" value={store.content.footerPhone} onChange={(e) => store.updateContent({ footerPhone: e.target.value })} />
                                    <Input placeholder="E-Posta" value={store.content.footerEmail} onChange={(e) => store.updateContent({ footerEmail: e.target.value })} />
                                </div>
                                <div className="space-y-4">
                                    <Label>WhatsApp & Sosyal</Label>
                                    <Input placeholder="WhatsApp No (905...)" value={store.content.whatsappNumber} onChange={(e) => store.updateContent({ whatsappNumber: e.target.value })} />
                                    <Input placeholder="Instagram Kullanıcı Adı" value={store.content.footerInstagram} onChange={(e) => store.updateContent({ footerInstagram: e.target.value })} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CART PAGE CMS */}
                <TabsContent value="cart">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Sepet Sayfası Yönetimi</CardTitle>
                            <CardDescription>Alışveriş sepetindeki tüm metinleri ve özellikleri yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/5">
                                <div className="space-y-2">
                                    <Label>Sayfa Başlığı</Label>
                                    <Input value={store.content.cartPage?.title} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, title: e.target.value } })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Ödeme Buton Metni</Label>
                                    <Input value={store.content.cartPage?.checkoutButtonText} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, checkoutButtonText: e.target.value } })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Boş Sepet Başlığı</Label>
                                    <Input value={store.content.cartPage?.emptyTitle} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, emptyTitle: e.target.value } })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Alışverişe Devam Metni</Label>
                                    <Input value={store.content.cartPage?.continueShoppingText} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, continueShoppingText: e.target.value } })} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label>Boş Sepet Açıklaması</Label>
                                    <Textarea value={store.content.cartPage?.emptyDescription} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, emptyDescription: e.target.value } })} />
                                </div>
                            </div>

                            <div className="space-y-6 pb-6 border-b border-white/5">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Zap className="w-5 h-5 text-yellow-500" /> Kargo Teşvik & Progress</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Ücretsiz Kargo Alt Limiti (₺)</Label>
                                        <Input type="number" value={store.content.cartPage?.freeShippingThreshold} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, freeShippingThreshold: parseInt(e.target.value) } })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kargo Mesajı ({"{amount}"} değişkenini kullanın)</Label>
                                        <Input value={store.content.cartPage?.shippingIncentiveText} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, shippingIncentiveText: e.target.value } })} />
                                    </div>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Input type="checkbox" className="w-4 h-4" checked={store.content.cartPage?.showProgressBar} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, showProgressBar: e.target.checked } })} />
                                        <Label>İlerleme Çubuğunu Göster</Label>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>İlgili Ürünler Başlığı</Label>
                                        <Input value={store.content.cartPage?.relatedProductsTitle} onChange={(e) => store.updateContent({ cartPage: { ...store.content.cartPage, relatedProductsTitle: e.target.value } })} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white">Avantaj Blokları (Trust)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(store.content.cartPage?.advantageBlocks || []).map((block, i) => (
                                        <div key={i} className="flex gap-2 bg-white/5 p-4 rounded-xl border border-white/5">
                                            <div className="flex-1 space-y-2">
                                                <Label>İkon (Lucide)</Label>
                                                <Input value={block.icon} onChange={(e) => {
                                                    const newBlocks = [...(store.content.cartPage?.advantageBlocks || [])];
                                                    newBlocks[i].icon = e.target.value;
                                                    store.updateContent({ cartPage: { ...store.content.cartPage, advantageBlocks: newBlocks } });
                                                }} />
                                            </div>
                                            <div className="flex-[2] space-y-2">
                                                <Label>Metin</Label>
                                                <Input value={block.text} onChange={(e) => {
                                                    const newBlocks = [...(store.content.cartPage?.advantageBlocks || [])];
                                                    newBlocks[i].text = e.target.value;
                                                    store.updateContent({ cartPage: { ...store.content.cartPage, advantageBlocks: newBlocks } });
                                                }} />
                                            </div>
                                            <button onClick={() => {
                                                const newBlocks = [...(store.content.cartPage?.advantageBlocks || [])];
                                                newBlocks.splice(i, 1);
                                                store.updateContent({ cartPage: { ...store.content.cartPage, advantageBlocks: newBlocks } });
                                            }} className="text-red-500 self-center">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => {
                                        const newBlocks = [...(store.content.cartPage?.advantageBlocks || []), { icon: "ShieldCheck", text: "Yeni Avantaj" }];
                                        store.updateContent({ cartPage: { ...store.content.cartPage, advantageBlocks: newBlocks } });
                                    }} className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
                                        <Plus className="w-4 h-4" /> Blok Ekle
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CHECKOUT PAGE CMS */}
                <TabsContent value="checkout">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Ödeme Sayfası Yönetimi</CardTitle>
                            <CardDescription>Ödeme formundaki tüm metinleri ve güvenlik bloklarını yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/5">
                                <div className="space-y-2">
                                    <Label>Sayfa Başlığı</Label>
                                    <Input value={store.content.checkoutPage?.title} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, title: e.target.value } })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Siparişi Tamamla Buton Metni</Label>
                                    <Input value={store.content.checkoutPage?.completeButtonText} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, completeButtonText: e.target.value } })} />
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <Input type="checkbox" className="w-4 h-4" checked={store.content.checkoutPage?.showStepLabels} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, showStepLabels: e.target.checked } })} />
                                    <Label>Adım Etiketlerini Göster (01, 02...)</Label>
                                </div>
                            </div>

                            <div className="space-y-6 pb-6 border-b border-white/5">
                                <h3 className="text-lg font-bold text-white">Adım Etiketleri</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label>Teslimat Adımı</Label>
                                        <Input value={store.content.checkoutPage?.stepLabels?.shipping} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, stepLabels: { ...store.content.checkoutPage.stepLabels, shipping: e.target.value } } })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Fatura Adımı</Label>
                                        <Input value={store.content.checkoutPage?.stepLabels?.billing} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, stepLabels: { ...store.content.checkoutPage.stepLabels, billing: e.target.value } } })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ödeme Adımı</Label>
                                        <Input value={store.content.checkoutPage?.stepLabels?.payment} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, stepLabels: { ...store.content.checkoutPage.stepLabels, payment: e.target.value } } })} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6 pb-6 border-b border-white/5">
                                <h3 className="text-lg font-bold text-white">Güvenlik Blokları (Trust)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {(store.content.checkoutPage?.trustBlocks || []).map((block, i) => (
                                        <div key={i} className="flex gap-2 bg-white/5 p-4 rounded-xl border border-white/5">
                                            <div className="flex-1 space-y-2">
                                                <Label>İkon</Label>
                                                <Input value={block.icon} onChange={(e) => {
                                                    const newBlocks = [...(store.content.checkoutPage?.trustBlocks || [])];
                                                    newBlocks[i].icon = e.target.value;
                                                    store.updateContent({ checkoutPage: { ...store.content.checkoutPage, trustBlocks: newBlocks } });
                                                }} />
                                            </div>
                                            <div className="flex-[2] space-y-2">
                                                <Label>Başlık</Label>
                                                <Input value={block.title} onChange={(e) => {
                                                    const newBlocks = [...(store.content.checkoutPage?.trustBlocks || [])];
                                                    newBlocks[i].title = e.target.value;
                                                    store.updateContent({ checkoutPage: { ...store.content.checkoutPage, trustBlocks: newBlocks } });
                                                }} />
                                            </div>
                                            <button onClick={() => {
                                                const newBlocks = [...(store.content.checkoutPage?.trustBlocks || [])];
                                                newBlocks.splice(i, 1);
                                                store.updateContent({ checkoutPage: { ...store.content.checkoutPage, trustBlocks: newBlocks } });
                                            }} className="text-red-500 self-center">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button onClick={() => {
                                        const newBlocks = [...(store.content.checkoutPage?.trustBlocks || []), { icon: "Lock", title: "Yeni Güvenlik Bloğu" }];
                                        store.updateContent({ checkoutPage: { ...store.content.checkoutPage, trustBlocks: newBlocks } });
                                    }} className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
                                        <Plus className="w-4 h-4" /> Blok Ekle
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white">Yasal Metinler & Başarı Mesajı</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label>Yasal Onay Metni (HTML destekler)</Label>
                                        <Textarea value={store.content.checkoutPage?.legalText} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, legalText: e.target.value } })} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Başarı Başlığı</Label>
                                            <Input value={store.content.checkoutPage?.successTitle} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, successTitle: e.target.value } })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Başarı Mesajı</Label>
                                            <Textarea value={store.content.checkoutPage?.successMessage} onChange={(e) => store.updateContent({ checkoutPage: { ...store.content.checkoutPage, successMessage: e.target.value } })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* INSTAGRAM */}
                <TabsContent value="instagram">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Instagram Akışı</CardTitle>
                            <CardDescription>Anasayfadaki Instagram bandını ve resimleri yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <InstagramAdmin />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* QUOTE PAGE CMS */}
                <TabsContent value="quote">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Teklif Sayfası (Lead Gen) Yönetimi</CardTitle>
                            <CardDescription>B2B teklif alma sayfasındaki tüm metinleri ve ayarları yönetin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-12">
                            {/* SEO & HEADER */}
                            <div className="bg-black/20 p-8 rounded-2xl border border-white/5 space-y-6">
                                <h3 className="text-lg font-bold text-orange-500 flex items-center gap-2">
                                    <Layout className="w-5 h-5" /> Sayfa Giriş & SEO
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Ana Başlık (H1)</Label>
                                        <Input
                                            value={store.content.quotePage?.title}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, title: e.target.value } })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Üst Etiket (Subtitle)</Label>
                                        <Input
                                            value={store.content.quotePage?.subtitle}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, subtitle: e.target.value } })}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label>Açıklama Metni</Label>
                                        <Textarea
                                            value={store.content.quotePage?.description}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, description: e.target.value } })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>SEO Başlık</Label>
                                        <Input
                                            value={store.content.quotePage?.seoTitle}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, seoTitle: e.target.value } })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>SEO Açıklama</Label>
                                        <Input
                                            value={store.content.quotePage?.seoDescription}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, seoDescription: e.target.value } })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* FORM LABELS */}
                            <div className="space-y-8">
                                <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Form Bölümleri & Alan İsimleri</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Contact Section */}
                                    <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Phone className="w-4 h-4" /> İletişim Bölümü
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Bölüm Başlığı</Label>
                                                <Input value={store.content.quotePage?.contactSectionTitle} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, contactSectionTitle: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Ad Soyad Etiketi</Label>
                                                <Input value={store.content.quotePage?.nameLabel} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, nameLabel: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>E-posta Etiketi</Label>
                                                <Input value={store.content.quotePage?.emailLabel} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, emailLabel: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Telefon Etiketi</Label>
                                                <Input value={store.content.quotePage?.phoneLabel} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, phoneLabel: e.target.value } })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Section */}
                                    <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" /> Proje Bölümü
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Bölüm Başlığı</Label>
                                                <Input value={store.content.quotePage?.projectSectionTitle} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, projectSectionTitle: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Hizmet Tipi Etiketi</Label>
                                                <Input value={store.content.quotePage?.serviceLabel} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, serviceLabel: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Açıklama Etiketi</Label>
                                                <Input value={store.content.quotePage?.descriptionLabel} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, descriptionLabel: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Adet/Miktar Etiketi</Label>
                                                <Input value={store.content.quotePage?.quantityLabel} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, quantityLabel: e.target.value } })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Upload Section */}
                                    <div className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                                        <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Repeat className="w-4 h-4" /> Yükleme Bölümü
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Bölüm Başlığı</Label>
                                                <Input value={store.content.quotePage?.uploadSectionTitle} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, uploadSectionTitle: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Dosya Alanı Etiketi</Label>
                                                <Input value={store.content.quotePage?.fileLabel} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, fileLabel: e.target.value } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Maks. Dosya Sayısı</Label>
                                                <Input type="number" value={store.content.quotePage?.maxFiles} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, maxFiles: parseInt(e.target.value) } })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Maks. Boyut (MB)</Label>
                                                <Input type="number" value={store.content.quotePage?.maxSizeMB} onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, maxSizeMB: parseInt(e.target.value) } })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DROPDOWN OPTIONS */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Hizmet Seçenekleri (Dropdown)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {(store.content.quotePage?.serviceOptions || []).map((opt, i) => (
                                        <div key={i} className="flex gap-2">
                                            <Input
                                                value={opt}
                                                onChange={(e) => {
                                                    const newOpts = [...(store.content.quotePage?.serviceOptions || [])];
                                                    newOpts[i] = e.target.value;
                                                    store.updateContent({ quotePage: { ...store.content.quotePage, serviceOptions: newOpts } });
                                                }}
                                            />
                                            <button
                                                onClick={() => {
                                                    const newOpts = [...(store.content.quotePage?.serviceOptions || [])];
                                                    newOpts.splice(i, 1);
                                                    store.updateContent({ quotePage: { ...store.content.quotePage, serviceOptions: newOpts } });
                                                }}
                                                className="text-red-500 p-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newOpts = [...(store.content.quotePage?.serviceOptions || []), "Yeni Hizmet Seçeneği"];
                                            store.updateContent({ quotePage: { ...store.content.quotePage, serviceOptions: newOpts } });
                                        }}
                                        className="border border-dashed border-white/10 rounded-xl p-2 text-slate-500 hover:text-white transition-all text-xs"
                                    >
                                        + Seçenek Ekle
                                    </button>
                                </div>
                            </div>

                            {/* TRUST BLOCKS */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4">Güven Blokları (Sağ Panel)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {(store.content.quotePage?.trustBlocks || []).map((block, i) => (
                                        <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 space-y-4">
                                            <div className="space-y-2">
                                                <Label>İkon (Lucide)</Label>
                                                <Input
                                                    value={block.icon}
                                                    onChange={(e) => {
                                                        const newBlocks = [...(store.content.quotePage?.trustBlocks || [])];
                                                        newBlocks[i].icon = e.target.value;
                                                        store.updateContent({ quotePage: { ...store.content.quotePage, trustBlocks: newBlocks } });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Başlık</Label>
                                                <Input
                                                    value={block.title}
                                                    onChange={(e) => {
                                                        const newBlocks = [...(store.content.quotePage?.trustBlocks || [])];
                                                        newBlocks[i].title = e.target.value;
                                                        store.updateContent({ quotePage: { ...store.content.quotePage, trustBlocks: newBlocks } });
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Açıklama</Label>
                                                <Textarea
                                                    value={block.description}
                                                    onChange={(e) => {
                                                        const newBlocks = [...(store.content.quotePage?.trustBlocks || [])];
                                                        newBlocks[i].description = e.target.value;
                                                        store.updateContent({ quotePage: { ...store.content.quotePage, trustBlocks: newBlocks } });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* SUCCESS MESSAGES */}
                            <div className="bg-emerald-500/5 p-8 rounded-2xl border border-emerald-500/20 space-y-6">
                                <h3 className="text-lg font-bold text-emerald-500 flex items-center gap-2">
                                    <Star className="w-5 h-5" /> Başarılı Gönderim Ekranı
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Başarı Başlığı</Label>
                                        <Input
                                            value={store.content.quotePage?.successTitle}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, successTitle: e.target.value } })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gönder Buton Metni</Label>
                                        <Input
                                            value={store.content.quotePage?.submitButtonText}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, submitButtonText: e.target.value } })}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label>Başarı Mesajı</Label>
                                        <Textarea
                                            value={store.content.quotePage?.successMessage}
                                            onChange={(e) => store.updateContent({ quotePage: { ...store.content.quotePage, successMessage: e.target.value } })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div >
    )
}
