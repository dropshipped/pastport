import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Centers mobile-width UI chrome over full-bleed content. */
export const MobileChrome = ({ children }: Props) => {
  return (
    <div className="pointer-events-none absolute inset-0 flex justify-center">
      <div className="pointer-events-none relative h-full w-full max-w-app">
        {children}
      </div>
    </div>
  );
};
