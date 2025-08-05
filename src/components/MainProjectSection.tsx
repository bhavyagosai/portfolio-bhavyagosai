"use client";

import { useAppRef } from "@/context/AppRefContext";
import MarqueeSection from "./MarqueeSection";
import MinorProjectSection from "./MinorProjectSection";
import ProjectSection from "./ProjectSection";

export default function MainProjectSection() {
  const { mainProjectContainerRef } = useAppRef();

  return (
    <div ref={mainProjectContainerRef}>
      <MarqueeSection />
      <ProjectSection />
      <MinorProjectSection />
    </div>
  );
}
