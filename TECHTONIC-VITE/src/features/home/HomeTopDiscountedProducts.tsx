import { Box, Grid, Typography, Divider, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useFetchTopDiscountedProductsQuery } from "../../features/productBrowser/productBrowserApi";
import CircularProgress from "@mui/material/CircularProgress";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function HomeTopDiscountedProducts() {
  // Change the count here from 5 to 4
  const {
    data: topDiscountedProducts,
    isLoading,
    isError,
  } = useFetchTopDiscountedProductsQuery(4); // Request exactly 4 products

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !topDiscountedProducts || topDiscountedProducts.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No top discounted products available at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <StorefrontIcon sx={{ fontSize: 40, color: "primary.main", mr: 1 }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            Top Discounted Deals
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/productBrowser"
            sx={{
              py: 1.5,
              px: 4,
              backgroundColor: "primary.main",
              fontWeight: "bold",
              fontSize: "1.1rem",
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            View All Products
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />

      {/* Adjust grid sizing for 4 items per row if desired, e.g., lg={3} */}
      <Grid container spacing={3} justifyContent="center">
        {topDiscountedProducts.map((product) => (
          <Grid size={3} key={product.id}>
            {" "}
            {/* Changed lg={2.4} to lg={3} for 4 items */}
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                p: 2,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Link
                to={`/ProductBrowser/${product.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box
                  sx={{
                    height: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <img
                    src={
                      product.image ||
                      "https://placehold.co/150x150/e0e0e0/000000?text=No+Image"
                    }
                    alt={product.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    minHeight: 48,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name}
                </Typography>
              </Link>
              <Box sx={{ mt: "auto" }}>
                <Rating
                  name={`product-rating-${product.id}`}
                  value={4.5}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {product.discountPrice ? (
                    <>
                      <Typography
                        variant="h6"
                        color="error.main"
                        sx={{ fontWeight: "bold" }}
                      >
                        ৳{product.discountPrice.toFixed(2)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ৳{product.price.toFixed(2)}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="h6"
                      color="primary.main"
                      sx={{ fontWeight: "bold" }}
                    >
                      ৳{product.price.toFixed(2)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
