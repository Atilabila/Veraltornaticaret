import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { roomType, stylePreference, dimensions, specialRequest } = body;

        const apiKey = process.env.GEMINI_API_KEY || process.env.STITCH_API_KEY;

        const systemPrompt = `Veral Torna ve Teneke Ticaret, 1986'dan beri İzmir Alsancak'ta seri üretim yapan bir atölyedir. Torna, yedek parça ve teneke ürünleri imalatı. Metin isim ve mastar biçiminde yazılır. 'yapıyoruz', 'ediyoruz', 'çalışır' kullanılmaz. Yeni sayı, ölçü, kapasite veya süre uydurulmaz. Kısa Türkçe.

Kullanıcı notu: ${specialRequest || "Yok"}. Alan: ${roomType || "belirtilmedi"}. Stil: ${stylePreference || "yazılmadı"}. Ölçü: ${dimensions || "yazılmadı"}.`;

        if (!apiKey) {
            return NextResponse.json({
                recommendation: "Metal poster imalatı. Fiyat için yazışma. Adres: 1471 Sokak No:12/A, Alsancak.",
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
            recommendation: text || "Yanıt yok. WhatsApp ile ürün ve adet yazışması.",
        });
    } catch (err: unknown) {
        console.error("AI Curator error:", err);
        return NextResponse.json(
            {
                recommendation: "Yanıt yazılamadı. WhatsApp ile ürün ve adet.",
            },
            { status: 200 }
        );
    }
}
