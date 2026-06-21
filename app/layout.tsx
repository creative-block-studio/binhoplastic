import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';

const processSans = Inter({
  variable: '--font-process-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const chillax = localFont({
  src: '../assets/fonts/Chillax-Medium.woff2',
  variable: '--font-chillax',
  weight: '500',
  style: 'normal',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Binho Plastic',
  description: 'Binho Plastic - Masterbatch, pigmentos e aditivos para plástico.',
  icons: {
    icon: [
      {
        url: '/assets/images/favicon/favicon-32x32.png?v=2',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/assets/images/favicon/favicon-16x16.png?v=2',
        sizes: '16x16',
        type: 'image/png',
      },
      { url: '/assets/images/favicon/favicon.ico?v=2' },
    ],
    shortcut: '/assets/images/favicon/favicon-32x32.png?v=2',
    apple: '/assets/images/favicon/apple-touch-icon.png?v=2',
    other: [
      {
        rel: 'icon',
        url: '/assets/images/favicon/android-chrome-192x192.png?v=2',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: '/assets/images/favicon/android-chrome-512x512.png?v=2',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${processSans.variable} ${chillax.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
