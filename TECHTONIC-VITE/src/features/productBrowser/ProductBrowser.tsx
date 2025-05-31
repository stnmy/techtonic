import ProductList from "./ProductList";
import {
  useFetchFiltersQuery,
  useFetchProductsQuery,
} from "./productBrowserApi";
import NotFound from "../../app/error/NotFound";
import Filters from "./Filters/Filters";
import { Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import TopFilters from "./Filters/TopFilters";
import AppPagination from "../../app/layout/AppPagination";
import { useEffect } from "react";
import { startLoading, stopLoading } from "../../app/layout/uiSlice";

export default function ProductBrowser() {
  const dispatch = useAppDispatch();
  const productBrowserParams = useAppSelector((state) => state.productBrowser);
  const { data, isLoading, isError } =
    useFetchProductsQuery(productBrowserParams);
  const { data: filters, isLoading: filtersLoading } = useFetchFiltersQuery();

  useEffect(() => {
    if (isLoading || filtersLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  }, [isLoading, filtersLoading, dispatch]);

  if (isLoading || filtersLoading) {
    return null; // or a spinner, or nothing (the global loading bar will show)
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
      <Grid size={9}>
        <TopFilters name="Laptop" />
        {isError ||
        !data ||
        !data.productCardDtos ||
        data.productCardDtos.length === 0 ? (
          <NotFound />
        ) : (
          <Box>
            <ProductList products={data.productCardDtos ?? []} />
            <AppPagination paginationData={data.paginationData} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
