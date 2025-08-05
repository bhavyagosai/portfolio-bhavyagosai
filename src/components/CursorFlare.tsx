"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/context/LoaderContext";
import { useFlare } from "@/context/CursorFlareContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";

gsap.registerPlugin(useGSAP);

type Props = {
  children: React.ReactNode;
};

export default function CursorFlare({ children }: Props) {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const { isMobile } = useResponsiveBreakpoints();
  const isTouchScreen = useIsTouchScreen();

  const flair_xTo = useRef<gsap.QuickToFunc | null>(null);
  const flair_yTo = useRef<gsap.QuickToFunc | null>(null);
  const { flareRef, flareTextRef, flareText, playBreathing } = useFlare();

  useEffect(() => {
    if (loaded && !isMobile && !isTouchScreen) startAnimation();
  }, [loaded, isMobile, isTouchScreen]);

  const startAnimation = contextSafe(() => {
    if (isMobile || isTouchScreen) return;

    if (flareRef.current) {
      flair_xTo.current = gsap.quickTo(flareRef.current, "x", {
        duration: 0.5,
        ease: "power4.out",
      });
      flair_yTo.current = gsap.quickTo(flareRef.current, "y", {
        duration: 0.5,
        ease: "power4.out",
      });

      gsap
        .timeline()
        .set(flareRef.current, {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2 - 100,
          opacity: 0,
          delay: 2,
        })
        .to(flareRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          onComplete: () => playBreathing(),
        });
    }
  });

  const handleMouseMove = contextSafe((e: React.MouseEvent) => {
    if (isMobile || isTouchScreen) return;

    flair_xTo.current?.(e.clientX + 5);
    flair_yTo.current?.(e.clientY + 5);
  });

  return (
    <main onMouseMove={handleMouseMove} className="no-scroll">
      {!isMobile && !isTouchScreen && loaded && (
        <div
          ref={flareRef}
          className="fixed flex items-center justify-center w-4 h-4 bg-white rounded-full pointer-events-none z-100 mix-blend-difference -top-3 -left-3 cursor-flair"
        >
          <p
            className="text-xl font-black mix-blend-difference whitespace-nowrap font-pprightgrotesk-wide"
            ref={flareTextRef}
          >
            {flareText}
          </p>
        </div>
      )}
      {children}
    </main>
  );
}
