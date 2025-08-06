import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {source: '/influencer', destination: '/influencer/dashboard', permanent: true},
            {source: '/brand', destination: '/brand/dashboard', permanent: true},
            {source: '/admin', destination: '/admin/dashboard', permanent: true},
        ];
    },
    images: {
        domains: ['localhost', '127.0.0.1'],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "*", // Allow images from all domains
            },
            {
                protocol: 'http',
                hostname: '192.168.1.84',
                port: '8000',
                pathname: '/assets/img/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.84',
                port: '8080',
                pathname: '/assets/img/**',
            },
            {
                protocol: 'http',
                hostname: 'schuppe.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'www.kunde.net',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'www.orn.net',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.73',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.109',
                port: '8080',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'socialapi.stage.dworklabs.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.1.109',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.s3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's3-alpha-sig.figma.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.beier.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.gutkowski.org',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'www.gulgowski.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
