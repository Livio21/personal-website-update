import type { Metadata } from 'next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';
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
      </head>
      <body className="font-body ">
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
