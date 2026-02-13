# 💳 Metal Poster Pro - Payment Gateway Setup (Iyzico)

Bu döküman, projenin WhatsApp/Teklif sisteminden tam otomatik ödeme sistemine geçişi için gerekli adımları içerir.

## 🚀 Iyzico Entegrasyonu

Iyzico entegrasyonu `src/lib/payment/providers/iyzico.ts` ve `src/app/odeme/page.tsx` üzerinden yönetilmektedir. Sistemin çalışması için aşağıdaki ortam değişkenlerini (Environment Variables) Vercel veya `.env.local` dosyanıza eklemeniz gerekmektedir.

### 🔑 Gerekli Ortam Değişkenleri

```env
# Iyzico API Kimlik Bilgileri
IYZICO_API_KEY=your_api_key_here
IYZICO_SECRET_KEY=your_secret_key_here

# Mod: true (Test/Sandbox), false (Canlı/Production)
IYZICO_SANDBOX=true

# Callback URL (Siparis tamamlama donusu)
NEXT_PUBLIC_PAYMENT_CALLBACK_URL=https://your-domain.com/api/payment/callback
```

## 🛠️ Teknik Altyapı Notları

1.  **Güvenlik:** Ödeme işlemleri SSL üzerinden ve Iyzico'nun güvenli form (Checkout Form) veya API altyapısı ile gerçekleştirilir.
2.  **Order Store:** Başarılı ödeme sonrası sipariş durumu otomatik olarak `payment_pending` -> `paid` olarak güncellenir.
3.  **📧 Bildirimler:** Ödeme başarılı olduğunda müşteriye otomatik sipariş onay e-postası (`src/lib/actions/email.actions.ts`) gönderilir.
4.  **Sandbox Testi:** `IYZICO_SANDBOX=true` iken [Iyzico Test Kartları](https://dev.iyzipay.com/tr/test-kartlari) ile sistemi test edebilirsiniz.

## 📈 Sonraki Adımlar

-   [ ] Iyzico panelinden API anahtarlarınızı alın.
-   [ ] Ortam değişkenlerini sisteme tanımlayın.
-   [ ] `/sepet` sayfasından bir test siparişi oluşturun.
-   [ ] Ödeme sonrası `/siparis/{order_id}` sayfasının doğru yüklendiğini kontrol edin.

---
*Hazırlayan: Antigravity AI (Strategic Transformation Phase 3)*
