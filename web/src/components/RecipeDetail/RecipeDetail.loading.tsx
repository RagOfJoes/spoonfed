import { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Skeleton from "@material-ui/lab/Skeleton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(
  ({ shape, spacing, breakpoints }) => ({
    header: {
      height: 110,
      width: "100%",
      padding: spacing(2, 3),
    },
    body: {
      padding: spacing(2, 3),
    },
    listCard: {
      borderRadius: shape.borderRadius,
    },
    carousel: {
      height: 0,
      width: "100%",
      paddingBottom: "75%",
      borderRadius: shape.borderRadius,
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
  }),
  { name: "RecipeDetailLoading" }
);

const RecipeDetailLoading = () => {
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rect" className={classes.header} />

      <Grid item xs={12} container spacing={1} className={classes.body}>
        <Grid item sm={8} xs={12} container wrap="nowrap" direction="column">
          <Grid item>
            <Skeleton variant="rect" className={classes.carousel} />
          </Grid>

          <Hidden xsDown implementation="css">
            <Grid item className={classes.instructions}>
              <Skeleton variant="rect" height={225} />
            </Grid>
          </Hidden>
        </Grid>

        <Grid item sm={4} xs={12} container direction="column">
          <Grid item className={classes.times}>
            <Skeleton
              variant="rect"
              height={175}
              className={classes.listCard}
            />
          </Grid>

          <Grid item className={classes.ingredients}>
            <Skeleton
              variant="rect"
              height={200}
              className={classes.listCard}
            />
          </Grid>

          <Hidden smUp implementation="css">
            <Grid item className={classes.instructions}>
              <Skeleton
                variant="rect"
                height={225}
                className={classes.listCard}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
    </>
  );
};

export default memo(RecipeDetailLoading);
