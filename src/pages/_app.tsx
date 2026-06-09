import { type AppType } from "next/app";
import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { Providers } from "~/components/providers";
import Layout from "~/components/layout";
import { MobileAppShell } from "~/components/layout/mobile-app-shell";

import "~/styles/globals.css";
import "~/styles/mapbox.css";

const usesMobileAppShell = (asPath: string) => {
  const path = asPath.split("?")[0] ?? asPath;

  return (
    path.startsWith("/@") || path === "/login" || path === "/upload"
  );
};

const MyApp: AppType = ({ Component, pageProps }) => {
  const { asPath } = useRouter();
  const page = <Component {...pageProps} />;

  return (
    <Providers>
      <Layout>
        {usesMobileAppShell(asPath) ? (
          <MobileAppShell>{page}</MobileAppShell>
        ) : (
          page
        )}
      </Layout>
    </Providers>
  );
};

export default api.withTRPC(MyApp);
