"use client"

import * as React from "react"
import { useContentStore } from "@/store/useContentStore"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2, Plus, Trash2, Instagram, Star, MessageSquare, Repeat, Phone, Layout } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { InstagramAdmin } from "@/components/admin/InstagramAdmin"

export const SiteContentAdmin = () => {
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

            <Tabs defaultValue="hero" className="w-full space-y-6">
                <TabsList className="w-full bg-slate-900/50 p-1 rounded-xl border border-white/5 flex flex-wrap h-auto gap-1">
                    <TabsTrigger value="branding" className="flex-1 min-w-[120px]">Marka & Logo</TabsTrigger>
                    <TabsTrigger value="hero" className="flex-1 min-w-[120px]">Hero</TabsTrigger>
                    <TabsTrigger value="stats" className="flex-1 min-w-[120px]">İstatistikler</TabsTrigger>
                    <TabsTrigger value="features" className="flex-1 min-w-[120px]">Özellikler</TabsTrigger>
                    <TabsTrigger value="reviews" className="flex-1 min-w-[120px]">Yorumlar</TabsTrigger>
                    <TabsTrigger value="process" className="flex-1 min-w-[120px]">Süreç</TabsTrigger>
                    <TabsTrigger value="showcase" className="flex-1 min-w-[120px]">Vitrin</TabsTrigger>
                    <TabsTrigger value="contact" className="flex-1 min-w-[120px]">İletişim</TabsTrigger>
                    <TabsTrigger value="instagram" className="flex-1 min-w-[120px] text-[#E1306C] data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">Instagram</TabsTrigger>
                </TabsList>

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
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Ana Başlık</Label>
                                        <Textarea value={store.content.heroTitle} onChange={(e) => store.updateContent({ heroTitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alt Başlık Listesi (Sloganlar)</Label>
                                        <div className="grid grid-cols-1 gap-2">
                                            <Input value={store.content.heroTagline1} onChange={(e) => store.updateContent({ heroTagline1: e.target.value })} placeholder="1. Slogan" />
                                            <Input value={store.content.heroTagline2} onChange={(e) => store.updateContent({ heroTagline2: e.target.value })} placeholder="2. Slogan" />
                                            <Input value={store.content.heroTagline3} onChange={(e) => store.updateContent({ heroTagline3: e.target.value })} placeholder="3. Slogan" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Özet Açıklama</Label>
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
                                        <Label>Başlangıç Fiyatı</Label>
                                        <Input value={store.content.heroPrice} onChange={(e) => store.updateContent({ heroPrice: e.target.value })} />
                                    </div>
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
                                    <Label>Bölüm Başlığı</Label>
                                    <Input value={store.content.featuresTitle} onChange={(e) => store.updateContent({ featuresTitle: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Alt Başlık</Label>
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
                                <div className="space-y-2"><Label>Başlık</Label><Input value={store.content.reviewsTitle} onChange={(e) => store.updateContent({ reviewsTitle: e.target.value })} /></div>
                                <div className="space-y-2"><Label>Alt Başlık</Label><Input value={store.content.reviewsSubtitle} onChange={(e) => store.updateContent({ reviewsSubtitle: e.target.value })} /></div>
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
                                <Input value={store.content.processTitle} onChange={(e) => store.updateContent({ processTitle: e.target.value })} />
                                <Input value={store.content.processSubtitle} onChange={(e) => store.updateContent({ processSubtitle: e.target.value })} />
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
                                        <Label>Ana Başlık</Label>
                                        <Input value={store.content.metalShowcaseTitle} onChange={(e) => store.updateContent({ metalShowcaseTitle: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alt Başlık</Label>
                                        <Textarea value={store.content.metalShowcaseSubtitle} onChange={(e) => store.updateContent({ metalShowcaseSubtitle: e.target.value })} />
                                    </div>
                                </div>
                                <ImageUploader label="Vitrin Arka Plan" currentImage={store.content.metalShowcaseHeroImage} onImageUploaded={(url) => store.updateContent({ metalShowcaseHeroImage: url })} folder="showcase" />
                            </div>

                            <div className="grid grid-cols-1 gap-8">
                                {store.content.metalShowcaseItems?.map((item, index) => (
                                    <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-white/5 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <ImageUploader label={`Kart ${index + 1} Görseli`} currentImage={item.image} onImageUploaded={(url) => {
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

            </Tabs>
        </div>
    )
}
