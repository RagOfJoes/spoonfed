import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHeaderStyle } from "./Header.style";

const Account = () => {
  const classes = useHeaderStyle();
  return (
    <Grid
      item
      container
      wrap="nowrap"
      direction="row"
      alignItems="center"
      justify="flex-end"
    >
      <Grid item>
        <Button
          color="primary"
          disableElevation
          href="/api/login/"
          variant="outlined"
          className={classes.signInButton}
        >
          Sign-in
        </Button>
      </Grid>
    </Grid>
  );
};

export default Account;
