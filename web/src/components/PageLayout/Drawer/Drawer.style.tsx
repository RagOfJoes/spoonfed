import { Theme, lighten } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { DRAWER_WIDTH } from "constants/theme";

const drawerStyle = (theme: Theme) =>
  createStyles({
    // Drawer Styles
    drawer: {
      [theme.breakpoints.up("sm")]: {
        flexShrink: 0,
        width: DRAWER_WIDTH,
      },
    },
    paper: {
      width: DRAWER_WIDTH,
      overflowX: "hidden",
      padding: theme.spacing(3),
      backgroundColor: theme.palette.background.default,
      borderRight: `1px solid ${theme.palette.divider}`,
      [theme.breakpoints.down("xs")]: {
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
      },
    },
    backdrop: {
      /**
       * See: https://stackoverflow.com/a/28481374
       */
      backgroundColor: theme.palette.primary.main + "73",
    },
    // Drawer Logo
    logo: {
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      marginLeft: 5,
      userSelect: "none",
      fontWeight: theme.typography.fontWeightMedium,
    },
    // Drawer Section Link
    sectionContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(9),
    },
    sectionTItle: {
      fontSize: 15,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
    },
    sectionButton: {
      fontSize: 15,
      cursor: "pointer",
      marginTop: theme.spacing(2),
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      fontWeight: theme.typography.fontWeightMedium,
      transition: theme.transitions.create("", { duration: "0.12s" }),

      "&:hover": {
        padding: theme.spacing(1),
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1.25 as any],
        backgroundColor: lighten(theme.palette.primary.light, 0.8),
      },

      "&.sectionActive": {
        padding: theme.spacing(1),
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        boxShadow:
          "0px -2px 4px rgba(38, 41, 42, 0.06), 0px 4px 4px rgba(38, 41, 42, 0.08)",
      },
    },

    // Call to action
    cta: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      boxShadow: theme.shadows[2],
      marginTop: theme.spacing(9),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.main,
    },
    ctaDescription: {
      color: theme.palette.background.default,
      fontSize: theme.typography.pxToRem(14),
      fontWeight: theme.typography.fontWeightMedium,
    },
    ctaButton: {
      marginTop: theme.spacing(3),
      boxShadow:
        "0px -2px 4px rgba(38, 41, 42, 0.06), 0px 4px 4px rgba(38, 41, 42, 0.08)",
    },
  });

const useDrawerStyle = makeStyles(drawerStyle, { name: "Drawer" });

export { drawerStyle, useDrawerStyle };

export default { drawerStyle, useDrawerStyle };
