import { Grid, Typography } from "@mui/material";
import ProductDetailsMainSectionDetail from "./ProductDetailsMainSectionDetail";
import ProductDetailsMainSectionImage from "./ProductDetailsMainSectionImage";
import {
  ProductDetailsType,
  RelatedProduct,
} from "../../../app/models/product";
import ProductDetailsSpecificationSection from "./ProductDetailsSpecificationSection";
import ProductDetailsDescriptionSection from "./ProductDetailsDescriptionSection";
import ProductDetailsQuestionSection from "./ProductDetailsQuestionSection";
import ProductDetailsReviewSection from "./ProductDetailsReviewSection";
import ProductDetailsRelatedProductsSection from "./ProductDetailsRelatedProductsSection";

type Props = {
  product: ProductDetailsType;
  relatedProducts: RelatedProduct[] | [];
};

export default function ProductDetailsMainSection({
  product,
  relatedProducts,
}: Props) {
  return (
    <Grid>
      <Grid container spacing={5} marginTop="50px">
        <Grid size={8}>
          <ProductDetailsMainSectionImage images={product.images} />
        </Grid>
        <Grid size={4}>
          <ProductDetailsMainSectionDetail product={product} />
        </Grid>
      </Grid>

      <Grid container spacing={3} marginTop="50px">
        <Grid size={9}>
          <ProductDetailsSpecificationSection product={product} />
          <ProductDetailsDescriptionSection product={product} />
          <ProductDetailsQuestionSection product={product} />
          <ProductDetailsReviewSection product={product} />
        </Grid>
        <Grid size={3}>
          <ProductDetailsRelatedProductsSection
            relatedProducts={relatedProducts}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
