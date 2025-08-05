"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/context/LoaderContext";
import { useAppRef } from "@/context/AppRefContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menuItems } from "@/constants";
import HamburgerIcon from "@/icons/HamburgerIcon";
import { cn } from "@/utils";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

interface MobileHamburgerProps {
  navRef?: React.RefObject<HTMLDivElement | null>;
  navTextRef?: React.RefObject<HTMLLIElement | null>;
}

export default function MobileHamburger(props: MobileHamburgerProps) {
  const { contextSafe } = useGSAP();
  const { loaded } = useLoader();
  const {
    heroContainerRef,
    mainAboutContainerRef,
    mainProjectContainerRef,
    footerContainerRef,
  } = useAppRef();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileHamIconRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentIndex = useRef<number>(0);
  const isAnimating = useRef(false);

  const linkRefs = useRef<any[]>([]);

  const [open, setOpen] = useState(false);

  const sectionRefs = [
    heroContainerRef,
    mainAboutContainerRef,
    mainProjectContainerRef,
    footerContainerRef,
  ];

  useEffect(() => {
    if (menuItems.length === 4) menuItems.push("Resume");
  }, []);

  useEffect(() => {
    if (loaded && sectionRefs.length > 0 && linkRefs.current.length > 0)
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

  const OpenMenu = contextSafe(() => {
    document.fonts.ready.then(() => {
      if (!props.navRef || !props.navTextRef || open) return;

      if (isAnimating.current) return; // prevent re-entry
      isAnimating.current = true;

      setOpen((prev) => !prev);

      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Open animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(contentRef.current, {
            height: "100%",
            display: "flex",
            opacity: 1,
          });

          gsap.fromTo(
            linkRefs.current,
            {
              yPercent: -100,
              opacity: 0,
            },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.8,
              ease: "expo.out",
              stagger: {
                amount: 0.3,
                from: "start",
              },
              onComplete: () => {
                isAnimating.current = false;
              },
            }
          );
        },
      });

      tl.to(
        mobileMenuRef.current,
        {
          width: "100vw",
          height: "100dvh",
          borderRadius: 0,
          cursor: "default",
          backdropFilter: "blur(50px)",
          WebkitBackdropFilter: "blur(50px)",
          duration: 0.8,
          ease: "expo.inOut",
        },
        0
      )
        .to(
          props.navRef.current,
          {
            padding: 0,
            duration: 0.8,
            ease: "expo.inOut",
          },
          0
        )
        .to(
          props.navTextRef.current,
          {
            scale: 1.2,
            top: 60,
            left: 90,
            duration: 0.8,
            ease: "expo.inOut",
          },
          0
        )
        .set(mobileHamIconRef.current, { rotate: 0 }, 0)
        .to(
          mobileHamIconRef.current,
          {
            top: 50,
            right: 50,
            rotate: 225,
            scale: 2,
            duration: 0.8,
            ease: "expo.inOut",
          },
          0
        );
    });
  });

  const closeMenu = contextSafe(() => {
    if (!open) {
      OpenMenu();
      return;
    }

    document.fonts.ready.then(() => {
      if (!props.navRef || !props.navTextRef) return;

      if (isAnimating.current) return; // prevent re-entry
      isAnimating.current = true;

      setOpen((prev) => !prev);

      const tl = gsap
        .timeline({
          paused: true,
          delay: -0.2,
          onComplete: () => {
            isAnimating.current = false;
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
          },
        })
        .to(
          mobileMenuRef.current,
          {
            width: "auto",
            height: "auto",
            cursor: "pointer",
            borderRadius: "12px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            duration: 0.8,
            ease: "expo.inOut",
          },
          0
        )
        .to(
          props.navRef.current,
          {
            paddingBottom: "20px",
            paddingTop: "20px",
            paddingRight: "16px",
            paddingLeft: "16px",
            duration: 0.8,
            ease: "expo.inOut",
          },
          0
        )
        .to(
          props.navTextRef.current,
          {
            scale: 1,
            top: "8px",
            left: 0,
            duration: 0.8,
            ease: "expo.inOut",
          },
          0
        )
        .set(mobileHamIconRef.current, { rotate: 225 }, 0)
        .to(
          mobileHamIconRef.current,
          {
            top: 0,
            right: 0,
            rotate: 0,
            scale: 1,
            duration: 0.8,
            ease: "expo.inOut",
          },
          0
        );

      gsap.fromTo(
        linkRefs.current,
        {
          yPercent: 0,
          opacity: 1,
        },
        {
          yPercent: -100,
          opacity: 0,
          duration: 0.8,
          ease: "expo.in",
          stagger: {
            amount: 0.3,
            from: "end",
          },
          onComplete: () => {
            // Hide the content after the animation
            gsap.set(contentRef.current, { display: "none" });
            tl.play();
          },
        }
      );
    });
  });

  const handleScrollTo = (key: number) => {
    const target = sectionRefs[key]?.current;
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    closeMenu();
  };

  return (
    <div className="relative text-sm font-pprightgrotesk-wide">
      <div
        className="fixed top-0 right-0 md:hidden flex flex-col px-[clamp(10px,5vw,20px)] py-[clamp(8px,4vw,16px)] rounded-xl bg-[#16161E]/40 backdrop-blur-md overflow-hidden cursor-pointer"
        onClick={OpenMenu}
        ref={mobileMenuRef}
      >
        <div onClick={closeMenu} className="ml-auto cursor-pointer w-fit">
          <HamburgerIcon
            ref={mobileHamIconRef}
            svgProps={{
              className: "relative",
              height: "clamp(15px, 5vw, 30px)",
              width: "clamp(15px, 5vw, 30px)",
            }}
          />
        </div>

        <div
          ref={contentRef}
          className="items-end hidden w-full h-full opacity-0 cursor-default p-15"
        >
          <ul className="flex flex-col gap-1 pt-2 text-[clamp(1rem,10vw,3.8rem)] font-normal h-fit">
            {menuItems.map((item, index) => (
              <li key={index} className="relative w-fit">
                <Link
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative underline-animation select-none cursor-pointer inline-block"
                  )}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    if (currentIndex.current === index || isAnimating.current) {
                      e.preventDefault();
                      return;
                    }
                    e.preventDefault();

                    if (index === menuItems.length - 1) {
                      window.open(
                        "https://bhavyagosai.com/Bhavya_Gosai_Resume.pdf/",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    } else handleScrollTo(index);
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
