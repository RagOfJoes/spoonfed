import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Content from "./Content";
import { useDrawerStyle } from "./Drawer.style";

type Props = {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
};

const CustomDrawer = (props: Props) => {
  const { mobileOpen, onDrawerToggle } = props;
  const classes = useDrawerStyle();

  return (
    <nav className={classes.drawer} aria-label="drawer">
      <Hidden smUp implementation="css">
        <Drawer
          elevation={0}
          open={mobileOpen}
          variant="temporary"
          onClose={onDrawerToggle}
          BackdropProps={{ className: classes.backdrop }}
          classes={{
            paper: classes.paper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Content />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          open
          variant="permanent"
          classes={{
            paper: classes.paper,
          }}
        >
          <Content />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default CustomDrawer;
