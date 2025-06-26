import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import StarsIcon from "@mui/icons-material/Stars";
import {
  TopSellingBrands,
  BrandMetrics,
} from "../../app/models/dashboardManagement";

type Timeframe = "thisWeek" | "thisMonth" | "thisYear" | "allTime";

interface TopSellingBrandsComponentProps {
  topSellingBrandsData: TopSellingBrands | undefined;
  isLoading: boolean;
}

const TopSellingBrandsComponent: React.FC<TopSellingBrandsComponentProps> = ({
  topSellingBrandsData,
  isLoading,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>("thisMonth");

  const handleTimeframeChange = (event: SelectChangeEvent<Timeframe>) => {
    setTimeframe(event.target.value as Timeframe);
  };

  const currentBrands = isLoading
    ? Array.from(new Array(3))
    : topSellingBrandsData?.[timeframe] || [];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        paddingTop: 2,
        paddingBottom: 1,
        px: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(145deg, #ffffff, #f0f2f5)",
        boxShadow:
          "0 5px 15px rgba(0, 0, 0, 0.05), 0 2px 5px rgba(0, 0, 0, 0.03)",
        border: "1px solid",
        borderColor: "grey.400",
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <StarsIcon sx={{ mr: 1.5, color: "warning.main", fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Top Brands
            </Typography>
          </Box>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select
              value={timeframe}
              onChange={handleTimeframeChange}
              label="Period"
              sx={{ borderRadius: 1.5 }}
              inputProps={{ sx: { px: 1.5, py: 1 } }}
            >
              <MenuItem value="thisWeek">This Week</MenuItem>
              <MenuItem value="thisMonth">This Month</MenuItem>
              <MenuItem value="thisYear">This Year</MenuItem>
              <MenuItem value="allTime">All Time</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Table */}
        <TableContainer sx={{ mt: 1, flexGrow: 1 }}>
          <Table size="small" aria-label="top selling brands table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
                  Brand
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  Units Sold
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentBrands.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No data available for this period.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentBrands.map(
                  (brand: BrandMetrics | undefined, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        {isLoading ? (
                          <Skeleton width="80%" />
                        ) : (
                          brand?.brandName || "N/A"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {isLoading ? (
                          <Skeleton width="40%" sx={{ ml: "auto" }} />
                        ) : brand?.unitsSold !== undefined ? (
                          brand.unitsSold
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TopSellingBrandsComponent;
