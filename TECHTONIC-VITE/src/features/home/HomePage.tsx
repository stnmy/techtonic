import { Grid } from "@mui/material";
import HomeTopDiscountedProducts from "./HomeTopDiscountedProducts";
import HomeMostVisitedProducts from "./HomeMostVisitedProducts";
import ImageCarousel from "./ImageCarousel";

export default function HomePage() {
  return (
    <Grid container>
      <ImageCarousel />
      <HomeTopDiscountedProducts />
      <HomeMostVisitedProducts />
    </Grid>
  );
}
