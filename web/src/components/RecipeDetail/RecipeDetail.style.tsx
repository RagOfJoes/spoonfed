import { Theme } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const recipeDetailStyles = ({
  shape,
  spacing,
  palette,
  breakpoints,
}: Theme) => {
  return createStyles({
    container: {
      overflow: "hidden",
      paddingTop: spacing(2),
      backgroundColor: palette.background.default,
    },
    content: {
      overflow: "hidden",
      borderRadius: shape.borderRadius,
      [breakpoints.down("xs")]: {
        flexWrap: "wrap",
      },
    },
    body: {
      padding: spacing(2, 3),
    },
    carousel: {
      overflow: "hidden",
    },
    meta: {
      // marginLeft: spacing(2),
      [breakpoints.down("xs")]: {
        marginLeft: 0,
      },
    },
    instructions: {
      marginTop: spacing(2),
    },
    times: {
      [breakpoints.down("xs")]: {
        marginTop: spacing(2),
      },
    },
    ingredients: {
      marginTop: spacing(2),
    },
  });
};
const useRecipeDetailStyle = makeStyles(recipeDetailStyles, {
  name: "RecipeDetail",
});

export { recipeDetailStyles, useRecipeDetailStyle };
