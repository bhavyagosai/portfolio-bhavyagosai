import { Fragment } from "react";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import MainAboutSection from "@/components/MainAboutSection";
import MainProjectSection from "@/components/MainProjectSection";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <MainAboutSection />
      <MainProjectSection />
      <ImpactSection />
    </Fragment>
  );
}
