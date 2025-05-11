import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar>
        <Container
          sx={{
            maxWidth: "1440px !important",
            marginTop: "8px",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <Typography
            variant="h3"
            sx={{ fontWeight: "900", textDecoration: "none", color: "white" }}
            component={NavLink}
            to="/"
          >
            Techtonic
          </Typography> */}
          <NavLink to="/" style={{textDecoration: "none"}}>
            <img
              src="/images/Need/Navlogosolid.png"
              alt="TechTonic Logo"
              style={{height: "60px", marginTop:10, marginRight:10}}   
            />
          </NavLink>

          <TextField
            variant="outlined"
            placeholder="Search for laptops..."
            size="small"
            sx={{
              width: "700px",
              backgroundColor: "white",
              borderRadius: "4px",
              marginRight: 15
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              textDecoration: "none",
              padding: "8px", // Add padding for better click area
              // borderRadius: "4px", // Add rounded corners
              transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
              "&:hover": {
                // backgroundColor: "rgba(255, 255, 255, 0.1)", // Light background on hover
                transform: "scale(1.05)", // Slight zoom effect
              },
              "&:active": {
                // backgroundColor: "rgba(255, 255, 255, 0.2)", // Darker background on click
                transform: "scale(0.95)", // Slight shrink effect
              },
            }}
            component={NavLink}
            to="/offers"
          >
            <CardGiftcardIcon sx={{ color: "white", fontSize: "32px" }} />
            <Typography variant="h5" sx={{ color: "white" }}>
              Offers
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "8px", // Add padding for better click area
              // borderRadius: "4px", // Add rounded corners
              transition: "background-color 0.3s, transform 0.2s", // Smooth transitions
              "&:hover": {
                // backgroundColor: "rgba(255, 255, 255, 0.1)", // Light background on hover
                transform: "scale(1.05)", // Slight zoom effect
              },
              "&:active": {
                // backgroundColor: "rgba(255, 255, 255, 0.2)", // Darker background on click
                transform: "scale(0.95)", // Slight shrink effect
              },
            }}
          >
            <AccountCircleIcon sx={{ color: "white", fontSize: "32px" }} />
            <Typography variant="h5" sx={{ color: "white" }}>
              Account
            </Typography>
          </Box>

          {/* Cart Icon */}
          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent="4" color="secondary">
              <ShoppingCartIcon sx={{ fontSize: "48px" }} />
            </Badge>
          </IconButton>
          {/* </Box> */}
        </Container>
      </Toolbar>
    </AppBar>
  );
}
