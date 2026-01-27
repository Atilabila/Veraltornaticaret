"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, GripVertical, CheckCircle2, Instagram, Heart } from "lucide-react"
import { ImageUploader } from "@/components/admin/ImageUploader"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import * as actions from "@/lib/actions/instagram.actions"
import { cn } from "@/lib/utils"

export const InstagramAdmin = () => {
    const [posts, setPosts] = React.useState<actions.InstagramPost[]>([])
    const [loading, setLoading] = React.useState(true)
    const [addDialogOpen, setAddDialogOpen] = React.useState(false)

    // New Post State
    const [newPost, setNewPost] = React.useState({
        image_url: "",
        permalink: "https://instagram.com/veralteneketicaret",
        likes: 0
    })

    const loadPosts = async () => {
        setLoading(true)
        const res = await actions.getAllInstagramPosts()
        if (res.success && res.data) {
            setPosts(res.data)
        }
        setLoading(false)
    }

    React.useEffect(() => {
        loadPosts()
    }, [])

    const handleAdd = async () => {
        if (!newPost.image_url) return
        await actions.addInstagramPost({
            ...newPost,
            display_order: posts.length,
            is_active: true
        })
        setAddDialogOpen(false)
        setNewPost({ image_url: "", permalink: "https://instagram.com/veralteneketicaret", likes: 0 })
        loadPosts()
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) return
        await actions.deleteInstagramPost(id)
        loadPosts()
    }

    const toggleStatus = async (post: actions.InstagramPost) => {
        await actions.updateInstagramPost(post.id, { is_active: !post.is_active })
        loadPosts()
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
                <button
                    onClick={() => setAddDialogOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E1306C] hover:bg-[#C13584] text-white rounded-lg font-bold transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Yeni Gönderi
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={cn(
                            "relative aspect-square group rounded-xl overflow-hidden border border-white/10 bg-slate-800",
                            !post.is_active && "opacity-50 grayscale"
                        )}
                    >
                        <img
                            src={post.image_url}
                            alt="Instagram"
                            className="w-full h-full object-cover"
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
                                        post.is_active ? "bg-emerald-500/20 text-emerald-500" : "bg-slate-700 text-slate-400"
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

                {/* Empty State / Add Button */}
                <button
                    onClick={() => setAddDialogOpen(true)}
                    className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-[#E1306C] hover:bg-[#E1306C]/5 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-[#E1306C] transition-all"
                >
                    <Plus className="w-8 h-8" />
                    <span className="text-xs font-bold">Manuel Ekle</span>
                </button>
            </div>

            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogContent>
                    <DialogTitle>Yeni Instagram Gönderisi</DialogTitle>
                    <div className="space-y-4 mt-4">
                        <ImageUploader
                            label="Görsel (Kare Format Önerilir)"
                            currentImage={newPost.image_url}
                            onImageUploaded={(url) => setNewPost({ ...newPost, image_url: url })}
                            folder="instagram"
                        />

                        <div className="space-y-2">
                            <Label>Link (Permalink)</Label>
                            <Input
                                value={newPost.permalink}
                                onChange={(e) => setNewPost({ ...newPost, permalink: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Beğeni Sayısı (Opsiyonel)</Label>
                            <Input
                                type="number"
                                value={newPost.likes}
                                onChange={(e) => setNewPost({ ...newPost, likes: parseInt(e.target.value) || 0 })}
                            />
                        </div>

                        <button
                            onClick={handleAdd}
                            disabled={!newPost.image_url}
                            className="w-full py-3 bg-[#E1306C] hover:bg-[#C13584] text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                        >
                            Akışa Ekle
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
