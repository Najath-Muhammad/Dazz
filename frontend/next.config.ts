import type { NextConfig } from "next";

import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  // @ts-ignore - this property might not be perfectly typed in some versions but Next.js requests it
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
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5000/api/:path*',
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
