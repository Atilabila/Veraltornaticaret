/** @type {import('next').NextConfig} */
import path from "path";

const projectRoot = path.resolve("C:/Users/ati/.gemini/antigravity/scratch/metal-poster-pro");

export default {
    typescript: {
        ignoreBuildErrors: true,
    },
    compress: true,
    poweredByHeader: false,
    webpack: (config, { isServer }) => {
        if (!isServer && config.optimization?.splitChunks) {
            const splitChunks = config.optimization.splitChunks;
            config.optimization.splitChunks = {
                ...splitChunks,
                cacheGroups: {
                    ...splitChunks.cacheGroups,
                    framerMotion: {
                        test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
                        name: "framer-motion",
                        chunks: "all",
                        priority: 30,
                    },
                    lucideReact: {
                        test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
                        name: "lucide-react",
                        chunks: "all",
                        priority: 25,
                    },
                },
            };
        }
        return config;
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
        ],
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 31536000,
        dangerouslyAllowSVG: true,
    },
};

