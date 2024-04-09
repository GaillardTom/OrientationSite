import { type AppType } from "next/app";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
  <>
    <Component {...pageProps} />
    <Analytics /> 
    <SpeedInsights />
  </>
  );
};

export default api.withTRPC(MyApp);
