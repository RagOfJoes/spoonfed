import { Theme, darken, lighten } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

type CollapsibleListStyleProps = {
  collapsed?: boolean;
  disableCollapse?: boolean;
  disableSelectable?: boolean;
  variant?: "follow" | "line-through";
};

const collapsibleListStyles = ({
  shape,
  spacing,
  palette,
  typography,
  transitions,
}: Theme) => {
  const hoverBg = darken(palette.background.default, 0.03);

  return createStyles({
    list: {
      paddingBottom: 0,
      overflow: "hidden",
      borderRadius: shape.borderRadius,
    },
    header: ({ collapsed, disableCollapse }: CollapsibleListStyleProps) => ({
      padding: spacing(1, 2),
      backgroundColor: palette.background.paper,
      borderRadius: collapsed ? shape.borderRadius : 0,
      ...(!collapsed
        ? {
            boxShadow: `0px 2px 5px rgba(60, 66, 87, 0.04), 0px 1px 1px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px ${palette.background.paper}`,
          }
        : {}),
      "&:hover": {
        ...(!disableCollapse
          ? {
              backgroundColor: hoverBg,
            }
          : {}),
      },
    }),
    title: {
      "& span": {
        fontSize: 14,
        color: palette.text.primary,
        fontWeight: typography.fontWeightMedium,
      },
    },
    collapse: ({ disableCollapse }: CollapsibleListStyleProps) => ({
      color: palette.text.secondary,
      display: disableCollapse ? "none" : "inline-block",
    }),
    item: ({ variant, disableSelectable }: CollapsibleListStyleProps) => {
      const common = {
        padding: spacing(1, 2),
        transition: transitions.create(""),
        backgroundColor: lighten(palette.background.default, 0.3),

        "&:last-child": {
          borderBottom: "none !important",
        },
      };
      switch (variant) {
        case "follow":
          return {
            ...common,
            "& $itemValue": {
              color: palette.text.secondary,
            },
          };
        default:
          return {
            ...common,
            "&:hover": {
              ...(!disableSelectable
                ? {
                    backgroundColor: hoverBg,
                  }
                : {}),
            },
          };
      }
    },
    itemSelected: ({ variant }: CollapsibleListStyleProps) => {
      switch (variant) {
        case "follow":
          return {
            borderRadius: shape.borderRadius,
            backgroundColor: palette.background.paper + "!important",
            "& $itemValue": {
              transform: "scale(1.01)",
              color: palette.text.primary,
            },
          };
        default:
          return {
            backgroundColor:
              darken(palette.background.default, 0.04) + "!important",
            "& $itemValue": {
              color: palette.text.secondary,
              textDecoration: "line-through",
            },
          };
      }
    },
    itemTitle: {
      color: palette.text.secondary,
      fontWeight: typography.fontWeightMedium,
    },
    itemValue: () => ({
      color: palette.text.primary,
      transition: transitions.create(""),
      fontWeight: typography.fontWeightMedium,
    }),
  });
};

const useCollapsibleListStyle = makeStyles(collapsibleListStyles, {
  name: "CollapsibleList",
});

export { collapsibleListStyles, useCollapsibleListStyle };
