export default function IletisimPage() {
    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-black mb-12 uppercase tracking-[0.2em] text-[#0A0A0A] dark:text-white">İletişim</h1>

                <div className="grid gap-8 text-left">
                    <div className="p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">MERKEZ</h3>
                        <p className="font-bold text-xl mb-1">VERAL TENEKE TİCARET A.Ş.</p>
                        <p className="text-zinc-500">İzmir, Alsancak</p>
                    </div>

                    <div className="p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                        <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-2">TELEFON & MAIL</h3>
                        <p className="font-bold text-xl mb-1">+90 (555) 123 45 67</p>
                        <p className="text-zinc-500 uppercase">info@veralteneketicaret.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
