import { MetadataRoute } from "next";
import { PRIVATE_PATHS, SITE_ORIGIN } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    const disallow = PRIVATE_PATHS;
    return {
        rules: [
            { userAgent: "*", allow: "/", disallow },
            {
                userAgent: ["Googlebot", "Googlebot-Image", "Bingbot", "Applebot"],
                allow: "/",
                disallow,
            },
            {
                userAgent: [
                    "OAI-SearchBot",
                    "ChatGPT-User",
                    "GPTBot",
                    "PerplexityBot",
                    "ClaudeBot",
                    "Claude-Web",
                    "Google-Extended",
                    "Applebot-Extended",
                    "CCBot",
                    "Bytespider",
                ],
                allow: "/",
                disallow,
            },
        ],
        sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    };
}
