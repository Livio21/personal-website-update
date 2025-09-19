
"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";
import { LoadingScreen } from "./loading-screen";

const MIN_LOADING_TIME = 150; 

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageContent, setPageContent] = useState<ReactNode>(children);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && pageContent !== children) {
      setIsLoading(true);
      setProgress(0);

      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return 95;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 100);


      const timer = setTimeout(() => {
        clearInterval(progressInterval);
        setProgress(100);
        
        // Short delay to show 100% before hiding
        setTimeout(() => {
            setPageContent(children);
            setIsLoading(false);
        }, 200);

      }, MIN_LOADING_TIME);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else if (!isMounted) {
        setPageContent(children);
    }
  }, [children, pathname, isMounted, pageContent]);

  return (
    <div className="relative h-full w-full">
      {isLoading && <LoadingScreen progress={progress} />}
      <div
        className="h-full w-full transition-opacity duration-300"
        style={{ opacity: isLoading ? 0 : 1 }}
      >
        {pageContent}
      </div>
    </div>
  );
}
