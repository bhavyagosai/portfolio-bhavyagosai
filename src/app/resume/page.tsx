import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Resume | Bhavya Gosai",
  description:
    "Download the resume of Bhavya Gosai - frontend developer, creative engineer, and product-focused builder.",
  keywords: [
    "Bhavya Gosai",
    "Bhavya Gosai resume",
    "frontend developer",
    "creative developer",
    "web developer portfolio",
    "react developer",
    "resume PDF",
    "developer resume",
  ],
  authors: [{ name: "Bhavya Gosai", url: "https://bhavyagosai.com" }],
  creator: "Bhavya Gosai",
  publisher: "Bhavya Gosai",
  metadataBase: new URL("https://bhavyagosai.com"),
  alternates: {
    canonical: "https://bhavyagosai.com/resume",
  },
  openGraph: {
    title: "Resume | Bhavya Gosai",
    description:
      "Take a look at Bhavya Gosai's resume - React, Next.js, and creative web experiences.",
    url: "https://bhavyagosai.com/resume",
    siteName: "Bhavya Gosai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://bhavyagosai.com/og-resume.png",
        width: 1200,
        height: 630,
        alt: "Bhavya Gosai Resume Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | Bhavya Gosai",
    description: "Download the resume of Bhavya Gosai.",
    creator: "@bhaxvya",
    images: ["https://bhavyagosai.com/og-resume.png"],
  },
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

export default function ResumePage() {
  redirect("/Bhavya_Gosai_Resume.pdf");
}
