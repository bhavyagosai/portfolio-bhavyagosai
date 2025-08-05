import { SVGProps, forwardRef } from "react";

type Props = {
  svgProps?: SVGProps<SVGSVGElement>;
};

const HamburgerIcon = forwardRef<SVGSVGElement, Props>(({ svgProps }, ref) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=" translate-none rotate-none scale-none translate-0"
      ref={ref}
      {...svgProps}
    >
      <g id="Icon / Plus">
        <path
          id="Rectangle 3"
          d="M10 1V3.6C10 5.84021 10 6.96031 9.56403 7.81596C9.18053 8.56861 8.56861 9.18053 7.81596 9.56403C6.96031 10 5.84021 10 3.6 10H1"
          stroke="currentColor"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
        />
        <path
          vectorEffect="non-scaling-stroke"
          id="Rectangle 4"
          d="M19 10H16.4C14.1598 10 13.0397 10 12.184 10.436C11.4314 10.8195 10.8195 11.4314 10.436 12.184C10 13.0397 10 14.1598 10 16.4V19"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
});

HamburgerIcon.displayName = "HamburgerIcon";
export default HamburgerIcon;
