import Link from "next/link";
import { TORNA_SERVICES, tornaHref } from "@/lib/public-copy";

export function TornaServices({ linked = false, intro = true }: { linked?: boolean; intro?: boolean }) {
    return (
        <section className="border-b border-atl-line bg-atl-bg py-10 sm:py-16">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
                {intro ? (
                    <>
                        <h2 className="font-display text-3xl text-atl-text sm:text-4xl">Torna ve yedek parça imalatı</h2>
                        <p className="mt-3 max-w-2xl text-base leading-relaxed text-atl-muted">
                            Seri üretim yapan bir atölye. Torna, yedek parça ve teneke ürünleri imalatı.
                        </p>
                    </>
                ) : null}
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {TORNA_SERVICES.map((item) => (
                        <li key={item.title} className="border border-atl-line bg-atl-surface p-5">
                            <h3 className="text-lg font-semibold text-atl-text">
                                <Link href={tornaHref(item.slug)} className="hover:text-atl-brass-light">
                                    {item.title}
                                </Link>
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-atl-muted">{item.text}</p>
                        </li>
                    ))}
                </ul>
                {linked ? (
                    <Link href="/hizmetler/torna" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-atl-brass-light">
                        Torna işleri
                    </Link>
                ) : null}
            </div>
        </section>
    );
}
