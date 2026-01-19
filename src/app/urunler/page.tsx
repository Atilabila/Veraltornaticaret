import UrunlerClient from "./UrunlerClient";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Ürün Arşivi | VERAL Industrial Torna & Teneke",
    description: "Veral Torna & Teneke endüstriyel ürün kataloğu. Dosya teli, takvim tenekesi, metal etiket ve özel imalat çözümleri.",
};

export default function UrunlerPage() {
    return <UrunlerClient />;
}
