import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ContentProvider } from '@/components/layout/ContentProvider';
import { ContentService } from '@/lib/supabase/content.service';
import { ServicesHomeSection } from '@/components/sections/ServicesHomeSection';
import Link from 'next/link';

export default async function HizmetlerPage() {
    const dbContent = await ContentService.getContent();

    return (
        <ContentProvider initialContent={dbContent || undefined}>
            <main className="min-h-screen bg-[#f4f4f4] text-[#161616]">
                <Navigation />

                <section className="pt-32 pb-8 px-6 bg-white border-b border-[#c6c6c6]">
                    <div className="container mx-auto max-w-[1200px]">
                        <Link href="/" className="text-sm text-[#525252] hover:text-[var(--color-brand-accent)] mb-6 inline-block">
                            ← Ana sayfa
                        </Link>
                    </div>
                </section>

                <ServicesHomeSection />

                <Footer />
            </main>
        </ContentProvider>
    );
}
