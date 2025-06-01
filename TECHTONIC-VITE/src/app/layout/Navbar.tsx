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
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFetchCartQuery } from "../../features/cart/cartApi";
import { useState } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
} from "../../features/account/accountApi";

export default function Navbar() {
  const { data: cart } = useFetchCartQuery();
  const { data: userInfo, isLoading, isError } = useUserInfoQuery();
  const [logout] = useLogoutMutation();
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
              marginRight: 10,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              padding: "8px",
            }}
            component={NavLink}
            to="/offers"
          >
            <CardGiftcardIcon sx={{ color: "white", fontSize: "32px" }} />
            <Box display="flex" flexDirection="column">
              <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                Offers
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 400,
                  color: "white",
                }}
              >
                Latest Offers
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px",
            }}
          >
            <AccountCircleIcon sx={{ color: "white", fontSize: "32px" }} />
            <Box display="flex" flexDirection="column">
              <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                Account
              </Typography>
              {userInfo ? (
                <Box display="flex">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      color: "white",
                      textDecoration: "none",
                      "&:hover": {
                        color: "error.main",
                      },
                    }}
                    component={NavLink}
                    to="/account"
                  >
                    Profile
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 400, color: "white", mx: 0.5 }}
                  >
                    or
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      color: "white",
                      textDecoration: "none",
                      "&:hover": {
                        color: "error.main",
                      },
                      cursor: "pointer",
                    }}
                    onClick={() => logout()}
                  >
                    Logout
                  </Typography>
                </Box>
              ) : (
                <Box display="flex">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      color: "white",
                      textDecoration: "none",
                      "&:hover": {
                        color: "error.main",
                      },
                    }}
                    component={NavLink}
                    to="/login"
                  >
                    Login
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 400, color: "white", mx: 0.5 }}
                  >
                    or
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 400,
                      color: "white",
                      textDecoration: "none",
                      "&:hover": {
                        color: "error.main",
                      },
                    }}
                    component={NavLink}
                    to="/register"
                  >
                    Register
                  </Typography>
                </Box>
              )}
            </Box>
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
