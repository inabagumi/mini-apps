import { SerwistProvider } from "@serwist/turbopack/react";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import type { FC } from "react";

import "styles/globals.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const title = process.env.NEXT_PUBLIC_TITLE || "";
  const description = process.env.NEXT_PUBLIC_DESCRIPTION;

  return (
    <SerwistProvider
      disable={process.env.NODE_ENV === "development"}
      swUrl="/service-worker.js"
    >
      <DefaultSeo
        description={description}
        openGraph={{
          images: [
            {
              height: 630,
              url: new URL(
                "/img/main-visual.jpg",
                process.env.NEXT_PUBLIC_BASE_URL
              ).toString(),
              width: 1200,
            },
          ],
          type: "website",
        }}
        titleTemplate={`%s - ${title}`}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <Component {...pageProps} />
    </SerwistProvider>
  );
};

export default App;
