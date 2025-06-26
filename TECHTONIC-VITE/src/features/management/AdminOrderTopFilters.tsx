import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import {
  setAdminOrderPeriod,
  setAdminOrderSearch,
  setAdminOrderStatus,
  setAdminOrderPageSize,
} from "./AdminOrderBrowserSlice";
import { useEffect, useMemo, useState } from "react";
import _ from "lodash";

export default function AdminOrderTopFilters() {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.adminOrderBrowserSlice.status);
  const period = useAppSelector((state) => state.adminOrderBrowserSlice.period);
  const pageSize = useAppSelector(
    (state) => state.adminOrderBrowserSlice.pageSize
  );
  const currentSearch = useAppSelector(
    (state) => state.adminOrderBrowserSlice.search
  );

  const [localSearch, setLocalSearch] = useState(currentSearch);

  const debouncedSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        dispatch(setAdminOrderSearch(value));
      }, 500),
    [dispatch]
  );

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

  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      setAdminOrderStatus(e.target.value === "all" ? undefined : e.target.value)
    );
  };

  const handlePeriodChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      setAdminOrderPeriod(e.target.value === "all" ? undefined : e.target.value)
    );
  };

  const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
    dispatch(
      setAdminOrderPageSize({ pageNumber: 1, pageSize: Number(e.target.value) })
    );
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
      {/* Left: Search */}
      <Box display="flex" alignItems="center" flexGrow={1} gap={2}>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          Order Manager
        </Typography>

        <TextField
          size="small"
          label="Search by Order #"
          variant="outlined"
          value={localSearch}
          onChange={handleSearchChange}
          sx={{ minWidth: 300 }}
        />
      </Box>

      {/* Right: Status / Period / Page Size */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="body1">Status:</Typography>
        <Select
          value={status || "all"}
          onChange={handleStatusChange}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="processing">Processing</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="canceled">Canceled</MenuItem>
          <MenuItem value="refunded">Refunded</MenuItem>
          <MenuItem value="cancelRequested">Cancel Requested</MenuItem>
          <MenuItem value="refundRequested">Refund Requested</MenuItem>
        </Select>

        <Typography variant="body1">Period:</Typography>
        <Select
          value={period || "all"}
          onChange={handlePeriodChange}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="lastweek">Last Week</MenuItem>
          <MenuItem value="lastmonth">Last Month</MenuItem>
          <MenuItem value="lastyear">Last Year</MenuItem>
        </Select>

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
      </Box>
    </Box>
  );
}
