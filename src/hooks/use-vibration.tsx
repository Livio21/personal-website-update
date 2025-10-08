"use client";

import { useCallback } from "react";

type VibrationPattern = number | number[];

export function useVibration() {
  const vibrate = useCallback((pattern: VibrationPattern = 10) => {
    if (typeof window !== "undefined" && window.navigator && "vibrate" in window.navigator) {
      try {
        window.navigator.vibrate(pattern);
      } catch (error) {
        console.error("Vibration failed:", error);
      }
    }
  }, []);

  return { vibrate };
}
