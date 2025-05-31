import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import { PaginationData } from "../models/product";
import React from "react";
import { useAppDispatch } from "../store/store";
import { setPageNumber } from "../../features/productBrowser/productBrowserSlice";

type Props = {
  paginationData: PaginationData;
};
export default function AppPagination({ paginationData }: Props) {
  const dispatch = useAppDispatch();
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPageNumber(value));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop={3}
    >
      <Pagination
        count={paginationData.totalPageNumber}
        page={paginationData.currentPage}
        size="large"
        siblingCount={1}
        boundaryCount={1}
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              previous: () => <span>PREV</span>,
              next: () => <span>NEXT</span>,
            }}
            sx={{
              borderRadius: "4px",
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "white",
                fontWeight: "bold",
                borderRadius: "4px",
              },
              "&:hover": {
                backgroundColor: "#ced4da",
                borderRadius: "4px",
              },
              marginX: 0.5,
              minWidth: "32px",
            }}
          />
        )}
      />
      <Typography>
        Displaying {paginationData.start} to {paginationData.end} of{" "}
        {paginationData.totalCount} items ({paginationData.totalPageNumber}{" "}
        pages)
      </Typography>
    </Box>
  );
}
