"use client";

import Project from "@/components/Project";
import { useAppRef } from "@/context/AppRefContext";
import { projects } from "@/constants";

export default function ProjectSection() {
  const { projectsContainerRef } = useAppRef();

  return (
    projects.length > 0 && (
      <div
        ref={projectsContainerRef}
        className="flex flex-col w-screen px-4 select-none sm:px-8 lg:my-20 lg:px-16"
      >
        {projects.map((project, index) => (
          <Project
            key={index}
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
        ))}
      </div>
    )
  );
}
