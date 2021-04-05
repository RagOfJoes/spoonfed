import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import React, { useEffect, memo } from "react";
import { ApolloProvider } from "@apollo/client";
import "../../public/stylesheets/reset.css";
import ThemeProvider from "context/theme";
import { useApollo } from "context/apollo";

NProgress.configure({
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentNode?.removeChild(jssStyles);
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <SnackbarProvider preventDuplicate>
            <Component {...pageProps} />
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default memo(App);
