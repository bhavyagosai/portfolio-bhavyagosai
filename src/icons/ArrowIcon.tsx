import { SVGProps, forwardRef } from "react";

type Props = {
  svgProps?: SVGProps<SVGSVGElement>;
};

const ArrowIcon = forwardRef<SVGSVGElement, Props>(({ svgProps }, ref) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...svgProps}
    >
      <path
        d="M6 18L18 6M18 6H10M18 6V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export default ArrowIcon;
