import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
