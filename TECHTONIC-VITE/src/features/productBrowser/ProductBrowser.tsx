import { useEffect, useState } from "react"
import {ProductCardType } from "../../app/models/product"

import ProductList from "./ProductList";

export default function ProductBrowser() {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  // const [filters, setFilters] = useState<Filter[]>([]);
  // const[loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:5001/api/products/laptop")
      .then((response) => response.json())
      .then((data: ProductCardType[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products", error)
      });
  }, []);

  // useEffect(() => {
  //   fetch("https://localhost:5001/api/products/filters/laptop")
  //   .then((response) => response.json())
  //   .then((data: Filter[]) => {
  //     setFilters(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching Filters", error)
  //   });
  // },[]);




  return (

      <ProductList products={products}/>

  );
}