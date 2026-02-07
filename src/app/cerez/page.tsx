import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function CerezPolitikasiPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white text-neutral-900">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <header className="space-y-2">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-gray-500">Çerez Politikası</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Çerez ve Benzeri Teknolojiler</h1>
            <p className="text-sm text-gray-600">
              Son güncelleme: <span className="font-semibold">[GG.AA.YYYY]</span>
            </p>
          </header>

          <article className="space-y-8 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-black">1. Amaç</h2>
              <p>
                Bu politika, <span className="font-semibold">[ŞİRKET UNVANI]</span> tarafından işletilen{" "}
                <span className="font-semibold">[ALAN ADI]</span> adresinde çerezlerin nasıl kullanıldığını açıklar.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">2. Kullanılan Çerez Türleri</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Zorunlu çerezler: Oturumun sürdürülmesi, sepetin korunması için.</li>
                <li>Analitik çerezler: Trafik ve kullanım istatistikleri için.</li>
                <li>Reklam/yeniden pazarlama çerezleri: İlgi alanına dayalı içerik sunmak için.</li>
                <li>İşlevsel çerezler: Dil ve tercihlerin hatırlanması için.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">3. Üçüncü Taraflar</h2>
              <p>Google Analytics, Meta Pixel veya benzeri araçlar kullanılabilir. İlgili sağlayıcıların politikaları geçerlidir.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">4. Çerez Yönetimi</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz.</li>
                <li>Mobil cihazlarda uygulama izinlerini kontrol edebilirsiniz.</li>
                <li>Zorunlu çerezler devre dışı bırakılırsa site bazı işlevleri çalışmayabilir.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">5. Saklama Süresi</h2>
              <p>Oturum çerezleri tarayıcı kapanınca silinir. Kalıcı çerezler için saklama süresi: [SÜRE].</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">6. İzin ve Rıza</h2>
              <p>
                İlk ziyaretinizde çerez tercihlerinizi yönetebilirsiniz. Rızanızı dilediğiniz zaman geri çekmek için{" "}
                <span className="font-semibold">[E-POSTA]</span> üzerinden bize ulaşabilirsiniz.
              </p>
            </section>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
