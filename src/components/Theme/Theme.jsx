import React from "react";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme  } from '@material-ui/core/styles';
const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2b3541'
      },
      secondary: {
        main: '#fff'
      }
    },
  });

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;