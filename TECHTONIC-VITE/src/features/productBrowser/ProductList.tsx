import Grid from '@mui/material/Grid';
import { ProductCardType } from "../../app/models/product"
import ProductCard from "./ProductCard"

type Props = {
  products: ProductCardType[]
}

export default function ProductList({products} : Props) {
  
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        // <Grid item xs={4} key={product.id}>
          <ProductCard product={product} />
        // </Grid>
      ))}
    </Grid>
  )
}