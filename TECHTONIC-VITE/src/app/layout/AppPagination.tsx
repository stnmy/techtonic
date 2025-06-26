import { Box, Pagination, PaginationItem, Typography } from "@mui/material";
import React from "react";
import { PaginationData } from "../models/product";

type Props = {
  paginationData: PaginationData;
  onPageChange: (pageNumber: number) => void; // ✅ add callback
};

export default function AppPagination({ paginationData, onPageChange }: Props) {
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value); // ✅ call passed-in handler
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
              },
              "&:hover": {
                backgroundColor: "#ced4da",
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
