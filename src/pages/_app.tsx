import { type AppType } from "next/app";

import { api } from "~/utils/api";
import { Providers } from "~/components/providers";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default api.withTRPC(MyApp);
