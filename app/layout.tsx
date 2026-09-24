import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import { Analytics } from '@/components/analytics/Analytics';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { JsonLd } from '@/components/seo/JsonLd';
import { site } from '@/config/site';
import { rootMetadata } from '@/lib/seo';
import '@/styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={site.locale} className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="focus:bg-surface-base sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:px-4 focus:py-2 focus:shadow-md"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
