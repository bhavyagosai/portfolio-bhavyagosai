import { useEffect, useState } from "react";

export function useIsTouchScreen() {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    const check = () => {
      const touch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;

      setIsTouchScreen(touch);
    };

    check();

    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);

    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return isTouchScreen;
}
