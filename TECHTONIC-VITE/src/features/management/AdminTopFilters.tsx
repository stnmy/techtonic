import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import {
  setAdminOrderBy,
  setAdminPageSize,
  setAdminSearch,
} from "./AdminProductBrowserSlice";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import _ from "lodash";

export default function AdminTopFilters() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const orderBy = useAppSelector(
    (state) => state.adminProductBrowserSlice.orderBy
  );
  const pageSize = useAppSelector(
    (state) => state.adminProductBrowserSlice.pageSize
  );
  const currentSearch = useAppSelector(
    (state) => state.adminProductBrowserSlice.search
  );

  const [localSearch, setLocalSearch] = useState(currentSearch);

  // Debounced dispatcher
  const debouncedSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        dispatch(setAdminSearch(value));
      }, 500),
    [dispatch]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSearch(value);
  };

  const handleOrderByChange = (e: SelectChangeEvent<string>) => {
    dispatch(setAdminOrderBy(e.target.value));
  };

  const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      setAdminPageSize({ pageNumber: 1, pageSize: Number(e.target.value) })
    );
  };

  const handleCreateProduct = () => {
    navigate("/admin/products/create");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={2}
      sx={{
        maxWidth: "100%",
        border: "1px solid #acc",
        backgroundColor: "secondary.main",
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 1,
        padding: 1.8,
        alignItems: "center",
      }}
    >
      {/* Left section: Product Manager + Search + Create Button */}
      <Box display="flex" alignItems="center" flexGrow={1} gap={2}>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Product Manager
        </Typography>

        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={localSearch}
          onChange={handleSearchChange}
          sx={{ minWidth: 400 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProduct}
          sx={{ height: 40 }}
        >
          Create Product
        </Button>
      </Box>

      {/* Right section: Page size + Sort options */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">Show:</Typography>
        <Select
          value={pageSize.toString()}
          onChange={handlePageSizeChange}
          size="small"
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
        </Select>

        <Typography variant="body1">Sort By:</Typography>
        <Select value={orderBy} onChange={handleOrderByChange} size="small">
          <MenuItem value="createdat">Newest</MenuItem>
          <MenuItem value="priceasc">Price (Low-High)</MenuItem>
          <MenuItem value="pricedesc">Price (High-Low)</MenuItem>
          <MenuItem value="ratinghigh">Rating (High-Low)</MenuItem>
          <MenuItem value="ratinglow">Rating (Low-High)</MenuItem>
          <MenuItem value="mostpopular">Most Popular</MenuItem>
          <MenuItem value="leastpopular">Least Popular</MenuItem>
          <MenuItem value="mostsold">Most Sold</MenuItem>
          <MenuItem value="lowstock">Low Stock</MenuItem>
          <MenuItem value="instock">In Stock</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
