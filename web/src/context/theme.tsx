import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
// import { LocalizationProvider } from "@material-ui/pickers";
// import MomentUtils from "@material-ui/pickers/adapter/moment";
import React, { useMemo, useContext } from "react";
import theme from "utils/theme";

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = React.createContext({
  theme: "light",
  setTheme: () => {},
});

const ThemeProviderComponent = ({ children }: Props) => {
  // const [theme, setTheme] = useState(initialTheme);

  const value = useMemo(
    () => ({
      theme: "light",
      setTheme: () => {},
    }),
    [theme]
  );

  return (
    <ThemeProvider theme={theme}>
      {/* <LocalizationProvider dateAdapter={MomentUtils} locale="us"> */}
      <ThemeContext.Provider value={value}>
        <CssBaseline />

        {children}
      </ThemeContext.Provider>
      {/* </LocalizationProvider> */}
    </ThemeProvider>
  );
};

export default ThemeProviderComponent;

export const useThemeType = () => useContext(ThemeContext);
