import React from "react";
import SmoothScroll from "@/wrapper/SmoothScroll";
import CursorFlare from "@/components/CursorFlare";
import SiteLoader from "@/components/SiteLoader";
import AppBackground from "@/components/AppBackground";
import Navbar from "@/components/Navbar";
import LaptopMockup from "@/components/LaptopMockup";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
};

function SiteWrapper({ children }: Props) {
  return (
    <SmoothScroll>
      <CursorFlare>
        <SiteLoader />
        <AppBackground />
        <Navbar />
        <LaptopMockup />
        {children}
        <Footer />
      </CursorFlare>
    </SmoothScroll>
  );
}

export default SiteWrapper;
