import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import BlogPostClient from "@/components/blog/BlogPostClient";

// Blog yazıları veritabanı (Server Side)
const blogPosts: Record<string, {
    title: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
    content: string;
}> = {
    "takvim-tenekesi-imalati-izmir": {
        title: "Takvim Tenekesi İmalatı: İzmir'de Seri Üretim ve DIN Kalite Standartları",
        category: "ENDÜSTRİYEL İMALAT",
        date: "03.02.2026",
        readTime: "6 Dakika",
        image: "/images/services/takvim-teneke.jpg",
        tags: ["Takvim Tenekesi", "Seri İmalat", "Alsancak", "DIN EN 10202"],
        content: `
## Giriş: Takvim Yayıncılığının Omurgası

Yılın son çeyreği geldiğinde, matbaalar ve yayınevleri için en kritik ürünlerden biri **takvim tenekesi** haline gelir. İzmir Alsancak'ta 1980 yılından bu yana devam eden torna ve teneke imalatı geleneğimizle, Türkiye'nin takvim tenekesi ihtiyacını en yüksek standartlarda karşılıyoruz.

## Teknik Parametreler ve Üretim Hassasiyeti

Bir takvim tenekesinin kalitesini belirleyen temel unsur, kullanılan hammaddenin kalınlığı ve büküm hassasiyetidir:

- **Hammadde Seçimi**: DIN EN 10202 normlarına uygun, 0.22mm ile 0.30mm arasında değişen korozyon direnci yüksek elektrolitik teneke (ETP) plakalar.
- **Büküm Teknolojisi**: Kağıdı ve kuşe yüzeyleri yırtmayan, pürüzsüz ve sıkı tutuş sağlayan çift kanallı özel formlu profiller.
- **Seri İmalat**: Günlük 50.000 adet üzerindeki kapasitemizle, en yoğun sezonlarda bile aksamayan tedarik zinciri.

## İzmir'den Tüm Türkiye'ye Sevkiyat

Veral Teneke Ticaret olarak, yalnızca İzmir içine değil, İstanbul, Ankara, Bursa ve tüm Anadolu'ya takvim tenekesi sevk ediyoruz. Eksantrik preslerimizde elde ettiğimiz mikron hassasiyetini, takvim tenekelerimizin her bir santimetresine aktarıyoruz.

## Sonuç

Doğru takvim tenekesi seçimi, nihai ürünün profesyonel görünümünü ve raftaki ömrünü belirler. Alsancak atölyemizde üretilen tenekelerimizle yayınlarınıza teknik ve estetik değer katıyoruz.
        `,
    },
    "dosya-teli-ve-arsiv-sistemleri": {
        title: "Dosya Teli Üretiminde Malzeme Bilimi: Paslanmaz ve Yüksek Elastikiyet",
        category: "KIRTASİYE EKİPMANLARI",
        date: "03.02.2026",
        readTime: "5 Dakika",
        image: "/images/services/dosya-teli.jpg",
        tags: ["Dosya Teli", "Arşiv", "Polimer Kaplama", "Mekanik Direnç"],
        content: `
## Arşivlerin Gizli Kahramanı: Endüstriyel Dosya Teli

Milyonlarca belgenin düzenlendiği devlet arşiv merkezlerinden, adliye arşivlerine ve kurumsal ofislere kadar her yerde **dosya teli** sessizce görevini yapar. Ancak her metal tel, resmi arşiv standartlarına uygun değildir.

## Endüstriyel Dosya Teli İmalat Protokolü

Veral bünyesinde üretilen dosya telleri, belirli mekanik ve metalurjik testlerden geçerek son kullanıcıya ulaşır:

- **5.000+ Büküm Direnci**: Sürekli açılıp kapanmaya karşı metal yorgunluğunu engelleyen özel tavlanmış çelik yapı.
- **Korozyon Direnci**: Arşivlerde on yıllarca sürecek saklama koşullarına uygun polimer kaplama veya parlak nikelaj tabakası.
- **Çapaksız Kenarlar**: Belgelere ve kullanıcı ellerine zarar vermeyen hassas giyotin kesim teknolojisi.

## Kapasite ve Toptan Tedarik

İzmir'deki atölyemizde, standart dosya teli ölçülerinin yanı sıra özel projeler için de fason üretim yapıyoruz. Günlük 50.000 adetlik kapasitemizle, Türkiye'nin önde gelen kırtasiye toptancılarına doğrudan koli ve palet bazlı sevkiyat sağlıyoruz.
        `,
    },
    "giyotin-sac-kesim-ve-tolerans-standartlari": {
        title: "CNC Giyotin Sac Kesiminde Tolerans ve Çapaksız Gönye Kriterleri",
        category: "ENDÜSTRİYEL İMALAT",
        date: "18.01.2026",
        readTime: "7 Dakika",
        image: "/images/services/giyotin-kesim.webp",
        tags: ["Giyotin Kesim", "CNC Makas", "Tolerans", "DKP Sac"],
        content: `
## Hassas Sac Kesiminde Temel Mühendislik

Endüstriyel parça üretiminde ilk operasyon sacın doğru gönyede ve çapaksız ebatlanmasıdır. Sac kesiminde oluşabilecek 0.5 mm'lik bir sapma, sonraki büküm ve montaj aşamalarında ciddi tolerans hatalarına yol açar.

## Veral Atölyesinde CNC Giyotin Standartları

Alsancak atölyemizdeki CNC dijital arka dayamalı makas hatlarımız şu avantajları sağlar:

- **±0.05 mm Kesim Toleransı**: İleri teknoloji arka dayama ve hidrolik baskı pabuçları ile sıfır kayma.
- **3.000 mm Boy Kesim Kapasitesi**: Geniş levhalardan dar şeritlere kadar esnek ebatlama imkânı.
- **Sıfır Çapak ve Dik Gönye**: Çift taraflı taşlanmış takım çeliği bıçaklar sayesinde ek taşlama gerektirmeyen temiz kenarlar.

Müşteri teknik resmine göre DKP, galvaniz, paslanmaz ve teneke sac kesimlerinde aynı gün numune hazırlıyoruz.
        `,
    },
    "miknatisli-magnet-ve-metal-poster-estetigi": {
        title: "Mıknatıslı Metal Posterler: N35 Neodimyum Askı Sistemi ile Duvarı Delmeden Montaj",
        category: "DEKORASYON & SANAT",
        date: "10.01.2026",
        readTime: "8 Dakika",
        image: "/images/services/magnet-poster.jpg",
        tags: ["Metal Poster", "Neodimyum", "Manyetik Montaj", "UV Kürleme"],
        content: `
## Dijital Sanatın Metal Hali

Kağıt posterlerin ve dayanıksız çerçevelerin devri geride kaldı. Modern yaşam alanlarında artık daha rijit, daha parlak ve çok daha dayanıklı bir medya var: **4K UV Baskılı Metal Poster**. Veral Ticaret olarak, endüstriyel sac işleme tecrübemizi yüksek çözünürlüklü UV teknolojisiyle birleştiriyoruz.

## Mıknatıslı Askı Sistemi: Pratik ve Hasarsız Montaj

Bir metal posteri duvara asmak için matkap, dübel veya çiviye kesinlikle ihtiyacınız yok:

- **3M VHB Manyetik Ped**: Duvar yüzeyine zarar vermeyen güçlü yapışkanlı özel koruyucu ped.
- **N35 Neodimyum Mıknatıs**: 1.5 mm kalınlığındaki çelik plakayı sarsıntısız, düz ve milimetrik tutan yüksek çekim gücü.
- **Saniyeler İçinde Değiştirme**: İstediğiniz zaman farklı bir metal tabloyu çekip yerine yenisini takabilme özgürlüğü.

İzmir Saat Kulesi gibi kültürel miras eserlerinden özel kurumsal tasarımlara kadar tüm metal posterler çift kat vernik fırınlamasıyla üretilir.
        `,
    },
    "endustriyel-metal-baski-rehberi": {
        title: "Endüstriyel 4K UV Metal Baskı: Fırın Kürleme ve Güneş Solmazlığı Analizi",
        category: "ENDÜSTRİYEL BASKI",
        date: "05.01.2026",
        readTime: "8 Dakika",
        image: "/hero-izmir-metal-poster.jpg",
        tags: ["4K UV Baskı", "Vernik Kürleme", "Solmazlık", "Alsancak Zanaat"],
        content: `
## Metal Yüzeylerde Yüksek Mukavemetli Baskı

Endüstriyel metal baskı; cihaz panellerinden tabelalara, mimari kaplamalardan dekoratif tablolara kadar soğuk metale kalıcı bir kimlik kazandırma sanatıdır.

## Piezoelektrik UV Kürleme Teknolojisi

Atölyemizde uygulanan 1200x1200 DPI endüstriyel UV baskı hatlarının öne çıkan özellikleri:

- **Anlık Fotopolimerizasyon**: Ultraviyole ışık dalgalarıyla anında sertleşen pigment mürekkepler.
- **Çift Kat Mat Vernik Koruması**: Güneşin UV ışınlarına, suya, neme ve sürtünmeye karşı 10 yıllık renk canlılığı garantisi.
- **Yüksek Doku Hassasiyeti**: Metalin kendi soğuk dokusu ile 4K renk derinliğinin kusursuz uyumu.

Numune baskı ve kurumsal prova talepleriniz için doğrudan teknik çizim gönderebilirsiniz.
        `,
    },
    "rulo-sac-dilme-slitting-hatlari": {
        title: "Rulo Teneke Sac Dilimleme (Slitting) ve Dar Şerit Sarım Mühendisliği",
        category: "ENDÜSTRİYEL İMALAT",
        date: "28.12.2025",
        readTime: "6 Dakika",
        image: "/images/services/rulo-dilimleme.webp",
        tags: ["Rulo Dilme", "Slitting", "Şerit Sac", "Alsancak Hat"],
        content: `
## Rulo Sac Dilimlemede Hassasiyet Kriterleri

Matbaa, ambalaj ve kırtasiye sektörleri için geniş rulo tenekelerin istenilen genişlikte dar şeritlere ayrılması yüksek hassasiyet gerektiren bir slitting operasyonudur.

- **Bıçak Ayarı**: Dairesel çelik disk bıçaklar arasında mikron toleranslı boşluk kalibrasyonu.
- **Genişlik Toleransı**: Minimum 8 mm şerit genişliğinde ±0.08 mm hassasiyet.
- **Neme Karşı Özel Ambalaj**: Şeritlerin kenar deformasyonunu ve paslanmayı önleyen çemberli kraft paletleme.

Alsancak tesislerimizde müşteri şartnamesine göre rulo sac dilimleme hizmeti vermekteyiz.
        `,
    },
};

// SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts[slug];

    if (!post) return { title: "Rapor Bulunamadı | Veral Teneke Ticaret" };

    return {
        title: `${post.title} | Veral Teneke Ticaret İzmir`,
        description: post.content.substring(0, 155).replace(/[#*]/g, '').trim(),
        alternates: {
            canonical: `https://veralteneketicaret.com/blog/${slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.content.substring(0, 155).replace(/[#*]/g, '').trim(),
            images: [post.image],
            url: `https://veralteneketicaret.com/blog/${slug}`,
            type: "article",
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts[slug];

    if (!post) {
        notFound();
    }

    const otherPosts = Object.entries(blogPosts)
        .filter(([id]) => id !== slug)
        .slice(0, 2)
        .map(([id, data]) => ({ id, ...data }));

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "image": [post.image.startsWith("http") ? post.image : `https://veralteneketicaret.com${post.image}`],
        "datePublished": "2026-02-03T09:00:00+03:00",
        "dateModified": "2026-02-03T09:00:00+03:00",
        "author": {
            "@type": "Person",
            "name": "Oğuzcan Veral",
            "jobTitle": "İmalat Direktörü ve Teknik Editör",
            "url": "https://veralteneketicaret.com/yazar/oguzcan-veral"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Veral Teneke Ticaret",
            "logo": {
                "@type": "ImageObject",
                "url": "https://veralteneketicaret.com/veral-logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://veralteneketicaret.com/blog/${slug}`
        }
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://veralteneketicaret.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Teknik Raporlar & Blog",
                "item": "https://veralteneketicaret.com/blog"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://veralteneketicaret.com/blog/${slug}`
            }
        ]
    };

    return (
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <Navigation />

            <BlogPostClient post={post} slug={slug} otherPosts={otherPosts} />

            <Footer />
        </main>
    );
}
