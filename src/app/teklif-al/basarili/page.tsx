"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';
import { PageContainer } from '@/components/layout/PageContainer';
import { useContentStore } from '@/store/useContentStore';

function TeklifBasariliContent() {
    const searchParams = useSearchParams();
    const { content } = useContentStore();
    const [uploadStatus, setUploadStatus] = useState<'ok' | 'fail' | null>(null);
    const [referenceNumber, setReferenceNumber] = useState<string>('');

    useEffect(() => {
        const ref = searchParams.get('ref');
        const upload = searchParams.get('upload');
        if (ref) setReferenceNumber(ref);
        if (upload === 'ok') setUploadStatus('ok');
        else if (upload === 'fail') setUploadStatus('fail');
    }, [searchParams]);

    const phone = (content.footerPhone || '+905071651315').replace(/\s/g, '');
    const whatsapp = content.whatsappNumber || '905071651315';

    return (
        <PageContainer className="max-w-2xl">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#161616] mb-3">
                    {uploadStatus === 'fail' ? 'Talep alındı (eksik dosya)' : 'Talebiniz alındı'}
                </h1>
                <p className="text-lg text-[#525252]">
                    {uploadStatus === 'fail'
                        ? 'Teklif talebiniz kaydedildi ancak dosya yüklenirken bir hata oluştu.'
                        : 'Teklif talebiniz başarıyla kaydedildi. Ekibimiz en geç 24 saat içinde dönüş yapacaktır.'}
                </p>
            </div>

            {uploadStatus === 'fail' && (
                <div className="bg-red-50 border border-red-200 p-5 mb-6 text-sm text-red-700">
                    Teknik çiziminiz yüklenemedi. Lütfen dosyayı WhatsApp üzerinden referans numaranızla birlikte gönderin.
                </div>
            )}

            {referenceNumber && (
                <div className="bg-[var(--color-brand-accent)]/10 border border-[var(--color-brand-accent)] p-6 mb-6 text-center">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#525252] mb-2">Referans numaranız</p>
                    <p className="text-2xl font-bold text-[var(--color-brand-accent)] font-mono">{referenceNumber}</p>
                    <p className="text-xs text-[#525252] mt-2">İletişimde bu numarayı kullanın.</p>
                </div>
            )}

            <div className="bg-white border border-[#c6c6c6] p-6 mb-6">
                <h2 className="text-lg font-bold text-[#161616] mb-2">Sonraki adımlar</h2>
                <p className="text-[#525252] text-sm leading-relaxed">
                    Teknik ekibimiz talebinizi inceleyecek; ölçü, miktar ve teslimat bilgilerinize göre toptan fiyatlandırma paylaşacaktır.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <a
                    href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Merhaba, ${referenceNumber} numaralı teklif talebim hakkında bilgi almak istiyorum.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-12 border border-[#c6c6c6] bg-white hover:border-[var(--color-brand-accent)] text-sm font-semibold transition-colors"
                >
                    <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
                <a
                    href={`tel:${phone}`}
                    className="flex items-center justify-center gap-2 h-12 border border-[#c6c6c6] bg-white hover:border-[var(--color-brand-accent)] text-sm font-semibold transition-colors"
                >
                    <Phone className="w-4 h-4" /> Telefon
                </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/#hizmetler" className="flex-1 text-center h-12 flex items-center justify-center border border-[#c6c6c6] text-sm font-semibold hover:border-[var(--color-brand-accent)] transition-colors">
                    Hizmetler
                </Link>
                <Link href="/" className="flex-1 text-center h-12 flex items-center justify-center gap-2 bg-[var(--color-brand-accent)] text-white text-sm font-semibold hover:bg-[#0043ce] transition-colors">
                    Ana sayfa <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </PageContainer>
    );
}

export default function TeklifBasariliPage() {
    return (
        <PageShell variant="muted">
            <Suspense fallback={<div className="text-center text-[#525252] py-12">Yükleniyor...</div>}>
                <TeklifBasariliContent />
            </Suspense>
        </PageShell>
    );
}
