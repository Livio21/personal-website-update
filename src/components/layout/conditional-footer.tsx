"use client";

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/footer';

export function ConditionalFooter() {
  const pathname = usePathname();
  const hiddenPaths = ['/projects', '/hobbies', '/about'];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return <Footer />;
}