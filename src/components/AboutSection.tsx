"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "@/context/LoaderContext";
import { useAppRef } from "@/context/AppRefContext";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const { aboutContainerRef } = useAppRef();

  const aboutTextRef = useRef<HTMLDivElement>(null);

  const aboutSplitRef = useRef<SplitText | null>(null);

  useEffect(() => {
    if (loaded && aboutTextRef.current && aboutContainerRef.current)
      startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    document.fonts.ready.then(() => {
      aboutSplitRef.current?.revert();

      aboutSplitRef.current = new SplitText(aboutTextRef.current, {
        type: "chars",
        autoSplit: true,
      });

      const aboutTextAnimationTl = gsap
        .timeline({
          paused: true,
        })
        .from(aboutSplitRef.current.chars, {
          opacity: 0.2,
          stagger: 0.02,
          ease: "none",
        });

      ScrollTrigger.create({
        trigger: aboutContainerRef.current,
        start: "top 95%",
        end: "bottom 70%",
        scrub: true,
        animation: aboutTextAnimationTl,
      });
    });
  });

  return (
    <div
      ref={aboutContainerRef}
      className="flex md:items-center justify-start lg:justify-end w-screen md:h-[90vh] px-4 sm:px-8 lg:px-16 pointer-events-none select-none"
    >
      <div
        ref={aboutTextRef}
        className="max-w-2xl text-2xl sm:text-3xl lg:text-3xl xl:max-w-3xl xl:text-4xl font-pprightgrotesk-wide"
      >
        <p className="block">
          I'm a developer driven by a passion for building pixel-perfect and
          accessible interfaces that blend design and engineering. I thrive at
          the intersection of creativity and code—turning thoughtful design into
          performance driven and intuitive user experiences.
        </p>
        <div className="my-[2.5rem]" />
        <p className="block">
          What fuels me is the challenge of crafting digital products that not
          only look great but truly feel right—smooth, responsive, and built to
          last. With a sharp eye for detail and a love for modern web tech, I
          aim to create work that connects, empowers, and leaves a lasting
          impression.
        </p>
      </div>
    </div>
  );
}
