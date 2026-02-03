import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
        title: "TAKVİM TENEKESİ İMALATI: İZMİR'DE SERİ ÜRETİM VE KALİTE STANDARTLARI",
        category: "ENDÜSTRİYEL İMALAT",
        date: "03.02.2026",
        readTime: "06 DAKİKA",
        image: "/images/production/teneke.jpg",
        tags: ["TAKVİM TENEKESİ", "İMALAT", "İZMİR", "SERİ ÜRETİM"],
        content: `
## Giriş: Takvim Yayıncılığının Omurgası

Yılın son çeyreği geldiğinde, matbaalar ve yayınevleri için en kritik ürünlerden biri **takvim tenekesi** haline gelir. İzmir Alsancak'ta 40 yılı aşkın süredir devam eden torna ve teneke imalatı geleneğimizle, Türkiye'nin takvim tenekesi ihtiyacını en yüksek standartlarda karşılıyoruz.

## Teknik Parametreler ve Üretim Hassasiyeti

Bir takvim tenekesinin kalitesini belirleyen temel unsur, kullanılan hammaddenin kalınlığı ve büküm hassasiyetidir:

- **Hammadde Seçimi**: 0.22mm ile 0.30mm arasında değişen, korozyon direnci yüksek teneke plakalar.
- **Büküm Teknolojisi**: Kağıdı yırtmayan, pürüzsüz ve sıkı tutuş sağlayan özel formlu kanallar.
- **Seri İmalat**: Günlük 50.000 adet üzerindeki kapasitemizle, en yoğun sezonlarda bile aksamayan tedarik zinciri.

## İzmir'den Türkiye'ye Sevkiyat

Veral Ticaret olarak, yalnızca İzmir içine değil, İstanbul, Ankara ve tüm Anadolu'ya takvim tenekesi sevk ediyoruz. **Tef zili** üretimindeki hassasiyetimizi, takvim tenekelerimizin her bir milimetresine aktarıyoruz.

## Sonuç

Doğru takvim tenekesi seçimi, nihai ürünün profesyonel görünümünü ve ömrünü belirler. Modern hatlarımızda üretilen tenekelerimizle yayınlarınıza teknik ve estetik değer katıyoruz.
    `,
    },
    "dosya-teli-ve-arsiv-sistemleri": {
        title: "DOSYA TELİ ÜRETİMİNDE MALZEME BİLİMİ: PASLANMAZ DİRENÇLİ ÇÖZÜMLER",
        category: "KIRTASİYE EKİPMANLARI",
        date: "03.02.2026",
        readTime: "05 DAKİKA",
        image: "/images/production/dosya-teli.jpg",
        tags: ["DOSYA TELİ", "METAL", "ARŞİV", "ÜRETİM"],
        content: `
## Arşivlerin Gizli Kahramanı: Dosya Teli

Milyonlarca belgenin düzenlendiği arşiv merkezlerinden, küçük bir ofis çekmecesine kadar her yerde **dosya teli** sessizce görevini yapar. Ancak her metal tel, dosya teli olmaya uygun değildir.

## Endüstriyel Dosya Teli Üretimi

Veral bünyesinde üretilen dosya telleri, belirli mekanik testlerden geçerek son kullanıcıya ulaşır:

1. **Esneklik Dayımı**: Sürekli açılıp kapanmaya karşı metal yorgunluğu testleri.
2. **Korozyon Direnci**: Arşivlerde on yıllarca sürecek saklama koşullarına uygun kaplama.
3. **Pürüzsüz Kenarlar**: Kağıtlara ve kullanıcı ellerine zarar vermeyen hassas kesim teknolojisi.

## Tasarım ve Kapasite

İzmir'deki tesisimizde, standart dosya teli ölçülerinin yanı sıra özel projeler için de üretim yapıyoruz. Torna tezgahlarımızda işlenen her bir parça gibi, dosya tellerimiz de milimetrik hassasiyetle paketlenir.

## Sonuç

Arşivleme sistemlerinizde uzun ömür ve güvenlik arıyorsanız, endüstriyel kalitedeki dosya teli çözümlerimizi tercih edin. 40 yıllık imalat güveniyle, belgelerinizi metalin gücüyle koruyoruz.
    `,
    },
    "miknatisli-magnet-ve-metal-poster-estetigi": {
        title: "MIKNATISLI MAGNET VE METAL POSTER: MODERN DEKORASYONDA YENİ NESİL DOKUNUŞ",
        category: "DEKORASYON",
        date: "03.02.2026",
        readTime: "09 DAKİKA",
        image: "/images/production/poster.jpg",
        tags: ["METAL POSTER", "MAGNET", "DEKORASYON", "MIKNATISLI"],
        content: `
## Digital Sanatın Metal Hali

Kağıt posterlerin devri kapanıyor. Artık duvarlarda daha ricit, daha parlak ve çok daha dayanıklı bir medya var: **Metal Poster**. Veral Ticaret olarak, 4K UV baskı kalitesini 1.5mm metal plakalarla buluşturuyoruz.

## Mıknatıslı Magnet: Pratik Montajın Gücü

Bir metal posteri duvara asmak için matkap veya çiviye ihtiyacınız yok. Geliştirdiğimiz **mıknatıslı magnet** sistemleri sayesinde:

- **Hızlı Montaj**: Duvara yapıştırılan özel manyetik pedler.
- **Güçlü Tutuş**: Ağır metal plakaları bile sarsıntısız tutan neodimyum bazlı mıknatıslar.
- **Değiştirilebilirlik**: İstediğiniz zaman farklı bir metal poster tasarımına saniyeler içinde geçiş yapın.

## İzmir Metal Tasarım Atölyesi

İzmir Alsancak'taki atölyemizde üretilen her bir metal poster, özel koruma katmanıyla kaplanır. Solmayan renkler ve mıknatıslı magnetlerin pratikliği ile yaşam alanlarınıza endüstriyel bir ruh katın.

## Sonuç

Metal poster ve magnet sistemlerimiz, dekorasyonda hem kaliteyi hem de esnekliği bir arada sunar. Takvim tenekesinden tef zili üretimine uzanan metal işleme uzmanlığımızla, şimdi evlerinize sanatsal bir dokunuş yapıyoruz.
    `,
    },
    "endustriyel-metal-baski-rehberi": {
        title: "ENDÜSTRİYEL METAL BASKI PROTOKOLÜ: DİJİTAL DÖNÜŞÜM ANALİZİ",
        category: "ENDÜSTRİYEL BASKI",
        date: "12.01.2026",
        readTime: "08 DAKİKA",
        image: "/porsche.png",
        tags: ["METAL", "UV BASKI", "SERİGRAFİ", "PLAKA"],
        content: `
## Giriş: Metalin Yüzeyine Hikaye Yazmak

Bir fabrika sahasında yürüyorsunuz. Etrafınızda çelik raflar, alüminyum paneller ve paslanmaz çelik kaplamalar. Her biri sessiz, anonim—ta ki üzerlerine **endüstriyel metal baskı** uygulanana kadar.

Metal baskı, yalnızca bir logo veya uyarı işareti yerleştirmek değildir. **Hammaddeyi konuşturmak, soğuk yüzeylere kimlik kazandırmak ve dayanıklılığı estetikle buluşturmaktır.** Veral Ticaret olarak, torna ve teneke işçiliğinde onlarca yıllık deneyimimizi, modern UV ve serigrafi baskı teknolojileriyle birleştiriyoruz.

## Metal Baskı Teknolojileri: Gelenekselden Moderne

### 1. Serigrafi (Screen Printing) Baskı

En klasik ve güvenilir yöntemlerden biri olan serigrafi, **yüksek adetli üretimlerde** maliyet avantajı sunar:

- **Çalışma Prensibi**: İnce bir elek üzerinden mürekkep, metal yüzeyine transfer edilir.
- **Avantajları**: Kalın mürekkep katmanı, canlı renkler, uzun ömür
- **İdeal Kullanım**: Sanayi plakaları, uyarı levhaları, makine etiketleri

### 2. UV Dijital Baskı

**Geleceğin teknolojisi** olarak adlandırılan UV baskı, esnekliği ve kalitesiyle öne çıkar:

- **Çalışma Prensibi**: Ultraviyole ışınlarla anlık kürlenen özel mürekkepler
- **Avantajları**: Sınırsız renk, fotoğraf kalitesi, kalıp maliyeti yok
- **İdeal Kullanım**: Logolu paneller, dekoratif kaplamalar, özel tasarımlar

## Sonuç

Metal baskı, ham malzemeyi **iletişim aracına** dönüştürür. Veral Ticaret olarak, teneke ve torna işçiliğindeki köklü geleneklerimizi, 21. yüzyılın dijital baskı teknolojileriyle birleştiriyoruz.
    `,
    },
};

