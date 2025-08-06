"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "lenis/react";
import { useLoader } from "@/context/LoaderContext";
import { useAppRef } from "@/context/AppRefContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";
import { cn } from "@/utils";

gsap.registerPlugin(useGSAP);

export default function HeroSection() {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const { isMobile } = useResponsiveBreakpoints();
  const isTouchScreen = useIsTouchScreen();
  const { appBackgroundRef, heroContainerRef } = useAppRef();

  const headingRef1 = useRef<HTMLHeadingElement>(null);
  const headingRef2 = useRef<HTMLHeadingElement>(null);
  const headingRef3 = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLDivElement>(null);

  const headingSplitRef1 = useRef<SplitText | null>(null);
  const headingSplitRef2 = useRef<SplitText | null>(null);
  const headingSplitRef3 = useRef<SplitText | null>(null);
  const scrollSplitRef = useRef<SplitText | null>(null);

  const scrollLineLoop = useRef<gsap.core.Timeline | null>(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (
      loaded &&
      heroContainerRef.current &&
      headingRef1.current &&
      headingRef2.current &&
      headingRef3.current &&
      lineRef.current &&
      appBackgroundRef.current &&
      scrollTextRef.current
    )
      startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    document.fonts.ready.then(() => {
      headingSplitRef1.current?.revert();
      headingSplitRef2.current?.revert();
      headingSplitRef3.current?.revert();

      headingSplitRef1.current = new SplitText(headingRef1.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });
      headingSplitRef2.current = new SplitText(headingRef2.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });
      headingSplitRef3.current = new SplitText(headingRef3.current, {
        type: "lines",
        linesClass: "headingLine",
        autoSplit: true,
        mask: "lines",
      });
      scrollSplitRef.current = new SplitText(scrollTextRef.current, {
        type: "lines",
        autoSplit: true,
        mask: "lines",
      });

      scrollLineLoop.current = gsap
        .timeline({ repeat: -1, yoyo: true, paused: true })
        .to(lineRef.current, {
          scaleY: 0,
          scaleX: 0,
          duration: 2.5,
          ease: "power2.inOut",
        });

      gsap
        .timeline()
        .set(
          [
            headingRef1.current,
            headingRef2.current,
            headingRef3.current,
            scrollTextRef.current,
          ],
          {
            opacity: 1,
          }
        )
        .from(headingSplitRef1.current.lines, {
          yPercent: 100,
          filter: "blur(20px)",
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          headingSplitRef2.current.lines,
          {
            yPercent: 100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          headingSplitRef3.current.lines,
          {
            xPercent: -100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
              if (isMobile) {
                scrollLineLoop.current?.play();
                document.body.classList.remove("no-scroll");
                document.querySelector("main")?.classList.remove("no-scroll");
              }
            },
          },
          "-=0.6"
        )
        .to(lineRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          scrollSplitRef.current.lines,
          {
            xPercent: 100,
            filter: "blur(20px)",
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            onComplete: () => {
              scrollLineLoop.current?.play();
              document.body.classList.remove("no-scroll");
              document.querySelector("main")?.classList.remove("no-scroll");
            },
          },
          "-=0.2"
        );
    });

    if (!isMobile) {
      gsap.to(appBackgroundRef.current, {
        backdropFilter: "blur(25px)",
        ease: "none",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }
  });

  useLenis(
    contextSafe((lenis: any) => {
      if (isMobile) return;

      const onScroll = ({ scroll }: { scroll: number }) => {
        const isScrolled = scroll > 10;

        if (isScrolled !== hasScrolled.current) {
          hasScrolled.current = isScrolled;

          if (isScrolled) {
            scrollLineLoop.current?.pause();
            gsap.to([scrollTextRef.current, lineRef.current], {
              y: 20,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            });
          } else {
            scrollLineLoop.current?.play();
            gsap.to([scrollTextRef.current, lineRef.current], {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            });
          }
        }
      };

      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }),
    [isMobile]
  );

  return (
    <div
      ref={heroContainerRef}
      className={cn(
        "flex flex-col items-center justify-center w-screen px-4 pointer-events-none select-none md:justify-baseline sm:px-8 lg:px-16 lg:flex-row",
        isMobile || isTouchScreen ? "h-[100svh]" : "h-screen"
      )}
    >
      <div className="flex flex-col self-start w-full lg:self-auto md:mt-auto lg:mt-0">
        <h1
          ref={headingRef1}
          className="relative top-[clamp(2rem,11vw,8rem)] lg:top-[6rem] xl:top-[7rem] opacity-0 text-[clamp(3rem,15vw,10rem)] lg:text-[8rem] xl:text-[10rem] italic font-migra font-black mix-blend-difference"
        >
          Passionate
        </h1>

        <h1 className="relative text-[clamp(3rem,15vw,10rem)] lg:text-[8rem] xl:text-[10rem] font-pprightgrotesk-wide font-black">
          <span ref={headingRef2} className="opacity-0">
            Developer
          </span>
          <div
            ref={headingRef3}
            className={cn(
              "relative top-[3rem] italic opacity-0 text-end text-[clamp(0.8rem,3vw,2rem)] max-w-1/2 ml-auto",
              "md:absolute md:top-auto md:mt-[-3rem] md:text-start md:ml-1 md:text-[1.1rem] md:max-w-full",
              "lg:mt-[-3rem] lg:text-sm",
              "xl:text-lg xl:mt-[-3.5rem]"
            )}
          >
            Pushing the boundaries of web technologies
          </div>
        </h1>
      </div>
      <div className="flex-col self-end hidden w-full mt-auto md:flex lg:h-full lg:mt-0">
        <div className="flex items-end justify-end flex-1">
          <div className="relative flex mb-10 font-black top-4">
            <h1
              ref={scrollTextRef}
              className="flex flex-col items-end flex-1 mr-3 opacity-0 text:lg xl:text-xl font-pprightgrotesk"
            >
              <span>SCROLL TO</span> <br></br> <span>EXPLORE</span>
            </h1>
            <div
              ref={lineRef}
              className="w-[2px] opacity-0 h-18 lg:h-24 origin-top bg-white will-change-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
