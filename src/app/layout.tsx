import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Prismfolio',
  description: 'A personal portfolio website.',
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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
              {children}
            </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
