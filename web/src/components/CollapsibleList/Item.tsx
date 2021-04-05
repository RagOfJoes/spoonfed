import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import { useCollapsibleListStyle } from "./CollapsibleList.style";

type CollapsibleListItemProps = {
  index: number;
  primary?: string;
  secondary: string;
  disableSelectable: boolean;
  variant: "follow" | "line-through";

  selected: number[];
  setSelected: (newSelected: number[]) => void;
};

const Item = (props: CollapsibleListItemProps) => {
  const {
    index,
    primary,
    secondary,

    selected,
    setSelected,
    disableSelectable,
    variant = "line-through",
  } = props;
  const classes = useCollapsibleListStyle({ variant, disableSelectable });
  const isSelected = () => {
    switch (variant) {
      case "follow":
        return selected?.[0] === index;
      default:
        return selected.indexOf(index) !== -1;
    }
  };
  const otherItemProps: any = disableSelectable ? {} : { disableRipple: true };
  if (!disableSelectable) otherItemProps["button"] = true;
  return (
    <ListItem
      disableGutters
      alignItems="flex-start"
      divider={variant === "line-through"}
      selected={!disableSelectable && isSelected()}
      classes={{ root: classes.item, selected: classes.itemSelected }}
      onClick={() => {
        if (disableSelectable) return;

        switch (variant) {
          case "follow":
            if (isSelected()) setSelected([]);
            else setSelected([index]);
            break;
          default:
            const currentIndex = selected.indexOf(index);
            const newChecked = [...selected];
            if (currentIndex === -1) {
              newChecked.push(index);
            } else {
              newChecked.splice(currentIndex, 1);
            }
            setSelected(newChecked);
            break;
        }
      }}
      {...otherItemProps}
    >
      <ListItemText
        primary={
          typeof primary === "string" && (
            <Typography variant="body2" className={classes.itemTitle}>
              {primary}
            </Typography>
          )
        }
        secondary={
          <Typography variant="subtitle2" className={classes.itemValue}>
            {secondary}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default Item;
