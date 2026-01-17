"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Award, Wrench, Heart, Instagram, Phone, Mail, ChevronRight, Activity, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HakkimizdaPage() {
    return (
        <main className="min-h-screen bg-white grid-terminal no-transition pb-24">
            {/* NAVIGATION_TERMINAL */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black py-4">
                <div className="container-brutal flex justify-between items-center gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center text-white font-black text-xl sm:text-2xl group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-none shadow-[4px_4px_0px_0px_var(--color-brand-safety-orange)]">
                            V
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-lg font-[Archivo Black] leading-none uppercase flex items-center gap-1">
                                VERAL <span className="text-[var(--color-brand-veral-green)] text-[8px] sm:text-[10px] bg-black px-1 py-0.5">IND</span>
                            </span>
                            <span className="text-[8px] sm:text-[10px] font-mono font-black text-black/40 uppercase tracking-[0.2em]">TORNA & TENEKE // TİCARET</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8 font-mono font-bold text-sm">
                        <Link href="/" className="hover:bg-black hover:text-white px-2 py-1">ÜRETİM HATTI</Link>
                        <Link href="/urunler" className="hover:bg-black hover:text-white px-2 py-1">KATALOG DOSYALARI</Link>
                        <Link href="/hakkimizda" className="bg-black text-white px-2 py-1">TARİHÇE KAYDI</Link>
                        <Link href="/blog" className="hover:bg-black hover:text-white px-2 py-1">RAPORLAR</Link>
                    </div>

                    <Link href="/" className="btn-mechanical bg-[var(--color-brand-safety-orange)] text-white text-[10px] sm:text-xs font-black px-4 sm:px-6 py-2 uppercase truncate max-w-[120px] sm:max-w-none shadow-[4px_4px_0px_0px_black]">
                        ANA MERKEZE DÖN
                    </Link>
                </div>
            </nav>

            {/* HEADER_MOD */}
            <section className="pt-40 pb-24 bg-[#E5E7EB] border-b-8 border-black">
                <div className="container-brutal">
                    <div className="max-w-4xl border-8 border-black bg-white p-12 shadow-brutal">
                        <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 font-mono text-xs font-black mb-8">
                            [ KAYIT GİRİŞİ: 1983 ]
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-[Archivo Black] leading-tight md:leading-none mb-8 uppercase">
                            METAL İŞLEMEDE<br className="hidden sm:block" />
                            <span className="text-[var(--color-brand-safety-orange)]"> MİRAS</span>
                        </h1>
                        <p className="font-mono text-xl font-bold border-t-8 border-black pt-8">
                            40 YILLIK MEKANİK ÜSTÜNLÜK. ÜÇ NESİLDİR DEVAM EDEN ÜRETİM MÜKEMMELİYETİ.
                            1983 YILINDA MUSTAFA VERAL İLE BAŞLAYAN BU YOLCULUK, BUGÜN ENDÜSTRİ STANDARDI OLARAK DEVAM EDİYOR.
                        </p>
                    </div>
                </div>
            </section>

            {/* FOUNDER_DATA */}
            <section className="py-24">
                <div className="container-brutal">
                    <div className="grid lg:grid-cols-2 gap-0 border-8 border-black shadow-brutal overflow-hidden">
                        {/* VISUAL_INTEL */}
                        <div className="relative bg-black border-b-8 lg:border-b-0 lg:border-r-8 border-black">
                            <div className="aspect-[4/5] relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="text-center">
                                        <div className="w-48 h-48 mx-auto bg-[var(--color-brand-safety-orange)] flex items-center justify-center shadow-brutal border-4 border-black mb-8">
                                            <span className="text-8xl font-[Archivo Black] text-white">MV</span>
                                        </div>
                                        <h3 className="text-4xl font-[Archivo Black] text-white uppercase">MUSTAFA VERAL</h3>
                                        <p className="font-mono text-[#FFD700] font-black tracking-widest mt-2">KURUCU KIDEMLİ MÜHENDİS | 1983</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 grid-terminal opacity-30 z-0" />
                            </div>

                            {/* DATA_CHIP */}
                            <div className="absolute bottom-12 right-12 z-30 bg-white border-4 border-black p-6 shadow-brutal">
                                <div className="text-5xl font-[Archivo Black] text-[var(--color-brand-safety-orange)]">40+</div>
                                <div className="text-xs font-mono font-black uppercase">HİZMET YILI</div>
                            </div>
                        </div>

                        {/* INTEL_REPORT */}
                        <div className="p-12 bg-white flex flex-col justify-center">
                            <h2 className="text-4xl font-[Archivo Black] mb-12 uppercase border-b-8 border-black pb-4 inline-block">
                                MİMARIN <span className="text-[var(--color-brand-safety-orange)]">SÜRECİ</span>
                            </h2>
                            <div className="space-y-8 font-mono text-lg font-bold leading-relaxed">
                                <p className="border-l-8 border-[var(--color-brand-safety-orange)] pl-6">
                                    1983: TÜRKİYE'NİN ENDÜSTRİYEL GENİŞLEMESİ BAŞLIYOR. MUSTAFA VERAL, YÜKSEK HASSASİYETLİ BİR LABORATUVAR ORTAMINDA TORNA VE TENEKE OPERASYONLARINI BAŞLATIYOR.
                                </p>
                                <p>
                                    O DÖNEMDE METALE ŞEKİL VERMEK, GÜÇTEN FAZLASINI—HİSSEL BİR KALİBRASYON GEREKTİRİYORDU. "ÜRETİLEN HER BİRİM, MÜKEMMELLİĞİN BİR SERTİFİKASIDIR" ONUN TEMEL PROTOKOLÜYDÜ.
                                </p>
                                <p>
                                    DEĞİŞMEYEN SABİTLER: DÜRÜSTLÜK. HASSASİYET. SİSTEM GÜVENİLİRLİĞİ. BUGÜN VERAL TORNA & TENEKE, BU ARŞİVSEL MİRASIN MODERN ARAYÜZÜNÜ TEMSİL EDER.
                                </p>
                            </div>

                            {/* COMM_LOG */}
                            <div className="mt-12 p-8 bg-black text-white shadow-brutal">
                                <p className="text-2xl font-[Archivo Black] italic mb-4 uppercase">
                                    "METAL SOĞUKTUR. ONA HAYATI KALİBRASYON VERİR."
                                </p>
                                <cite className="font-mono text-sm text-[var(--color-brand-safety-orange)] font-black not-italic">// MUSTAFA VERAL, BAŞ MİMAR</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TIMELINE_LOGS */}
            <section className="py-24 bg-[#E5E7EB] border-y-8 border-black">
                <div className="container-brutal">
                    <div className="mb-24 flex items-center gap-8">
                        <Terminal className="w-12 h-12 text-black" />
                        <h2 className="text-5xl md:text-7xl font-[Archivo Black] uppercase">KRONOLOJİK KAYITLAR</h2>
                    </div>

                    <div className="grid gap-0 border-8 border-black bg-white shadow-brutal">
                        {[
                            {
                                year: "1983",
                                title: "SİSTEM BAŞLATMA",
                                description: "MUSTAFA VERAL ANA ÜRETİM BİRİMİNİ KURUYOR. SEÇKİN ZANAATKÂRLIK DEVREYE ALINIYOR.",
                                icon: <Wrench className="w-8 h-8" />,
                            },
                            {
                                year: "1995",
                                title: "ÖLÇEKSEL GENİŞLEME",
                                description: "SERİGRAFİ BİRİMLERİNİN ENTEGRASYONU. ENDÜSTRİYEL ÖLÇEKLİ PLAKA ÜRETİMİNE GEÇİŞ.",
                                icon: <Award className="w-8 h-8" />,
                            },
                            {
                                year: "2008",
                                title: "2. NESİL ENTEGRASYONU",
                                description: "YENİ NESİL LİDERLİK KOMUTAYI ALIYOR. DİJİTAL KALİBRASYON UND OTOMASYON SİSTEMLERİ ÇEVRİMİÇİ.",
                                icon: <Users className="w-8 h-8" />,
                            },
                            {
                                year: "2018",
                                title: "UV OPTİK BASKI",
                                description: "YÜKSEK YOĞUNLUKLU UV OPTİK BASKI BİRİMLERİNİN DEVREYE ALINMASI. BİRİNCİ SINIF ARŞİVSEL ÜRETİM AKTİF EDİLDİ.",
                                icon: <Activity className="w-8 h-8" />,
                            },
                            {
                                year: "2024",
                                title: "3. NESİL ARAYÜZÜ",
                                description: "TAM DİJİTAL TİCARETE GEÇİŞ. KÜRESEL LOJİSTİK ARAYÜZÜ v3.0 DEVREYE ALINDI.",
                                icon: <Heart className="w-8 h-8" />,
                            },
                        ].map((item, index) => (
                            <div
                                key={item.year}
                                className="flex flex-col md:flex-row border-b-8 last:border-b-0 border-black transition-none hover:bg-[#FFD700]"
                            >
                                <div className="p-8 md:w-48 bg-black text-white flex flex-col items-center justify-center shrink-0">
                                    <div className="text-3xl font-[Archivo Black] mb-2">{item.year}</div>
                                    <div className="bg-[var(--color-brand-safety-orange)] p-4 border-2 border-white shadow-brutal text-white">
                                        {item.icon}
                                    </div>
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="text-3xl font-[Archivo Black] mb-4 uppercase">{item.title}</h3>
                                    <p className="font-mono text-lg font-bold text-black uppercase leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CORE_VALUES */}
            <section className="py-24">
                <div className="container-brutal">
                    <h2 className="text-4xl sm:text-5xl font-[Archivo Black] mb-16 uppercase text-center">TEMEL DEĞERLER</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-8 border-black shadow-brutal overflow-hidden">
                        {[
                            {
                                title: "HASSASİYET",
                                description: "HER BİRİM İÇİN TİTİZ KK DENETİMİ. VERAL_IND MÜHRÜ, GEOMETRİK MÜKEMMELLİĞİN GARANTİSİDİR.",
                                icon: <Award className="w-12 h-12" />,
                            },
                            {
                                title: "DÜRÜSTLÜK",
                                description: "ŞEFFAF İŞLEM PROTOKOLLERİ. İLK MİMARIN SÖZÜNE SADIK KALIYORUZ: MUTLAK GÜVENİLİRLİK.",
                                icon: <Heart className="w-12 h-12" />,
                            },
                            {
                                title: "KALİBRASYON",
                                description: "GELENEKSEL MEKANİK MANTIĞIN EN SON TEKNOLOJİ DİJİTAL ÜRETİM İLE FÜZYONU.",
                                icon: <Wrench className="w-12 h-12" />,
                            },
                        ].map((value, index) => (
                            <div
                                key={value.title}
                                className="p-12 text-center border-b-8 md:border-b-0 md:border-r-8 last:border-b-0 md:last:border-r-0 border-black bg-white hover:bg-[var(--color-brand-safety-orange)] hover:text-white transition-none group"
                            >
                                <div className="w-24 h-24 mx-auto bg-black text-white p-6 border-4 border-white shadow-brutal group-hover:bg-white group-hover:text-black mb-12">
                                    {value.icon}
                                </div>
                                <h3 className="text-3xl font-[Archivo Black] mb-6 uppercase">{value.title}</h3>
                                <p className="font-mono font-black text-sm uppercase leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SYSTEM_STATS */}
            <section className="py-24 bg-black text-white border-y-8 border-[var(--color-brand-safety-orange)]">
                <div className="container-brutal">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { value: "1983", label: "BAŞLANGIÇ" },
                            { value: "03", label: "NESİL" },
                            { value: "10B+", label: "BİRİM SEVKIYATI" },
                            { value: "100%", label: "YEREL ÜRETİM" },
                        ].map((stat, index) => (
                            <div key={stat.label}>
                                <div className="text-5xl md:text-7xl font-[Archivo Black] text-[var(--color-brand-safety-orange)] mb-4">{stat.value}</div>
                                <div className="font-mono font-black text-xs tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER_TERMINAL */}
            <footer id="terminals" className="bg-black text-white py-24 border-t-8 border-[var(--color-brand-safety-orange)]">
                <div className="container-brutal">
                    <div className="grid lg:grid-cols-4 gap-16">
                        <div className="lg:col-span-2">
                            <Link href="/" className="inline-block mb-8">
                                <div className="w-16 h-16 bg-[var(--color-brand-safety-orange)] flex items-center justify-center text-white font-black text-4xl shadow-[6px_6px_0px_0px_white]">
                                    V
                                </div>
                            </Link>
                            <h2 className="text-5xl font-[Archivo Black] mb-6 uppercase tracking-tighter">
                                VERAL <span className="text-[var(--color-brand-safety-orange)]">TORNA & TENEKE</span>
                            </h2>
                            <div className="flex flex-wrap gap-4 font-mono font-bold text-black/80">
                                <Link href="/blog" className="underline decoration-[var(--color-brand-veral-green)] decoration-4 underline-offset-4 hover:bg-black hover:text-white p-1">SERVİS KAYITLARI</Link>
                                <Link href="/urunler" className="underline decoration-[var(--color-brand-veral-green)] decoration-4 underline-offset-4 hover:bg-black hover:text-white p-1">ÜRETİM HATTI</Link>
                                <Link href="/hakkimizda" className="underline decoration-[var(--color-brand-veral-green)] decoration-4 underline-offset-4 hover:bg-black hover:text-white p-1">TARİHÇE VERİSİ</Link>
                            </div>
                        </div>

                        <div className="font-mono space-y-8">
                            <div>
                                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">MERKEZ ÜS</h4>
                                <p className="text-sm border-l-4 border-white pl-4">
                                    1512 Sk. No: 42/1<br />
                                    Alsancak/İzmir<br />
                                    TÜRKİYE BÖLGESİ
                                </p>
                            </div>
                            <div>
                                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">GİRİŞ TERMİNALLERİ</h4>
                                <p className="text-sm border-l-4 border-white pl-4">
                                    TEL: +90 507 165 13 15<br />
                                    E-POSTA: LOG@VERAL.COM<br />
                                    INSTA: @VERALTICARET
                                </p>
                            </div>
                        </div>

                        <div className="font-mono text-xs flex flex-col justify-between">
                            <div>
                                <span className="block text-[var(--color-brand-safety-orange)] font-black mb-2 uppercase">SİSTEM DURUMU</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#4CAF50] animate-pulse"></div>
                                    <span>TÜM SİSTEMLER AKTİF</span>
                                </div>
                            </div>
                            <div className="mt-12 text-white/30">
                                © 2026 VERAL END<br />
                                ÜRETİM KAYDI v4.5.11
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
