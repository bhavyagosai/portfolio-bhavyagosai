"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useFlare } from "@/context/CursorFlareContext";
import { useLoader } from "@/context/LoaderContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";
import MiniHamburger from "@/components/MiniHamburger";
import MobileHamburger from "@/components/MobileHamburger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);

export default function Navbar() {
  const { loaded } = useLoader();
  const { contextSafe } = useGSAP();
  const { isMobile } = useResponsiveBreakpoints();
  const isTouchScreen = useIsTouchScreen();
  const { flareRef, pauseBreathing, playBreathing } = useFlare();

  const navRef = useRef<HTMLDivElement>(null);
  const navTextRef = useRef<HTMLLIElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const topSplitRef = useRef<SplitText | null>(null);
  const bottomSplitRef = useRef<SplitText | null>(null);

  let onMouseEnterTl = gsap.timeline();
  let onMouseLeaveTl = gsap.timeline();

  useEffect(() => {
    if (loaded) startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    if (!navRef.current) return;

    gsap
      .timeline()
      .set(navRef.current, {
        y: -100,
        opacity: 0,
      })
      .to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });
  });

  const handleMouseEnter = contextSafe((e: React.MouseEvent) => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseLeaveTl.isActive()) onMouseLeaveTl.kill();
    if (flareRef.current) {
      pauseBreathing();
      onMouseEnterTl = gsap.timeline().to(flareRef.current, {
        scale: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  });

  const handleMouseLeave = contextSafe((e: React.MouseEvent) => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseEnterTl.isActive()) onMouseEnterTl.kill();
    if (flareRef.current) {
      onMouseLeaveTl = gsap.timeline().to(flareRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => playBreathing(),
      });
    }
  });

  const handleLogoMouseEnter = contextSafe((e: React.MouseEvent) => {
    if (isMobile) return;
    if (isTouchScreen) return;

    handleMouseEnter(e);

    // Ignore if animating already
    if (!topTextRef.current || !bottomTextRef.current || isAnimatingRef.current)
      return;

    isAnimatingRef.current = true;

    document.fonts.ready.then(() => {
      topSplitRef.current?.revert();
      bottomSplitRef.current?.revert();

      topSplitRef.current = new SplitText(topTextRef.current, {
        type: "chars",
        charsClass: "char-top",
        autoSplit: true,
        mask: "chars",
      });

      bottomSplitRef.current = new SplitText(bottomTextRef.current, {
        type: "chars",
        charsClass: "char-bottom",
        autoSplit: true,
        mask: "chars",
      });

      gsap
        .timeline({
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        })
        .set(topSplitRef.current.chars, { yPercent: 0 })
        .set(bottomSplitRef.current.chars, {
          yPercent: 120,
          opacity: 1,
        })
        .to(
          topSplitRef.current.chars,
          {
            yPercent: -120,
            ease: "expo.in",
            stagger: 0.04,
            delay: 0.1,
          },
          0
        )
        .to(
          bottomSplitRef.current.chars,
          {
            yPercent: 0,
            ease: "back.out",
            stagger: 0.04,
          },
          `-=0.5`
        )
        .set(topSplitRef.current.chars, {
          yPercent: 0,
        })
        .set(bottomSplitRef.current.chars, {
          opacity: 0,
        });
    });
  });

  return (
    <div
      ref={navRef}
      className="fixed top-0 z-20 w-full px-4 pt-8 pb-8 opacity-0 select-none md:pb-0 md:h-24 md:px-8 lg:px-16 bg-gradient-to-b from-black/40 to-transparent"
    >
      <nav className="will-change-transform">
        <ul className="flex items-center justify-between text-2xl font-black md:items-baseline">
          {isMobile ? (
            <li
              ref={navTextRef}
              className="fixed top-2 left-0 md:hidden text-[clamp(1.3rem,5vw,1.8rem)] font-ppfragment-sans z-21"
            >
              <Link href={"/"}>bhavyagosai</Link>
            </li>
          ) : (
            <li
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative hidden overflow-hidden md:block"
            >
              <Link href={"/"} className="flex text-2xl font-ppfragment-sans">
                <span
                  ref={topTextRef}
                  className="absolute top-0 left-0 will-change-auto"
                >
                  bhavyagosai
                </span>
                <span
                  ref={bottomTextRef}
                  className="relative block will-change-auto"
                >
                  bhavyagosai
                </span>
              </Link>
            </li>
          )}

          <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isMobile ? (
              <MobileHamburger navRef={navRef} navTextRef={navTextRef} />
            ) : (
              <MiniHamburger />
            )}
          </li>
          {!isMobile && (
            <li
              className="hidden md:block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <h1 className="font-pprightgrotesk-wide">
                <a href="/resume" target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </h1>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
