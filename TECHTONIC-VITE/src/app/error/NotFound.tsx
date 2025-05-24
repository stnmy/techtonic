import { SearchOff } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
      }}
    >
      <SearchOff sx={{ fontSize: 100, color: "primary.main" }} />
      <Typography variant="h3">
        We dont have the product you are looking for
      </Typography>
      <Box display="flex" gap={5} sx={{marginTop:10}}>
        <Button variant="contained" component={Link} to="/">
          Home
        </Button>
        <Button variant="contained" component={Link} to="/productBrowser">
          Product Browser
        </Button>
      </Box>
    </Paper>
  );
}
