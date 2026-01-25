interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SiparisDetayPage({ params }: PageProps) {
    const { id } = await params;
    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <h1 className="text-2xl font-black mb-4 uppercase tracking-widest">SİPARİŞ NO: #{id}</h1>
            <div className="p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <p className="text-zinc-500">Sipariş detayları yükleniyor...</p>
            </div>
        </div>
    )
}
