import { Box, CssBaseline, Grid, ThemeProvider } from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import theme from "../../app/layout/theme"; // adjust path if needed

export default function DashboardLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "secondary.main" }}>
        <Grid container>
          <Grid size={2}>
            <Sidebar />
          </Grid>
          <Grid size={10}>
            <Outlet />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
