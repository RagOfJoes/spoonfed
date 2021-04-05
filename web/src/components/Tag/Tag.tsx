import React from "react";
import { lighten } from "@material-ui/core/styles";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import withStyles from "@material-ui/core/styles/withStyles";

class CustomChip extends React.PureComponent<ChipProps> {
  render() {
    return <Chip {...this.props} size="small" />;
  }
}

const Tag = withStyles(
  ({ shape, palette, typography }) => ({
    root: {
      borderRadius: shape.borderRadius,
      backgroundColor: palette.background.paper,
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)",
    },
    label: {
      fontSize: 12,
      fontWeight: typography.fontWeightMedium,
    },
    icon: {
      color: lighten(palette.text.primary, 0.4),
    },
    avatar: {
      backgroundColor: palette.primary.main,
      color: palette.background.default + "!important",
    },
    colorPrimary: {
      backgroundColor: palette.primary.main,
    },
    iconColorPrimary: {
      color: palette.background.default,
    },
  }),
  {
    name: "Tag",
  }
)(CustomChip);

export default Tag;
