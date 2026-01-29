'use client';

// MP-07: Quote Confirmation Component

import Link from 'next/link';
import { QuoteRequest } from '@/lib/b2b/types';
import { useContentStore } from '@/store/useContentStore';

interface QuoteConfirmationProps {
    quote: QuoteRequest;
}

export default function QuoteConfirmation({ quote }: QuoteConfirmationProps) {
    const { content } = useContentStore();

    // WhatsApp link with pre-filled message
    const whatsappNumber = content.whatsappNumber;
    const whatsappMessage = `Merhaba, ${quote.id} numaralı teklifim hakkında bilgi almak istiyorum.`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-neutral-900 text-center mb-4">
                Talebiniz Alındı
            </h1>

            {/* Reference Number */}
            <div className="bg-neutral-50 border-2 border-neutral-900 rounded-lg p-6 mb-6">
                <p className="text-sm text-neutral-600 text-center mb-2">
                    Referans Numaranız
                </p>
                <p className="text-2xl font-bold text-neutral-900 text-center font-mono tracking-wider">
                    {quote.id}
                </p>
                <p className="text-xs text-neutral-500 text-center mt-2">
                    Bu numarayı not alın veya ekran görüntüsü kaydedin
                </p>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-3">
                    Sonraki Adımlar
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                    Talebiniz alındı. Teknik ekibimiz en geç 24 saat içinde sizinle iletişime geçecektir.
                </p>
            </div>

            {/* Quote Summary */}
            <div className="border border-neutral-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                    Talep Özeti
                </h3>
                <dl className="space-y-3">
                    <div>
                        <dt className="text-sm text-neutral-500">Ad Soyad</dt>
                        <dd className="text-neutral-900 font-medium">{quote.fullName}</dd>
                    </div>
                    {quote.company && (
                        <div>
                            <dt className="text-sm text-neutral-500">Firma</dt>
                            <dd className="text-neutral-900 font-medium">{quote.company}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-sm text-neutral-500">E-posta</dt>
                        <dd className="text-neutral-900 font-medium">{quote.email}</dd>
                    </div>
                    <div>
                        <dt className="text-sm text-neutral-500">Telefon</dt>
                        <dd className="text-neutral-900 font-medium">{quote.phone}</dd>
                    </div>
                    <div>
                        <dt className="text-sm text-neutral-500">Hizmet Türü</dt>
                        <dd className="text-neutral-900 font-medium">{quote.serviceType}</dd>
                    </div>
                    {quote.fileMetadata && (
                        <div>
                            <dt className="text-sm text-neutral-500">Dosya</dt>
                            <dd className="text-neutral-900 font-medium">
                                {quote.fileMetadata.fileName}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>

            {/* Support CTAs */}
            <div className="space-y-3">
                {/* WhatsApp CTA */}
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-green-600 text-white font-medium py-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp ile İletişime Geç
                </a>

                {/* Phone CTA */}
                <a
                    href={`tel:${content.footerPhone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center gap-3 w-full bg-neutral-900 text-white font-medium py-4 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Telefon ile Ara
                </a>

                {/* Back to Services */}
                <Link
                    href="/hizmetler"
                    className="flex items-center justify-center gap-2 w-full border-2 border-neutral-900 text-neutral-900 font-medium py-4 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                    Hizmetlere Dön
                </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
                <p className="text-sm text-neutral-500">
                    E-posta adresinize de bir onay mesajı gönderdik.
                </p>
            </div>
        </div>
    );
}
