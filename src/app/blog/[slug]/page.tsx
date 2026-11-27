import { Metadata } from "next"
import { absUrl } from "@/lib/site";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { blogPosts } from "@/lib/blog-posts";

const postsById = Object.fromEntries(blogPosts.map((post) => [post.id, post]));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = postsById[slug];

    if (!post) return { title: "Yazı bulunamadı" };

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: absUrl(`/blog/${slug}`),
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            url: absUrl(`/blog/${slug}`),
            type: "article",
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = postsById[slug];

    if (!post) {
        notFound();
    }

    const otherPosts = blogPosts
        .filter((item) => item.id !== slug)
        .slice(0, 2)
        .map((item) => item);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": [post.image.startsWith("http") ? post.image : absUrl(post.image)],
        "datePublished": "2026-02-03T09:00:00+03:00",
        "dateModified": "2026-11-27T09:00:00+03:00",
        "author": {
            "@type": "Person",
            "name": "Oğuzcan Veral",
            "jobTitle": "Atölye sahibi",
            "url": absUrl("/yazar/oguzcan-veral")
        },
        "publisher": {
            "@type": "Organization",
            "name": "Veral Teneke Ticaret",
            "logo": {
                "@type": "ImageObject",
                "url": absUrl("/veral-logo.png")
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": absUrl(`/blog/${slug}`)
        }
    };

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <Navigation />

            <BlogPostClient post={post} slug={slug} otherPosts={otherPosts} />

            <Footer />
        </main>
    );
}
