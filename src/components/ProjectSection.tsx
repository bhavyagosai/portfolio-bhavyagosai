"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoader } from "@/context/LoaderContext";

import Project from "@/components/Project";
import { useAppRef } from "@/context/AppRefContext";
import { projects } from "@/constants";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function ProjectSection() {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const { projectsContainerRef, activeProjectIndexRef } = useAppRef();

  const projectRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (loaded && projectRefs.current.length > 0) startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    projectRefs.current.forEach((el, index) => {
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom center",
        onEnter: () => (activeProjectIndexRef.current = index + 1),
        onLeaveBack: () => (activeProjectIndexRef.current = index),
      });
    });
  });

  return (
    projects.length > 0 && (
      <div
        ref={projectsContainerRef}
        className="flex flex-col w-screen px-4 select-none sm:px-8 lg:my-20 lg:px-16"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => {
              projectRefs.current[index] = el!;
            }}
          >
            <Project
              name={project.name}
              designation={project.designation}
              workType={project.workType}
              duration={project.duration}
              location={project.location}
              description={project.description}
              subDescription={project.subDescription}
              logo={project.logo}
              link={project.link}
              last={index === projects.length - 1}
            />
          </div>
        ))}
      </div>
    )
  );
}
