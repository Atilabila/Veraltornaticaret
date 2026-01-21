"use client";

import React from 'react';
import { ShieldCheck, Clock, Layers, RotateCcw, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustSection = () => {
    const safetySignals = [
        {
            icon: ShieldCheck,
            title: "Güvenli Ödeme",
            subtitle: "3D Secure Altyapısı",
            color: "bg-blue-50",
            iconColor: "text-blue-500"
        },
        {
            icon: Clock,
            title: "Hızlı Kargo",
            subtitle: "24-48 Saat Teslim",
            color: "bg-orange-50",
            iconColor: "text-[#ff6b00]"
        },
        {
            icon: Layers,
            title: "1.5mm Metal",
            subtitle: "Dayanıklı Alüminyum",
            color: "bg-gray-50",
            iconColor: "text-gray-600"
        },
        {
            icon: RotateCcw,
            title: "14 Gün İade",
            subtitle: "Kolay İade Süreci",
            color: "bg-green-50",
            iconColor: "text-green-500"
        },
        {
            icon: Truck,
            title: "Ücretsiz Kargo",
            subtitle: "500 TL Üzeri Sipariş",
            color: "bg-purple-50",
            iconColor: "text-purple-500"
        }
    ];

    return (
        <section className="py-20">
            <div className="container-brutal">
                <div className="flex flex-col gap-4 mb-12">
                    <span className="text-[10px] font-black text-[#ff6b00] tracking-[0.3em] uppercase">
                        Sizin İçin Buradayız
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#111827] uppercase tracking-tighter">
                        Alışveriş Güvencesi
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {safetySignals.map((signal, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Animated Background Decor */}
                            <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${signal.color} opacity-40 group-hover:scale-150 transition-transform duration-700`} />

                            <div className="relative z-10 flex flex-col gap-6">
                                <div className={`w-14 h-14 rounded-2xl ${signal.color} flex items-center justify-center ${signal.iconColor} group-hover:scale-110 transition-transform`}>
                                    <signal.icon size={28} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-extrabold text-gray-900 uppercase tracking-tight text-sm">
                                        {signal.title}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                        {signal.subtitle}
                                    </span>
                                </div>
                            </div>

                            {/* Hover Border Accent */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff6b00] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
