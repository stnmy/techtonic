import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {ProductDetailsType, RelatedProduct } from "../../app/models/product"

import ProductDetailsMainSection from "./ProductDetailsMainSection";

export default function ProductDetails() {
  const {id} = useParams()
  const [product, setProduct] = useState<ProductDetailsType | null>(null);
  const[relatedProducts, setRelatedProducts] = useState<RelatedProduct[] | []>([])



  useEffect(() => {
    fetch(`https://localhost:5001/api/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data.product)
        setRelatedProducts(data.relatedProducts || [])
      })

      .catch(error => console.log(error))
  }, [id])

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductDetailsMainSection product={product}/>
  )
}