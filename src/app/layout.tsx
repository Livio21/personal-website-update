import type { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';
import { LavaLamp } from '@/components/layout/lava-lamp';
import { LoadingGate } from './loading-gate';
import { ConditionalFooter } from '@/components/layout/conditional-footer';

export const metadata: Metadata = {
  title: 'Livio Macaj',
  description: "A personal portfolio for Livio Macaj, a software developer specializing in modern web technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LavaLamp />
        <LoadingGate>
          <div className="relative flex flex-col min-h-screen overflow-x-hidden content-area">
            <SiteHeader />
            <main className="flex-1 w-full h-full">
              {children}
            </main>
            <ConditionalFooter />
            <MobileNav />
          </div>
        </LoadingGate>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
