import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { Providers } from "~/components/providers";

import "~/styles/globals.css";
import "~/styles/mapbox.css";
import Layout from "~/components/layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  );
};

export default api.withTRPC(MyApp);
