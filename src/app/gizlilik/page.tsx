import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <header className="space-y-2">
          <p className="text-[11px] font-black tracking-[0.3em] uppercase text-gray-500">
            Gizlilik Politikası
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Kişisel Verilerin Korunması ve Gizlilik</h1>
          <p className="text-sm text-gray-600">
            Son güncelleme: <span className="font-semibold">[GG.AA.YYYY]</span>
          </p>
        </header>

        <article className="space-y-8 text-sm leading-relaxed text-gray-800">
          <p>
            Bu Gizlilik Politikası, <span className="font-semibold">[ŞİRKET UNVANI]</span> (“Şirket”) olarak
            işlettiğimiz <span className="font-semibold">[ALAN ADI]</span> alan adlı internet sitesi ve ilgili tüm
            dijital kanallarda kişisel verilerinizin nasıl işlendiğini açıklar.
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-black">1. Veri Sorumlusu</h2>
            <p>
              Veri sorumlusu: <span className="font-semibold">[ŞİRKET UNVANI]</span>{" "}
              <span className="block">Adres: [ŞİRKET ADRESİ]</span>
              <span className="block">MERSİS: [MERSİS NO]</span>
              <span className="block">İletişim: [E-POSTA] / [TELEFON]</span>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black">2. İşlenen Kişisel Veriler</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Kimlik ve iletişim bilgileri (ad, soyad, telefon, e-posta, adres)</li>
              <li>Ödeme ve faturalama bilgileri (kart bilgileri saklanmaz, ödeme sağlayıcısına yönlendirilir)</li>
              <li>Alışveriş geçmişi, sepet, tercih ve talep kayıtları</li>
              <li>Teknik veriler (IP, tarayıcı bilgisi, çerez verileri, oturum kayıtları)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black">3. İşleme Amaçları</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Sözleşme kurulması ve ifası (sipariş işlemleri, teslimat)</li>
              <li>Müşteri hizmetleri, iade ve destek süreçleri</li>
              <li>Hukuki yükümlülüklerin yerine getirilmesi (muhasebe, fatura)</li>
              <li>Açık rıza var ise kampanya, pazarlama ve kişiselleştirilmiş içerik</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black">4. Aktarım</h2>
            <p>
              Verileriniz; ödeme altyapısı sağlayıcıları, kargo/lojistik firmaları, barındırma ve güvenlik hizmeti
              sağlayıcıları, hukuki zorunluluk halinde yetkili merciler ile sınırlı olarak paylaşılabilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black">5. Saklama Süreleri</h2>
            <p>
              Sipariş ve faturalama kayıtları mevzuatta öngörülen sürelerle saklanır. Çerez verileri tarayıcı
              ayarlarınız doğrultusunda veya en fazla gerekli süre boyunca tutulur.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black">6. KVKK Kapsamında Haklarınız</h2>
            <p>
              KVKK m.11 kapsamında veri sorumlusuna başvurarak; veri işlenip işlenmediğini öğrenme, bilgi talep etme,
              düzeltilmesini veya silinmesini isteme, işleme faaliyetinin kısıtlanmasını talep etme ve itiraz haklarınıza
              sahipsiniz. Başvuru için: <span className="font-semibold">[KVKK BAŞVURU E-POSTASI]</span>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-black">7. Çerezler</h2>
            <p>
              Zorunlu çerezler siteyi çalıştırmak için kullanılır. Analitik/pazarlama çerezleri yalnızca açık rızanız
              ile devreye alınır. Detaylar için Çerez Politikası’nı inceleyin.
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
