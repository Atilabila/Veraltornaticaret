/** @type {import('next').NextConfig} */
import path from 'path';

const projectRoot = path.resolve('C:/Users/ati/.gemini/antigravity/scratch/metal-poster-pro');

export default {
    /*
        turbopack: {
            root: projectRoot,
        },
    */
    typescript: {
        ignoreBuildErrors: true,
    },
    compress: true, // Enable gzip compression
    productionBrowserSourceMaps: false, // Disable source maps in production for faster builds
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'wswlhtglwpyragymrdhl.supabase.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
                port: '',
                pathname: '/**',
            },
        ],
        formats: ['image/avif', 'image/webp'], // Modern image formats
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    // Performance optimizations
    poweredByHeader: false, // Remove X-Powered-By header for security
}

