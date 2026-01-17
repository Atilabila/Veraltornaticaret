"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Maximize2, Terminal, Activity } from "lucide-react";

const showcases = [
    {
        id: "SC_01",
        title: "YAŞAM ALANI ENTEGRASYONU",
        location: "MODERN KONUT",
        image: "/mockup_living.png",
        specs: "40x60 CM // FIRÇALANMIŞ ALÜMİNYUM"
    },
    {
        id: "SC_02",
        title: "ÇALIŞMA İSTASYONU DİZİNİ",
        location: "ENDÜSTRİYEL STÜDYO",
        image: "/mockup_office.png",
        specs: "20x30 CM // 3x3 MATRİS KURULUMU"
    }
];

export const GalleryShowcase = () => {
    return (
        <section id="showcase" className="py-24 bg-black border-b-8 border-[var(--color-brand-safety-orange)]">
            <div className="container-brutal">
                <div className="flex items-center gap-4 mb-16 border-l-8 border-[var(--color-brand-safety-orange)] pl-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-[var(--color-brand-safety-orange)]" />
                            <span className="font-mono text-xs font-black text-[var(--color-brand-safety-orange)] uppercase tracking-widest">GÖRSEL DOĞRULAMA</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-[Archivo Black] text-white uppercase leading-none">
                            ORTAM <span className="text-[var(--color-brand-safety-orange)]">MOKAPLARI</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {showcases.map((sc) => (
                        <div key={sc.id} className="border-8 border-white bg-black group relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(255,95,31,0.5)]">
                            <div className="aspect-video relative transition-none">
                                <Image
                                    src={sc.image}
                                    alt={sc.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 group-hover:bg-transparent transition-none"></div>

                                {/* INTERFACE_OVERLAY */}
                                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                    <div className="bg-white text-black font-mono text-[10px] font-black px-2 py-1 flex items-center gap-2">
                                        <Terminal className="w-3 h-3" /> {sc.id}
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4 z-10">
                                    <div className="bg-[var(--color-brand-safety-orange)] text-white p-2 border-2 border-black active:scale-95 transition-none">
                                        <Maximize2 className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t-8 border-white bg-white">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-[Archivo Black] uppercase leading-none mb-2">{sc.title}</h3>
                                        <p className="font-mono text-xs font-black text-black/50">{sc.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-mono text-[10px] font-black opacity-30 uppercase">KALİBRASYON</span>
                                        <span className="font-mono text-xs font-black uppercase">{sc.specs}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-[#E5E7EB] border-4 border-white p-8 font-mono text-sm font-bold text-black flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-[var(--color-brand-safety-orange)] animate-pulse"></div>
                        <p>SİSTEM NOTU: YUKARIDAKİ GÖRSELLER SADECE REFERANS AMAÇLIDIR. GERÇEK ÜRÜN GERÇEK METAL DOKUSUNU YANSITIR.</p>
                    </div>
                    <button className="btn-mechanical bg-black text-white px-8 py-3 uppercase text-xs">
                        ÖZEL MOKAP TALEBİ
                    </button>
                </div>
            </div>
        </section>
    );
};
