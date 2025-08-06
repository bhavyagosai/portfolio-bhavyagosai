import BytebeamLogo from "@/logos/BytebeamLogo";
import LfiLogo from "@/logos/LfiLogo";
import OnlydustLogo from "@/logos/OnlydustLogo";

import GithubLogo from "@/logos/GithubLogo";
import InstagramLogo from "@/logos/InstagramLogo";
import LinkedinLogo from "@/logos/LinkedinLogo";
import XLogo from "@/logos/XLogo";

export const menuItems = ["Home", "About", "Work", "Contact"];

export const laptopLinks = [
  "/resume",
  "https://bytebeam.io/",
  "https://lostferry.com/",
  "https://app.onlydust.com/users/bhavyagosai/overview/",
];

export const projects = [
  {
    name: "BYTEBEAM",
    designation: "SDE - I",
    workType: "Remote",
    duration: "Oct 2022 - Jan 2025",
    location: "Bengaluru, India",
    description:
      "One-stop solution for connected vehicles. Boost capabilities by seamless integration with comprehensive health monitoring.",
    subDescription: (
      <>
        Led a major UI/UX overhaul for a high-scale IoT platform handling 50M+
        rows of live data, improving performance and usability across
        dashboards, filters, and routing. Delivered real-time, virtualized data
        visualizations, platform-wide RBAC, and advanced modules like OTA
        rollouts and alerting systems. Built a proprietary UI library and
        optimized server-side interactions to enhance reliability and
        development velocity.
      </>
    ),
    logo: <BytebeamLogo className="w-[25rem] h-[25rem]" />,
    link: "https://bytebeam.io/",
  },
  {
    name: "LFI",
    designation: "Frontend Developer",
    workType: "Remote",
    duration: "Jul 2022 - Mar 2024",
    location: "Mumbai, India",
    description:
      "Lost Ferry Interactive makes video games and enterprise software.",
    subDescription: (
      <>
        Overtook various client projects and collaboratively delivered them end
        to end — such as{" "}
        <a
          href="https://satmace.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative underline-animation active"
        >
          Satma CE
          <span className="underline-bar" />
        </a>
        ,{" "}
        <a
          href="https://shop.chzcycling.cc/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative underline-animation active"
        >
          CHZ Cycling
          <span className="underline-bar" />
        </a>
        , and{" "}
        <a
          href="https://flamebackcapital.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative underline-animation active"
        >
          Flameback Capital
          <span className="underline-bar" />
        </a>
        .
      </>
    ),
    logo: <LfiLogo className="w-[25rem] h-[25rem]" />,
    link: "https://lostferry.com/",
  },
  {
    name: "ONLYDUST",
    designation: "Freelance",
    workType: "Remote",
    duration: "web3",
    location: "#371 - Silver Contributor",
    description: "Streamline open-source collaboration in web3 and blockchain.",
    subDescription: (
      <>
        Actively contributed to numerous open source projects through hackathons
        — such as{" "}
        <a
          href="https://github.com/apibara/starknet-react/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative underline-animation active"
        >
          Starknet React
          <span className="underline-bar" />
        </a>
        ,{" "}
        <a
          href="https://github.com/dojoengine/dojo/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative underline-animation active"
        >
          Dojo
          <span className="underline-bar" />
        </a>
        ,{" "}
        <a
          href="https://walnut.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative underline-animation active"
        >
          Walnut
          <span className="underline-bar" />
        </a>
        ,{" "}
        <a
          href="https://github.com/keep-starknet-strange/joyboy/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative underline-animation active"
        >
          Joyboy
          <span className="underline-bar" />
        </a>{" "}
        and many more.
      </>
    ),
    logo: <OnlydustLogo className="w-[25rem] h-[25rem]" />,
    link: "https://app.onlydust.com/users/bhavyagosai/overview/",
  },
];

export const minorProjects = [
  {
    name: "Flameback Capital",
    type: "Client",
    year: "2023",
    link: "https://flamebackcapital.com/",
  },
  {
    name: "Pasteez",
    type: "Personal",
    year: "2021",
    link: "https://pasteez.bhavyagosai.com/",
  },
  {
    name: "CHZ Cycling",
    type: "Client",
    year: "2023",
    link: "https://shop.chzcycling.cc/",
  },
  {
    name: "BrightUp Electrical",
    type: "Client",
    year: "2023",
    link: "https://brightupelectrical.co.nz/",
  },
  {
    name: "Skirade",
    type: "Personal",
    year: "2022",
    link: "https://github.com/bhavyagosai/skirade/",
  },
  {
    name: "CinemaCrate",
    type: "Personal",
    year: "2020",
    link: "https://cinemacrate.bhavyagosai.com/",
  },
  {
    name: "TwiceBuy",
    type: "Personal",
    year: "2020",
    link: "https://github.com/bhavyagosai/twicebuy/",
  },
];

export const footerLinks = [
  {
    name: "X (Twitter)",
    logo: <XLogo />,
    logoSmall: <XLogo height={40} width={40} />,
    url: "https://x.com/bhaxvya/",
  },
  {
    name: "LinkedIn",
    logo: <LinkedinLogo />,
    logoSmall: <LinkedinLogo height={40} width={40} />,
    url: "https://linkedin.com/in/bhavyagosai/",
  },
  {
    name: "Instagram",
    logo: <InstagramLogo />,
    logoSmall: <InstagramLogo height={40} width={40} />,
    url: "https://instagram.com/_bhavya8083/",
  },
  {
    name: "Github",
    logo: <GithubLogo />,
    logoSmall: <GithubLogo height={42} width={42} />,
    url: "https://github.com/bhavyagosai/",
  },
];
