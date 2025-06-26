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
  Tooltip,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { SelectChangeEvent } from "@mui/material/Select";

type Timeframe = "thisWeek" | "thisMonth" | "thisYear" | "allTime";

interface ProductMetrics {
  productName: string;
  variableNumber: number;
}

type TimeframeData = {
  thisWeek?: ProductMetrics[];
  thisMonth?: ProductMetrics[];
  thisYear?: ProductMetrics[];
  allTime?: ProductMetrics[];
};

interface ProductMetricsTableProps {
  title: string;
  columnLabel: string;
  icon?: React.ReactNode;
  isLoading: boolean;
  data?: TimeframeData;
}

const ProductMetricsTableComponent: React.FC<ProductMetricsTableProps> = ({
  title,
  columnLabel,
  icon = (
    <Inventory2OutlinedIcon
      sx={{ mr: 1.5, color: "info.main", fontSize: 28 }}
    />
  ),
  isLoading,
  data,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>("thisMonth");

  const handleTimeframeChange = (event: SelectChangeEvent<Timeframe>) => {
    setTimeframe(event.target.value as Timeframe);
  };

  const currentData = isLoading
    ? Array.from(new Array(3)) // Placeholder for skeleton rows
    : data?.[timeframe] || [];

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

        // 💡 Add these lines for hover effect
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Box display="flex" alignItems="center">
            {icon}
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {title}
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

        <TableContainer sx={{ mt: 1, flexGrow: 1 }}>
          <Table size="small" aria-label={`${title} table`}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "text.secondary" }}>
                  Product
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: "bold", color: "text.secondary" }}
                >
                  {columnLabel}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No data available for this period.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                currentData.map(
                  (item: ProductMetrics | undefined, index: number) => (
                    <TableRow key={index}>
                      <TableCell
                      // Removed maxWidth from TableCell to allow it to expand
                      // Line clamping will now be handled solely by the Typography wrapped in a div.
                      >
                        {isLoading ? (
                          <Skeleton width="80%" />
                        ) : (
                          <Tooltip title={item?.productName || ""}>
                            <Box
                              sx={{
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2, // Keep 2 lines for compactness
                                WebkitBoxOrient: "vertical",
                                textOverflow: "ellipsis",
                                lineHeight: 1.4, // Adjusted line-height for a slightly tighter, cleaner look on breaks
                                wordBreak: "break-word", // Allow breaking long words if they are single words without spaces
                              }}
                            >
                              <Typography variant="body2" component="span">
                                {item?.productName || "N/A"}
                              </Typography>
                            </Box>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {isLoading ? (
                          <Skeleton width="40%" sx={{ ml: "auto" }} />
                        ) : (
                          item?.variableNumber ?? "N/A"
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

export default ProductMetricsTableComponent;
