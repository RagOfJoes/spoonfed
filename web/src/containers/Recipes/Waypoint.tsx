import { memo } from "react";
import { Waypoint } from "react-waypoint";
import Grid from "@material-ui/core/Grid";
import { useRecipes } from "context/recipes";
import RecipeCard from "components/RecipeCard";
import {
  GetRecipesDocument,
  GetRecipesQueryVariables,
  SortOrder,
} from "generated/graphql";

const RecipeWaypoint = memo(() => {
  const {
    data,
    fetchMore,
    isSorting,
    isFetching,
    toggleFetching,
  } = useRecipes();

  // Only render if User is not filtering, sorting, or is initially Fetching
  // And if there's a next page
  if (!isSorting && !isFetching && !!data?.getRecipes.pageInfo?.hasNextPage) {
    return (
      <Waypoint
        bottomOffset={0}
        onEnter={async () => {
          const { pageInfo } = data.getRecipes;
          // console.log(pageInfo);
          if (isSorting || isFetching || !pageInfo.hasNextPage) return;

          toggleFetching(true);
          const variables: GetRecipesQueryVariables = {
            limit: 6,
            filters: null,
            cursor: pageInfo.cursor,
            sort: { key: "CreatedAt", order: SortOrder.Desc },
          };

          try {
            await fetchMore({
              variables,
              query: GetRecipesDocument,
            });

            toggleFetching(false);
          } catch (e) {}
        }}
      />
    );
  }

  if (isSorting || isFetching) {
    return (
      <>
        <Grid item lg={4} md={6} xs={12}>
          <RecipeCard skeleton />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <RecipeCard skeleton />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <RecipeCard skeleton />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <RecipeCard skeleton />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <RecipeCard skeleton />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <RecipeCard skeleton />
        </Grid>
      </>
    );
  }

  return null;
});

export default RecipeWaypoint;
