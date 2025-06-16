import { useParams } from "react-router-dom";
import ProductDetailsMainSection from "./ProductDetailsPage/ProductDetailsMainSection";
import { useFetchProductDetailsQuery } from "./productBrowserApi";

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading } = useFetchProductDetailsQuery(id ? +id : 0);

  if (isLoading || !data) {
    return <div>Product not found</div>;
  }
  const product = data.product;
  const relatedProducts = data.relatedProducts;

  return (
    <ProductDetailsMainSection
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
