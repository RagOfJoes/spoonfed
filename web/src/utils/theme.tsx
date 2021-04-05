import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
    },
    mixins: {
      toolbar: {
        minHeight: 72,
      },
    },
    palette: {
      type: "light",
      primary: {
        main: "#1c2637",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#eca218",
        contrastText: "#131c2a",
      },
      text: {
        primary: "#3d4759",
        secondary: "#5e6573",
      },
      background: {
        paper: "#ffffff",
        default: "#f4f6fb",
      },
      divider: "rgba(175,193,196,0.45)",
    },
  })
);

export default theme;
