import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ProductCardType } from "../../app/models/product";
import { Link } from "react-router-dom";

type Props = {
  product: ProductCardType;
};

export default function ProductCard({ product }: Props) {
  return (
    <Card
      sx={{
        maxWidth: 250,
        height: 620,
        margin: "auto",
        border: "1px solid #acc",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "secondary.main",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          // transform:"translateY(-4px)",
          transform: "scale(1.01)",
          boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardActionArea component={Link} to={`/ProductBrowser/${product.id}`}>
        <CardMedia
          component="img"
          height="190"
          image={product.image}
          alt={product.slug}
          sx={{ objectFit: "contain", width: "100%", backgroundColor: "white" }}
        />
      </CardActionArea>

      <CardContent>
        <Box sx={{ height: 65 }}>
          <Typography
            variant="subtitle2"
            component={Link}
            to={`/ProductBrowser/${product.id}`}
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "inherit",
              textDecoration: "none",
              transition: "color 0.3s, text-decoration 0.3s",
              "&:hover": {
                color: "blue",
                textDecoration: "underline",
              },
            }}
          >
            {product.name}
          </Typography>
        </Box>

        {/* Product Attributes */}
        <Box mt={2} sx={{ height: 210 }}>
          <ul style={{ paddingLeft: "1rem", margin: 0 }}>
            {product.attributes.map((attribute, index) => (
              <li key={index} style={{ marginBottom: "0.5rem" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <strong>{attribute.name}:</strong> {attribute.value}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>

        {/* price/discountPrice */}
        <Box
          sx={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {product.discountPrice ? (
            <>
              <Typography
                variant="h5"
                sx={{
                  color: "error.main",
                  fontWeight: "bold",
                  marginRight: "8px",
                }}
              >
                {product.discountPrice}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "gray",
                }}
              >
                {product.price}
              </Typography>
            </>
          ) : (
            <Typography
              variant="h5"
              sx={{ color: "error.main", fontWeight: "bold" }}
            >
              {product.price}
            </Typography>
          )}
        </Box>

        <Box sx={{ textAlign: "center", marginTop: "16px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: "220px" }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
