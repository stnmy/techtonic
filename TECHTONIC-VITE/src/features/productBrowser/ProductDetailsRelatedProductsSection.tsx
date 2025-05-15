import { Box, Divider, Grid, Typography } from "@mui/material";
import { ProductDetailsType, RelatedProduct } from "../../app/models/product";
import { Link } from "react-router-dom";

type Props = {
  relatedProducts: RelatedProduct[] | [];
};
export default function ProductDetailsRelatedProductsSection({
  relatedProducts,
}: Props) {
  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          display:'flex',
          alignItems: "center",
          justifyContent:"center"
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Related Products
        </Typography>
      </Box>
      <Divider sx={{ mt: 2 }} />

      {relatedProducts.map((rp, index) => (
        <Grid>
          <Grid key={index} container sx={{ alignItems: "center", mt: 1 }}>
            <Grid size={5} component={Link} to={`/ProductBrowser/${rp.id}`}>
              <img src={rp.image} width={100} height={100} />
            </Grid>
            <Grid size={7} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body2"
                component={Link}
                to={`/ProductBrowser/${rp.id}`}
                sx={{
                  fontWeight: 600,
                  textDecoration: "none",
                  color: "primary.main",
                  transition: 'color 0.3s text-decoration 0.3s',
                  "&:hover" :{
                    textDecoration:'underline'
                  }
                }}
              >
                {rp.name}
              </Typography>
              <Grid sx={{ marginTop: 1 }}>
                {rp.discountPrice ? (
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "error.main" }}
                    >
                      {rp.discountPrice}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "bold",
                        color: "text.secondary",
                        textDecoration: "line-through",
                      }}
                    >
                      {rp.discountPrice}
                    </Typography>
                  </Grid>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "error.main" }}
                  >
                    {rp.price}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          {index < relatedProducts.length - 1 && <Divider />}
        </Grid>
      ))}
    </Box>
  );
}
