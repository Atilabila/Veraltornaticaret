"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function TeklifBasariliContent() {
    const searchParams = useSearchParams();
    const [uploadStatus, setUploadStatus] = useState<'ok' | 'fail' | null>(null);
    const [referenceNumber, setReferenceNumber] = useState<string>('');

    useEffect(() => {
        const ref = searchParams.get('ref');
        const upload = searchParams.get('upload');
        if (ref) setReferenceNumber(ref);
        if (upload === 'ok') setUploadStatus('ok');
        else if (upload === 'fail') setUploadStatus('fail');
    }, [searchParams]);

    return (
        <div className="max-w-2xl w-full">
            {/* Success Icon */}
            <div className="text-center mb-8">
                <div className="inline-block bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="font-[Archivo_Black] text-4xl uppercase mb-4">
                    {uploadStatus === 'fail' ? 'TALEP ALINDI (EKSİK)' : 'TALEBİNİZ ALINDI!'}
                </h1>
                <p className="font-mono text-lg text-black/80">
                    {uploadStatus === 'fail'
                        ? 'Teklif talebiniz kaydedildi ancak dosya yüklenirken bir hata oluştu.'
                        : 'Teklif talebiniz başarıyla kaydedildi.'}
                </p>
            </div>

            {/* Upload Error Alert */}
            {uploadStatus === 'fail' && (
                <div className="bg-red-50 border-4 border-red-500 p-6 mb-8 font-mono">
                    <p className="font-bold text-red-700 uppercase mb-2">⚠️ DOSYA YÜKLEME HATASI</p>
                    <p className="text-sm text-red-600">
                        Teknik çiziminiz sisteme yüklenemedi. Lütfen çiziminizi WhatsApp üzerinden referans numaranızla birlikte gönderin.
                    </p>
                </div>
            )}

            {/* Reference Number */}
            {referenceNumber && (
                <div className="bg-[var(--color-brand-safety-orange)] border-4 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="text-center">
                        <p className="font-mono text-sm uppercase mb-2">REFERANS NUMARANIZ</p>
                        <p className="font-[Archivo_Black] text-3xl tracking-wider">
                            {referenceNumber}
                        </p>
                        <p className="font-mono text-xs mt-2">
                            Bizimle iletişime geçerken bu numarayı kullanın.
                        </p>
                    </div>
                </div>
            )}

            {/* Next Steps - MP-07 LOCKED COPY */}
            <div className="border-4 border-black p-8 mb-8">
                <h2 className="font-[Archivo_Black] text-2xl uppercase mb-4">
                    SONRAKI ADIMLAR
                </h2>
                <p className="font-mono text-black/80 leading-relaxed">
                    Talebiniz alındı. Teknik ekibimiz en geç 24 saat içinde sizinle iletişime geçecektir.
                </p>
            </div>

            {/* Contact Options */}
            <div className="bg-black text-white p-6 mb-8">
                <h3 className="font-[Archivo_Black] text-xl uppercase mb-4">
                    HEMEN İLETİŞİME GEÇİN
                </h3>
                <p className="font-mono text-sm mb-4 text-white/80">
                    Acil durumlar için doğrudan bize ulaşabilirsiniz:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a
                        href={`https://wa.me/90XXXXXXXXXX?text=${encodeURIComponent(`Merhaba, ${referenceNumber} numaralı teklifim hakkında bilgi almak istiyorum.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-2 border-white p-4 hover:bg-white hover:text-black transition-colors text-center"
                    >
                        <div className="font-mono font-bold">📱 WhatsApp</div>
                        <div className="font-mono text-sm mt-1">Teklif Hakkında Sor</div>
                    </a>
                    <a
                        href="tel:+90XXXXXXXXXX"
                        className="border-2 border-white p-4 hover:bg-white hover:text-black transition-colors text-center"
                    >
                        <div className="font-mono font-bold">📞 Telefon</div>
                        <div className="font-mono text-sm mt-1">Hemen Ara</div>
                    </a>
                </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/hizmetler"
                    className="flex-1 text-center bg-white border-4 border-black py-3 font-mono font-bold uppercase hover:bg-black hover:text-white transition-colors"
                >
                    ← HİZMETLER
                </Link>
                <Link
                    href="/"
                    className="flex-1 text-center bg-[var(--color-brand-safety-orange)] border-4 border-black py-3 font-mono font-bold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                    ANA SAYFA →
                </Link>
            </div>
        </div>
    );
}

export default function TeklifBasariliPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
            <Suspense fallback={<div className="font-mono text-xl">Yükleniyor...</div>}>
                <TeklifBasariliContent />
            </Suspense>
        </div>
    );
}
