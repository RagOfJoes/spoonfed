import { FC } from "react";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RecipeDetail from "components/RecipeDetail";
import { RecipeTime, useGetRecipeDetailQuery, User } from "generated/graphql";

const useStyles = makeStyles(
  ({ spacing }) => ({
    container: {
      width: "100%",
      margin: "auto",
      paddingTop: spacing(2),
    },
  }),
  { name: "RecipeDetailPage" }
);

const RecipeDetailContainer: FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const { recipeSlug } = router.query;
  const { data, error, loading } = useGetRecipeDetailQuery({
    ssr: true,
    skip: !!!recipeSlug,
    variables: { slug: recipeSlug?.toString() },
  });

  if (loading) {
    return (
      <Grid container className={classes.container}>
        <RecipeDetail loading />
      </Grid>
    );
  }

  if (error || !data?.getRecipeDetail) {
    return (
      <Grid container className={classes.container}>
        An error has occured.
      </Grid>
    );
  }

  const {
    name,
    time,
    servings,
    createdBy,
    importUrl,
    ingredients,
    instructions,
  } = data.getRecipeDetail;
  return (
    <Grid container className={classes.container}>
      <RecipeDetail
        name={name}
        servings={servings}
        time={time as RecipeTime}
        ingredients={ingredients}
        instructions={instructions}
        createdBy={createdBy as User}
        importUrl={importUrl || undefined}
      />
    </Grid>
  );
};

export default RecipeDetailContainer;
