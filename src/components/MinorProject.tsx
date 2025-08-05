"use client";

import { useRef, useState } from "react";
import { useResponsiveBreakpoints } from "@/hooks/useResponsiveBreakpoints";
import { useIsTouchScreen } from "@/hooks/useIsTouchScreen";
import { cn } from "@/utils";

type MinorProjectProps = {
  name: string;
  type: string;
  year: string;
  link: string;
  first?: boolean;
};

export default function MinorProject(props: MinorProjectProps) {
  const { isMobile } = useResponsiveBreakpoints();
  const isTouchScreen = useIsTouchScreen();

  const liRef = useRef<HTMLAnchorElement>(null);

  const [entryFromTop, setEntryFromTop] = useState(true);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (isTouchScreen) return;

    const bounds = liRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const y = e.clientY - bounds.top;
    setEntryFromTop(y < bounds.height / 2);
    setHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (isTouchScreen) return;

    const bounds = liRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const y = e.clientY - bounds.top;
    setEntryFromTop(y < bounds.height / 2);
    setHovered(false);
  };

  return (
    <a
      ref={liRef}
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative group overflow-hidden cursor-pointer flex font-pprightgrotesk-wide items-center justify-between py-4 px-5 border-white/20 border-b-2",
        props.first && "border-t-2"
      )}
    >
      {/* Background animation */}
      {!isMobile && !isTouchScreen && (
        <span
          className={cn(
            "opacity-80 absolute inset-0 bg-white z-11 pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            entryFromTop
              ? hovered
                ? "translate-y-0 origin-top"
                : "-translate-y-full origin-top"
              : hovered
              ? "translate-y-0 origin-bottom"
              : "translate-y-full origin-bottom"
          )}
        />
      )}

      {/* Text Content */}
      <h1
        className={cn(
          "text-2xl text-white transition-all duration-300 md:text-3xl xl:text-4xl z-12",
          !isTouchScreen && "md:group-hover:text-black md:group-hover:ml-5"
        )}
      >
        {props.name}
        <span className="block text-xl md:text-2xl lg:hidden">
          {props.type}
        </span>
      </h1>
      <h1
        className={cn(
          "left-1/2 -translate-x-1/2 absolute text-2xl text-white transition-colors duration-300 xl:text-3xl z-12",
          !isTouchScreen && "md:group-hover:text-black",
          "lg:block hidden"
        )}
      >
        {props.type}
      </h1>
      <h1
        className={cn(
          "text-xl text-white transition-colors duration-300 md:text-2xl xl:text-3xl z-12",
          !isTouchScreen && "md:group-hover:text-black"
        )}
      >
        {props.year}
      </h1>
    </a>
  );
}
