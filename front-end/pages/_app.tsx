import "../styles/globals.css";
import "../styles/swiperStyles.css";
import "../styles/modalConfirmEmail.css"

import React from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";

import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider>
              <Component {...pageProps} />
          </AuthProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};
