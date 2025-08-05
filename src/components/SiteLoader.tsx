"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useLoader } from "@/context/LoaderContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import LoadingBall from "@/components/LoadingBall";
import { cn } from "@/utils";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export default function SiteLoader() {
  const { loaded, setLoaded } = useLoader();
  const { isMobile } = useResponsiveBreakpoints();
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [loadingPercentage, setLoadingPercentage] = useState(0);

  const startLoader = () => {
    if (!counterRef.current) return;

    let currentValue = 0;
    const updateCounter = () => {
      if (currentValue === 100) {
        triggerWebsiteLoad();
        return;
      }
      currentValue += Math.floor(Math.random() * 5) + 1;
      if (currentValue > 100) {
        currentValue = 100;
      }
      if (counterRef.current) {
        counterRef.current.textContent = `${currentValue}`;
        setLoadingPercentage(currentValue);
      }

      let delay = Math.floor(Math.random() * 200) + 50;
      setTimeout(updateCounter, delay);
    };
    updateCounter();
  };

  useEffect(() => {
    startLoader();
  }, []);

  const { contextSafe } = useGSAP();

  const triggerWebsiteLoad = contextSafe(() => {
    if (!containerRef.current || !textRef.current) return;

    document.fonts.ready.then(() => {
      setTimeout(() => {
        gsap.set(textRef.current, {
          opacity: 1,
          filter: "blur(0px)",
        });

        SplitText.create(textRef.current, {
          type: "lines",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            return gsap
              .timeline()
              .to(self.lines, {
                yPercent: 100,
                opacity: 0,
                filter: "blur(20px)",
                stagger: 0.2,
                duration: 1,
                ease: "power3.inOut",
              })
              .to(containerRef.current, {
                yPercent: -100,
                duration: 1.2,
                delay: -0.3,
                ease: "expo.inOut",
                onComplete: () => setLoaded(true),
              });
          },
        });
      }, 300);
    });
  });

  return (
    !loaded && (
      <div
        className={cn(
          "fixed top-0 z-10 flex flex-col items-center justify-center w-screen overflow-hidden will-change-transform",
          isMobile ? "h-[100dvh]" : "h-screen"
        )}
        ref={containerRef}
      >
        <LoadingBall loadValue={loadingPercentage} />

        <h1
          ref={textRef}
          className="text-4xl font-black pointer-events-none select-none font-pprightgrotesk-wide mix-blend-difference will-change-transform"
        >
          Loading <span ref={counterRef}>0</span>
        </h1>
      </div>
    )
  );
}
