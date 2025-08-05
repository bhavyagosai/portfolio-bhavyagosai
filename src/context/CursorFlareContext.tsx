"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  RefObject,
  useState,
  useCallback,
} from "react";
import gsap from "gsap";

interface FlareContextType {
  flareRef: RefObject<HTMLDivElement>;
  flareTextRef: RefObject<HTMLDivElement>;
  flareText: string;
  setFlareText: (text: string) => void;
  pauseBreathing: () => void;
  playBreathing: () => void;
}

const FlareContext = createContext<FlareContextType | undefined>(undefined);

export const CursorFlareProvider = ({ children }: { children: ReactNode }) => {
  const flareRef = useRef<any>(null);
  const flareTextRef = useRef<any>(null);
  const [flareText, setFlareText] = useState("");
  const flareBreathing = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!flareRef.current) return;

    // Breathing animation (paused initially)
    flareBreathing.current = gsap
      .timeline({ repeat: -1, yoyo: true, paused: true })
      .to(flareRef.current, {
        scale: 1.2,
        duration: 1,
        ease: "sine.inOut",
      });
  }, []);

  // API
  const pauseBreathing = useCallback(() => {
    flareBreathing.current?.pause();
  }, []);

  const playBreathing = useCallback(() => {
    flareBreathing.current?.play();
  }, []);

  return (
    <FlareContext.Provider
      value={{
        flareRef,
        flareTextRef,
        flareText,
        setFlareText,
        pauseBreathing,
        playBreathing,
      }}
    >
      {children}
    </FlareContext.Provider>
  );
};

// Custom hook
export const useFlare = (): FlareContextType => {
  const context = useContext(FlareContext);
  if (!context) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ useFlare called outside of CursorFlareProvider.");
    }

    // Return safe no-ops in production
    const dummyRef = { current: null } as unknown as RefObject<HTMLDivElement>;
    const noop = () => {};

    return {
      flareRef: dummyRef,
      flareTextRef: dummyRef,
      flareText: "",
      setFlareText: noop,
      pauseBreathing: noop,
      playBreathing: noop,
    };
  }
  return context;
};
