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

// TODO: Add RecipeDetail Component here
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

  if (error) {
    return (
      <Grid container className={classes.container}>
        An error has occured.
      </Grid>
    );
  }

  if (!data?.getRecipeDetail) {
    return (
      <Grid container className={classes.container}>
        Invalid Recipe Provided.
      </Grid>
    );
  }

  const {
    name,
    time,
    servings,
    createdBy,
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
        importUrl="https://google.com"
      />
    </Grid>
  );
};

export default RecipeDetailContainer;
