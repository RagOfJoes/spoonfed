import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import typePolicies from "./typePolicies";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const isServer: boolean = typeof window === "undefined";
  let serverURL = process.env.GRAPHQL_SERVER;
  if (!isServer) {
    serverURL = `${window.location.origin}/api/graphql/`;
  }
  return new ApolloClient({
    ssrMode: isServer,
    link: new HttpLink({
      uri: serverURL, // Server URL (must be absolute)
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({ typePolicies: typePolicies }),
  });
};

export const initializeApollo = (
  initialState: any | null = null
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // On First render and if we have SSG or SSR then we hydrate the cache here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const addPropToApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
): any => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }
  return pageProps;
};
