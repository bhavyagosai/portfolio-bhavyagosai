"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "@/context/LoaderContext";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function ImpactSection() {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();

  const impactTextContainerRef = useRef<HTMLDivElement>(null);
  const impactSectionRef = useRef<HTMLDivElement>(null);
  const impactTextRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (
      loaded &&
      impactSectionRef.current &&
      impactTextContainerRef.current &&
      impactTextRefs.current.length > 0
    )
      startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        // define your breakpoints
        isDesktop: "(min-width: 1280px)",
        isLaptop: "(min-width: 990px) and (max-width: 1279px)",
        isTablet: "(min-width: 768px) and (max-width: 989px)",
        isMobile: "(min-width: 640px) and (max-width: 767px)",
        isSmallMobile: "(min-width: 440px) and (max-width: 639px)",
        isVerySmallMobile: "(max-width: 639px)",
      },
      (context) => {
        let startX = "20rem";
        let endX = "-235rem";

        if (context.conditions?.isDesktop) {
          startX = "30rem";
          endX = "-260rem";
        } else if (context.conditions?.isLaptop) {
          startX = "20rem";
          endX = "-235rem";
        } else if (context.conditions?.isTablet) {
          startX = "20rem";
          endX = "-250rem";
        } else if (context.conditions?.isMobile) {
          startX = "20rem";
          endX = "-260rem";
        } else if (context.conditions?.isSmallMobile) {
          startX = "20rem";
          endX = "-200rem";
        } else if (context.conditions?.isVerySmallMobile) {
          startX = "20rem";
          endX = "-210rem";
        }

        // Apply animations
        gsap.set(impactTextContainerRef.current, {
          x: startX,
          willChange: "transform",
        });

        const moveTl = gsap
          .timeline({ paused: true })
          .to(impactTextContainerRef.current, {
            x: endX,
            ease: "none",
          });

        const riseTl = gsap
          .timeline({ paused: true })
          .from(impactTextRefs.current, {
            y: "70vh",
            filter: "blur(10px)",
            opacity: 0.5,
            stagger: 0.01,
            ease: "expo.out",
          });

        ScrollTrigger.create({
          trigger: impactSectionRef.current,
          start: context.conditions?.isVerySmallMobile ? "top 35%" : "top 25%",
          end: "+=3500vh",
          pin: true,
          scrub: 2,
          onUpdate: (self) => {
            moveTl.progress(self.progress);
            riseTl.progress(self.progress);
          },
        });
      }
    );
  });

  function SplitChars({
    text,
    highlight,
  }: {
    text: string;
    highlight?: string;
  }) {
    const baseChars = text.split("");
    const highlightChars = highlight?.split("") || [];

    return (
      <div className="whitespace-nowrap">
        {baseChars.map((ch, i) => (
          <span
            key={i}
            className="inline-block"
            ref={(el) => {
              if (impactTextRefs.current.length <= i) {
                impactTextRefs.current.push(el);
              } else {
                impactTextRefs.current[i] = el;
              }
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}

        {/* render highlight characters with special styling */}
        {highlightChars.length > 0 && (
          <span className="relative ml-8 italic pr-7 z-1 isolate font-migra mix-blend-difference">
            {highlightChars.map((ch, j) => {
              const index = baseChars.length + j;
              return (
                <span
                  key={index}
                  className="inline-block px-2 md:px-0 mix-blend-difference"
                  ref={(el) => {
                    if (impactTextRefs.current.length <= index) {
                      impactTextRefs.current.push(el);
                    } else {
                      impactTextRefs.current[index] = el;
                    }
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              );
            })}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      ref={impactSectionRef}
      className="flex w-screen h-[100dvh] pointer-events-none select-none overflow-x-hidden relative"
    >
      <h1
        ref={impactTextContainerRef}
        className="will-change-transform h-fit relative text-[10rem] sm:text-[13rem] xl:text-[15rem] font-pprightgrotesk-wide font-black whitespace-nowrap"
      >
        <SplitChars
          text="Let's build something that is worth"
          highlight=" shipping"
        />
      </h1>
    </div>
  );
}
