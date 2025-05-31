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
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useFetchCartQuery } from "../../features/cart/cartApi";
import { useState } from "react";

export default function Navbar() {
  const { data: cart } = useFetchCartQuery();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search.trim() !== "") {
      navigate(`/search/${encodeURIComponent(search.trim())}`);
    }
  };

  const cartItemCount =
    cart?.cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0) || 0;
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
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <img
              src="/images/Need/Navlogosolid.png"
              alt="TechTonic Logo"
              style={{ height: "60px", marginTop: 10, marginRight: 10 }}
            />
          </NavLink>

          <TextField
            variant="outlined"
            placeholder="Search for laptops..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            sx={{
              width: "700px",
              backgroundColor: "white",
              borderRadius: "4px",
              marginRight: 15,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              textDecoration: "none",
              padding: "8px",

              transition: "background-color 0.3s, transform 0.2s",
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
              padding: "8px",

              transition: "background-color 0.3s, transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <AccountCircleIcon sx={{ color: "white", fontSize: "32px" }} />
            <Typography variant="h5" sx={{ color: "white" }}>
              Account
            </Typography>
          </Box>

          <IconButton component={Link} to="/cart" sx={{ color: "white" }}>
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon sx={{ fontSize: "48px" }} />
            </Badge>
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
