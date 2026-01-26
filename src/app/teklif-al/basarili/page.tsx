"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TeklifBasariliPage() {
    const searchParams = useSearchParams();
    const [referenceNumber, setReferenceNumber] = useState<string>('');

    useEffect(() => {
        const ref = searchParams.get('ref');
        if (ref) {
            setReferenceNumber(ref);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Success Icon */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-green-500 text-white w-20 h-20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="font-[Archivo_Black] text-4xl uppercase mb-4">
                        TALEBİNİZ ALINDI!
                    </h1>
                    <p className="font-mono text-lg text-black/80">
                        Teklif talebiniz başarıyla kaydedildi.
                    </p>
                </div>

                {/* Reference Number */}
                {referenceNumber && (
                    <div className="bg-[var(--color-brand-safety-orange)] border-4 border-black p-6 mb-8">
                        <div className="text-center">
                            <p className="font-mono text-sm uppercase mb-2">REFERANS NUMARANIZ</p>
                            <p className="font-[Archivo_Black] text-3xl tracking-wider">
                                {referenceNumber}
                            </p>
                            <p className="font-mono text-xs mt-2">
                                Bu numarayı not alın. İletişimde kullanılacaktır.
                            </p>
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                <div className="border-4 border-black p-8 mb-8">
                    <h2 className="font-[Archivo_Black] text-2xl uppercase mb-6">
                        SONRAKI ADIMLAR
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                                1
                            </div>
                            <div>
                                <p className="font-mono font-bold mb-1">İNCELEME</p>
                                <p className="font-mono text-sm text-black/70">
                                    Teknik ekibimiz talebinizi inceleyecek (2-4 saat)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                                2
                            </div>
                            <div>
                                <p className="font-mono font-bold mb-1">TEKLİF HAZIRLAMA</p>
                                <p className="font-mono text-sm text-black/70">
                                    Detaylı fiyat ve süre bilgisi hazırlanacak (12-24 saat)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                                3
                            </div>
                            <div>
                                <p className="font-mono font-bold mb-1">İLETİŞİM</p>
                                <p className="font-mono text-sm text-black/70">
                                    E-posta veya telefon ile size ulaşacağız
                                </p>
                            </div>
                        </div>
                    </div>
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
                            href="https://wa.me/905326666666"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-white p-4 hover:bg-white hover:text-black transition-colors text-center"
                        >
                            <div className="font-mono font-bold">📱 WhatsApp</div>
                            <div className="font-mono text-sm mt-1">0532 666 66 66</div>
                        </a>
                        <a
                            href="tel:+905326666666"
                            className="border-2 border-white p-4 hover:bg-white hover:text-black transition-colors text-center"
                        >
                            <div className="font-mono font-bold">📞 Telefon</div>
                            <div className="font-mono text-sm mt-1">0532 666 66 66</div>
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
        </div>
    );
}
