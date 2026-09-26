import type { ReactNode } from 'react';
import { DM_Sans, Inter } from 'next/font/google';
import { Analytics } from '@/components/analytics/Analytics';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { QuoteProvider } from '@/components/quote/QuoteProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/config/site';
import { rootMetadata } from '@/lib/seo';
import '@/styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.locale} className={`${inter.variable} ${dmSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="focus:bg-surface-base sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:px-4 focus:py-2 focus:shadow-md"
        >
          Skip to content
        </a>
        <QuoteProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <JsonLd />
          <Analytics />
        </QuoteProvider>
      </body>
    </html>
  );
}
