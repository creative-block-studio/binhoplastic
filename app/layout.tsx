import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const processSans = Inter({
  variable: '--font-process-sans',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400'],
});

export const metadata: Metadata = {
  title: 'Zoom Parallax Demo',
  description: 'Next.js demo for the zoom parallax component',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${processSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
