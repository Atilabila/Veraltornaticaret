import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ImageViewerPro } from '@/components/product/ImageViewerPro';
import { SystemLabel, PrimaryButton } from '@/components/ui/Industrial';
import { MobileStickyBar } from '@/components/layout/MobileStickyBar';
import { Check, ChevronRight, Info, Package, Truck, Ruler, Settings } from 'lucide-react';
import Link from 'next/link';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = PRODUCTS_DATA[slug];
    if (!product) return { title: 'Ürün Bulunamadı' };

    return {
        title: `${product.title} | VERAL Torna & Teneke İZMİR`,
        description: product.oneLiner,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = PRODUCTS_DATA[slug];

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-paper-white">
            <Navigation />

            {/* Page Content */}
            <div className="pt-24 pb-12 px-6 max-w-[1240px] mx-auto">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-[11px] font-ibm-plex text-steel-gray uppercase tracking-widest">
                    <Link href="/" className="hover:text-near-black">ANA SAYFA</Link>
                    <ChevronRight size={12} />
                    <Link href="/urunler" className="hover:text-near-black">ÜRÜNLER</Link>
                    <ChevronRight size={12} />
                    <span className="text-near-black font-bold">{product.title}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Main Column (8/12) */}
                    <div className="lg:col-span-8 flex flex-col gap-12">

                        {/* Product Hero */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <SystemLabel text={`MODÜL: ${product.category}`} active />
                                    <SystemLabel text={`ID: ${product.slug.toUpperCase()}`} />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold font-space uppercase leading-tight">
                                    {product.title}
                                </h1>
                            </div>

                            {/* Pro Viewer */}
                            <ImageViewerPro images={product.images} title={product.title} />
                        </div>

                        {/* Description & Highlights */}
                        <div className="grid md:grid-cols-2 gap-12 border-t border-fog-gray pt-12">
                            <div className="flex flex-col gap-6">
                                <h3 className="font-space font-bold uppercase text-xl">Üretim Kaydı Detayları</h3>
                                <p className="text-steel-gray font-source-sans text-lg leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                            <div className="bg-near-black p-8 text-white flex flex-col gap-6">
                                <h3 className="font-space font-bold uppercase text-hazard-orange">Öne Çıkan Özellikler</h3>
                                <ul className="flex flex-col gap-4">
                                    {product.highlightFeatures.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm font-ibm-plex uppercase tracking-wide">
                                            <Check size={16} className="text-acid-green shrink-0" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Spec Blocks */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <SpecCard title="MALZEME" icon={Ruler} items={product.specs.material} />
                            <SpecCard title="ÜRETİM" icon={Settings} items={product.specs.production} />
                            <SpecCard title="TESLİMAT" icon={Truck} items={product.specs.delivery} />
                        </div>

                        {/* Options */}
                        <div className="flex flex-col gap-6 border-t border-fog-gray pt-12">
                            <h3 className="font-space font-bold uppercase text-xl">Opsiyonlar ve Varyasyonlar</h3>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {product.options.map((opt, idx) => (
                                    <div key={idx} className="p-6 border border-fog-gray bg-white hover:border-near-black transition-all group">
                                        <h4 className="font-bold text-sm uppercase mb-2 group-hover:text-hazard-orange">{opt.title}</h4>
                                        <p className="text-xs text-steel-gray">{opt.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="flex flex-col gap-6 border-t border-fog-gray pt-12">
                            <h3 className="font-space font-bold uppercase text-xl">Sıkça Sorulanlar (Kayıt Notları)</h3>
                            <div className="flex flex-col gap-4">
                                {product.faqs.map((faq, idx) => (
                                    <div key={idx} className="p-6 bg-paper-white border border-fog-gray flex flex-col gap-2">
                                        <span className="text-xs font-bold text-hazard-orange uppercase font-ibm-plex">Soru {idx + 1}</span>
                                        <h4 className="font-bold text-base">{faq.question}</h4>
                                        <p className="text-sm text-steel-gray mt-2">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar Column (4/12) - Sticky Quote Panel */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col gap-6">
                        <div className="p-8 bg-white border border-near-black shadow-xl">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 bg-hazard-orange animate-pulse" />
                                <span className="font-ibm-plex text-[10px] font-bold uppercase tracking-widest text-steel-gray">PROJE_FORMU_AKTİF</span>
                            </div>

                            <h3 className="text-2xl font-bold font-space uppercase mb-4">Fiyat Teklifi Alın</h3>
                            <p className="text-xs text-steel-gray mb-8">
                                Adet, ölçü ve teslim tarihine göre size özel maliyet çalışması yapıyoruz.
                            </p>

                            <form className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold uppercase text-steel-gray">İrtibat Kişisi</label>
                                    <input type="text" placeholder="Adınız / Firmanız" className="w-full bg-paper-white border border-fog-gray p-3 text-sm focus:border-near-black outline-none" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold uppercase text-steel-gray">İletişim Kanalı</label>
                                    <input type="text" placeholder="Telefon veya E-posta" className="w-full bg-paper-white border border-fog-gray p-3 text-sm focus:border-near-black outline-none" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold uppercase text-steel-gray">Talep Notu (Adet / Ölçü)</label>
                                    <textarea rows={3} placeholder="Örn: 500 adet 80mm dosya teli talebi." className="w-full bg-paper-white border border-fog-gray p-3 text-sm focus:border-near-black outline-none resize-none" />
                                </div>

                                <PrimaryButton label="Sorgulamayı Başlat" className="w-full justify-between py-4" iconRight={ChevronRight} />
                            </form>

                            <div className="mt-8 pt-8 border-t border-fog-gray flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <Info size={16} className="text-hazard-orange" />
                                    <span className="text-[10px] font-bold uppercase text-steel-gray">TÜM PROJELERDE 24 SAATTE DÖNÜŞ</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Package size={16} className="text-hazard-orange" />
                                    <span className="text-[10px] font-bold uppercase text-steel-gray">NUMUNE TALEP EDİLEBİLİR</span>
                                </div>
                            </div>
                        </div>

                        {/* Support Help */}
                        <Link href="https://wa.me/905071651315" className="p-6 bg-acid-green/10 border border-acid-green text-acid-green hover:bg-acid-green hover:text-near-black transition-all flex items-center justify-between group">
                            <div className="flex flex-col">
                                <span className="font-bold text-sm uppercase">Hızlı Destek Hattı</span>
                                <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">WhatsApp Bağlantısı</span>
                            </div>
                            <div className="group-hover:translate-x-1 transition-transform">→</div>
                        </Link>
                    </div>

                </div>
            </div>

            <Footer />
            <MobileStickyBar />
        </main>
    );
}

const SpecCard = ({ title, icon: Icon, items }: { title: string, icon: any, items: any[] }) => (
    <div className="p-6 border border-fog-gray bg-white">
        <div className="flex items-center gap-3 mb-6 text-hazard-orange">
            <Icon size={20} />
            <h4 className="font-bold text-sm uppercase tracking-tight">{title}</h4>
        </div>
        <div className="flex flex-col gap-4">
            {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-end border-b border-fog-gray pb-2">
                    <span className="text-[10px] font-bold text-steel-gray uppercase">{item.label}</span>
                    <span className="text-xs font-bold text-near-black">{item.value}</span>
                </div>
            ))}
        </div>
    </div>
);
