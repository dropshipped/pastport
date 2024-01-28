import type { SVGProps } from "react";

export const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    // stroke="currentColor"
    // fill="none"
    // strokeWidth="1"
    // viewBox="0 0 24 24"
    // strokeLinecap="round"
    // strokeLinejoin="round"
    // height="24"
    // width="24"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> */}
    {/* <path d="M4 11l8 3l8 -3"></path> */}
    <path
      fillRule="evenodd"
      d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894z"
    />
  </svg>
);
