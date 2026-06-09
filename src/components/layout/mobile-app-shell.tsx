import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** When true, content spans the full viewport width (e.g. full-bleed map). */
  fullWidth?: boolean;
};

export const MobileAppShell = ({ children, fullWidth = false }: Props) => {
  if (fullWidth) {
    return (
      <div className="relative h-full w-full flex-1 self-stretch">{children}</div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-1 self-stretch justify-center">
      <div className="relative h-full w-full max-w-app overflow-hidden">
        {children}
      </div>
    </div>
  );
};
