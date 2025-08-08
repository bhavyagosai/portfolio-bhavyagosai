import type { Metadata } from "next";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";
import {
  migra,
  pp_fragment_glare,
  pp_fragment_sans,
  pp_fragment_serif,
  pp_neuecorp_compact,
  pp_neuecorp,
  pp_right_grotesk,
  pp_right_grotesk_compact,
  pp_right_grotesk_wide,
} from "@/utils/fonts";
import "./globals.css";
import { cn } from "@/utils";
import SiteWrapper from "@/components/SiteWrapper";
import AppProviders from "@/components/AppProviders";

export const metadata: Metadata = {
  metadataBase: new URL("https://bhavyagosai.com"),
  generator: "Bhavya Gosai",
  applicationName: "Bhavya Gosai",
  category: "technology",
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  colorScheme: "dark",
  creator: "Bhavya Gosai",
  publisher: "Bhavya Gosai",
  authors: [
    {
      name: "Bhavya Gosai",
      url: "https://bhavyagosai.com",
    },
  ],
  viewport: {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
  },
  keywords: [
    "Bhavya Gosai",
    "Bhavya Kalpesh Gosai",
    "Bhavya K Gosai",
    "Bhavya K. Gosai",
    "Bhavya",
    "Gosai",
    "Frontend Engineer",
    "Creative Developer",
    "Web3 Developer",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Three.js Developer",
    "GSAP Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Portfolio Website",
    "Personal Portfolio",
    "Bengaluru",
    "Vadodara",
    "Jamnagar",
    "Bengaluru Developer",
    "Vadodara Developer",
    "Jamnagar Developer",
    "Gujarat Developer",
    "India Web Developer",
    "Frontend Animation",
    "Interactive Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.ogImage}`,
        alt: "Bhavya Gosai - Passionate Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@bhaxvya",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "black-translucent",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  themeColor: "#000000",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Head>
        <link rel="canonical" href="https://bhavyagosai.com" />
        <link rel="preload" as="image" href="/og.png" type="image/png" />
        <meta name="apple-mobile-web-app-title" content="Bhavya Gosai" />
        <meta property="og:title" content={siteConfig.name} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.ogImage} />
        <meta property="og:url" content={siteConfig.url} />
        <meta property="og:site_name" content="Bhavya Gosai" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:site" content="@bhaxvya" />
        <meta name="twitter:creator" content="@bhaxvya" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:image:alt"
          content="Bhavya Gosai - Passionate Developer"
        />
        <meta name="color-scheme" content="dark" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bhavya Gosai",
              url: "https://bhavyagosai.com",
              sameAs: [
                "https://twitter.com/bhaxvya",
                "https://github.com/bhavyagosai",
              ],
              jobTitle: "Software Engineer",
              description: "Creative developer and animation enthusiast",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Vadodara",
                addressCountry: "India",
              },
            }),
          }}
        />
      </Head>
      <body
        tabIndex={-1}
        className={cn(
          migra.variable,
          pp_fragment_glare.variable,
          pp_fragment_sans.variable,
          pp_fragment_serif.variable,
          pp_neuecorp_compact.variable,
          pp_neuecorp.variable,
          pp_right_grotesk.variable,
          pp_right_grotesk_compact.variable,
          pp_right_grotesk_wide.variable,
          "realtive antialiased w-screen bg-background overflow-x-hidden overflow-y-auto no-scroll"
        )}
      >
        <AppProviders>
          <SiteWrapper>{children}</SiteWrapper>
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
