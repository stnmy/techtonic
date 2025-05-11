import { Grid } from "@mui/material";
import ProductDetailsMainSectionDetail from "./ProductDetailsMainSectionDetail";
import ProductDetailsMainSectionImage from "./ProductDetailsMainSectionImage";
import { ProductDetailsType } from "../../app/models/product";

type Props = {
    product: ProductDetailsType
}

export default function ProductDetailsMainSection({product} : Props) {
  return (
    <Grid container spacing={5} marginTop="50px">
      <Grid size={8}>
        <ProductDetailsMainSectionImage images={product.images} />
      </Grid>
      <Grid size={4}>
        <ProductDetailsMainSectionDetail product={product} />
      </Grid>
    </Grid>
  );
}
