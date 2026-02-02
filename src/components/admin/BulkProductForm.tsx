"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Trash2, Save, Upload, FileSpreadsheet, AlertCircle, RefreshCw } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn, slugify } from "@/lib/utils"
import { uploadProductImage } from "@/lib/actions/metal-products.actions"
import type { Category, ProductFormData } from "@/lib/supabase/metal-products.types"

interface BulkProductFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categories: Category[]
    onSubmit: (data: ProductFormData[]) => Promise<void>
    loading?: boolean
}

type BulkRow = {
    id: string
    name: string
    description: string
    price: number | string
    stock: number | string
    slug: string
    file?: File
    imageUrl?: string
    previewUrl?: string
    material: string
    paint: string
    installation: string
    origin: string
}

export const BulkProductForm: React.FC<BulkProductFormProps> = ({
    open,
    onOpenChange,
    categories,
    onSubmit,
    loading = false
}) => {
    // State
    const [rows, setRows] = React.useState<BulkRow[]>([
        { id: "1", name: "", description: "", price: "", stock: "", slug: "", material: "1.5mm DKP Çelik", paint: "Elektrostatik Toz", installation: "Hazır Askı Sistemi", origin: "Yerli Üretim (İzmir)" },
        { id: "2", name: "", description: "", price: "", stock: "", slug: "", material: "1.5mm DKP Çelik", paint: "Elektrostatik Toz", installation: "Hazır Askı Sistemi", origin: "Yerli Üretim (İzmir)" },
        { id: "3", name: "", description: "", price: "", stock: "", slug: "", material: "1.5mm DKP Çelik", paint: "Elektrostatik Toz", installation: "Hazır Askı Sistemi", origin: "Yerli Üretim (İzmir)" },
        { id: "4", name: "", description: "", price: "", stock: "", slug: "", material: "1.5mm DKP Çelik", paint: "Elektrostatik Toz", installation: "Hazır Askı Sistemi", origin: "Yerli Üretim (İzmir)" },
        { id: "5", name: "", description: "", price: "", stock: "", slug: "", material: "1.5mm DKP Çelik", paint: "Elektrostatik Toz", installation: "Hazır Askı Sistemi", origin: "Yerli Üretim (İzmir)" }
    ])
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>("")
    const [pasteMode, setPasteMode] = React.useState(false)
    const [pasteContent, setPasteContent] = React.useState("")
    const [isUploading, setIsUploading] = React.useState(false) // Local loading state for uploads
    const [showDrivePicker, setShowDrivePicker] = React.useState(false)
    const [driveFiles, setDriveFiles] = React.useState<any[]>([])
    const [selectedDriveFileIds, setSelectedDriveFileIds] = React.useState<Set<string>>(new Set())
    const [isSyncing, setIsSyncing] = React.useState(false)

    // Handle File Selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files)

            const newRows: BulkRow[] = newFiles.map(file => {
                // Generate name from filename (remove extension)
                const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "")

                return {
                    id: Math.random().toString(36).substr(2, 9),
                    name: nameWithoutExt,
                    description: "", // Added description field
                    price: 0,
                    stock: 0,
                    slug: slugify(nameWithoutExt),
                    file: file,
                    previewUrl: URL.createObjectURL(file),
                    material: "1.5mm DKP Çelik",
                    paint: "Elektrostatik Toz",
                    installation: "Hazır Askı Sistemi",
                    origin: "Yerli Üretim (İzmir)"
                }
            })

            setRows(prev => {
                // If the first row is empty, replace it
                if (prev.length === 1 && !prev[0].name) {
                    return newRows
                }
                return [...prev, ...newRows]
            })
        }
    }

    // Add empty row
    const addRow = () => {
        setRows(prev => [
            ...prev,
            { id: Math.random().toString(36).substr(2, 9), name: "", description: "", price: "", stock: "", slug: "", material: "1.5mm DKP Çelik", paint: "Elektrostatik Toz", installation: "Hazır Askı Sistemi", origin: "Yerli Üretim (İzmir)" }
        ])
    }

    // Remove row
    const removeRow = (id: string) => {
        if (rows.length === 1) {
            // Don't remove last row, just clear it
            setRows([{ id: "1", name: "", description: "", price: "", stock: "", slug: "", material: "1.5mm DKP Çelik", paint: "Elektrostatik Toz", installation: "Hazır Askı Sistemi", origin: "Yerli Üretim (İzmir)" }])
            return
        }
        setRows(prev => prev.filter(r => r.id !== id))
    }

    // Update row
    const updateRow = (id: string, field: keyof BulkRow, value: any) => {
        setRows(prev => prev.map(row => {
            if (row.id !== id) return row

            const updates: Partial<BulkRow> = { [field]: value }

            // Auto update slug
            if (field === "name") {
                updates.slug = slugify(value as string)
            }

            // If providing direct URL, use it as preview
            if (field === "imageUrl") {
                updates.previewUrl = value as string
            }

            // Handle file and preview
            if (field === "file") {
                updates.previewUrl = value ? URL.createObjectURL(value as File) : undefined
            }

            return { ...row, ...updates }
        }))
    }

    // Handle Paste from Excel/Sheets
    const processPaste = () => {
        if (!pasteContent.trim()) return

        const lines = pasteContent.trim().split(/\r\n|\n/)
        const newRows: BulkRow[] = lines.map(line => {
            // Try to split by tab (Excel/Google Sheets default)
            const parts = line.split("\t")

            // Expected format: Name | [Description] | Price | Stock
            const name = parts[0]?.trim() || ""
            let description = ""
            let price: string | number = ""
            let stock: string | number = ""

            if (parts.length >= 4) {
                // Name | Description | Price | Stock
                description = parts[1]?.trim() || ""
                price = parts[2] ? parseFloat(parts[2].replace(/[^0-9.-]+/g, "")) : ""
                stock = parts[3] ? parseInt(parts[3].replace(/[^0-9]+/g, "")) : ""
            } else {
                // Name | Price | Stock
                price = parts[1] ? parseFloat(parts[1].replace(/[^0-9.-]+/g, "")) : ""
                stock = parts[2] ? parseInt(parts[2].replace(/[^0-9]+/g, "")) : ""
            }

            return {
                id: Math.random().toString(36).substr(2, 9),
                name,
                description,
                price: price || 0,
                stock: stock || 0,
                slug: slugify(name),
                material: "1.5mm DKP Çelik",
                paint: "Elektrostatik Toz",
                installation: "Hazır Askı Sistemi",
                origin: "Yerli Üretim (İzmir)"
            }
        }).filter(r => r.name) // Filter out empty lines

        setRows(prev => {
            // If the first row is empty, replace it
            if (prev.length === 1 && !prev[0].name) {
                return newRows
            }
            return [...prev, ...newRows]
        })

        setPasteMode(false)
        setPasteContent("")
    }

    // Drive Sync Logic - Now opens a picker
    const fetchDriveFiles = async () => {
        setIsSyncing(true)
        setShowDrivePicker(true)
        try {
            const { listDriveFiles } = await import("@/actions/drive-sync")
            const result = await listDriveFiles()

            if (result.success && result.data) {
                setDriveFiles(result.data)
                setSelectedDriveFileIds(new Set())
            } else {
                alert("Drive senkronizasyon hatası: " + result.error)
                setShowDrivePicker(false)
            }
        } catch (err) {
            alert("Sistem hatası: " + (err as any).message)
            setShowDrivePicker(false)
        } finally {
            setIsSyncing(false)
        }
    }

    const addSelectedDriveFiles = () => {
        const selectedFiles = driveFiles.filter(f => selectedDriveFileIds.has(f.id))
        if (selectedFiles.length === 0) return

        const newRows: BulkRow[] = selectedFiles.map(file => {
            const fileName = file.name || "Adsız Ürün";
            const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "")
            return {
                id: Math.random().toString(36).substr(2, 9),
                name: nameWithoutExt,
                imageUrl: file.imageUrl,
                previewUrl: file.previewUrl,
                description: "",
                price: 0,
                stock: 0,
                slug: slugify(nameWithoutExt),
                material: "1.5mm DKP Çelik",
                paint: "Elektrostatik Toz",
                installation: "Hazır Askı Sistemi",
                origin: "Yerli Üretim (İzmir)"
            }
        })

        setRows(prev => {
            const activeRows = prev.filter(r => r.name || r.imageUrl)
            return [...activeRows, ...newRows]
        })

        setShowDrivePicker(false)
        setSelectedDriveFileIds(new Set())
    }

    const toggleDriveFile = (id: string) => {
        setSelectedDriveFileIds(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
    }

    // Submit
    const handleSubmit = async () => {
        if (!selectedCategoryId) {
            alert("Lütfen toplu eklenecek ürünler için bir kategori seçin.")
            return
        }

        const validRows = rows.filter(r => r.name.trim().length > 0)

        if (validRows.length === 0) {
            alert("Lütfen en az bir ürün girin.")
            return
        }

        setIsUploading(true)

        // 1. Upload images first (if any)
        const productsWithImages = await Promise.all(validRows.map(async (row) => {
            let imageUrl = ""

            if (row.file) {
                // Upload image
                const res = await uploadProductImage(row.file, row.slug)
                if (res.success && res.data) {
                    imageUrl = res.data
                } else {
                    console.error(`Failed to upload image for ${row.name}`)
                }
            } else if (row.imageUrl) {
                imageUrl = row.imageUrl
            }

            return {
                name: row.name,
                slug: row.slug,
                description: row.description || "",
                price: Number(row.price) || 0,
                stock_quantity: Number(row.stock) || 0,
                category_id: selectedCategoryId,
                is_active: true,
                is_showcase: false,
                image_url: imageUrl,
                background_color: "#0A0A0A",
                material: row.material,
                paint: row.paint,
                installation: row.installation,
                origin: row.origin,
                features: []
            } as any
        }))

        setIsUploading(false)
        await onSubmit(productsWithImages)
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
                    <DialogTitle>Toplu Ürün Ekle</DialogTitle>
                    <DialogDescription>
                        Birden fazla ürünü hızlıca ekleyin. Excel'den kopyala-yapıştır yapabilirsiniz.
                    </DialogDescription>

                    <div className="flex flex-col gap-4 mt-4 flex-1 overflow-hidden">
                        {/* Controls */}
                        <div className="flex items-end gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                            <div className="flex-1 space-y-2">
                                <Label>Hedef Kategori *</Label>
                                <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kategori Seçin" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => (
                                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex gap-2">
                                <label className="flex items-center gap-2 px-4 py-3 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-xl font-bold transition-colors border border-blue-500/20 cursor-pointer">
                                    <Upload className="w-5 h-5" />
                                    Görsel Seç
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/webp,image/png,image/jpeg"
                                        className="hidden"
                                        onChange={handleFileSelect}
                                    />
                                </label>

                                <button
                                    onClick={fetchDriveFiles}
                                    disabled={isUploading || isSyncing}
                                    className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                                >
                                    <RefreshCw className={cn("w-5 h-5", isSyncing && "animate-spin")} />
                                    Drive'dan Çek
                                </button>

                                <button
                                    onClick={() => setPasteMode(!pasteMode)}
                                    className="flex items-center gap-2 px-4 py-3 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 rounded-xl font-bold transition-colors border border-emerald-500/20"
                                >
                                    <FileSpreadsheet className="w-5 h-5" />
                                    {pasteMode ? "Tabloya Dön" : "Excel'den Yapıştır"}
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-auto min-h-[400px] border border-slate-800 rounded-xl bg-slate-900/30 relative">
                            {pasteMode ? (
                                <div className="absolute inset-0 p-4">
                                    <textarea
                                        autoFocus
                                        className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-sm"
                                        placeholder={`Excel'den kopyalayıp buraya yapıştırın.\nFormat: İsim | Fiyat | Stok\nÖrnek:\nMetal Tablo A\t500\t10\nMetal Tablo B\t750\t5`}
                                        value={pasteContent}
                                        onChange={(e) => setPasteContent(e.target.value)}
                                    />
                                    <div className="absolute bottom-6 right-6">
                                        <button
                                            onClick={processPaste}
                                            className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 shadow-lg"
                                        >
                                            Verileri İşle
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-slate-900 sticky top-0 z-10">
                                        <tr>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider pl-4 w-12 text-center">Img</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-64">Ürün Adı</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-64">Görsel URL (İsteğe Bağlı)</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-64">Açıklama</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Malzeme</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Boya</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Montaj</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Menşei</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Fiyat</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-20">Stok</th>
                                            <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {rows.map((row, index) => (
                                            <tr key={row.id} className="group hover:bg-slate-800/50 transition-colors">
                                                <td className="p-3 pl-4 text-center">
                                                    <label className="cursor-pointer group/img block">
                                                        <div className={cn(
                                                            "w-12 h-12 rounded-lg overflow-hidden border border-slate-700 bg-black flex items-center justify-center transition-all mx-auto",
                                                            row.previewUrl ? "border-emerald-500/50" : "border-dashed hover:border-slate-500"
                                                        )}>
                                                            {row.previewUrl ? (
                                                                <img src={row.previewUrl} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <Plus className="w-4 h-4 text-slate-600 group-hover/img:text-slate-400" />
                                                            )}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) updateRow(row.id, "file", file)
                                                            }}
                                                        />
                                                    </label>
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        value={row.name}
                                                        onChange={(e) => updateRow(row.id, "name", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1"
                                                        placeholder="Ürün Adı"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        value={row.imageUrl}
                                                        onChange={(e) => updateRow(row.id, "imageUrl", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1 text-xs font-mono"
                                                        placeholder="https://... veya Drive Linki"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        value={row.description}
                                                        onChange={(e) => updateRow(row.id, "description", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1 text-sm"
                                                        placeholder="Ürün açıklaması..."
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        value={row.material}
                                                        onChange={(e) => updateRow(row.id, "material", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1 text-sm"
                                                        placeholder="Malzeme"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        value={row.paint}
                                                        onChange={(e) => updateRow(row.id, "paint", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1 text-sm"
                                                        placeholder="Boya"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        value={row.installation}
                                                        onChange={(e) => updateRow(row.id, "installation", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1 text-sm"
                                                        placeholder="Montaj"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="text"
                                                        value={row.origin}
                                                        onChange={(e) => updateRow(row.id, "origin", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1 text-sm"
                                                        placeholder="Menşei"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="number"
                                                        value={row.price}
                                                        onChange={(e) => updateRow(row.id, "price", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="p-3">
                                                    <input
                                                        type="number"
                                                        value={row.stock}
                                                        onChange={(e) => updateRow(row.id, "stock", e.target.value)}
                                                        className="w-full bg-transparent border-b border-transparent focus:border-orange-500 focus:outline-none py-1"
                                                        placeholder="0"
                                                    />
                                                </td>
                                                <td className="p-3 text-center">
                                                    <button
                                                        onClick={() => removeRow(row.id)}
                                                        className="text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={6} className="p-2">
                                                <button
                                                    onClick={addRow}
                                                    className="w-full py-3 border border-dashed border-slate-700 rounded-lg text-slate-500 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Satır Ekle
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                <span>Toplam <strong className="text-white">{rows.filter(r => r.name).length}</strong> ürün eklenecek</span>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => onOpenChange(false)}
                                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || isUploading}
                                    className={cn(
                                        "px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold transition-colors flex items-center gap-2",
                                        (loading || isUploading) && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <Save className="w-4 h-4" />
                                    {isUploading ? "Görseller Yükleniyor..." : loading ? "Kaydediliyor..." : "Tümünü Kaydet"}
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Drive Image Picker Modal */}
            <Dialog open={showDrivePicker} onOpenChange={setShowDrivePicker}>
                <DialogContent className="max-w-5xl max-h-[85vh] flex flex-col p-0 overflow-hidden bg-slate-950 border-slate-800">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <DialogTitle className="text-xl font-bold text-white">Drive Görsel Seçici</DialogTitle>
                            <DialogDescription className="text-slate-400">
                                Ürün olarak eklemek istediğiniz görselleri seçin.
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-slate-400">
                                {selectedDriveFileIds.size} görsel seçildi
                            </span>
                            <button
                                onClick={addSelectedDriveFiles}
                                disabled={selectedDriveFileIds.size === 0}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
                            >
                                Seçilenleri Ekle
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
                        {isSyncing ? (
                            <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400 py-20">
                                <RefreshCw className="w-12 h-12 animate-spin text-blue-500" />
                                <p className="text-lg font-medium animate-pulse">Drive klasörü taranıyor...</p>
                            </div>
                        ) : driveFiles.length === 0 ? (
                            <div className="text-center py-20 text-slate-500">
                                Klasörde görsel bulunamadı veya erişim yetkisi yok.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {driveFiles.map((file) => (
                                    <motion.div
                                        key={file.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleDriveFile(file.id)}
                                        className={cn(
                                            "group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all",
                                            selectedDriveFileIds.has(file.id)
                                                ? "border-blue-500 ring-4 ring-blue-500/20"
                                                : "border-slate-800 hover:border-slate-600"
                                        )}
                                    >
                                        <img
                                            src={file.previewUrl}
                                            alt={file.name}
                                            className={cn(
                                                "w-full h-full object-cover transition-transform duration-500",
                                                selectedDriveFileIds.has(file.id) ? "scale-110" : "group-hover:scale-110"
                                            )}
                                        />

                                        {/* Selection Overlay */}
                                        <div className={cn(
                                            "absolute inset-0 transition-colors",
                                            selectedDriveFileIds.has(file.id) ? "bg-blue-500/10" : "bg-black/0 group-hover:bg-black/20"
                                        )} />

                                        {/* Checkmark */}
                                        <div className={cn(
                                            "absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                            selectedDriveFileIds.has(file.id)
                                                ? "bg-blue-500 border-blue-500 text-white"
                                                : "bg-black/40 border-white/20 text-transparent"
                                        )}>
                                            <Save className="w-3 h-3" />
                                        </div>

                                        {/* Name Tag */}
                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                            <p className="text-[10px] text-white font-medium truncate drop-shadow-md">
                                                {file.name}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
