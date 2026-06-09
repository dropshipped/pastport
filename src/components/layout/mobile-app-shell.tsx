import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MobileAppShell = ({ children }: Props) => {
  return (
    <div className="relative flex h-full w-full flex-1 self-stretch justify-center">
      <div className="relative h-full w-full max-w-app overflow-hidden">
        {children}
      </div>
    </div>
  );
};
