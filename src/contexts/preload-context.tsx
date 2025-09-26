
"use client";

import { createContext, useContext, useState, useMemo, type ReactNode } from "react";

interface PreloadContextType {
  isPreloaded: boolean;
  setPreloaded: (isPreloaded: boolean) => void;
}

const PreloadContext = createContext<PreloadContextType | undefined>(undefined);

export function PreloadProvider({ children }: { children: ReactNode }) {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const value = useMemo(() => ({
    isPreloaded,
    setPreloaded: setIsPreloaded,
  }), [isPreloaded]);

  return (
    <PreloadContext.Provider value={value}>
      {children}
    </PreloadContext.Provider>
  );
}

export function usePreload() {
  const context = useContext(PreloadContext);
  if (context === undefined) {
    throw new Error("usePreload must be used within a PreloadProvider");
  }
  return context;
}
