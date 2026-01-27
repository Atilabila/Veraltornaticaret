"use client"

import * as React from "react"
import { useContentStore } from "@/store/useContentStore"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Loader2, Plus, Trash2, Instagram } from "lucide-react"
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
                        Hero, Vitrin ve genel site ayarlarını buradan yönetebilirsiniz.
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
                    <TabsTrigger value="hero" className="flex-1 min-w-[120px]">Hero Alanı</TabsTrigger>
                    <TabsTrigger value="features" className="flex-1 min-w-[120px]">Özellikler</TabsTrigger>
                    <TabsTrigger value="showcase" className="flex-1 min-w-[120px]">Vitrin</TabsTrigger>
                    <TabsTrigger value="instagram" className="flex-1 min-w-[120px] text-[#E1306C] data-[state=active]:bg-[#E1306C] data-[state=active]:text-white">Instagram</TabsTrigger>
                    <TabsTrigger value="about" className="flex-1 min-w-[120px]">Hakkımızda</TabsTrigger>
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
                            <CardTitle>Ana Sayfa Hero Alanı</CardTitle>
                            <CardDescription>Sitenin en üstündeki karşılama alanı</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Başlık (H1)</Label>
                                        <Textarea
                                            value={store.content.heroTitle}
                                            onChange={(e) => store.updateContent({ heroTitle: e.target.value })}
                                            rows={2}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alt Başlık</Label>
                                        <Textarea
                                            value={store.content.heroSubtitle}
                                            onChange={(e) => store.updateContent({ heroSubtitle: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Slogan (Tagline)</Label>
                                        <Input
                                            value={store.content.heroTagline}
                                            onChange={(e) => store.updateContent({ heroTagline: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Fiyat Gösterimi</Label>
                                        <Input
                                            value={store.content.heroPrice}
                                            onChange={(e) => store.updateContent({ heroPrice: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <ImageUploader
                                        label="Hero Ana Görsel"
                                        currentImage={store.content.heroImage}
                                        onImageUploaded={(url) => store.updateContent({ heroImage: url })}
                                        folder="hero"
                                    />
                                    <div className="mt-4 p-4 bg-slate-800 rounded-xl text-xs text-slate-400">
                                        İpucu: Geniş ve yüksek çözünürlüklü (1920px+) görseller tercih edin.
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                <div className="space-y-2">
                                    <Label>Buton 1 Metni</Label>
                                    <Input
                                        value={store.content.heroButton1Text}
                                        onChange={(e) => store.updateContent({ heroButton1Text: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Buton 1 Linki</Label>
                                    <Input
                                        value={store.content.heroButton1Url}
                                        onChange={(e) => store.updateContent({ heroButton1Url: e.target.value })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* FEATURES SECTION */}
                <TabsContent value="features">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Özellikler (Features)</CardTitle>
                            <CardDescription>Ana sayfadaki 3'lü özellik kutusu</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-4 border-b border-white/5 pb-6">
                                <Label className="text-lg text-orange-500">Bölüm Başlıkları</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Başlık</Label>
                                        <Input
                                            value={store.content.featuresTitle}
                                            onChange={(e) => store.updateContent({ featuresTitle: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alt Başlık</Label>
                                        <Input
                                            value={store.content.featuresSubtitle}
                                            onChange={(e) => store.updateContent({ featuresSubtitle: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {store.content.featureItems.map((item, index) => (
                                    <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-white/5 space-y-4 relative group">
                                        <div className="absolute top-4 right-4 text-xs font-mono text-slate-500">
                                            #{index + 1}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-1">
                                                <ImageUploader
                                                    label="Özellik Görseli (İkon/Resim)"
                                                    currentImage={item.image}
                                                    onImageUploaded={(url) => {
                                                        const newItems = [...store.content.featureItems]
                                                        newItems[index] = { ...item, image: url }
                                                        store.updateContent({ featureItems: newItems })
                                                    }}
                                                    folder="features"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Başlık</Label>
                                                        <Input
                                                            value={item.title}
                                                            onChange={(e) => {
                                                                const newItems = [...store.content.featureItems]
                                                                newItems[index] = { ...item, title: e.target.value }
                                                                store.updateContent({ featureItems: newItems })
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Etiket (Tag)</Label>
                                                        <Input
                                                            value={item.tag}
                                                            onChange={(e) => {
                                                                const newItems = [...store.content.featureItems]
                                                                newItems[index] = { ...item, tag: e.target.value }
                                                                store.updateContent({ featureItems: newItems })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Açıklama</Label>
                                                    <Textarea
                                                        value={item.description}
                                                        onChange={(e) => {
                                                            const newItems = [...store.content.featureItems]
                                                            newItems[index] = { ...item, description: e.target.value }
                                                            store.updateContent({ featureItems: newItems })
                                                        }}
                                                        rows={2}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>İstatistik Metni (Alt kısım)</Label>
                                                    <Input
                                                        value={item.stats}
                                                        onChange={(e) => {
                                                            const newItems = [...store.content.featureItems]
                                                            newItems[index] = { ...item, stats: e.target.value }
                                                            store.updateContent({ featureItems: newItems })
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* METAL SHOWCASE */}
                <TabsContent value="showcase">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Metal Vitrin (Grid)</CardTitle>
                            <CardDescription>Görsel vitrin alanı ayarları</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Başlık</Label>
                                        <Input
                                            value={store.content.metalShowcaseTitle}
                                            onChange={(e) => store.updateContent({ metalShowcaseTitle: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alt Başlık</Label>
                                        <Textarea
                                            value={store.content.metalShowcaseSubtitle}
                                            onChange={(e) => store.updateContent({ metalShowcaseSubtitle: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <ImageUploader
                                        label="Vitrin Arka Plan / Hero Görseli"
                                        currentImage={store.content.metalShowcaseHeroImage}
                                        onImageUploaded={(url) => store.updateContent({ metalShowcaseHeroImage: url })}
                                        folder="showcase"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* INSTAGRAM */}
                <TabsContent value="instagram">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Sosyal Medya Akışı</CardTitle>
                            <CardDescription>
                                @veralteneketicaret Instagram akışını buradan yönetebilirsiniz.
                                "Ajanımız" veya siz buradan görsel eklediğinizde anasayfada otomatik olarak kayan yazı (marquee) şeklinde görünür.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <InstagramAdmin />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ABOUT SECTION */}
                <TabsContent value="about">
                    <Card className="bg-slate-900 border-white/10">
                        <CardHeader>
                            <CardTitle>Hakkımızda Sayfası</CardTitle>
                            <CardDescription>Kurumsal içerik ve görsel</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Başlık</Label>
                                        <Input
                                            value={store.content.aboutTitle}
                                            onChange={(e) => store.updateContent({ aboutTitle: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Alt Başlık / Slogan</Label>
                                        <Input
                                            value={store.content.aboutSubtitle}
                                            onChange={(e) => store.updateContent({ aboutSubtitle: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ana Metin</Label>
                                        <Textarea
                                            value={store.content.aboutContent}
                                            onChange={(e) => store.updateContent({ aboutContent: e.target.value })}
                                            rows={6}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <ImageUploader
                                        label="Hakkımızda Görseli"
                                        currentImage={store.content.aboutImage}
                                        onImageUploaded={(url) => store.updateContent({ aboutImage: url })}
                                        folder="about"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <Label className="mb-4 block">İstatistikler</Label>
                                <div className="grid grid-cols-3 gap-4">
                                    {store.content.aboutStats.map((stat, index) => (
                                        <div key={index} className="bg-slate-800 p-4 rounded-lg space-y-2">
                                            <Input
                                                placeholder="Değer (örn: 5+)"
                                                value={stat.value}
                                                onChange={(e) => store.updateAboutStat(index, { ...stat, value: e.target.value })}
                                                className="font-bold text-orange-500"
                                            />
                                            <Input
                                                placeholder="Etiket (örn: Yıllık Deneyim)"
                                                value={stat.label}
                                                onChange={(e) => store.updateAboutStat(index, { ...stat, label: e.target.value })}
                                                className="text-xs"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    )
}
