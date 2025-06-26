import ProductList from "./ProductList";
import {
  useFetchFiltersQuery,
  useFetchProductsQuery,
} from "./productBrowserApi";
import NotFound from "../../app/error/NotFound";
import Filters from "./Filters/Filters";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import TopFilters from "./Filters/TopFilters";
import AppPagination from "../../app/layout/AppPagination";
import { useEffect } from "react";
import { startLoading, stopLoading } from "../../app/layout/uiSlice";
import { setPageNumber } from "./productBrowserSlice";

export default function ProductBrowser() {
  const dispatch = useAppDispatch();
  const productBrowserParams = useAppSelector((state) => state.productBrowser);
  const { data, isLoading, isError } =
    useFetchProductsQuery(productBrowserParams);
  const {
    data: filters,
    isLoading: filtersLoading,
    isError: filtersError,
  } = useFetchFiltersQuery();

  useEffect(() => {
    if (isLoading || filtersLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading, filtersLoading, dispatch]);

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPageNumber(pageNumber));
  };

  if (isLoading || filtersLoading) {
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

  if (
    isError ||
    filtersError ||
    !data ||
    !data.productCardDtos ||
    data.productCardDtos.length === 0
  ) {
    return <NotFound />;
  }

  return (
    <Grid container>
      <Grid size={3}>
        <Filters
          filters={
            filters ?? {
              priceRangeDto: { minPrice: 0, maxPrice: 0 },
              filterDtos: [],
            }
          }
        />
      </Grid>
      {/* WARNING: 'size' is not a standard Material-UI Grid prop.
          This will cause TypeScript errors and likely result in incorrect layout.
          Standard usage is: <Grid item xs={12} md={9}> */}
      <Grid size={9}>
        <TopFilters name="Laptop" />
        <ProductList products={data.productCardDtos ?? []} />
        <AppPagination
          paginationData={data.paginationData}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
}
