"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "@/context/LoaderContext";
import { useAppRef } from "@/context/AppRefContext";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function MarqueeSection() {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const { marqueeContainerRef } = useAppRef();

  const marqueeSliderRef = useRef<HTMLDivElement>(null);
  const marqueeText1 = useRef<HTMLDivElement>(null);
  const marqueeText2 = useRef<HTMLDivElement>(null);
  const marqueeText3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      loaded &&
      marqueeContainerRef.current &&
      marqueeSliderRef.current &&
      marqueeText1.current &&
      marqueeText2.current &&
      marqueeText3.current
    )
      startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    const texts = [
      marqueeText1.current,
      marqueeText2.current,
      marqueeText3.current,
    ];

    const marqueeTl = gsap.timeline();

    gsap.set(texts, {
      xPercent: 0,
    });
    marqueeTl.fromTo(
      texts,
      { xPercent: 0 },
      {
        xPercent: -100,
        duration: 5,
        ease: "none",
        onComplete: () => {
          marqueeTl.restart();
        },
        onReverseComplete: () => {
          marqueeTl.reverse(0);
        },
      }
    );

    const marqueeScrubTl = gsap.to(marqueeSliderRef.current, {
      x: "-=500px",
    });

    let direction = 1;

    ScrollTrigger.create({
      trigger: marqueeContainerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 2,
      animation: marqueeScrubTl,
      onUpdate: (e) => {
        if (e.direction !== direction) {
          direction = e.direction;

          gsap
            .timeline()
            .to(marqueeTl, {
              timeScale: 0,
              duration: 0.3,
              ease: "power1.in",
            })
            .to(marqueeTl, {
              timeScale: direction,
              duration: 1,
              ease: "back.out",
            });
        }
      },
    });
  });

  return (
    <div
      ref={marqueeContainerRef}
      className="w-full h-[50vh] lg:h-[60vh] flex items-center pointer-events-none select-none overflow-x-hidden relative"
    >
      <div
        ref={marqueeSliderRef}
        className="z-[15] relative flex whitespace-nowrap"
      >
        <p
          ref={marqueeText1}
          className="text-[6rem] sm:text-[7rem] lg:text-[8rem] xl:text-[10rem]"
        >
          <span className="font-pprightgrotesk-wide">
            Work &{" "}
            <span className="mr-12 italic font-black sm:mr-24 font-migra">
              Projects
            </span>
          </span>
        </p>
        <p
          ref={marqueeText2}
          className="text-[6rem] sm:text-[7rem] lg:text-[8rem] xl:text-[10rem] absolute left-full"
        >
          <span className="font-pprightgrotesk-wide">
            Work &{" "}
            <span className="mr-12 italic font-black sm:mr-24 font-migra">
              Projects
            </span>
          </span>
        </p>
        <p
          ref={marqueeText3}
          className="text-[6rem] sm:text-[7rem] lg:text-[8rem] xl:text-[10rem] absolute left-[200%]"
        >
          <span className="font-pprightgrotesk-wide">
            Work &{" "}
            <span className="mr-12 italic font-black sm:mr-24 font-migra">
              Projects
            </span>
          </span>
        </p>
      </div>
    </div>
  );
}
