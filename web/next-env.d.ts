/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: "development" | "production";

      // GraphQL Config
      GRAPHQL_SERVER: string;

      // Auth Config
      ISSUER: string;
      CLIENT_ID: string;
      REDIRECT_URL: string;
      CLIENT_SECRET: string;
      SESSION_COOKIE_DOMAIN: string;
      SESSION_COOKIE_SECRET: string;
      POST_LOGOUT_REDIRECT_URI: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
