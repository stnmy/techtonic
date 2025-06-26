import {
  Box,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { Filter } from "../../app/models/product";
import { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setFilters } from "./productBrowserSlice";

type Props = {
  singleFilter: Filter;
};

export default function FilterSection({ singleFilter }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const selectedFilters = useAppSelector(
    (state) => state.productBrowser.filters
  );

  const handleFiltersCheckboxChange =
    (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      let newFilters = [];
      if (event.target.checked) {
        newFilters = [...selectedFilters, id];
      } else {
        newFilters = selectedFilters.filter((fid) => fid !== id);
      }
      dispatch(setFilters(newFilters));
    };

  return (
    <Box
      sx={{
        maxWidth: 320,
        border: "1px solid #acc",
        backgroundColor: "secondary.main",
        marginBottom: 1,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 400, padding: 2 }}>
          {singleFilter.filterName}
        </Typography>
        <IconButton
          size="small"
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{ marginRight: 1 }}
        >
          {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Box>
      <Divider />
      <Collapse in={!collapsed}>
        <Box
          sx={{
            maxHeight: 230,
            overflowY: "auto",
          }}
        >
          <FormGroup sx={{ paddingLeft: 2, paddingTop: 1, paddingBottom: 1 }}>
            {singleFilter.values.map((singleValue) => (
              <FormControlLabel
                key={singleValue.id}
                control={
                  <Checkbox
                    value={singleValue.id}
                    checked={selectedFilters.includes(singleValue.id)}
                    onChange={handleFiltersCheckboxChange(singleValue.id)}
                  />
                }
                label={singleValue.value}
              />
            ))}
          </FormGroup>
        </Box>
      </Collapse>
    </Box>
  );
}
