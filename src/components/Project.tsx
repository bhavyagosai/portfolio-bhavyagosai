"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "@/context/LoaderContext";
import { useFlare } from "@/context/CursorFlareContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";
import { cn } from "@/utils";
import ArrowIcon from "@/icons/ArrowIcon";

type ProjectProps = {
  name: string;
  designation: string;
  workType: string;
  duration: string;
  location: string;
  description: string;
  subDescription: React.ReactNode;
  logo: React.ReactNode;
  link: string;
  last?: boolean;
};

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Project(props: ProjectProps) {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const { isMobile } = useResponsiveBreakpoints();
  const isTouchScreen = useIsTouchScreen();
  const { flareRef, pauseBreathing, playBreathing } = useFlare();

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const smallArrowRef = useRef<HTMLDivElement>(null);
  const smallerArrowRef = useRef<HTMLDivElement>(null);
  const nameTextRef = useRef<HTMLDivElement>(null);
  const designationRef = useRef<HTMLParagraphElement>(null);
  const workTypeRef = useRef<HTMLParagraphElement>(null);
  const durationRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const subDescriptionRef = useRef<HTMLParagraphElement>(null);

  const nameSplitRef = useRef<SplitText | null>(null);
  const designationSplitRef = useRef<SplitText | null>(null);
  const workTypeSplitRef = useRef<SplitText | null>(null);
  const durationSplitRef = useRef<SplitText | null>(null);
  const locationSplitRef = useRef<SplitText | null>(null);
  const descriptionSplitRef = useRef<SplitText | null>(null);
  const subDescriptionSplitRef = useRef<SplitText | null>(null);

  let onTextHoverTl = useRef<GSAPTimeline | null>(null);
  let onMouseEnterTl = gsap.timeline();
  let onMouseLeaveTl = gsap.timeline();

  useEffect(() => {
    if (
      loaded &&
      nameTextRef.current &&
      designationRef.current &&
      workTypeRef.current &&
      durationRef.current &&
      locationRef.current &&
      descriptionRef.current &&
      subDescriptionRef.current &&
      containerRef.current &&
      logoRef.current
    )
      startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    document.fonts.ready.then(() => {
      nameSplitRef.current?.revert();
      designationSplitRef.current?.revert();
      workTypeSplitRef.current?.revert();
      durationSplitRef.current?.revert();
      locationSplitRef.current?.revert();
      descriptionSplitRef.current?.revert();
      subDescriptionSplitRef.current?.revert();

      nameSplitRef.current = new SplitText(nameTextRef.current, {
        type: "chars",
        autoSplit: true,
        mask: "chars",
      });
      designationSplitRef.current = new SplitText(designationRef.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });
      workTypeSplitRef.current = new SplitText(workTypeRef.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });
      durationSplitRef.current = new SplitText(durationRef.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });
      locationSplitRef.current = new SplitText(locationRef.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });
      descriptionSplitRef.current = new SplitText(descriptionRef.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });
      subDescriptionSplitRef.current = new SplitText(
        subDescriptionRef.current,
        {
          type: "lines",
          autoSplit: true,
          mask: "lines",
        }
      );

      const projectTextAnimationTl = gsap
        .timeline({ paused: true })
        .set(
          [
            nameTextRef.current,
            designationRef.current,
            workTypeRef.current,
            durationRef.current,
            locationRef.current,
            descriptionRef.current,
            subDescriptionRef.current,
          ],
          { opacity: 1 },
          0
        )
        .to(
          logoRef.current,
          {
            opacity: isMobile ? 0.3 : 0.6,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .to(
          smallArrowRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .to(
          smallerArrowRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .from(
          nameSplitRef.current.chars,
          {
            yPercent: 100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0
        )
        .from(
          [designationSplitRef.current.lines, workTypeSplitRef.current.lines],
          {
            yPercent: 100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          [durationSplitRef.current.lines, locationSplitRef.current.lines],
          {
            yPercent: 100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          descriptionSplitRef.current.lines,
          {
            xPercent: -100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          subDescriptionSplitRef.current.lines,
          {
            xPercent: -100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        animation: projectTextAnimationTl,
      });
    });

    if (logoRef.current) {
      gsap.to(logoRef.current, {
        y: -200, // faster scroll speed
        ease: "none",
        scrollTrigger: {
          trigger: logoRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: isMobile || isTouchScreen ? true : 2,
        },
      });
    }
  });

  const onMouseEnter = contextSafe(() => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseLeaveTl.isActive()) onMouseLeaveTl.kill();
    if (flareRef.current) {
      pauseBreathing();
      onMouseEnterTl = gsap.timeline().to(flareRef.current, {
        scale: 4,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  });

  const onMouseLeave = contextSafe(() => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (onMouseEnterTl.isActive()) onMouseEnterTl.kill();
    if (flareRef.current) {
      onMouseLeaveTl = gsap.timeline().to(flareRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => playBreathing(),
      });
    }
  });

  const onEnterNameHover = contextSafe((e: React.MouseEvent) => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (!nameTextRef.current) return;

    document.fonts.ready.then(() => {
      if (!nameSplitRef.current) return;

      if (onTextHoverTl.current?.isActive()) onTextHoverTl.current.kill();

      onMouseEnter();

      onTextHoverTl.current = gsap
        .timeline()
        .fromTo(
          nameSplitRef.current.chars,
          {
            paddingRight: 0,
          },
          {
            paddingRight: 5,
            duration: 0.4,
            stagger: 0.03,
            ease: "power3.inOut",
          },
          0
        )
        .set(
          arrowRef.current,
          {
            opacity: 0,
            xPercent: -80,
            yPercent: 80,
          },
          0
        )
        .to(
          arrowRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: "power3.inOut",
          },
          0
        )
        .set(
          arrowRef.current,
          {
            opacity: 1,
          },
          0
        )
        .to(
          arrowRef.current,
          {
            xPercent: 80,
            yPercent: -80,
            repeat: -1,
            duration: 0.8,
            ease: "none",
          },
          0.2
        );
    });
  });

  const onExitNameHover = contextSafe(() => {
    if (isMobile) return;
    if (isTouchScreen) return;

    if (!nameTextRef.current) return;

    document.fonts.ready.then(() => {
      if (!nameSplitRef.current) return;

      if (onTextHoverTl.current?.isActive()) onTextHoverTl.current.kill();

      onMouseLeave();

      onTextHoverTl.current = gsap
        .timeline()
        .to(
          nameSplitRef.current.chars,
          {
            paddingRight: 0,
            duration: 0.4,
            stagger: 0.03,
            ease: "power3.inOut",
          },
          0
        )
        .to(
          arrowRef.current,
          {
            opacity: 0,
            xPercent: -80,
            yPercent: 80,
            duration: 0.4,
            ease: "power3.inOut",
          },
          0
        );
    });
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col lg:max-w-[40rem] xl:max-w-[52rem] mb-[10rem] lg:mb-[18rem]",
        props.last && "mb-[8rem] lg:mb-[12rem]"
      )}
    >
      <div
        ref={logoRef}
        className="absolute flex items-center justify-center w-3/4 opacity-0 z-1 left-10 sm:left-0 h-3/4 sm:w-full sm:h-full right-20 top-20"
      >
        {props.logo}
      </div>
      <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onEnterNameHover}
        onMouseLeave={onExitNameHover}
        className="flex items-center w-full cursor-pointer z-2"
      >
        <h1
          ref={nameTextRef}
          className="flex text-[clamp(3rem,12vw,6rem)] md:text-[6rem] xl:text-[7rem] font-ppneuecorp font-black opacity-0"
        >
          {props.name}
        </h1>
        <span className="hidden ml-5 overflow-hidden md:block">
          <ArrowIcon
            ref={arrowRef}
            svgProps={{
              width: "90",
              height: "90",
              opacity: 0,
            }}
          />
        </span>

        <span
          ref={smallArrowRef}
          className="hidden ml-2 overflow-hidden opacity-0 sm:block md:hidden"
        >
          <ArrowIcon
            svgProps={{
              width: "75",
              height: "75",
            }}
          />
        </span>

        <span
          ref={smallerArrowRef}
          className="block ml-2 overflow-hidden opacity-0 sm:hidden"
        >
          <ArrowIcon
            svgProps={{
              width: "50",
              height: "50",
            }}
          />
        </span>
      </a>
      <div className="flex items-center justify-between pointer-events-none">
        <p
          ref={designationRef}
          className="text-xl font-black opacity-0 sm:text-2xl md:text-3xl xl:text-4xl font-pprightgrotesk-wide"
        >
          {props.designation}
        </p>
        <p
          ref={workTypeRef}
          className="text-xl opacity-0 sm:text-2xl md:text-3xl xl:text-4xl font-pprightgrotesk-wide"
        >
          {props.workType}
        </p>
      </div>
      <div className="flex items-center justify-between pointer-events-none">
        <p
          ref={durationRef}
          className="text-sm opacity-0 sm:text-xl md:text-2xl xl:text-3xl font-pprightgrotesk-wide"
        >
          {props.duration}
        </p>
        <p
          ref={locationRef}
          className="text-sm opacity-0 sm:text-xl md:text-2xl xl:text-3xl font-ppneuecorp-wide"
        >
          {props.location}
        </p>
      </div>

      <p
        ref={descriptionRef}
        className="mt-10 text-xl opacity-0 pointer-events-none sm:text-2xl font-pprightgrotesk-wide"
      >
        {props.description}
      </p>
      <p
        ref={subDescriptionRef}
        className="mt-5 text-xl opacity-0 z-2 sm:text-2xl font-pprightgrotesk-wide"
      >
        {props.subDescription}
      </p>
    </div>
  );
}
