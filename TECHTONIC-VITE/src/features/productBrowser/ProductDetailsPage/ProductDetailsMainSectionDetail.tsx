import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { ProductDetailsType } from "../../../app/models/product";
import React, { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddItemToCartMutation } from "../../cart/cartApi";
type Props = {
  product: ProductDetailsType;
};

export default function ProductDetailsMainSectionDetail({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [addItemToCart] = useAddItemToCartMutation();

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  // const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newValue = parseInt(event.target.value);
  //   setQuantity(newValue);
  // };

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;
  return (
    <Grid>
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        {product.name}
      </Typography>

      <Box sx={{ display: "flex", textAlign: "center", gap: 4 }}>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Brand: <strong>{product.brandName}</strong>
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }} component="span">
          Availability:
          {product.stockQuantity > 0 ? (
            <Chip
              sx={{ ml: 1 }}
              label="In Stock"
              color="success"
              size="small"
            />
          ) : (
            <Chip
              sx={{ ml: 1 }}
              label="Out of Stock"
              color="error"
              size="small"
            />
          )}
        </Typography>
      </Box>

      {/* Rating */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Rating value={averageRating} precision={0.5} readOnly />
        <Typography variant="body1" sx={{ ml: 1, color: "primary.main" }}>
          {averageRating}
        </Typography>
        <Typography variant="body1" sx={{ ml: 1, color: "primary.main" }}>
          ({product.reviews.length}{" "}
          {product.reviews.length === 1 ? "review" : "reviews"})
        </Typography>
      </Box>

      {/* Key Features */}
      <Grid>
        <Typography variant="h6" sx={{ fontWeight: "500", mt: 5, mb: 2 }}>
          Key Features
        </Typography>

        <Box>
          {product.attributes
            .filter((attr) => attr.specificationCategory === "Key Feature")
            .map((attr, index) => (
              <Typography key={index} variant="body1" sx={{ mb: 1.5 }}>
                <strong>{attr.name}:</strong>
                {" " + attr.value}
              </Typography>
            ))}
        </Box>
      </Grid>

      {/* Price */}
      <Grid>
        {product.discountPrice ? (
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap: 1,
              mt: 7,
              mb: 7,
            }}
          >
            <Typography variant="h6">Price:</Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "error.main" }}
            >
              {product.discountPrice} BDT
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textDecoration: "line-through",
                color: "text.secondary",
              }}
            >
              {product.price}
            </Typography>
          </Grid>
        ) : (
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
              gap: 1,
              mt: 7,
              mb: 7,
            }}
          >
            <Typography variant="h6">Price:</Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "error.main" }}
            >
              {product.price} BDT
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Add To cart section */}
      <Grid sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ width: "110px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={decreaseQuantity}
              size="small"
              disabled={quantity === 0}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <TextField
              value={quantity}
              variant="standard"
              label="Quantity"
              slotProps={{
                htmlInput: {
                  style: {
                    textAlign: "center",
                  },
                },
              }}
              sx={{
                // textAlign: "center",
                width: "60px",
              }}
            />

            <IconButton
              onClick={increaseQuantity}
              size="small"
              // disabled={quantity === 0}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          disabled={quantity === 0}
          sx={{ width: 250 }}
          onClick={() =>
            addItemToCart({ productId: product.id, quantity: quantity })
          }
        >
          Add to Cart
        </Button>

        <Button
          variant="contained"
          size="large"
          sx={{ backgroundColor: "error.main" }}
        >
          <FavoriteIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
