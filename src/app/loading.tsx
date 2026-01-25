export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm pointer-events-none">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-zinc-200 border-t-[#D4AF37] rounded-full animate-spin" />
                <span className="text-[10px] font-black tracking-[0.3em] animate-pulse text-zinc-500">YÜKLENİYOR...</span>
            </div>
        </div>
    )
}
