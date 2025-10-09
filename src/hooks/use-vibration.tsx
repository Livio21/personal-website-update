"use client";

type VibrationPattern = number | number[];

export function useVibration() {
  const vibrate = (pattern: VibrationPattern) => {
    if (
      typeof window !== "undefined" &&
      window.navigator &&
      "vibrate" in window.navigator
    ) {
      try {
        window.navigator.vibrate(pattern);
      } catch (error) {
        console.error("Vibration failed:", error);
      }
    }
  };

  return vibrate;
}
