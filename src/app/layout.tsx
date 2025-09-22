import type { Metadata } from 'next';
import './globals.css';
import { SideNav } from '@/components/layout/side-nav';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';
import { LavaLamp } from '@/components/layout/lava-lamp';
import { LoadingGate } from './loading-gate';
import { Footer } from '@/components/layout/footer';

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
            <div className="md:hidden">
              <SideNav />
            </div>
            <SiteHeader />
            <main className="flex-1 w-full h-auto min-h-screen overflow-y-auto overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </LoadingGate>
        <Toaster />
      </body>
    </html>
  );
}
