import { memo } from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Cards from "./Cards";
import Waypoint from "./Waypoint";
import Loading from "./Recipes.loading";
import { useRecipes } from "context/recipes";

const useStyles = makeStyles(
  ({ spacing }) => ({
    container: {
      width: "100%",
      margin: "auto",
      paddingTop: spacing(4),
    },
  }),
  { name: "RecipePage" }
);

const Recipes = memo(() => {
  const classes = useStyles();
  const { loading, isSorting } = useRecipes();
  if (loading || isSorting) {
    return (
      <Grid container direction="row" className={classes.container}>
        <Loading />
      </Grid>
    );
  }

  return (
    <Grid container direction="row" className={classes.container}>
      <Grid item container spacing={4}>
        <Cards />

        <Waypoint />
      </Grid>
    </Grid>
  );
});

export default Recipes;
