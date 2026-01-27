export default function Loading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950 pointer-events-none">
            {/* Background Noise */}
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>

            <div className="flex flex-col items-center gap-8 relative z-10">
                {/* Logo / Spinner Container */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>

                    {/* Gold Spinner */}
                    <div className="absolute inset-0 border-4 border-transparent border-t-[#D4AF37] border-r-[#D4AF37] rounded-full animate-spin"></div>

                    {/* Inner Hexagon (Industrial Feel) */}
                    <div className="w-12 h-12 bg-zinc-900 border border-zinc-700 flex items-center justify-center transform rotate-45">
                        <div className="w-8 h-8 bg-[#D4AF37] opacity-80 animate-pulse transform -rotate-45"></div>
                    </div>
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl font-black text-white tracking-[0.2em] uppercase font-[Archivo_Black]">
                        VERAL
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-ping"></span>
                        <span className="text-[10px] font-bold text-zinc-500 tracking-[0.4em] uppercase animate-pulse">
                            YÜKLENİYOR
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
