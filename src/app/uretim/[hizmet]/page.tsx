import { permanentRedirect } from "next/navigation";

interface PageProps {
    params: Promise<{ hizmet: string }>;
}

export default async function UretimHizmetPage({ params }: PageProps) {
    const { hizmet } = await params;
    permanentRedirect(`/hizmetler/${hizmet}`);
}
