import { memo } from "react";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";
import { useRecipes } from "context/recipes";
import RecipeCard from "components/RecipeCard";
import {
  Recipe,
  ToggleRecipeLikeMutation,
  useToggleRecipeLikeMutation,
  ToggleRecipeLikeMutationVariables,
} from "generated/graphql";

const Cards = () => {
  const { data } = useRecipes();
  const { enqueueSnackbar } = useSnackbar();

  const [toggleLike] = useToggleRecipeLikeMutation({
    onError: (_) => {
      // TODO: Add Error Handler here
      enqueueSnackbar("You must be logged in to perform this action.", {
        variant: "error",
      });
    },
  });

  return (
    <>
      {data?.getRecipes.edges?.map((edge) => {
        const {
          id,
          slug,
          time,
          name,
          images,
          isLiked,
          servings,
          createdBy,
        } = edge?.node as Recipe;

        return (
          <Grid item key={id} lg={4} md={6} xs={12}>
            <RecipeCard
              name={name}
              slug={slug}
              images={images}
              isLiked={isLiked}
              servings={servings}
              createdBy={createdBy}
              totalTime={time?.total || ""}
              href={`/recipes?recipeSlug=${slug}`}
              onLike={async () => {
                // if (!user) {
                //   enqueueSnackbar(UNAUTHENTICATED_MSG, {
                //     variant: "error",
                //   });
                //   return;
                // }
                const variables: ToggleRecipeLikeMutationVariables = {
                  recipeID: id,
                };
                const optimisticResponse: ToggleRecipeLikeMutation = {
                  __typename: "Mutation",
                  toggleRecipeLike: {
                    __typename: "Recipe",
                    id,
                  },
                };
                await toggleLike({ variables, optimisticResponse });
              }}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default memo(Cards);
