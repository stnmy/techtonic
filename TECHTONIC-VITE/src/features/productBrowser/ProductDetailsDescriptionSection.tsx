import { Divider, Grid, Typography } from "@mui/material"
import { ProductDetailsType } from "../../app/models/product"


type Props ={
    product : ProductDetailsType
}

export default function ProductDetailsDescriptionSection({product} : Props) {
  return (
    <Grid sx={{p:2, border:"1px solid #e0e0e0"}}>
        <Typography variant="h5" sx={{fontWeight:900}}>Description</Typography>
        <Divider sx={{paddingTop:2}}/>
        <Typography variant="h6" sx={{fontWeight:900, paddingTop:3}}>{product.name}</Typography>
        <Typography textAlign="justify">{product.description}</Typography>
    </Grid>
    
  )
}