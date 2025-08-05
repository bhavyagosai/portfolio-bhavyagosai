import { SVGProps } from "react";

const BytebeamLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="70"
    height="58"
    viewBox="0 0 70 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M69.952 14.532L40.0684 0L54.1477 17.7426L69.952 14.532Z"
      fill="#EDEDED"
    />
    <path
      d="M69.952 42.7717L40.0684 57.3037L54.1477 39.5611L69.952 42.7717Z"
      fill="#EDEDED"
    />
    <path
      d="M54.1474 17.743L63.0391 28.6969L54.1474 39.5368L0 28.642L54.1474 17.743Z"
      fill="#EDEDED"
    />
  </svg>
);

BytebeamLogo.displayName = "BytebeamLogo";
export default BytebeamLogo;
