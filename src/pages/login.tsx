import { Button, Divider, cn } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoLight from "~/assets/logos/passport-long-light.svg";
import LogoDark from "~/assets/logos/passport-long-dark.svg";
import Image from "next/image";
import { useTheme } from "next-themes";
import { GithubIcon, GoogleIcon } from "~/assets/icons";
import { useAuth } from "~/components/providers/auth";
import Link from "next/link";

const DELAY = 4000;

const IMAGES = [
  {
    id: 0,
    url: "https://plus.unsplash.com/premium_photo-1668883188861-39974ed9ad99?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1516490701444-1daf45984537?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    url: "https://plus.unsplash.com/premium_photo-1688327330136-68347eed090f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1534313314376-a72289b6181e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const CATCHPHRASES = [
  "Finally a place to humbly flex your travels.",
  "Collect Landmarks like pokemon.",
  "See where you've been and where you'll go.",
  "Share memories with friends and family.",
];

export default function LoginPage() {
  const { handleOAuthLogin } = useAuth();

  const [index, setIndex] = useState(0);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % IMAGES.length),
      DELAY,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 p-4">
        <div className="flex w-full items-center justify-center p-2">
          <Link href="/">
            <Image
              src={resolvedTheme === "light" ? LogoLight : LogoDark}
              alt="logo"
              width={172.47457632}
              height={32}
            />
          </Link>
        </div>
        <div className="relative h-[60%] w-full overflow-clip rounded-large bg-foreground-500">
          <Fade index={index} />
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="flex-1">
            <Divider orientation="horizontal" className="" />
          </div>
          <span className="text-small text-foreground-400">Sign-in with</span>
          <div className="flex-1">
            <Divider orientation="horizontal" className="" />
          </div>
          {/* <Divider orientation="horizontal" className=" flex-shrink-1" /> */}
        </div>
        <div className="flex w-full flex-1 flex-col items-center justify-start gap-2">
          <Button
            color="default"
            variant="bordered"
            size="lg"
            className="w-full"
            startContent={<GithubIcon />}
            onClick={() => handleOAuthLogin("github")}
          >
            Github
          </Button>
          <Button
            color="default"
            variant="bordered"
            size="lg"
            className="w-full"
            startContent={<GoogleIcon />}
            onClick={() => handleOAuthLogin("google")}
          >
            Google
          </Button>
          {/* TOO BROKE TO AFFORD APPLE DEVELOPER ACCOUNT
              TODO: afford apple developer account
          <Button
            color="default"
            variant="bordered"
            size="lg"
            className="w-full"
            startContent={<AppleIcon />}
            onClick={() => handleOAuthLogin("apple")}
          >
            Apple
          </Button> */}
        </div>
      </div>
    </>
  );
}

function Fade({ index }: { index: number }) {
  return (
    <AnimatePresence>
      <motion.div
        className={cn("absolute top-0 h-full w-full")}
        key={IMAGES[index]?.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          ease: "linear",
          duration: 1,
        }}
      >
        <div
          className={cn(
            "absolute bottom-0 z-10 h-[45%] w-full",
            "bg-gradient-to-b from-transparent to-white",
            "flex items-end p-4",
            "text-4xl font-semibold text-black",
          )}
        >
          {CATCHPHRASES[index % CATCHPHRASES.length]}
        </div>
        <Image src={IMAGES[index]!.url} alt="Travel photos" fill />
      </motion.div>
    </AnimatePresence>
  );
}
