import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004b87", // HDFC Bank Blue
      dark: "#002855",
      light: "#2176c1",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ed1c24", // HDFC Bank Red
      dark: "#b80c13",
      light: "#ff5252",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f4f7fb",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c2530",
      secondary: "#5f6e82",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: "0.95rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,75,135,0.25)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
        },
      },
    },
  },
});

export default theme;
