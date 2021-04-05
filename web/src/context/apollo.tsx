import { useMemo } from "react";
import {
  APOLLO_STATE_PROP_NAME,
  initializeApollo,
} from "utils/apollo/apolloClient";

export const useApollo = (pageProps: any) => {
  const initialState = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
