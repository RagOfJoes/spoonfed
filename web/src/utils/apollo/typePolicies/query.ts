import { TypePolicy } from "@apollo/client";
import { RecipeConnection } from "generated/graphql";

const QueryTypePolicy: TypePolicy = {
  fields: {
    getRecipes: {
      keyArgs: false,
      merge: (
        existing: RecipeConnection,
        incoming: RecipeConnection,
        { args }
      ) => {
        // 1. Make sure that new data is actually coming in
        if (!incoming) return existing;
        // 2. Destruct incoming object
        // and initiliaze appropriate variables
        const { edges, pageInfo } = incoming;
        let newEdges;
        const isFiltered = args?.filters?.length > 0;
        const isSorted = args?.sort?.creation !== "DESC";
        // 3. Run checks
        if (
          (isSorted && !args?.cursor) ||
          (isFiltered && !args?.cursor) ||
          !args?.cursor
        ) {
          // 3a. If User initiated a new sort
          // or a new filter then replace old edges
          // with the new one
          newEdges = edges;
        } else {
          // 3b. If for some reason edges weren't an
          // array(probably initiailly on the server)
          // then just assign new edges
          if (!Array.isArray(existing?.edges)) {
            newEdges = edges;
          } else {
            // 3c. Lastly, if no checks pass then
            // it's most likely a load more situation
            // so just concat new edges to the old one
            if (!!edges) {
              newEdges = existing?.edges.concat(edges) ?? [];
            }
          }
        }
        return {
          pageInfo,
          edges: newEdges,
        };
      },
    },
  },
};

export default QueryTypePolicy;
