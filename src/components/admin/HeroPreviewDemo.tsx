"use client";

import { CMSPreview } from "@/components/admin/CMSPreview";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function HeroPreviewDemo() {
    return (
        <div className="p-8 space-y-6 bg-white rounded-xl">
            <h2 className="text-2xl font-bold text-slate-900">Hero Section - Önizleme Testi</h2>

            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Ana Başlık</Label>
                        <CMSPreview
                            label="Hero Ana Başlık"
                            previewImage="/previews/hero.png"
                            description="Ana sayfanın en üstünde, büyük beyaz yazı ile görünür"
                        />
                    </div>
                    <Input placeholder="Metal Sanat Eserleri" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Alt Başlık</Label>
                        <CMSPreview
                            label="Hero Alt Başlık"
                            previewImage="/previews/hero.png"
                            description="Ana başlığın hemen altında, gri renkte görünür"
                        />
                    </div>
                    <Input placeholder="Özel tasarım posterler" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>CTA Buton Metni</Label>
                        <CMSPreview
                            label="Hero CTA Butonu"
                            previewImage="/previews/hero.png"
                            description="Turuncu buton - sayfanın ortasında"
                        />
                    </div>
                    <Input placeholder="Ürünleri Keşfet" />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label>Header CTA Butonu</Label>
                        <CMSPreview
                            label="Header CTA"
                            previewImage="/previews/header.png"
                            description="Sağ üst köşede turuncu buton"
                        />
                    </div>
                    <Input placeholder="Teklif Al" />
                </div>
            </div>
        </div>
    );
}
