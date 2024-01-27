import type { SVGProps } from "react";

export const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="1"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="24px"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 11l8 3l8 -3"></path>
  </svg>
);
