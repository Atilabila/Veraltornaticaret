interface PageProps {
    params: Promise<{ hizmet: string }>;
}

export default async function UretimHizmetPage({ params }: PageProps) {
    const { hizmet } = await params;

    return (
        <div className="container mx-auto px-4 py-20 pt-32">
            <h1 className="text-2xl font-display mb-4 uppercase tracking-widest text-atl-text">HİZMET: {hizmet.toUpperCase()}</h1>
            <div className="p-8 border border-atl-line bg-atl-surface-2">
                <p className="text-atl-muted">Hizmet teknik spekleri hazırlanıyor.</p>
            </div>
        </div>
    )
}
