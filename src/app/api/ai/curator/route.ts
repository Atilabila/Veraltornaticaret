import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { roomType, stylePreference, dimensions, specialRequest } = body;

        const apiKey = process.env.GEMINI_API_KEY || process.env.STITCH_API_KEY;

        const systemPrompt = `Sen Veral Torna & Teneke Ticaret'in Baş Metal Tasarım Küratörüsün. İzmir Alsancak atölyesinde 40 yılı aşkın süredir endüstriyel metal işleme ve 1200 DPI UV baskılı mıknatıslı metal posterler üretiyorsun.
Kullanıcının verdiği oda türü, dekorasyon stili ve ölçü bilgilerine göre ona en uygun metal poster kombinasyonunu, montaj tavsiyesini (N35 mıknatıs ve 3M VHB ped) ve malzeme özelliklerini (0.5mm fırçalanmış alüminyum veya galvaniz) öner.
Cevabını doğrudan, samimi, zanaat ve mühendislik detaylarıyla dolu, asla yapay zeka klişesi ("Merhaba!", "Harika bir soru!", "Umarım bu yardımcı olur") içermeyen profesyonel bir usta diliyle Türkçe olarak ver.

Kullanıcı Girdileri:
- Oda / Alan: ${roomType || "Belirtilmemiş"}
- Stil Tercihi: ${stylePreference || "Endüstriyel & Modern"}
- Ölçü / Duvar Durumu: ${dimensions || "Standart"}
- Özel Not: ${specialRequest || "Yok"}

Cevabında şu 3 başlığı kullan:
1. TAVSİYE EDİLEN METAL POSTER KONSEPTİ & RENK PALETİ
2. TEKNİK ÖZELLİKLER & MONTAJ MİMARİSİ (Mıknatıs, plaka kalınlığı, UV mat vernik)
3. İZMİR ATÖLYESİNDEN USTA TAVSİYESİ (Işık açısı, duvar boyası uyumu)`;

        if (!apiKey) {
            return NextResponse.json({
                recommendation: `1. TAVSİYE EDİLEN METAL POSTER KONSEPTİ & RENK PALETİ
${roomType || "Seçilen alanınız"} için fırçalanmış metal dokusu üzerinde antrasit ve mat pirinç tonları içeren endüstriyel tipografi veya soyut blueprint teknik çizim serimizi öneriyoruz.

2. TEKNİK ÖZELLİKLER & MONTAJ MİMARİSİ
- Plaka: 0.5 mm galvanizli sac levha üzerine 1200 DPI piezoelektrik UV baskı.
- Yüzey: Yansıma önleyici ve çizilmeye dayanıklı mat koruma verniği.
- Montaj: Duvar delmeden uygulanan N35 neodimyum mıknatıs ve 3M VHB manyetik tutucu tabaka.

3. İZMİR ATÖLYESİNDEN USTA TAVSİYESİ
Metal tabloları doğrudan tavandan vuran sert ışık yerine 45 derecelik açıyla aydınlatırsanız, fırçalanmış sacın derinliği odaya lüks bir galeri atmosferi kazandırır.`,
            });
        }

        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 800,
                    },
                }),
            }
        );

        if (!res.ok) {
            throw new Error(`Gemini API HTTP Error: ${res.status}`);
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        return NextResponse.json({
            recommendation: text || "Tasarım küratörümüz şu anda atölyede üretimde. Lütfen doğrudan WhatsApp usta hattımızdan bilgi alınız.",
        });
    } catch (err: unknown) {
        console.error("AI Curator error:", err);
        return NextResponse.json(
            {
                recommendation: `1. TAVSİYE EDİLEN METAL POSTER KONSEPTİ & RENK PALETİ
Mekanınız için fırçalanmış alüminyum zemin üzerinde mat siyah ve endüstriyel turuncu detaylar içeren koleksiyonumuzu öneriyoruz.

2. TEKNİK ÖZELLİKLER & MONTAJ MİMARİSİ
0.5mm korozyon dayanımlı metal plaka, 1200 DPI UV baskı, N35 Neodimyum mıknatıs sistemi ile duvara çivi çakmadan 30 saniyede montaj.

3. İZMİR ATÖLYESİNDEN USTA TAVSİYESİ
Saten ve silikonlu duvar boyalarında yapışkan manyetik ped tam tutunma sağlar; nemli bezle silinebilir.`,
            },
            { status: 200 }
        );
    }
}
