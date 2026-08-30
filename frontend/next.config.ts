import type { NextConfig } from "next";

import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  allowedDevOrigins: ['172.23.224.1', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/en/projects',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/en/about-us',
        permanent: true,
      },
      {
        source: '/divisions-services',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/en/services',
        permanent: true,
      },
      {
        source: '/news',
        destination: '/en/news',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/en/news',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/en/careers',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en/contact',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const isProd = process.env.NODE_ENV === 'production';
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api';
    
    // In production, Next.js frontend might just communicate directly to the backend URL 
    // depending on the architecture. But if we need rewrites to avoid CORS:
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // Removed X-Content-Type-Options because of Windows MIME type bugs with Next.js static chunks
          // {
          //   key: 'X-Content-Type-Options',
          //   value: 'nosniff'
          // },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

export default nextConfig;
