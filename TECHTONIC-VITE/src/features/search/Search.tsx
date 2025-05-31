import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useEffect } from "react";
import { setSearch } from "../productBrowser/productBrowserSlice";
import { useFetchProductsQuery } from "../productBrowser/productBrowserApi";
import { startLoading, stopLoading } from "../../app/layout/uiSlice";
import TopFilters from "../productBrowser/Filters/TopFilters";
import NotFound from "../../app/error/NotFound";
import ProductList from "../productBrowser/ProductList";

export default function Search() {
  const { search } = useParams();
  const dispatch = useAppDispatch();
  const productBrowserParams = useAppSelector((state) => state.productBrowser);

  useEffect(() => {
    if (search) {
      dispatch(setSearch(search));
    }
  }, [search, dispatch]);

  const { data, isLoading, isError } =
    useFetchProductsQuery(productBrowserParams);

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoading());
    } else {
      dispatch(stopLoading());
    }
  });

  if (isLoading) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column">
      <TopFilters name={search} />
      {isError ||
      !data ||
      !data.productCardDtos ||
      data.productCardDtos.length === 0 ? (
        <NotFound />
      ) : (
        <Box>
          <ProductList products={data.productCardDtos ?? []} />
        </Box>
      )}
    </Box>
  );
}
