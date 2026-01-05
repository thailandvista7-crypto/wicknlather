import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'Wick & Lather | Premium Handmade Soaps & Candles',
  description: 'Discover our collection of premium handmade soaps and scented candles. Natural ingredients, beautiful scents, perfect for gifting.',
  keywords: 'handmade soap, scented candles, natural products, gift sets, premium candles',
  authors: [{ name: 'Wick & Lather' }],
  openGraph: {
    title: 'Wick & Lather | Premium Handmade Soaps & Candles',
    description: 'Discover our collection of premium handmade soaps and scented candles.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
