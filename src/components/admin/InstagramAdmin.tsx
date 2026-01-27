"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, GripVertical, CheckCircle2, Instagram, Heart, Upload, Loader2, Link as LinkIcon, FileImage, AlertCircle } from "lucide-react"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as actions from "@/lib/actions/instagram.actions"
import { cn } from "@/lib/utils"
import { uploadImage } from "@/lib/supabase/storage.service"

export const InstagramAdmin = () => {
    const [posts, setPosts] = React.useState<actions.InstagramPost[]>([])
    const [loading, setLoading] = React.useState(true)
    const [addDialogOpen, setAddDialogOpen] = React.useState(false)
    const [bulkUploading, setBulkUploading] = React.useState(false)
    const [uploadProgress, setUploadProgress] = React.useState({ current: 0, total: 0, status: "" })

    // Single Post State
    const [newPost, setNewPost] = React.useState({
        image_url: "",
        permalink: "https://instagram.com/veralteneketicaret",
        likes: 0
    })

    // Bulk URL State
    const [bulkUrls, setBulkUrls] = React.useState("")

    const loadPosts = async () => {
        setLoading(true)
        try {
            const res = await actions.getAllInstagramPosts()
            if (res.success && res.data) {
                setPosts(res.data)
            } else if (res.error) {
                console.error("Load error:", res.error)
            }
        } catch (error) {
            console.error("Critical load error:", error)
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadPosts()
    }, [])

    const handleAddSingle = async () => {
        if (!newPost.image_url) return
        setLoading(true)
        try {
            const result = await actions.addInstagramPost({
                ...newPost,
                display_order: posts.length,
                is_active: true
            })

            if (result.success) {
                setAddDialogOpen(false)
                setNewPost({ image_url: "", permalink: "https://instagram.com/veralteneketicaret", likes: 0 })
                await loadPosts()
            } else {
                alert(`Hata: ${result.error || "Bilinmeyen bir hata oluştu"}`)
            }
        } catch (e: any) {
            alert(`Hata: ${e.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleBulkUrlUpload = async () => {
        if (!bulkUrls.trim()) return

        const urls = bulkUrls.split('\n').map(u => u.trim()).filter(u => u.length > 0)
        if (urls.length === 0) return

        setBulkUploading(true)
        setUploadProgress({ current: 0, total: urls.length, status: "Veritabanına ekleniyor..." })

        try {
            for (let i = 0; i < urls.length; i++) {
                const result = await actions.addInstagramPost({
                    image_url: urls[i],
                    permalink: "https://instagram.com/veralteneketicaret",
                    likes: 0,
                    display_order: posts.length + i,
                    is_active: true
                })

                if (!result.success) {
                    console.error(`URL ${i + 1} fail:`, result.error)
                }
                setUploadProgress(prev => ({ ...prev, current: i + 1 }))
            }
            alert("Toplu URL yükleme tamamlandı.")
        } catch (error: any) {
            alert(`Hata: ${error.message}`)
        } finally {
            setBulkUploading(false)
            setAddDialogOpen(false)
            setBulkUrls("")
            await loadPosts()
        }
    }

    const handleBulkFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        const files = Array.from(e.target.files)
        setBulkUploading(true)
        setUploadProgress({ current: 0, total: files.length, status: "Hazırlanıyor..." })

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                setUploadProgress(prev => ({ ...prev, status: `${file.name} yükleniyor...` }))

                // 1. Upload to Supabase Storage
                const publicUrl = await uploadImage(file, "instagram")

                // 2. Add to Site Content JSON
                const result = await actions.addInstagramPost({
                    image_url: publicUrl,
                    permalink: "https://instagram.com/veralteneketicaret",
                    likes: 0,
                    display_order: posts.length + i,
                    is_active: true
                })

                if (!result.success) {
                    throw new Error(result.error || "Veritabanına eklenirken hata oluştu.")
                }

                setUploadProgress(prev => ({ ...prev, current: i + 1 }))
            }
            alert("Tüm fotoğraflar başarıyla yüklendi.")
        } catch (error: any) {
            console.error("Bulk upload error:", error)
            alert(`Yükleme sırasında hata oluştu: ${error.message}`)
        } finally {
            setBulkUploading(false)
            setAddDialogOpen(false)
            await loadPosts()
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) return
        setLoading(true)
        try {
            const result = await actions.deleteInstagramPost(id)
            if (result.success) {
                await loadPosts()
            } else {
                alert(`Hata: ${result.error}`)
            }
        } catch (e: any) {
            alert(`Hata: ${e.message}`)
        } finally {
            setLoading(false)
        }
    }

    const toggleStatus = async (post: actions.InstagramPost) => {
        try {
            const result = await actions.updateInstagramPost(post.id, { is_active: !post.is_active })
            if (result.success) {
                await loadPosts()
            }
        } catch (e: any) {
            alert(`Hata: ${e.message}`)
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Instagram className="w-6 h-6 text-[#E1306C]" />
                        Instagram Feed
                    </h3>
                    <p className="text-sm text-slate-400">@veralteneketicaret akışını yönetin</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => loadPosts()}
                        disabled={loading}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                        title="Yenile"
                    >
                        <Loader2 className={cn("w-5 h-5", loading && "animate-spin")} />
                    </button>
                    <button
                        onClick={() => setAddDialogOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#E1306C] hover:bg-[#C13584] text-white rounded-lg font-bold transition-all shadow-lg shadow-[#E1306C]/20"
                    >
                        <Plus className="w-4 h-4" />
                        Yeni Gönderi Ekle
                    </button>
                </div>
            </div>

            {loading && posts.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-500">
                    <Loader2 className="w-12 h-12 animate-spin" />
                    <p className="font-medium">Feed yükleniyor...</p>
                </div>
            ) : posts.length === 0 ? (
                <div className="py-20 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-4 text-slate-500">
                    <Instagram className="w-16 h-16 opacity-20" />
                    <p className="font-medium">Henüz içerik eklenmemiş.</p>
                    <button
                        onClick={() => setAddDialogOpen(true)}
                        className="text-[#E1306C] font-bold hover:underline"
                    >
                        İlk gönderiyi ekleyin
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={cn(
                                "relative aspect-square group rounded-xl overflow-hidden border border-white/10 bg-slate-900 group",
                                !post.is_active && "opacity-50 grayscale"
                            )}
                        >
                            <img
                                src={post.image_url}
                                alt="Instagram"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                                <div className="flex items-center gap-1 text-white font-bold">
                                    <Heart className="w-4 h-4 fill-white" />
                                    {post.likes}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => toggleStatus(post)}
                                        className={cn(
                                            "p-2 rounded-full transition-colors",
                                            post.is_active ? "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white"
                                        )}
                                        title={post.is_active ? "Pasife Al" : "Aktifleştir"}
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Order Badge */}
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur rounded text-[10px] font-mono text-white/70">
                                #{index + 1}
                            </div>
                        </motion.div>
                    ))}

                    {/* Quick Add Button */}
                    <button
                        onClick={() => setAddDialogOpen(true)}
                        className="aspect-square rounded-xl border-dashed border-2 border-white/5 hover:border-[#E1306C] hover:bg-[#E1306C]/5 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-[#E1306C] transition-all"
                    >
                        <Plus className="w-8 h-8" />
                        <span className="text-xs font-bold">Daha Fazla</span>
                    </button>
                </div>
            )}

            <Dialog open={addDialogOpen} onOpenChange={(open) => !bulkUploading && setAddDialogOpen(open)}>
                <DialogContent className="sm:max-w-md bg-[#0F172A] border border-white/10 text-white shadow-2xl">
                    <DialogTitle className="text-2xl font-bold">Fotoğrafları Ekle</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Toplu veya tek tek içerik ekleyebilirsiniz.
                    </DialogDescription>

                    {bulkUploading ? (
                        <div className="py-12 flex flex-col items-center justify-center gap-6">
                            <div className="relative">
                                <Loader2 className="w-16 h-16 text-[#E1306C] animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                                    %{Math.round((uploadProgress.current / uploadProgress.total) * 100)}
                                </div>
                            </div>
                            <div className="text-center space-y-2">
                                <p className="font-bold text-lg">Yükleme Sürüyor...</p>
                                <p className="text-slate-400 text-sm">
                                    {uploadProgress.current} / {uploadProgress.total} tamamlandı
                                </p>
                                <p className="text-[#E1306C] text-[10px] font-mono animate-pulse uppercase tracking-widest">
                                    {uploadProgress.status}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <Tabs defaultValue="bulk-file" className="w-full mt-4">
                            <TabsList className="w-full grid grid-cols-3 bg-slate-800/50 p-1 rounded-lg">
                                <TabsTrigger value="single" className="data-[state=active]:bg-[#E1306C]">Tekli</TabsTrigger>
                                <TabsTrigger value="bulk-file" className="data-[state=active]:bg-[#E1306C]">Dosya</TabsTrigger>
                                <TabsTrigger value="bulk-url" className="data-[state=active]:bg-[#E1306C]">URL</TabsTrigger>
                            </TabsList>

                            {/* SINGLE MODE */}
                            <TabsContent value="single" className="space-y-4 pt-4">
                                <ImageUploader
                                    label="Fotoğraf Seç"
                                    currentImage={newPost.image_url}
                                    onImageUploaded={(url) => setNewPost({ ...newPost, image_url: url })}
                                    folder="instagram"
                                />
                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs uppercase tracking-wider">Instagram Linki (Opsiyonel)</Label>
                                    <Input
                                        value={newPost.permalink}
                                        placeholder="https://instagram.com/p/..."
                                        onChange={(e) => setNewPost({ ...newPost, permalink: e.target.value })}
                                        className="bg-slate-800/50 border-white/5 focus:border-[#E1306C] transition-colors"
                                    />
                                </div>
                                <button
                                    onClick={handleAddSingle}
                                    disabled={!newPost.image_url || loading}
                                    className="w-full py-3 bg-[#E1306C] hover:bg-[#C13584] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#E1306C]/20 disabled:opacity-50"
                                >
                                    {loading ? "Ekleniyor..." : "Listeye Kaydet"}
                                </button>
                            </TabsContent>

                            {/* BULK FILE UPLOAD */}
                            <TabsContent value="bulk-file" className="space-y-4 pt-4">
                                <div className="border-2 border-dashed border-white/5 hover:border-[#E1306C] hover:bg-[#E1306C]/5 rounded-2xl p-12 transition-all text-center relative cursor-pointer group">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleBulkFileUpload}
                                    />
                                    <div className="flex flex-col items-center gap-4 pointer-events-none">
                                        <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                                            <Upload className="w-10 h-10 text-[#E1306C]" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-xl mb-1">Dosyaları Bırakın</p>
                                            <p className="text-slate-500 text-sm">Veya buraya tıklayarak bilgisayardan çoklu seçim yapın.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 text-[11px] text-blue-400">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <p>Seçtiğiniz fotoğraflar sırayla Supabase Bulut Depolama'ya yüklenecek ve ardından site içeriğine kaydedilecek.</p>
                                </div>
                            </TabsContent>

                            {/* BULK URL UPLOAD */}
                            <TabsContent value="bulk-url" className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-400 text-xs uppercase tracking-wider">Fotoğraf Linkleri (Her satıra bir adet)</Label>
                                    <Textarea
                                        value={bulkUrls}
                                        onChange={(e) => setBulkUrls(e.target.value)}
                                        rows={8}
                                        placeholder={"https://resimler.com/img1.jpg\nhttps://resimler.com/img2.jpg"}
                                        className="bg-slate-800/50 border-white/5 focus:border-[#E1306C] font-mono text-xs leading-relaxed"
                                    />
                                </div>
                                <button
                                    onClick={handleBulkUrlUpload}
                                    disabled={!bulkUrls.trim() || bulkUploading}
                                    className="w-full py-3 bg-[#E1306C] hover:bg-[#C13584] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#E1306C]/20 disabled:opacity-50"
                                >
                                    {bulkUrls ? `${bulkUrls.split('\n').filter(x => x.trim()).length} Görseli Kaydet` : "Görselleri Kaydet"}
                                </button>
                            </TabsContent>
                        </Tabs>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
