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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; // Changed icon for orders
import {
  OrderSummaryDto, // Adjust path as needed
  OrderSummaryPeriodData,
} from "../../app/models/dashboardManagement"; // Adjust path as needed

type Timeframe = "thisWeek" | "thisMonth" | "thisYear" | "allTime";

interface TotalOrdersComponentProps {
  orderSummaryData: OrderSummaryDto | undefined;
  isLoading: boolean;
}

const TotalOrdersComponent: React.FC<TotalOrdersComponentProps> = ({
  orderSummaryData,
  isLoading,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>("thisMonth"); // Default to 'thisMonth'

  const handleTimeframeChange = (event: SelectChangeEvent<Timeframe>) => {
    setTimeframe(event.target.value as Timeframe);
  };

  const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US").format(value);
  };

  const formatPercentage = (value: number | undefined): string => {
    if (value === undefined || value === null) {
      return "N/A";
    }
    return `${value.toFixed(2)}%`;
  };

  // Get order summary for the selected timeframe
  const getCurrentOrderSummary = (
    data: OrderSummaryDto | undefined,
    period: Timeframe
  ): OrderSummaryPeriodData | undefined => {
    if (!data) return undefined;
    return data[period];
  };

  const currentOrderSummary = getCurrentOrderSummary(
    orderSummaryData,
    timeframe
  );

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
            <ShoppingCartIcon
              sx={{ mr: 1.5, color: "secondary.main", fontSize: 28 }} // Slightly smaller icon, changed color
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.primary" }} // Changed color for title
            >
              Orders
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

        {/* Main Orders Figure */}
        <Box sx={{ my: 1, textAlign: "left" }}>
          {isLoading ? (
            <Skeleton variant="text" width="70%" height={60} />
          ) : (
            <Typography
              variant="h3" // Increased font size for emphasis
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {formatNumber(currentOrderSummary?.totalOrders)}
            </Typography>
          )}
        </Box>

        {/* Cancelled Orders and Cancellation Rate */}
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
            Cancelled:{" "}
            {isLoading ? (
              <Skeleton component="span" width="60px" />
            ) : (
              formatNumber(currentOrderSummary?.cancelledOrders)
            )}
          </Typography>
          <Typography
            variant="caption" // Smaller font for detail
            sx={{ color: "text.secondary", fontWeight: "medium" }} // Black color (text.primary is good, text.secondary for subtle)
          >
            Rate:{" "}
            {isLoading ? (
              <Skeleton component="span" width="60px" />
            ) : (
              formatPercentage(currentOrderSummary?.cancellationRate)
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalOrdersComponent;
