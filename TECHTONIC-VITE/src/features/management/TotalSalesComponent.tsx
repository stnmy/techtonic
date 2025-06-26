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
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  DashboardSales,
  SalesPeriodData,
} from "../../app/models/dashboardManagement"; // Adjust path as needed

type Timeframe = "thisWeek" | "thisMonth" | "thisYear" | "allTime";

interface TotalSalesComponentProps {
  salesData: DashboardSales | undefined;
  isLoading: boolean;
}

const TotalSalesComponent: React.FC<TotalSalesComponentProps> = ({
  salesData,
  isLoading,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>("thisMonth"); // Default to 'thisMonth'

  const handleTimeframeChange = (event: SelectChangeEvent<Timeframe>) => {
    setTimeframe(event.target.value as Timeframe);
  };

  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined || amount === null) {
      return "N/A";
    }
    // Changed currency to BDT as per your last query and added grouping for thousands
    return new Intl.NumberFormat("en-US", {
      // Using en-US locale for consistent formatting
      style: "currency",
      currency: "BDT", // Changed to BDT
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Calculate total sales for the selected timeframe
  const calculateTotalSales = (
    data: DashboardSales | undefined,
    period: Timeframe
  ): number | undefined => {
    if (!data) return undefined;
    const completed = data.completedSales[period];
    const pending = data.pendingSales[period];
    // Assuming total sales is sum of completed and pending
    if (completed !== undefined && pending !== undefined) {
      return completed + pending;
    }
    return undefined;
  };

  const currentTotalSales = calculateTotalSales(salesData, timeframe);
  const currentCompletedSales = salesData?.completedSales[timeframe];
  const currentPendingSales = salesData?.pendingSales[timeframe];

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3, // Slightly less rounded corners for a modern feel
        paddingTop: 2,
        paddingBottom: 1,
        px: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        // Using a very subtle linear gradient for a sleek background effect
        background: "linear-gradient(145deg, #ffffff, #f0f2f5)",
        // More subtle and cohesive box-shadow
        boxShadow:
          "0 5px 15px rgba(0, 0, 0, 0.05), 0 2px 5px rgba(0, 0, 0, 0.03)",
        // Lighter, more subtle border color
        border: "1px solid",
        borderColor: "grey.400", // Very light grey border
        // transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth hover effect
        // "&:hover": {
        //   transform: "translateY(-3px)", // Slight lift on hover
        //   boxShadow:
        //     "0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)",
        // },
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        {/* Header: Title and Dropdown */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2} // Increased bottom margin for more breathing room
        >
          <Box display="flex" alignItems="center">
            <MonetizationOnIcon
              sx={{ mr: 1.5, color: "primary.main", fontSize: 28 }} // Slightly smaller icon
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {" "}
              {/* Slightly lighter text for title */}
              Total Sales
            </Typography>
          </Box>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Period</InputLabel>
            <Select
              value={timeframe}
              onChange={handleTimeframeChange}
              label="Period"
              sx={{ borderRadius: 1.5 }} // Slightly less rounded dropdown
              inputProps={{ sx: { px: 1.5, py: 1 } }} // Adjust padding for select input
            >
              <MenuItem value="thisWeek">This Week</MenuItem>
              <MenuItem value="thisMonth">This Month</MenuItem>
              <MenuItem value="thisYear">This Year</MenuItem>
              <MenuItem value="allTime">All Time</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Main Sales Figure */}
        <Box sx={{ my: 1, textAlign: "left" }}>
          {isLoading ? (
            <Skeleton variant="text" width="70%" height={60} />
          ) : (
            <Typography
              variant="h3" // Increased font size for emphasis
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {formatCurrency(currentTotalSales)}
            </Typography>
          )}
        </Box>

        {/* Completed and Pending Sales */}
        <Box
          sx={{
            mt: "auto", // Push to bottom
            display: "flex",
            justifyContent: "space-between", // Distribute space between items
            alignItems: "center",
            flexWrap: "nowrap",
            pt: 1, // Added top padding for more separation
            borderTop: "1px dashed grey.100", // A subtle dashed line separator
          }}
        >
          <Typography
            variant="caption" // Smaller font for detail
            sx={{ color: "text.secondary", fontWeight: "medium" }} // Ash color
          >
            Completed:{" "}
            {isLoading ? (
              <Skeleton component="span" width="60px" />
            ) : (
              formatCurrency(currentCompletedSales)
            )}
          </Typography>
          <Typography
            variant="caption" // Smaller font for detail
            sx={{ color: "text.secondary", fontWeight: "medium" }} // Black color (text.primary is good, text.secondary for subtle)
          >
            Pending:{" "}
            {isLoading ? (
              <Skeleton component="span" width="60px" />
            ) : (
              formatCurrency(currentPendingSales)
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalSalesComponent;
