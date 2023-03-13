import { createTheme, ThemeOptions } from "@mui/material";

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
          main: '#81d4fa',
        },
        secondary: {
          main: '#69f0ae',
        },
        error: {
          main: '#e53935',
        }
    },
  };
  
export const globalTheme = createTheme(themeOptions)

export const globalAPIBaseURL = "http://localhost:88"