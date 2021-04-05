import Grid from "@material-ui/core/Grid";
import RecipeCard from "components/RecipeCard";

const Loading = () => {
  return (
    <Grid item container spacing={4}>
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
    </Grid>
  );
};

export default Loading;
