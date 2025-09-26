import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
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
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    NEXT_PUBLIC_UNSPLASH_USERNAME: process.env.NEXT_PUBLIC_UNSPLASH_USERNAME,
    LASTFM_API_KEY: process.env.LASTFM_API_KEY,
    NEXT_PUBLIC_LASTFM_USERNAME: process.env.NEXT_PUBLIC_LASTFM_USERNAME,
  },
  experimental: {
    allowedDevOrigins: [
      "https://*.cloudworkstations.dev",
      "https://*.firebase.studio"
    ]
  },
};

export default nextConfig;
