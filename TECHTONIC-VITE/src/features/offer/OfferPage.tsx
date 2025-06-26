import ProductList from "../productBrowser/ProductList";
import NotFound from "../../app/error/NotFound";
import { useFetchAllDiscountedProductsQuery } from "../productBrowser/productBrowserApi";
import { Box, Grid, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import AppPagination from "../../app/layout/AppPagination";
import { useEffect } from "react";
import { startLoading, stopLoading } from "../../app/layout/uiSlice";

export default function ProductBrowser() {
  const dispatch = useAppDispatch();
  const productBrowserParams = useAppSelector((state) => state.productBrowser);
  const { data, isLoading, isError } = useFetchAllDiscountedProductsQuery();

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading, dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (isError || !data || data.length === 0) {
    return <NotFound />;
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <ProductList products={data ?? []} />
    </Grid>
  );
}

// import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
// import {
//   useLazyGet400ErrorQuery,
//   useLazyGet401ErrorQuery,
//   useLazyGet404ErrorQuery,
//   useLazyGet500ErrorQuery,
//   useLazyGetValidationErrorQuery,
// } from "../../app/error/errorApi";
// import { useState } from "react";

// export default function OfferPage() {
//   const [validationErrors, setValidationErros] = useState<string[]>([]);

//   const [trigger400Error] = useLazyGet400ErrorQuery();
//   const [trigger401Error] = useLazyGet401ErrorQuery();
//   const [trigger404Error] = useLazyGet404ErrorQuery();
//   const [trigger500Error] = useLazyGet500ErrorQuery();
//   const [triggerValidationError] = useLazyGetValidationErrorQuery();

//   const getValidationError = async () => {
//     try {
//       await triggerValidationError().unwrap();
//     } catch (error: any) {
//         const errorArray = error.message.split(", ");
//         console.log(errorArray);
//         setValidationErros(errorArray);
//     }
//   };

//   return (
//     <Container>
//       <Typography>Error buttons for testing</Typography>
//       <ButtonGroup fullWidth>
//         <Button
//           variant="contained"
//           onClick={() => trigger400Error().catch((err) => console.log(err))}
//         >
//           Test 400 Error
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => trigger401Error().catch((err) => console.log(err))}
//         >
//           Test 401 Error
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => trigger404Error().catch((err) => console.log(err))}
//         >
//           Test 404 Error
//         </Button>
//         <Button
//           variant="contained"
//           onClick={() => trigger500Error().catch((err) => console.log(err))}
//         >
//           Test 500 Error
//         </Button>
//         <Button variant="contained" onClick={getValidationError}>
//           Test validation Error
//         </Button>
//       </ButtonGroup>

//       {validationErrors.length > 0 && (
//         <Alert severity="error">
//           <AlertTitle>
//             Validation Errors
//           </AlertTitle>
//           <List>
//             {validationErrors.map(err=> (
//               <ListItem key={err}>
//                 {err}
//               </ListItem>
//             ))}
//           </List>
//         </Alert>
//       )}
//     </Container>
//   );
// }
