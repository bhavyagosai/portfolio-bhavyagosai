"use client";

import { createContext, useContext, useRef } from "react";

interface AppRefContextType {
  appBackgroundRef: React.RefObject<HTMLDivElement>;
  heroContainerRef: React.RefObject<HTMLDivElement>;
  mainAboutContainerRef: React.RefObject<HTMLDivElement>;
  SecHeroContainerRef: React.RefObject<HTMLDivElement>;
  aboutContainerRef: React.RefObject<HTMLDivElement>;
  mainProjectContainerRef: React.RefObject<HTMLDivElement>;
  marqueeContainerRef: React.RefObject<HTMLDivElement>;
  projectsContainerRef: React.RefObject<HTMLDivElement>;
  minorProjectsContainerRef: React.RefObject<HTMLDivElement>;
  footerContainerRef: React.RefObject<HTMLDivElement>;
}

const AppRefContext = createContext<AppRefContextType | null>(null);

export const AppRefProvider = ({ children }: { children: React.ReactNode }) => {
  const appBackgroundRef = useRef<any>(null);
  const heroContainerRef = useRef<any>(null);
  const mainAboutContainerRef = useRef<any>(null);
  const SecHeroContainerRef = useRef<any>(null);
  const aboutContainerRef = useRef<any>(null);
  const mainProjectContainerRef = useRef<any>(null);
  const marqueeContainerRef = useRef<any>(null);
  const projectsContainerRef = useRef<any>(null);
  const minorProjectsContainerRef = useRef<any>(null);
  const footerContainerRef = useRef<any>(null);

  return (
    <AppRefContext.Provider
      value={{
        appBackgroundRef,
        heroContainerRef,
        mainAboutContainerRef,
        SecHeroContainerRef,
        aboutContainerRef,
        mainProjectContainerRef,
        marqueeContainerRef,
        projectsContainerRef,
        minorProjectsContainerRef,
        footerContainerRef,
      }}
    >
      {children}
    </AppRefContext.Provider>
  );
};

export const useAppRef = () => {
  const ctx = useContext(AppRefContext);
  if (!ctx) throw new Error("useAppRef must be used within AppRefProvider");
  return ctx;
};
