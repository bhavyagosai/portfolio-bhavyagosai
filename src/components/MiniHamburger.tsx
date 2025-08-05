"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useLoader } from "@/context/LoaderContext";
import { useAppRef } from "@/context/AppRefContext";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuItems } from "@/constants";
import HamburgerIcon from "@/icons/HamburgerIcon";
import { cn } from "@/utils";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function MiniHamburger() {
  const lenis = useLenis();
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const {
    heroContainerRef,
    mainAboutContainerRef,
    mainProjectContainerRef,
    footerContainerRef,
  } = useAppRef();

  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hamIconRef = useRef<SVGSVGElement>(null);
  const menuItemRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const currentIndex = useRef<number>(0);
  const isAnimating = useRef(false);

  const splitRefs = useRef<any[]>([]);
  const linkRefs = useRef<any[]>([]);

  const [open, setOpen] = useState(false);

  const sectionRefs = [
    heroContainerRef,
    mainAboutContainerRef,
    mainProjectContainerRef,
    footerContainerRef,
  ];

  useEffect(() => {
    if (
      loaded &&
      sectionRefs.length > 0 &&
      menuItemRefs.current.length > 0 &&
      linkRefs.current.length > 0
    )
      startAnimation();
  }, [loaded]);

  const startAnimation = contextSafe(() => {
    updateMenuStack(0);

    Object.entries(sectionRefs).forEach(([key, el]) => {
      if (el.current) {
        ScrollTrigger.create({
          trigger: el.current,
          start: "top center",
          end: "bottom center",
          onEnter: () => updateMenuStack(Number(key)),
          onEnterBack: () => updateMenuStack(Number(key)),
        });
      }
    });
  });

  const updateMenuStack = (index: number) => {
    currentIndex.current = index;

    menuItemRefs.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          yPercent: 150 * (i - index),
          opacity: i === index ? 1 : 0,
          duration: 1,
          ease: "expo.out",
        });
      }
    });

    linkRefs.current.forEach((el, i) => {
      if (el) {
        if (i === index) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });
  };

  const toggleMenu = contextSafe(() => {
    if (isAnimating.current) return; // prevent re-entry
    isAnimating.current = true;

    document.fonts.ready.then(() => {
      setOpen((prev) => !prev);

      if (!open) {
        gsap.set(contentRef.current, {
          height: "auto",
          opacity: 1,
          display: "block",
        });

        const height = contentRef.current?.offsetHeight;

        // Open animation
        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating.current = false;
          },
        });

        // Open the menu content with animation
        tl.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          {
            height,
            opacity: 1,
            duration: 0.8,
            ease: "expo.inOut",
          }
        );

        // Split the text of each link and animate them
        linkRefs.current.forEach((el, i) => {
          if (el) {
            if (!splitRefs.current[i]) {
              splitRefs.current[i] = new SplitText(el, {
                type: "lines",
                autoSplit: true,
              });
            }
            const split = splitRefs.current[i];

            gsap
              .timeline()
              .set(split.lines, {
                yPercent: -100,
                opacity: 0,
                delay: 0.2,
              })
              .to(split.lines, {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
                delay: 0.06 * i,
              });
          }
        });

        // Animate the hamburger icon to a cross
        gsap
          .timeline()
          .set(hamIconRef.current, { rotate: 0 })
          .to(hamIconRef.current, {
            rotate: 225,
            duration: 0.8,
            ease: "expo.inOut",
          });
      } else {
        // Close animation
        const tl = gsap.timeline({
          delay: 0.5,
          onComplete: () => {
            gsap.set(contentRef.current, { display: "none" });
            isAnimating.current = false;
          },
        });

        // Collapse the menu content
        tl.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.8,
          ease: "expo.inOut",
        });

        // Reverse the animations for each link
        [...linkRefs.current].reverse().forEach((_, i) => {
          const reversedIndex = linkRefs.current.length - 1 - i;
          const split = splitRefs.current[reversedIndex];

          if (split) {
            gsap
              .timeline()
              .set(split.lines, { yPercent: 0, opacity: 1 })
              .to(split.lines, {
                yPercent: -100,
                opacity: 0,
                duration: 1,
                ease: "expo.in",
                delay: 0.06 * i - 0.06,
              });
          }
        });

        // Animate the hamburger icon back
        gsap
          .timeline()
          .set(hamIconRef.current, { rotate: 225 })
          .to(hamIconRef.current, {
            rotate: 0,
            duration: 1.8,
            ease: "expo.inOut",
          });
      }
    });
  });

  const handleScrollTo = (key: number) => {
    if (sectionRefs[key] === undefined) return;

    const target = sectionRefs[key].current;
    if (target && lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    }
  };

  return (
    <div className="relative text-sm font-black font-pprightgrotesk-wide">
      <div
        className="md:flex hidden flex-col border-[1px] justify-between w-[20rem] py-2 px-3 rounded-xl space-y-1.5 cursor-pointer bg-[#16161E]/40 backdrop-blur-md overflow-hidden"
        onClick={toggleMenu}
        ref={menuRef}
      >
        <div className="flex items-center justify-between m-0">
          <div className="relative hidden md:block">
            {menuItems.map((item, i) => (
              <span
                ref={(el) => {
                  if (menuItemRefs.current.length <= i) {
                    menuItemRefs.current.push(el);
                  } else {
                    menuItemRefs.current[i] = el;
                  }
                }}
                className="absolute -top-2"
                key={i}
              >
                {item}
              </span>
            ))}
          </div>
          <HamburgerIcon ref={hamIconRef} />
        </div>

        {/* Collapsible section */}
        <div ref={contentRef} className="hidden cursor-default">
          <ul className="flex flex-col justify-between gap-1 pt-2 text-2xl font-black">
            {menuItems.map((item, index) => (
              <li key={index} className="relative w-fit">
                <Link
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative underline-animation select-none cursor-pointer"
                  )}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    if (currentIndex.current === index) {
                      e.preventDefault();
                      return;
                    }
                    e.preventDefault();
                    handleScrollTo(index);
                  }}
                >
                  {item}
                  <span className="underline-bar" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
