'use client';

// MP-07: Service Card Component

import Link from 'next/link';
import { Service } from '@/lib/b2b/types';

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="group relative bg-white border border-neutral-200 rounded-lg p-6 hover:border-neutral-900 transition-all duration-300 hover:shadow-lg">
            {/* Icon */}
            <div className="text-4xl mb-4">{service.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {service.title}
            </h3>

            {/* Short Description */}
            <p className="text-neutral-600 mb-4 leading-relaxed">
                {service.shortDescription}
            </p>

            {/* Technical Notes Preview */}
            {service.technicalNotes.materials && (
                <div className="text-sm text-neutral-500 mb-4">
                    <span className="font-medium">Malzemeler:</span> {service.technicalNotes.materials}
                </div>
            )}

            {/* CTA */}
            <Link
                href={`/hizmetler/${service.slug}`}
                className="inline-flex items-center gap-2 text-neutral-900 font-medium group-hover:gap-3 transition-all"
            >
                Detaylı Bilgi
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </Link>
        </div>
    );
}
