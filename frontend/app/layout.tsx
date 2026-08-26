import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { GSAPRefresher } from "@/components/GSAPRefresher";
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Dazz Tradelink',
    default: 'Dazz Tradelink | Empowering Industrial Excellence',
  },
  description: 'Dazz Tradelink specializes in Construction, Food Trading, Logistics, and Hospitality, delivering excellence globally.',
  openGraph: {
    title: 'Dazz Tradelink',
    description: 'Empowering Industrial Excellence globally across Construction, Logistics, Food Trading, and Hospitality.',
    url: '/',
    siteName: 'Dazz Tradelink',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dazz Tradelink Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dazz Tradelink',
    description: 'Empowering Industrial Excellence globally.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <GSAPRefresher />
        {children}
      </body>
    </html>
  );
}
