import ListItem from "@material-ui/core/ListItem";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";
import { useCollapsibleListStyle } from "./CollapsibleList.style";

type CollapsibleListHeaderProps = {
  title: string;
  collapsed: boolean;
  disableCollapse: boolean;
  toggleCollapse: (collapse: boolean) => void;
};

const Header = (props: CollapsibleListHeaderProps) => {
  const { title, collapsed, toggleCollapse, disableCollapse } = props;
  const classes = useCollapsibleListStyle({ collapsed, disableCollapse });
  return (
    <ListItem
      button
      disableRipple
      disableGutters
      className={classes.header}
      onClick={() => !disableCollapse && toggleCollapse(!collapsed)}
    >
      <ListItemText primary={title} className={classes.title} />
      {collapsed ? (
        <ExpandMore className={classes.collapse} />
      ) : (
        <ExpandLess className={classes.collapse} />
      )}
    </ListItem>
  );
};

export default Header;
