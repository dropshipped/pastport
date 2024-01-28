import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // on mount, set the theme to the local theme
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const theme = localStorage.getItem("theme") ?? systemTheme;
    const currentBackground =
      theme === "light" ? "hsl(0 0% 100%)" : "hsl(224 71% 4%)";
    const metaThemeColor = document.querySelector(
      `meta[name='theme-color'][media='(prefers-color-scheme: ${systemTheme})']`,
    );
    metaThemeColor?.setAttribute("content", currentBackground);
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
