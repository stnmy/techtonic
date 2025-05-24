import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {ProductDetailsType, RelatedProduct } from "../../app/models/product"

import ProductDetailsMainSection from "./ProductDetailsMainSection";
import { useFetchProductDetailsQuery } from "./productBrowserApi";

export default function ProductDetails() {
  const {id} = useParams()
  const {data, isLoading} = useFetchProductDetailsQuery(id? +id :0)

    if (isLoading || !data) {
    return <div>Product not found</div>;
  }
  const product = data.product
  const relatedProducts = data.relatedProducts;




  return (
    <ProductDetailsMainSection product={product} relatedProducts={relatedProducts}/>
  )
}