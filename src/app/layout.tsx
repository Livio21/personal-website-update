import type { Metadata } from 'next';
import './globals.css';
import { SideNav } from '@/components/layout/side-nav';
import { Toaster } from '@/components/ui/toaster';
import { SiteHeader } from '@/components/layout/site-header';
import { PageTransition } from '@/components/layout/page-transition';
import { LiquidGlass } from '@/components/layout/liquid-glass';

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
        <LiquidGlass />
        <div className="relative flex min-h-screen overflow-x-hidden liquid-glass">
          <div className="md:hidden">
            <SideNav />
          </div>
          <SiteHeader />
          <main className="flex-1 h-screen w-full overflow-y-auto overflow-x-hidden">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </div>
        <Toaster />
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <defs>
            <filter id="liquid-glass-filter">
                <feTurbulence 
                    type="fractalNoise" 
                    baseFrequency="0.005 0.005" 
                    numOctaves="3" 
                    result="noise"
                >
                    <animate 
                        attributeName="baseFrequency" 
                        dur="60s" 
                        values="0.005 0.005;0.01 0.005;0.005 0.005" 
                        repeatCount="indefinite"
                    />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" />
                <feComposite operator="in" in2="SourceGraphic" result="shadowed" />
                
                <feSpecularLighting 
                    in="noise" 
                    surfaceScale="3" 
                    specularConstant="1.2" 
                    specularExponent="20" 
                    lightingColor="#ffffff" 
                    result="specular"
                >
                    <fePointLight x="-500" y="-500" z="2000" />
                </feSpecularLighting>
                <feComposite in="specular" in2="SourceGraphic" operator="in" result="specular" />
                
                <feBlend in="shadowed" in2="specular" mode="screen" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
