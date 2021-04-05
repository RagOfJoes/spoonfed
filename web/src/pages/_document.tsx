import React from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta name="theme-color" content="#1c2637" />

          <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
          <meta
            name="author"
            content="Victor Ragojos - https://github.com/RagOfJoes"
          />
          <meta
            name="keywords"
            content="Spoonfed, RagOfJoes, NextJS, Recipe, GraphQL, Food, Creations, Social"
          />
          <link rel="shortcut icon" href="/images/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon-180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="64x64"
            href="/images/favicon-64.png"
          />

          <link
            rel="stylesheet"
            type="text/css"
            href="/stylesheets/nprogress.css"
          />
          <link
            rel="manifest"
            href="/manifest.json"
            crossOrigin="use-credentials"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&family=Roboto:wght@300;400;500&family=Poppins:wght@300;400;500&display=swap"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
        </Head>
        <body style={{ overflowX: "hidden" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Resolution order
//
// On the server:
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. document.getInitialProps
// 4. app.render
// 5. page.render
// 6. document.render
//
// On the server with error:
// 1. document.getInitialProps
// 2. app.render
// 3. page.render
// 4. document.render
//
// On the client
// 1. app.getInitialProps
// 2. page.getInitialProps
// 3. app.render
// 4. page.render
CustomDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheets: ServerStyleSheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const intiialProps = await Document.getInitialProps(ctx);

  return {
    ...intiialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(intiialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default CustomDocument;
