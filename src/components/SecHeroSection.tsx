"use client";

import { useAppRef } from "@/context/AppRefContext";

export default function SecHeroSection() {
  const { SecHeroContainerRef } = useAppRef();

  return (
    <div
      ref={SecHeroContainerRef}
      className="flex items-center justify-end w-screen h-[40vh] md:h-[60vh] lg:h-[80vh] px-4 sm:px-8 lg:px-16 pointer-events-none select-none"
    >
      <div className="flex flex-col relative lg:top-[5rem]">
        <h1 className="relative -top-[1rem] lg:top-[2.5rem] text-[clamp(3rem,12vw,6rem)] lg:text-[6rem] xl:text-[8rem] font-pprightgrotesk-wide font-black text-end">
          <span className="pr-2 italic font-migra mix-blend-difference">hi!</span>
          <span className="ml-6 md:ml-12">I am</span>
        </h1>
        <h1 className="relative bottom-[2.5rem] text-[clamp(2rem,12vw,6rem)]/15 lg:text-[6rem]/45 xl:text-[8rem] font-black font-pprightgrotesk-wide text-right whitespace-nowrap lg:whitespace-normal">
          Bhavya Gosai
        </h1>
      </div>
    </div>
  );
}
