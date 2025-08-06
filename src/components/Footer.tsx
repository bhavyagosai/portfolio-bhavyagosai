"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useFlare } from "@/context/CursorFlareContext";
import { useLoader } from "@/context/LoaderContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";
import { useAppRef } from "@/context/AppRefContext";
import { footerLinks } from "@/constants";
import { cn } from "@/utils";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const { isMobile } = useResponsiveBreakpoints();
  const isTouchScreen = useIsTouchScreen();
  const { appBackgroundRef, footerContainerRef } = useAppRef();
  const {
    flareRef,
    flareTextRef,
    setFlareText,
    pauseBreathing,
    playBreathing,
  } = useFlare();

  const emailTextRef = useRef<HTMLDivElement>(null);
  const emailSplitRef = useRef<SplitText | null>(null);

  const [copyText, setCopyText] = useState("click to copy");

  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  let onMouseEnterTl = gsap.timeline();
  let onMouseLeaveTl = gsap.timeline();

  useEffect(() => {
    if (
      loaded &&
      appBackgroundRef.current &&
      footerContainerRef.current &&
      emailTextRef.current &&
      !isMobile
    )
      startAnimation();
  }, [loaded, isMobile]);

  const startAnimation = contextSafe(() => {
    document.fonts.ready.then(() => {
      emailSplitRef.current?.revert();

      emailSplitRef.current = new SplitText(emailTextRef.current, {
        type: "lines",
        charsClass: "email-char",
        autoSplit: true,
      });

      const emailTextAnimationTl = gsap
        .timeline({ paused: true })
        .from(emailSplitRef.current.lines, {
          yPercent: -100,
          ease: "none",
        });

      ScrollTrigger.create({
        trigger: footerContainerRef.current,
        start: "-20% bottom",
        end: "bottom bottom",
        scrub: 0.5,
        animation: emailTextAnimationTl,
      });
    });

    const blurProxy = { blur: 25 };

    if (!isMobile) {
      gsap.to(blurProxy, {
        blur: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerContainerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: () => {
            appBackgroundRef.current.style.backdropFilter = `blur(${blurProxy.blur}px)`;
          },
        },
      });
    }
  });

  const onClickText = () => {
    try {
      navigator.clipboard.writeText("hello@bhavyagosai.com");
    } catch {}

    if (!isMobile && !isTouchScreen) setFlareText("copied!");
    else setCopyText("copied!");

    if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

    resetTimeoutRef.current = setTimeout(() => {
      if (!isMobile && !isTouchScreen) setFlareText("click to copy");
      else setCopyText("click to copy");
    }, 6000);
  };

  const onMouseEnter = contextSafe(() => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseLeaveTl.isActive()) onMouseLeaveTl.kill();
    if (flareRef.current) {
      pauseBreathing();
      onMouseEnterTl = gsap
        .timeline()
        .set(
          flareTextRef.current,
          {
            scale: 0,
            opacity: 0,
            onComplete: () => setFlareText("click to copy"),
          },
          0
        )
        .to(
          flareRef.current,
          {
            scale: 10,
            duration: 0.5,
            ease: "power3.inOut",
          },
          0
        )
        .to(
          flareTextRef.current,
          {
            scale: 0.1,
            opacity: 1,
            duration: 0.5,
            ease: "power3.inOut",
          },
          0
        );
    }
  });

  const onMouseLeave = contextSafe(() => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseEnterTl.isActive()) onMouseEnterTl.kill();
    if (flareRef.current) {
      onMouseLeaveTl = gsap
        .timeline()
        .to(
          flareRef.current,
          {
            scale: 1,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => playBreathing(),
          },
          0
        )
        .to(
          flareTextRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => setFlareText(""),
          },
          0
        );
    }
  });

  const onSocialMouseEnter = contextSafe(() => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseLeaveTl.isActive()) onMouseLeaveTl.kill();
    if (flareRef.current) {
      pauseBreathing();
      onMouseEnterTl = gsap
        .timeline()
        .to(
          flareRef.current,
          {
            scale: 4,
            duration: 0.5,
            ease: "power3.inOut",
          },
          0
        )
        .to(
          flareTextRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => setFlareText(""),
          },
          0
        );
    }
  });

  const onSocialMouseLeave = contextSafe(() => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseEnterTl.isActive()) onMouseEnterTl.kill();
    if (flareRef.current) {
      onMouseLeaveTl = gsap
        .timeline()
        .to(
          flareRef.current,
          {
            scale: 1,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => playBreathing(),
          },
          0
        )
        .to(
          flareTextRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => setFlareText(""),
          },
          0
        );
    }
  });

  return (
    <footer
      ref={footerContainerRef}
      className="flex px-4 sm:px-8 lg:px-16 pb-6 flex-col overflow-visible min-h-[65vh] items-center justify-between w-full font-pprightgrotesk-wide select-none"
    >
      <div className="flex flex-col w-full gap-10 mb-20 md:items-center">
        <div>
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-[1px] bg-white" />
            <p className="block md:hidden">{copyText}</p>
          </div>

          {!isMobile && isTouchScreen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-[1px] bg-white" />
              <p>{copyText}</p>
            </div>
          )}

          <h1
            ref={emailTextRef}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClickText}
            className="text-[clamp(3rem,8vw,3rem)] md:text-[clamp(2rem,6vw,5.5rem)] xl:text-[6rem] font-black underline cursor-pointer"
          >
            <p className="hidden md:block">
              <span className="italic font-migra mix-blend-difference">
                hello
              </span>
              @bhavyagosai.com
            </p>

            <p className="block md:hidden">
              <span className="italic font-migra mix-blend-difference">
                hello
              </span>
              @bhavya
            </p>
            <p className="block md:hidden">gosai.com</p>
          </h1>
        </div>
        <ul className="flex flex-col gap-5 text-xl md:flex-row">
          {footerLinks.map((link) => (
            <li
              key={link.name}
              onMouseEnter={onSocialMouseEnter}
              onMouseLeave={onSocialMouseLeave}
              className="flex items-center overflow-hidden transition-all duration-500 ease-in-out cursor-pointer group"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-4 overflow-hidden transition-all duration-500 ease-in-out md:gap-0",
                  !isTouchScreen && "md:group-hover:gap-2"
                )}
              >
                {isMobile ? link.logoSmall : link.logo}
                <p
                  className={cn(
                    "text-white overflow-hidden md:whitespace-nowrap md:max-w-0 md:opacity-0 md:translate-x-[-10px] transition-all duration-500 ease-in-out",
                    !isTouchScreen &&
                      "md:group-hover:max-w-[100px] md:group-hover:translate-x-0 md:group-hover:opacity-100"
                  )}
                >
                  {link.name}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p>
        <span className="relative bottom-[1px] md:bottom-[2px] right-[5px]">
          ©
        </span>
        {new Date().getFullYear()} Bhavya Gosai
      </p>
    </footer>
  );
}
