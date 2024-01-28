import Link from "next/link";
import type { SVGProps } from "react";
import Image from "next/image";
import LogoLight from "~/assets/logos/passport-long-light.svg";
import LogoDark from "~/assets/logos/passport-long-dark.svg";
import { useTheme } from "next-themes";

export default function Footer() {
  const { resolvedTheme } = useTheme();

  return (
    <footer className="px-4 py-10 text-white md:px-6">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex items-center justify-center md:justify-start">
          <Link href="/">
            <Image
              src={resolvedTheme === "light" ? LogoLight : LogoDark}
              alt="Pastport"
              width={172.47457632}
              height={32}
            />
            <span className="sr-only">Pastport</span>
          </Link>
        </div>
        <nav className="flex items-center justify-center gap-4 text-lg">
          <Link className="hover:underline" href="#">
            Home
          </Link>
          <Link className="hover:underline" href="#">
            Devpost
          </Link>
          <Link className="hover:underline" href="#">
            About
          </Link>
        </nav>
        {/* <div className="flex items-center justify-center gap-4 md:justify-start">
          <Link className="text-white hover:text-gray-300" href="#">
            <FacebookIcon className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link className="text-white hover:text-gray-300" href="#">
            <TwitterIcon className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link className="text-white hover:text-gray-300" href="#">
            <InstagramIcon className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div> */}
        <div className="flex items-center justify-center text-center md:justify-end md:text-right">
          <p className="text-sm">© 2024 Pastport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// function FacebookIcon(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//     </svg>
//   );
// }

// function InstagramIcon(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
//       <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//       <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
//     </svg>
//   );
// }

// function TwitterIcon(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
//     </svg>
//   );
// }
