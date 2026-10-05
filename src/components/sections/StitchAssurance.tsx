import React from "react";
import { ShieldCheck, Truck, Sparkles, RotateCcw } from "lucide-react";

const ASSURANCES = [
  {
    icon: ShieldCheck,
    title: "Güvenli Ödeme",
    subtitle: "256-Bit SSL & 3D Secure",
    desc: "Tüm kredi kartlarına taksit imkanı ve kurumsal e-fatura entegrasyonu."
  },
  {
    icon: Truck,
    title: "Hızlı Sevkiyat",
    subtitle: "24-48 Saatte Kargo",
    desc: "Özel korumalı ambalajında İzmir Alsancak atölyemizden 81 ile doğrudan teslimat."
  },
  {
    icon: Sparkles,
    title: "1.5mm Metal Mukavemeti",
    subtitle: "4K UV Kürleme Baskı",
    desc: "Güneş ışığında solmayan, neme dayanıklı paslanmaz ve DKP çelik levha kalitesi."
  },
  {
    icon: RotateCcw,
    title: "40 Yıllık Güvence",
    subtitle: "14 Gün Koşulsuz Değişim",
    desc: "Üretici hatasına karşı koşulsuz yenisiyle değişim ve birebir müşteri desteği."
  }
];

export function StitchAssurance() {
  return (
    <section className="bg-white text-[#161616] border-b border-zinc-200 py-12 px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200 border border-zinc-200 rounded-2xl bg-[#fcfcfc] overflow-hidden shadow-sm">
          {ASSURANCES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 group hover:bg-zinc-50 transition-colors duration-300 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl border border-amber-600/30 bg-amber-50 text-amber-700 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wider mb-1 font-mono">
                  {item.title}
                </h3>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2 font-mono">
                  {item.subtitle}
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
