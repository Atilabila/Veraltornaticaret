"use client";

import React from 'react';
import { History, ShieldCheck, Clock, Layers, MapPin } from 'lucide-react';
import { TrustChip, SystemLabel } from '@/components/ui/Industrial';

export const TrustSection = () => {
    const safetySignals = [
        { icon: History, title: "1980'den Beri", subtitle: "Köklü üretim geçmişi" },
        { icon: ShieldCheck, title: "3. Kuşak", subtitle: "Usta-çırak geleneği" },
        { icon: Clock, title: "Termin Sadakati", subtitle: "Zamanında teslimat" },
        { icon: Layers, title: "Özel İmalat", subtitle: "Butik ve seri üretim" },
        { icon: MapPin, title: "Yerel Üretim", subtitle: "İzmir / Alsancak" }
    ];

    return (
        <section className="bg-paper-white border-b border-fog-gray py-12">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="flex items-center gap-4 mb-8">
                    <SystemLabel text="SİSTEM DURUMU" active />
                </div>
                <div className="flex overflow-x-auto md:grid md:grid-cols-5 gap-4 pb-4 md:pb-0 scrollbar-hide">
                    {safetySignals.map((signal, idx) => (
                        <div key={idx} className="min-w-[160px] md:min-w-0 flex-shrink-0">
                            <TrustChip {...signal} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
