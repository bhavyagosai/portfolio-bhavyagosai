"use client";

import { ReactNode, useEffect, useRef } from "react";
import { LenisRef, ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";

interface Props {
  children?: ReactNode;
}

function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<LenisRef>(null);
  const { isMobile } = useResponsiveBreakpoints();

  // sync Lenis and GSAP
  useEffect(() => {
    if (isMobile) return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <>
      {!isMobile && (
        <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      )}
      {children}
    </>
  );
}

export default SmoothScroll;
