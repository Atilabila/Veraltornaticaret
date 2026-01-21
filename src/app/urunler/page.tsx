import UrunlerClient from "./UrunlerClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Metal Poster Koleksiyonu | Metal Poster Pro",
    description: "Premium aluminyum metal poster koleksiyonu. Araba, karakter, trend ve daha fazlasi.",
};

export default function UrunlerPage() {
    return <UrunlerClient />;
}
