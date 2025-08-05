/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        migra: ["var(--font-migra)", ...fontFamily.serif],
        ppfragment: [
          "var(--font-ppfragment-glare)",
          "var(--font-ppfragment-sans)",
          "var(--font-ppfragment-serif)",
          ...fontFamily.serif,
        ],
        ppneuecorp: [
          "var(--font-ppneuecorp-compact)",
          "var(--font-ppneuecorp)",
          ...fontFamily.sans,
        ],
        pprightgrotesk: [
          "var(--font-pprightgrotesk)",
          "var(--font-pprightgrotesk-compact)",
          "var(--font-pprightgrotesk-wide)",
          ...fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
