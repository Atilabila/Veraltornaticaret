/** @type {import('next').NextConfig} */
import path from 'path';

const projectRoot = path.resolve('C:/Users/ati/.gemini/antigravity/scratch/metal-poster-pro');

export default {
    turbopack: {
        root: projectRoot,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
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
        ],
    },
}

