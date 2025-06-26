import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
  Button, // Added Button for the Reset Filters functionality
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import {
  setSearchReviewerName,
  setProductId,
  setOrderBy,
  resetProductReviewParams,
} from "./AdminProductReviewBrowserSlice"; // Corrected import path for slice actions
import { useEffect, useMemo, useState } from "react";
import _ from "lodash"; // Ensure lodash is installed: npm install lodash

export default function AdminProductReviewTopFilters() {
  const dispatch = useAppDispatch();

  // Select current filter values from the adminProductReviewBrowserSlice
  const { searchReviewerName, productId, orderBy } = useAppSelector(
    (state) => state.adminProductReviewBrowserSlice // Corrected state selector
  );

  // Local state for debounced TextField values
  const [localSearchReviewerName, setLocalSearchReviewerName] = useState(
    searchReviewerName || ""
  );
  const [localProductId, setLocalProductId] = useState(productId || "");

  // Debounce for 'Search by Reviewer Name'
  const debouncedReviewerSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        // Dispatch undefined if the search box is empty, otherwise dispatch the value
        dispatch(setSearchReviewerName(value === "" ? undefined : value));
      }, 500),
    [dispatch]
  );

  // Debounce for 'Filter by Product ID'
  const debouncedProductIdSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        // Dispatch undefined if the search box is empty, otherwise dispatch the value
        dispatch(setProductId(value === "" ? undefined : value));
      }, 500),
    [dispatch]
  );

  // Cleanup debounce on component unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      debouncedReviewerSearch.cancel();
      debouncedProductIdSearch.cancel();
    };
  }, [debouncedReviewerSearch, debouncedProductIdSearch]);

  // Handlers for UI element changes
  const handleReviewerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchReviewerName(value); // Update local state immediately
    debouncedReviewerSearch(value); // Debounce the Redux dispatch
  };

  const handleProductIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalProductId(value); // Update local state immediately
    debouncedProductIdSearch(value); // Debounce the Redux dispatch
  };

  const handleOrderByChange = (e: SelectChangeEvent<string>) => {
    dispatch(setOrderBy(e.target.value));
  };

  const handleResetFilters = () => {
    dispatch(resetProductReviewParams()); // Reset Redux state to initial
    setLocalSearchReviewerName(""); // Reset local state for text fields
    setLocalProductId("");
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
        backgroundColor: "secondary.main", // Ensure this color exists in your MUI theme
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 1,
        padding: 1.8,
        alignItems: "center",
      }}
    >
      {/* Left section: Title and Search/Filter TextFields */}
      <Box
        display="flex"
        alignItems="center"
        flexGrow={1}
        gap={2}
        flexWrap="wrap"
      >
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Review Browser
        </Typography>

        <TextField
          size="small"
          label="Search by Reviewer Name"
          variant="outlined"
          value={localSearchReviewerName}
          onChange={handleReviewerNameChange}
          sx={{ minWidth: 250 }}
        />

        <TextField
          size="small"
          label="Filter by Product ID"
          variant="outlined"
          value={localProductId}
          onChange={handleProductIdChange}
          sx={{ minWidth: 200 }}
          type="text" // Keep as text to allow invalid string input, backend handles parsing
          placeholder="e.g., 123"
        />
      </Box>

      {/* Right section: Sort By dropdown and Reset Button */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
        flexWrap="wrap"
      >
        <Typography variant="body1">Sort By:</Typography>
        <Select
          value={orderBy || "latest"} // Default to 'latest' if orderBy is undefined
          onChange={handleOrderByChange}
          size="small"
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="earliest">Earliest</MenuItem>
        </Select>

        <Button
          variant="outlined"
          size="small"
          onClick={handleResetFilters}
          sx={{ ml: 2 }} // Add some left margin for separation
        >
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
}
