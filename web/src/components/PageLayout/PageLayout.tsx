import { ReactNode, useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Drawer from "./Drawer";

export type PageLayoutProps = {
  disableGutters?: boolean;
  children: NonNullable<ReactNode>;
};

type StyleProps = {
  disableGutters?: boolean;
};

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: "flex",
    },
    // Main Content
    content: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      paddingTop: theme.spacing(9),
    },
    container: ({ disableGutters }: StyleProps) => ({
      height: "100vh",
      marginLeft: "unset",
      marginRight: "unset",
      ...(disableGutters ? { paddingLeft: 0, paddingRight: 0 } : {}),
    }),
  }),
  { name: "PageLayout" }
);

const PageLayout = (props: PageLayoutProps) => {
  const { disableGutters } = props;
  const classes = useStyles({ disableGutters });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <Header onDrawerToggle={handleDrawerToggle} />
      <Drawer mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
};

export default PageLayout;
