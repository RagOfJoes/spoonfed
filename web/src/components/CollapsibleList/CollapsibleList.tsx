import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import { memo, useState, Dispatch, useEffect, SetStateAction } from "react";
import Item from "./Item";
import Header from "./Header";
import { useCollapsibleListStyle } from "./CollapsibleList.style";

type CollapsibleListProps = {
  title: string;
  items: { title?: string; label: string }[];

  selected?: number[];
  setSelected?: Dispatch<SetStateAction<number[]>>;

  defaultCollapsed?: boolean;
  disableCollapse?: boolean;
  disableSelectable?: boolean;
  selectVariant?: "follow" | "line-through";
};

const CollapsibleList = (props: CollapsibleListProps) => {
  const {
    // UI Properties
    title,
    items = [],

    // State
    selected,
    setSelected,

    // UI Control
    defaultCollapsed = true,
    disableCollapse = false,
    disableSelectable = false,
    selectVariant = "line-through",
  } = props;
  const [_selected, _setSelected] = useState<number[]>([]);
  let refSelected = _selected;
  let refSetSelected = _setSelected;
  useEffect(() => {
    if (typeof selected !== "undefined" && typeof setSelected === "function") {
      refSelected = selected;
      refSetSelected = setSelected;
      setSelected(_selected);
    }
  }, []);
  const [collapsed, toggleCollapse] = useState(
    disableCollapse ? false : defaultCollapsed
  );
  const classes = useCollapsibleListStyle({ collapsed, disableSelectable });
  return (
    <List
      className={classes.list}
      subheader={
        <Header
          title={title}
          collapsed={collapsed}
          toggleCollapse={toggleCollapse}
          disableCollapse={disableCollapse}
        />
      }
    >
      <Collapse in={!collapsed} timeout="auto">
        {items.map((item, index) => {
          return (
            <Item
              index={index}
              primary={item?.title}
              secondary={item.label}
              variant={selectVariant}
              disableSelectable={disableSelectable}
              selected={refSelected}
              setSelected={refSetSelected}
              key={`${title}-${JSON.stringify(item)}`}
            />
          );
        })}
      </Collapse>
    </List>
  );
};

export default memo(CollapsibleList);
