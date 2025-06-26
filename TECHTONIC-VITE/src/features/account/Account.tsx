import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Link } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi";

export default function Account() {
  const { data: userInfo, isLoading, isError } = useUserInfoQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !userInfo) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          Could not load user information. Please try logging in again.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 4,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      {/* Display User Email */}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        user: {userInfo.email}
      </Typography>

      {/* Orders Card */}
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 350,
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <CardActionArea component={Link} to="/orders">
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 3,
            }}
          >
            <LocalShippingIcon
              sx={{ fontSize: 60, color: "primary.main", mb: 2 }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              My Orders
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              View your order history and track your shipments.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
