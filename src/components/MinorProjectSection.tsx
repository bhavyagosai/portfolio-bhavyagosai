"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useFlare } from "@/context/CursorFlareContext";
import { useAppRef } from "@/context/AppRefContext";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import MinorProject from "@/components/MinorProject";
import { minorProjects } from "@/constants";

export default function MinorProjectSection() {
  const { contextSafe } = useGSAP();
  const { flareRef, pauseBreathing, playBreathing } = useFlare();
  const { minorProjectsContainerRef } = useAppRef();
  const { isMobile } = useResponsiveBreakpoints();

  let onMouseEnterTl = gsap.timeline();
  let onMouseLeaveTl = gsap.timeline();

  const onMouseEnter = contextSafe(() => {
    if (isMobile) return;

    if (onMouseLeaveTl.isActive()) onMouseLeaveTl.kill();
    if (flareRef.current) {
      pauseBreathing();
      onMouseEnterTl = gsap.timeline().to(
        flareRef.current,
        {
          scale: 4,
          duration: 0.5,
          ease: "power3.inOut",
        },
        0
      );
    }
  });

  const onMouseLeave = contextSafe(() => {
    if (isMobile) return;

    if (onMouseEnterTl.isActive()) onMouseEnterTl.kill();
    if (flareRef.current) {
      onMouseLeaveTl = gsap.timeline().to(
        flareRef.current,
        {
          scale: 1,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => playBreathing(),
        },
        0
      );
    }
  });

  return (
    minorProjects.length > 0 && (
      <div
        ref={minorProjectsContainerRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex flex-col w-screen px-4 select-none md:my-20 sm:px-8 lg:px-16 z-11"
      >
        {minorProjects.map((project, index) => (
          <MinorProject
            key={index}
            name={project.name}
            type={project.type}
            year={project.year}
            link={project.link}
            first={index === 0}
          />
        ))}
      </div>
    )
  );
}
