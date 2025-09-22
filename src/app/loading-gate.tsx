"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { PreloadHobbiesResources } from "./hobbies/preload-resources";

const loadingSteps = [
  { text: "Booting kernel...", duration: 200, progress: 5 },
  { text: "Initializing virtual DOM...", duration: 300, progress: 15 },
  { text: "Loading project showcases...", duration: 1000, progress: 40, action: "preloadVideos" },
  { text: "Fetching dynamic content...", duration: 1500, progress: 70, action: "preloadHobbies" },
  { text: "Compiling component styles...", duration: 400, progress: 85 },
  { text: "Finalizing render tree...", duration: 300, progress: 95 },
  { text: "Welcome.", duration: 100, progress: 100 },
];

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full max-w-sm bg-card/50 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden h-2.5">
    <motion.div
      className="h-full bg-primary/80"
      initial={{ width: "0%" }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  </div>
);

const TerminalOutput = ({ lines }: { lines: string[] }) => (
  <div className="font-code text-sm text-left h-32 w-full max-w-sm overflow-hidden">
    <AnimatePresence>
      {lines.map((line, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
          className="text-muted-foreground"
        >
          <span className="text-primary mr-2">✓</span> {line}
        </motion.p>
      ))}
    </AnimatePresence>
  </div>
);

export function LoadingGate({ children }: { children: ReactNode }) {
  const [isInitialLoad, setIsInitialLoad] = useState<boolean | undefined>(undefined);
  const [currentStep, setCurrentStep] = useState(0);
  const [actionsCompleted, setActionsCompleted] = useState({
    preloadVideos: false,
    preloadHobbies: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");
      if (hasLoadedBefore) {
        setIsInitialLoad(false);
      } else {
        setIsInitialLoad(true);
      }
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoad) return;

    if (currentStep >= loadingSteps.length) {
      sessionStorage.setItem("hasLoadedBefore", "true");
      const timer = setTimeout(() => setIsInitialLoad(false), 500);
      return () => clearTimeout(timer);
    }
    
    const step = loadingSteps[currentStep];
    const canProceed = !step.action || actionsCompleted[step.action as keyof typeof actionsCompleted];
    
    if (canProceed) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, step.duration);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad, currentStep, actionsCompleted]);

  const handleActionComplete = (action: keyof typeof actionsCompleted) => {
    setActionsCompleted(prev => ({...prev, [action]: true}));
  };

  const projectVideos = PlaceHolderImages.filter(p => p.videoUrl).map(p => p.videoUrl!);

  if (isInitialLoad === undefined) {
    return null; // Or a very minimal loader to prevent flash of content
  }

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        {isInitialLoad ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          >
            {/* Hidden preloading elements */}
            <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
                {loadingSteps[currentStep]?.action === "preloadVideos" && projectVideos.map(videoUrl => (
                  <video key={videoUrl} src={videoUrl} preload="auto" onCanPlayThrough={() => handleActionComplete("preloadVideos")} />
                ))}
                {loadingSteps[currentStep]?.action === "preloadHobbies" && (
                  <PreloadHobbiesResources onFinished={() => handleActionComplete("preloadHobbies")} />
                )}
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <TerminalOutput lines={loadingSteps.slice(0, currentStep + 1).map(s => s.text)} />
              <ProgressBar progress={loadingSteps[currentStep]?.progress ?? 0} />
            </div>
          </motion.div>
        ) : (
          <div className="h-full w-full">{children}</div>
        )}
      </AnimatePresence>
    </div>
  );
}
