import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { GSAPRefresher } from "@/components/GSAPRefresher";
import './globals.css';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Dazz Tradlink',
    default: 'Dazz Tradlink | Empowering Industrial Excellence',
  },
  description: 'Dazz Tradlink specializes in Construction, Food Trading, Logistics, and Hospitality, delivering excellence globally.',
  openGraph: {
    title: 'Dazz Tradlink',
    description: 'Empowering Industrial Excellence globally across Construction, Logistics, Food Trading, and Hospitality.',
    url: '/',
    siteName: 'Dazz Tradlink',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dazz Tradlink Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dazz Tradlink',
    description: 'Empowering Industrial Excellence globally.',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png?v=7', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png?v=7', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.ico?v=7', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png?v=7',
    apple: '/apple-icon.png?v=7',
  },
  verification: {
    google: 'J9Byr4qfA9zmf6Bw2Sh_guGh4pdoQJHyCR_cMJmAU94',
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
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <CustomCursor />
        <GSAPRefresher />
        {children}
      </body>
    </html>
  );
}
