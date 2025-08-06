"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useLoader } from "@/context/LoaderContext";
import { useAppRef } from "@/context/AppRefContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import LoadingBall from "@/components/LoadingBall";
import { cn } from "@/utils";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export default function SiteLoader() {
  const { loaded, setLoaded } = useLoader();
  const { isMobile } = useResponsiveBreakpoints();
  const { appBackgroundRef } = useAppRef();
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // const [loadingPercentage, setLoadingPercentage] = useState(0);

  const startLoader = () => {
    if (!counterRef.current) return;

    let currentValue = 0;
    const updateCounter = () => {
      if (currentValue === 100) {
        triggerWebsiteLoad();
        return;
      }
      currentValue += Math.floor(Math.random() * 9) + 1;
      if (currentValue > 100) {
        currentValue = 100;
      }
      if (counterRef.current) {
        counterRef.current.textContent = `${currentValue}`;
        // setLoadingPercentage(currentValue);
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

    const blurProxy = { blur: 100 };

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
              .timeline({
                onComplete: () => setLoaded(true),
              })
              .to(
                blurProxy,
                {
                  blur: isMobile ? 50 : 0,
                  duration: 1,
                  ease: "power3.out",
                  onUpdate: () => {
                    if (appBackgroundRef.current) {
                      appBackgroundRef.current.style.backdropFilter = `blur(${blurProxy.blur}px)`;
                    }
                  },
                },
                0
              )
              .to(
                self.lines,
                {
                  yPercent: 100,
                  opacity: 0,
                  filter: "blur(20px)",
                  duration: 1,
                  ease: "power3.inOut",
                },
                0
              );
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
        {/* <LoadingBall loadValue={loadingPercentage} /> */}

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
