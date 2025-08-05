import { useEffect, useState } from "react";

// Utility debounce function
function debounce(fn: () => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

// Main responsive hook
export function useResponsiveBreakpoints() {
  const getWidth = () =>
    typeof window !== "undefined" ? window.innerWidth : 1024;

  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 150);

    handleResize(); // initialize on mount
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
  };
}
