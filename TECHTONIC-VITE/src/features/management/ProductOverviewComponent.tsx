import React from "react";
import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category"; // Icon for products
import {
  ProductsOverviewDto, // Adjust path as needed
} from "../../app/models/dashboardManagement"; // Adjust path as needed

interface ProductsOverviewComponentProps {
  productsOverviewData: ProductsOverviewDto | undefined;
  isLoading: boolean;
}

const ProductsOverviewComponent: React.FC<ProductsOverviewComponentProps> = ({
  productsOverviewData,
  isLoading,
}) => {
  const formatNumber = (value: number | undefined): string => {
    if (value === undefined || value === null) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US").format(value);
  };

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
        {/* Header: Title and Icon */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center">
            <CategoryIcon
              sx={{ mr: 1.5, color: "success.main", fontSize: 28 }} // Using success.main for a different color
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              Products Overview
            </Typography>
          </Box>
          {/* No dropdown needed for this component */}
        </Box>

        {/* Main Total Product Count */}
        <Box sx={{ my: 1, textAlign: "left" }}>
          {isLoading ? (
            <Skeleton variant="text" width="70%" height={60} />
          ) : (
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {formatNumber(productsOverviewData?.totalProductCount)}
            </Typography>
          )}
        </Box>

        {/* Added This Month and This Week */}
        <Box
          sx={{
            mt: "auto", // Push to bottom
            display: "flex",
            flexDirection: "column", // Stack these two items
            pt: 1,
            borderTop: "1px dashed grey.100",
          }}
        >
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: "medium" }}
            >
              Added this month:{" "}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.primary", fontWeight: "medium" }}
            >
              {isLoading ? (
                <Skeleton component="span" width="40px" />
              ) : (
                formatNumber(productsOverviewData?.addedThisMonthCount)
              )}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: "medium" }}
            >
              Added this week:{" "}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.primary", fontWeight: "medium" }}
            >
              {isLoading ? (
                <Skeleton component="span" width="40px" />
              ) : (
                formatNumber(productsOverviewData?.addedThisWeekCount)
              )}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductsOverviewComponent;
