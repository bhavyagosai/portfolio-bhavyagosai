"use client";

import { useAppRef } from "@/context/AppRefContext";
import SecHeroSection from "./SecHeroSection";
import AboutSection from "./AboutSection";

export default function MainAboutSection() {
  const { mainAboutContainerRef } = useAppRef();
  return (
    <div ref={mainAboutContainerRef}>
      <SecHeroSection />
      <AboutSection />
    </div>
  );
}
