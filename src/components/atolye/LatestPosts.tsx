import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { serviceImageAlt, serviceImageFit } from "@/lib/service-stock-images";
import { SectionHeading } from "@/components/atolye/SectionHeading";

export function LatestPosts() {
    const posts = blogPosts.slice(0, 3);
    return (
        <section className="border-b border-atl-line bg-atl-bg py-20 lg:py-28">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <SectionHeading eyebrow="Teknik raporlar" title="Atölyeden yazılar" />
                    <Link href="/blog" className="font-mono text-xs uppercase tracking-[0.2em] text-atl-brass-light hover:text-atl-text">Tüm yazılar →</Link>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col border border-atl-line bg-atl-surface transition-colors hover:border-atl-brass/70">
                            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                                <Image src={post.image} alt={serviceImageAlt(post.image, post.title)} fill sizes="(min-width: 768px) 30vw, 92vw" className={serviceImageFit(post.image)} />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-atl-brass">{post.category} · {post.readTime}</span>
                                <h3 className="mt-3 font-display text-xl leading-snug text-atl-text group-hover:text-atl-brass-light">{post.title}</h3>
                                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-atl-muted">{post.excerpt}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
