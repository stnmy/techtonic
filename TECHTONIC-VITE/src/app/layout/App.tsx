import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";
import theme from "./theme";
import { Outlet } from "react-router-dom";
import SecondaryNavbar from "./SecondaryNavbar";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Box sx={{backgroundColor: 'secondary.main', minHeight: '100vh', Width:'100%'}}>
          <Navbar />
          <SecondaryNavbar/>
          <Container
            sx={{
              maxWidth: "1440px !important",
              margin: "0 auto",
              padding: "28px",
              marginTop: 10
            }}
          >
            <Outlet />
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
