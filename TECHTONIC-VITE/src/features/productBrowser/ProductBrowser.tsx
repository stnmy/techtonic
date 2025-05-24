import { useEffect, useState } from "react"
import {ProductCardType } from "../../app/models/product"

import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./productBrowserApi";
import NotFound from "../../app/error/NotFound";

export default function ProductBrowser() {
  const {data, isLoading} = useFetchProductsQuery();

  if(isLoading){
    return <div>Loadin...</div>
  }

  if(!data){
    return <NotFound/>
  }

  return (

      <ProductList products={data}/>

  );
}