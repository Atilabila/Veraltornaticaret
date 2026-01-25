interface PageProps {
    params: Promise<{ hizmet: string }>;
}

export default async function UretimHizmetPage({ params }: PageProps) {
    const { hizmet } = await params;

    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <h1 className="text-2xl font-black mb-4 uppercase tracking-widest">HİZMET: {hizmet.toUpperCase()}</h1>
            <div className="p-8 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                <p className="text-zinc-500">Hizmet teknik spekleri hazırlanıyor.</p>
            </div>
        </div>
    )
}
