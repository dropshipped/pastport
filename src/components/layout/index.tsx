import Head from "next/head";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Pastport</title>

        <meta
          name="description"
          content="Finally a place to humbly flex your travels."
        />
        <meta name="apple-mobile-web-app-title" content="Pastport" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/assets/safari-pinned-tab.svg"
          color="#6dbe45"
        />
      </Head>
      <div className="relative flex h-full w-full items-center justify-center">
        {children}
      </div>
    </>
  );
};

export default Layout;
