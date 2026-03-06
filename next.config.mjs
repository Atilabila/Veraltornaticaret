/** @type {import('next').NextConfig} */
import path from "path";

const projectRoot = path.resolve("C:/Users/ati/.gemini/antigravity/scratch/metal-poster-pro");

export default {
    typescript: {
        ignoreBuildErrors: true,
    },
    compress: true,
    poweredByHeader: false,
    experimental: {
        optimizePackageImports: ["lucide-react"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "wswlhtglwpyragymrdhl.supabase.co",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.ibb.co",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "i.imgur.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "drive.google.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "www.etias.com.tr",
                port: "",
                pathname: "/**",
            },
        ],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 31536000,
        dangerouslyAllowSVG: true,
    },
};
