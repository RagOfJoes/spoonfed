import { memo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(
  ({ spacing, palette }) => ({
    header: {
      height: 110,
      width: "100%",
      padding: spacing(2, 3),
      backgroundColor: palette.background.paper,
    },
  }),
  { name: "RecipeDetailLoading" }
);

const RecipeDetailLoading = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" className={classes.header} />
    </>
  );
};

export default memo(RecipeDetailLoading);
