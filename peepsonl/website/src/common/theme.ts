import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0E0F34",
      contrastText: "#0E0F34",
    },
    secondary: {
      main: "#8084E1",
    },
    text: {
      primary: "#0E0F34",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Titillium Web",
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        rounded: {
          boxShadow: "unset",
          "&:first-child": {
            borderTopLeftRadius: "unset",
            borderTopRightRadius: "unset",
          },
          "&:last-child": {
            borderBottomLeftRadius: "unset",
            borderBottomRightRadius: "unset",
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "inherit",
      },
      styleOverrides: {
        root: {
          boxShadow: "unset",
        },
        colorInherit: {
          backgroundColor: "#ffffff",
          color: "#0E0F34",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: "unset",
          borderRadius: 0,
          textTransform: "unset",
          fontWeight: 600,
        },
        containedPrimary: {
          color: "white",
        },
        text: {
          textTransform: "unset",
        },
        textPrimary: {
          color: "#0E0F34",
        },
        outlined: {
          textTransform: "unset",
          borderRadius: 18,
          borderWidth: 2,
        },
        outlinedPrimary: {
          color: "#0E0F34",
          borderColor: "#0E0F34",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 24,
          maxWidth: "unset",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "unset",
        },
        primary: {
          color: "#fff",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "unset",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {},
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        text: {
          fill: "#fff",
        },
      },
    },
  },
});
