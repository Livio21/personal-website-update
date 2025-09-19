"use client";

import { motion } from "framer-motion";

export function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-64">
        <p className="text-sm text-muted-foreground font-code mb-2 text-center">Loading...</p>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
}
