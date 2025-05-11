import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
    //   main: "#0046be", // Primary color
      main: "#212529", // Primary color   
          
    },
    secondary: {
      main: "#f8f9fa", // Secondary color
    },
    background: {
      default: "#FFFFFF", // Default background color
      paper: "#FFFFFF", // Background color for paper components
    },
  },
});

export default theme;