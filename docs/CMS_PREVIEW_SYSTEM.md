# 🎨 CMS Visual Preview System

## 📋 Genel Bakış

Admin panelinde içerik düzenlerken, kullanıcılar artık **her alanın sitenin neresinde görüneceğini** görsel olarak görebilir.

## ✨ Özellikler

### 1. **Preview Butonu**
- Her input/textarea alanının yanında küçük bir "Önizle" butonu
- Göz ikonu (👁️) ile kolayca fark edilir
- Hover'da tooltip: "Sitede nerede görünür?"

### 2. **Modal Preview**
- Butona tıklandığında tam ekran modal açılır
- Yüksek kaliteli screenshot gösterilir
- Alan adı ve açıklama ile birlikte

### 3. **Responsive Tasarım**
- Mobil ve desktop uyumlu
- Glassmorphism efektleri
- Smooth animasyonlar (Framer Motion)

## 🗂️ Dosya Yapısı

```
src/
├── components/
│   └── admin/
│       ├── CMSPreview.tsx          # Ana preview component
│       └── SiteContentAdmin.tsx    # Preview entegrasyonu
└── public/
    └── artifacts/
        ├── hero_section_preview_*.png
        ├── header_preview_*.png
        ├── features_section_preview_*.png
        └── stats_section_preview_*.png
```

## 🎯 Kullanım

### Basit Kullanım

```tsx
import { CMSPreview } from "@/components/admin/CMSPreview";

<div className="space-y-2">
    <div className="flex items-center justify-between">
        <Label>Ana Başlık</Label>
        <CMSPreview 
            label="Hero Ana Başlık"
            previewImage="/artifacts/hero_section_preview_1770115021977.png"
            description="Ana sayfanın en üstünde, büyük beyaz yazı ile görünür"
        />
    </div>
    <Textarea value={content} onChange={handleChange} />
</div>
```

### Inline Preview (Hover)

```tsx
import { CMSInlinePreview } from "@/components/admin/CMSPreview";

<CMSInlinePreview 
    label="Hero Ana Başlık"
    previewImage="/artifacts/hero_section_preview.png"
/>
```

## 📍 Entegre Edilen Bölümler

### ✅ Tamamlanan
1. **Hero Section**
   - Ana Başlık
   - Alt Başlıklar (Sloganlar)
   - Özet Açıklama
   - CTA Butonu

2. **Header (Global)**
   - CTA Buton Metni
   - CTA Buton Linki

### 🔜 Eklenebilecek Bölümler
- Features Section
- Stats Section
- Reviews Section
- Contact Section
- Footer Section
- Services CMS

## 🎨 Tasarım Detayları

### Modal Yapısı
```
┌─────────────────────────────────────┐
│ 👁️ Hero Ana Başlık            [X]  │ ← Header
├─────────────────────────────────────┤
│                                     │
│   [Screenshot Görseli]              │ ← Preview
│                                     │
├─────────────────────────────────────┤
│ 💡 İpucu: Kaydetmeyi unutmayın     │ ← Footer
│                          [Kapat]    │
└─────────────────────────────────────┘
```

### Renk Paleti
- Background: `slate-900`, `slate-950`
- Border: `white/10`
- Accent: `var(--color-brand-safety-orange)`
- Text: `white`, `slate-400`

## 🚀 Gelecek İyileştirmeler

1. **Canlı Preview**
   - Değişiklikleri gerçek zamanlı göster
   - Split-screen mod

2. **Interaktif Harita**
   - Tüm sayfanın mini haritası
   - Tıklayınca ilgili CMS alanına git

3. **Video Preview**
   - Animasyonlu bölümler için video gösterimi
   - Hover efektlerini göster

4. **Responsive Preview**
   - Mobil/Tablet/Desktop görünümleri
   - Cihaz frame'leri ile

## 📊 Kullanıcı Deneyimi İyileştirmeleri

### Öncesi ❌
```
Ana Başlık: [________________]
           ↑ Bu nerede görünecek?
```

### Sonrası ✅
```
Ana Başlık: [________________] [👁️ Önizle]
           ↑ Tıkla → Screenshot gör!
```

## 🔧 Teknik Detaylar

### Component Props

```typescript
interface CMSPreviewProps {
    label: string;              // "Hero Ana Başlık"
    previewImage: string;       // "/artifacts/hero_preview.png"
    description?: string;       // "Ana sayfanın üstünde görünür"
    position?: "right" | "top"; // Buton pozisyonu
}
```

### Animasyonlar
- **Modal Açılış**: Scale 0.9 → 1.0 (200ms)
- **Backdrop**: Opacity 0 → 1 (150ms)
- **Tooltip**: Opacity 0 → 1 (100ms)

## 📝 Notlar

- Screenshot'lar AI tarafından generate edildi
- Gerçek site screenshot'ları ile değiştirilebilir
- Image optimization için Next.js Image component kullanıldı
- Accessibility için ARIA labels eklendi

## 🎯 Sonuç

Bu sistem sayesinde:
- ✅ Admin kullanıcıları neyi nereye eklediğini **görsel olarak** anlıyor
- ✅ Hata oranı azalıyor
- ✅ Eğitim süresi kısalıyor
- ✅ UX kalitesi artıyor

---

**Geliştirici:** Antigravity AI  
**Tarih:** 2026-02-03  
**Versiyon:** 1.0.0
