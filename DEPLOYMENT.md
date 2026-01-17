# Vercel Deployment Rehberi

## Metal Poster Pro - Vercel'e Deploy Etme

### ✅ Hazırlık Tamamlandı!
- ✅ Build başarılı
- ✅ Git repository oluşturuldu
- ✅ İlk commit yapıldı

### 🚀 Vercel'e Deploy Adımları:

#### Seçenek 1: Vercel Web Arayüzü (ÖNERİLEN)

1. **Vercel'e Giriş Yapın**
   - https://vercel.com adresine gidin
   - GitHub, GitLab veya email ile giriş yapın

2. **Yeni Proje Oluşturun**
   - "Add New..." → "Project" butonuna tıklayın
   - "Import Git Repository" seçeneğini seçin

3. **Repository'yi Yükleyin**
   - GitHub'a repository push etmeniz gerekiyor:
   
   ```bash
   # GitHub'da yeni bir repository oluşturun (metal-poster-pro)
   # Sonra bu komutları çalıştırın:
   
   git remote add origin https://github.com/KULLANICI_ADINIZ/metal-poster-pro.git
   git branch -M main
   git push -u origin main
   ```

4. **Vercel'de Import Edin**
   - GitHub repository'nizi seçin
   - "Import" butonuna tıklayın

5. **Proje Ayarları**
   - Framework Preset: **Next.js** (otomatik seçilecek)
   - Root Directory: `./` (varsayılan)
   - Build Command: `npm run build` (otomatik)
   - Output Directory: `.next` (otomatik)

6. **Environment Variables (Opsiyonel)**
   Eğer Supabase kullanıyorsanız:
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL'iniz
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Anon Key'iniz

7. **Deploy!**
   - "Deploy" butonuna tıklayın
   - 2-3 dakika içinde siteniz yayında olacak!

---

#### Seçenek 2: Vercel CLI (Alternatif)

```bash
# Vercel CLI'yi kurun
npm install -g vercel

# Vercel'e login olun
vercel login

# Deploy edin
vercel

# Production'a deploy için
vercel --prod
```

---

### 📝 Deployment Sonrası

Vercel size otomatik olarak verecek:
- ✅ **Production URL**: `https://metal-poster-pro.vercel.app`
- ✅ **Preview URL'ler**: Her commit için otomatik
- ✅ **SSL Sertifikası**: Otomatik HTTPS
- ✅ **CDN**: Global hızlı erişim

### 🔗 Özel Domain Bağlama (Opsiyonel)

1. Vercel Dashboard → Projeniz → "Settings" → "Domains"
2. Domain adınızı ekleyin
3. DNS ayarlarını yapın (Vercel size gösterecek)

---

### ⚠️ Önemli Notlar

1. **Admin Şifresi**: Şifre kodda sabit (`veraltic:895623Oo.`)
   - Production'da environment variable kullanmayı düşünün

2. **Supabase**: Eğer kullanıyorsanız environment variables eklemeyi unutmayın

3. **WhatsApp Numarası**: `src/components/ui/WhatsAppSidebar.tsx` dosyasında gerçek numaranızı güncelleyin

---

### 🎉 Başarılı Deploy Sonrası

Siteniz şu özelliklere sahip olacak:
- ✅ Otomatik SSL/HTTPS
- ✅ Global CDN
- ✅ Otomatik optimizasyon
- ✅ Her commit'te otomatik deploy
- ✅ Sınırsız bandwidth
- ✅ Ücretsiz hosting (Hobby plan)

---

**İyi çalışmalar! 🚀**
