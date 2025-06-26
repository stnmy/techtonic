import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";
import theme from "./theme";
import { Outlet, ScrollRestoration } from "react-router-dom";
import SecondaryNavbar from "./SecondaryNavbar";
import LoadingBar from "./LoadingBar";
import Footer from "./Footer";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ScrollRestoration />
        <CssBaseline />
        {/* Main layout Box: Use flex column to push content and footer */}
        <Box
          sx={{
            backgroundColor: "secondary.main",
            minHeight: "100vh", // Ensure it takes at least full viewport height
            width: "100%",
            display: "flex", // Enable flexbox
            flexDirection: "column", // Stack children vertically
          }}
        >
          <Navbar />
          <SecondaryNavbar />
          <LoadingBar />

          {/* Main content area: This Box contains the Outlet and needs to grow */}
          <Container
            sx={{
              maxWidth: "1440px !important",
              margin: "0 auto",
              padding: "28px",
              marginTop: 10,
              flexGrow: 1, // This is key: it makes the content area expand and push the footer down
            }}
          >
            <Outlet />
          </Container>

          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
