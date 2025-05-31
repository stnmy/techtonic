import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { setOrderBy, setPageSize } from "../productBrowserSlice";

type Props = {
  name: string | undefined;
};

export default function TopFilters({ name }: Props) {
  const dispatch = useAppDispatch();
  const orderBy = useAppSelector((state) => state.productBrowser.orderBy);
  const pageSize = useAppSelector((state) => state.productBrowser.pageSize);

  const handleOrderByChange = (e: SelectChangeEvent<string>) => {
    dispatch(setOrderBy(e.target.value));
  };

  const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
    dispatch(setPageSize({ pageNumber: 1, pageSize: Number(e.target.value) }));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        maxWidth: "100%",
        border: "1px solid #acc",
        backgroundColor: "secondary.main",
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 1,
        padding: 1.8,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 400 }}>
        {name}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          Show:
        </Typography>
        <Select
          value={pageSize.toString()}
          onChange={handlePageSizeChange}
          id="show-per-page-select"
          size="small"
          sx={{ mr: 3 }}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
        </Select>

        <Typography variant="body1" sx={{ mr: 1 }}>
          Sort By:
        </Typography>
        <Select
          value={orderBy}
          onChange={handleOrderByChange}
          id="sort-by-select"
          size="small"
        >
          <MenuItem value="name">Default</MenuItem>
          <MenuItem value="priceasc">Price(Low-High)</MenuItem>
          <MenuItem value="pricedesc">Price(High-Low)</MenuItem>
          <MenuItem value="ratinghigh">Rating(High-Low)</MenuItem>
          <MenuItem value="ratinglow">Rating(Low-High)</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
