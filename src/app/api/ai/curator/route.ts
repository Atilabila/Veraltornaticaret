import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { roomType, stylePreference, dimensions, specialRequest } = body;

        const apiKey = process.env.GEMINI_API_KEY || process.env.STITCH_API_KEY;

        const systemPrompt = `Sen Veral Torna & Teneke Ticaret'in atölye notusun. 1986'dan beri İzmir Alsancak'ta çalışan bir aile atölyesisin. Dosya teli, takvim tenekesi, tef zili, sac kesim ve metal baskı yaparsın. Yeni sayı, ölçü, kapasite veya süre uydurma. Bilmediğin şeyi "fiyat için yazın" diye kısalt. Kısa Türkçe yaz.

Kullanıcı notu: ${specialRequest || "Yok"}. Alan: ${roomType || "belirtilmedi"}. Stil: ${stylePreference || "yazılmadı"}. Ölçü: ${dimensions || "yazılmadı"}.`;

        if (!apiKey) {
            return NextResponse.json({
                recommendation: "Metal baskı için ölçüyü ve adedi yazın. Fiyatı söyleyelim. Atölye: 1471 Sokak No:12/A, Alsancak.",
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
                recommendation: "Şu an yanıt yazılamadı. WhatsApp'tan ürün ve adedi yazın.",
            },
            { status: 200 }
        );
    }
}
