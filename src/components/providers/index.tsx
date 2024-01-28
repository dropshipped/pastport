import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "~/components/providers/theme";
import { AuthProvider } from "~/components/providers/auth";

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class">
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </NextUIProvider>
  );
};
