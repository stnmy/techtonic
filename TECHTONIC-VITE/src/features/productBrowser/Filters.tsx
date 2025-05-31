import { Box, Button, Typography } from "@mui/material";
import { Filter, TotalFilterDto } from "../../app/models/product";
import FilterSection from "./FilterSection";
import { useAppDispatch } from "../../app/store/store";
import { resetFilters } from "./productBrowserSlice";
import PriceSlider from "./PriceSlider";

type Props = {
  filters: TotalFilterDto;
};

export default function Filters({ filters }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        marginTop: 1,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          maxWidth: 320,
          border: "1px solid #acc",
          backgroundColor: "secondary.main",
          marginBottom: 1,
          borderRadius: 1,
          padding: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "error.main" }}
          onClick={() => dispatch(resetFilters())}
        >
          Clear Filters
        </Button>
      </Box>

      <PriceSlider priceRange={filters.priceRangeDto} />

      {filters.filterDtos.map((filter) => (
        <FilterSection key={filter.filterSlug} singleFilter={filter} />
      ))}
    </Box>
  );
}
