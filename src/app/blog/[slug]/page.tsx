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
    "is-guvenligi-levhalari-standartlar": {
        title: "İŞ GÜVENLİĞİ LEVHALARI: ISO 7010 STANDARTLARI VE MATERYAL DİRENCİ",
        category: "GÜVENLİK SİSTEMLERİ",
        date: "12.01.2026",
        readTime: "10 DAKİKA",
        image: "/porsche.png",
        tags: ["GÜVENLİK", "ISO 7010", "UYARI", "ENDÜSTRİYEL"],
        content: `
## Giriş: Sessiz Koruyucular

Bir iş kazası, bir saniyede hayatları değiştirebilir. Ancak o kazayı önleyecek olan şey, genellikle gözden kaçan küçük bir detaydır: **doğru yere konumlandırılmış, doğru malzemeden üretilmiş bir güvenlik levhası.**

İş güvenliği levhaları, yasal bir zorunluluk olmanın çok ötesinde, **çalışanlarınızın ve ziyaretçilerinizin hayatını koruyan sessiz koruyuculardır**.

## Malzeme Seçimi

### İç Mekan Uygulamaları
- **Alüminyum Kompozit (ACP)**: Hafif, düz yüzey
- **Galvanizli Sac**: Ekonomik, dayanıklı
- **Alüminyum Levha**: En iyi kalite

### Dış Mekan Uygulamaları
- **Eloksal Kaplı Alüminyum**: 10+ yıl UV dayanımı
- **Paslanmaz Çelik 316**: Deniz ortamı için ideal

## Sonuç

İş güvenliği levhaları, **en düşük maliyetli ve en yüksek getirili** güvenlik yatırımlarından biridir. Veral Ticaret olarak, torna ve teneke işçiliğindeki uzmanlığımızı, iş güvenliği levhası üretiminde de sizin hizmetinize sunuyoruz.
    `,
    },
    "retro-otomobiller-aluminyum-poster": {
        title: "RETRO OTOMOBİLLER VE ALÜMİNYUM: MEKANİK ESTETİK UYUMU",
        category: "METAL POSTER",
        date: "12.01.2026",
        readTime: "07 DAKİKA",
        image: "/porsche.png",
        tags: ["POSTER", "RETRO", "ALÜMİNYUM", "MEKANİK"],
        content: `
## Giriş: Kağıdın Ötesinde, Zamanın Ötesinde

Duvarlarda asılı kalan bir poster düşünün. Güneş ışığı altında solmuş renkler, kenarlarda kıvrılmış köşeler ve zamanla yitip giden canlılık. Kağıt, belki de sanatın en kırılgan taşıyıcısıdır. Peki ya ayn eseri, endüstriyel bir malzemenin soğuk şıklığıyla buluşturlsanız?

**1.5mm endüstriyel sınıf alüminyum**, yalnızca bir materyal değil; zamana meydan okuyan bir manifesto.

## UV Baskı Teknolojisi

UV kürleme teknolojisi, mürekkeplerin alüminyumun mikroskobik dokusuna moleküler düzeyde tutunmasını sağlar:

- **100 yıl boyunca solmayan renkler**
- **Su geçirmezlik**
- **Çizilme direnci**

## Sonuç

Yaşam alanınızı metalle taçlandırmanın zamanı geldi.
    `,
    },
};

// SEO için dinamik Metadata üretimi
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
