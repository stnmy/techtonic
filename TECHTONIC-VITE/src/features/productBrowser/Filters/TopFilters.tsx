import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "../../../app/store/store";
import { setOrderBy, setPageSize, setSearch } from "../productBrowserSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  name?: string;
  showSearch?: boolean;
  showCreateButton?: boolean;
};

export default function TopFilters({
  name,
  showSearch = false,
  showCreateButton = false,
}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orderBy = useAppSelector((state) => state.productBrowser.orderBy);
  const pageSize = useAppSelector((state) => state.productBrowser.pageSize);
  const search = useAppSelector((state) => state.productBrowser.search);

  const handleOrderByChange = (e: SelectChangeEvent<string>) => {
    dispatch(setOrderBy(e.target.value));
  };

  const handlePageSizeChange = (e: SelectChangeEvent<string>) => {
    dispatch(setPageSize({ pageNumber: 1, pageSize: Number(e.target.value) }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const handleCreate = () => {
    navigate("/admin/products/create");
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
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          {name}
        </Typography>
        {showSearch && (
          <TextField
            size="small"
            placeholder="Search by Product name..."
            value={search}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              width: 400,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => dispatch(setSearch(search))}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        {showCreateButton && (
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ ml: 2, backgroundColor: "#1976d2", color: "white" }}
          >
            Create Product
          </Button>
        )}
      </Box>

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
