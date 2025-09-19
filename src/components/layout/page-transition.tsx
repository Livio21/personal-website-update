
"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";
import { LoadingScreen } from "./loading-screen";
import { AnimatePresence, motion } from "framer-motion";

const MIN_LOADING_TIME = 250; 

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // This effect runs on component mount and on pathname change
    // We use a guard to avoid showing the loader on initial page load
    const isInitialLoad = !sessionStorage.getItem('initialLoadComplete');

    if (isInitialLoad) {
      sessionStorage.setItem('initialLoadComplete', 'true');
      return;
    }

    // Start loading sequence for subsequent navigations
    setIsLoading(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        const increment = Math.random() * 20;
        return Math.min(prev + increment, 95);
      });
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => setIsLoading(false), 200); // Wait for the bar to fill before hiding
    }, MIN_LOADING_TIME);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [pathname]);

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.div key="loader">
            <LoadingScreen progress={progress} />
          </motion.div>
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