// SEO için dinamik Metadata üretimi
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts[slug];

    if (!post) return { title: "Rapor Bulunamadı | Veral Torna & Teneke" };

    return {
        title: `${post.title} | Veral Torna & Teneke Raporlar`,
        description: post.content.substring(0, 160).replace(/[#*]/g, ''),
        openGraph: {
            title: post.title,
            images: [post.image],
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

    return (
        <main className="min-h-screen bg-white grid-terminal no-transition pb-24">
            {/* NAVIGATION_TERMINAL (Server Side Links) */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black py-4">
                <div className="container-brutal flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-2xl group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-none shadow-[4px_4px_0px_0px_var(--color-brand-safety-orange)]">
                            V
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-[Archivo Black] leading-none uppercase">VERAL</span>
                            <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-brand-veral-green)]">TORNA & TENEKE</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 font-mono font-bold text-sm">
                        <Link href="/" className="hover:bg-black hover:text-white px-2 py-1">ÜRETİM HATTI</Link>
                        <Link href="/urunler" className="hover:bg-black hover:text-white px-2 py-1">KATALOG DOSYALARI</Link>
                        <Link href="/hakkimizda" className="hover:bg-black hover:text-white px-2 py-1">TARİHÇE KAYDI</Link>
                        <Link href="/blog" className="bg-black text-white px-2 py-1">RAPORLAR</Link>
                    </nav>
                </div>
            </nav>

            <BlogPostClient post={post} slug={slug} otherPosts={otherPosts} />

            {/* FOOTER_TERMINAL */}
            <footer id="terminals" className="bg-black text-white py-24 border-t-8 border-[#FF5F1F]">
                <div className="container-brutal text-center font-mono opacity-50 text-xs">
                    © 2026 VERAL TORNA & TENEKE // RAPOR KAYDI v4.5.11
                </div>
            </footer>
        </main>
    );
}
