/** @type {import('next').NextConfig} */
export default {
    turbopack: {
        root: process.cwd(),
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

