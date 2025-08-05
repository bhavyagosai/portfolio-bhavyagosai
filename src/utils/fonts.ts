import localFont from "next/font/local";

export const migra = localFont({
  src: [
    { path: "../fonts/Migra-Extrabold.otf", weight: "800", style: "normal" },
    {
      path: "../fonts/MigraItalic-ExtraboldItalic.otf",
      weight: "800",
      style: "italic",
    },
    { path: "../fonts/Migra-Extralight.otf", weight: "200", style: "normal" },
    {
      path: "../fonts/MigraItalic-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-migra",
  preload: true,
});

export const pp_fragment_glare = localFont({
  src: [
    {
      path: "../fonts/PPFragment-GlareExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment-GlareLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment-GlareRegular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-ppfragment-glare",
  preload: true,
});

export const pp_fragment_sans = localFont({
  src: [
    {
      path: "../fonts/PPFragment-SansExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment-SansLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment-SansRegular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-ppfragment-sans",
  preload: true,
});

export const pp_fragment_serif = localFont({
  src: [
    {
      path: "../fonts/PPFragment-SerifExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment-SerifLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/PPFragment-SerifRegular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-ppfragment-serif",
  preload: true,
});

export const pp_neuecorp_compact = localFont({
  src: [
    {
      path: "../fonts/PPNeueCorp-CompactMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueCorp-CompactUltrabold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueCorp-CompactUltralight.otf",
      weight: "200",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-ppneuecorp-compact",
  preload: true,
});

export const pp_neuecorp = localFont({
  src: [
    {
      path: "../fonts/PPNeueCorp-NormalMedium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueCorp-NormalUltrabold.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueCorp-NormalUltralight.otf",
      weight: "200",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-ppneuecorp",
  preload: true,
});

export const pp_right_grotesk_compact = localFont({
  src: [
    {
      path: "../fonts/PPRightGrotesk-CompactBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/PPRightGrotesk-CompactDark.otf",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pprightgrotesk-compact",
  preload: true,
});

export const pp_right_grotesk = localFont({
  src: [
    {
      path: "../fonts/PPRightGrotesk-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/PPRightGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pprightgrotesk",
  preload: true,
});

export const pp_right_grotesk_wide = localFont({
  src: [
    {
      path: "../fonts/PPRightGrotesk-WideBlack.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/PPRightGrotesk-WideMedium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pprightgrotesk-wide",
  preload: true,
});
