import React, { useState } from "react";
import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningIcon from "@mui/icons-material/Warning";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../app/store/store";
import { setAdminOrderBy } from "./AdminProductBrowserSlice";
import { useGetDashboardSummaryQuery } from "./managementApi";

import TotalSalesComponent from "./TotalSalesComponent";
import TotalOrdersComponent from "./TotalOrdersComponent";
import ProductsOverviewComponent from "./ProductOverviewComponent";
import TopSellingBrandsComponent from "./TopSellingBrandsComponent";
import ProductMetricsTableComponent from "./ProductMetricsTableComponent";

type MetricKey = "unitsSold" | "visitCount" | "stockQuantity" | "inCartCount";

export default function DashboardStatistics() {
  const {
    data: dashboardData,
    isLoading,
    error,
  } = useGetDashboardSummaryQuery();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToInventoryWithOrder = (orderKey: string) => {
    dispatch(setAdminOrderBy(orderKey));
    navigate("/admin/products");
  };

  const mapToProductMetrics = (
    rawList: any[] = [],
    key: MetricKey
  ): { productName: string; variableNumber: number }[] => {
    return rawList.map((item) => ({
      productName: item.productName,
      variableNumber: item[key] ?? 0,
    }));
  };

  const normalizedTopSelling = dashboardData?.topSellingProducts && {
    thisWeek: mapToProductMetrics(
      dashboardData.topSellingProducts.thisWeek,
      "unitsSold"
    ),
    thisMonth: mapToProductMetrics(
      dashboardData.topSellingProducts.thisMonth,
      "unitsSold"
    ),
    thisYear: mapToProductMetrics(
      dashboardData.topSellingProducts.thisYear,
      "unitsSold"
    ),
    allTime: mapToProductMetrics(
      dashboardData.topSellingProducts.allTime,
      "unitsSold"
    ),
  };

  const normalizedMostVisited = dashboardData?.mostVisitedProducts && {
    thisWeek: mapToProductMetrics(
      dashboardData.mostVisitedProducts.thisWeek,
      "visitCount"
    ),
    thisMonth: mapToProductMetrics(
      dashboardData.mostVisitedProducts.thisMonth,
      "visitCount"
    ),
    thisYear: mapToProductMetrics(
      dashboardData.mostVisitedProducts.thisYear,
      "visitCount"
    ),
    allTime: mapToProductMetrics(
      dashboardData.mostVisitedProducts.allTime,
      "visitCount"
    ),
  };

  const normalizedTopCarted = dashboardData?.topCartedProducts && {
    thisMonth: mapToProductMetrics(
      dashboardData.topCartedProducts.topProductsCurrentlyInActiveCarts,
      "inCartCount"
    ),
  };

  const normalizedLowStock = dashboardData?.lowStockProducts && {
    thisMonth: mapToProductMetrics(
      dashboardData.lowStockProducts.laptopsLowInStock,
      "stockQuantity"
    ),
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  if (error) {
    let errorMessage: string;

    if ("status" in error) {
      const fetchError = error as FetchBaseQueryError;
      if (
        typeof fetchError.data === "object" &&
        fetchError.data !== null &&
        "error" in fetchError.data
      ) {
        errorMessage = (fetchError.data as any).error;
      } else if (
        typeof fetchError.data === "object" &&
        fetchError.data !== null &&
        "detail" in fetchError.data
      ) {
        errorMessage = (fetchError.data as any).detail;
      } else {
        errorMessage = `Error ${fetchError.status}: An unknown error occurred.`;
      }
    } else {
      const serializedError = error as SerializedError;
      errorMessage = serializedError.message || "An unknown error occurred.";
    }

    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          <Typography variant="h6">Failed to load dashboard data:</Typography>
          <Typography>{errorMessage}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        paddingLeft: 2,
        paddingTop: 4,
        paddingBottom: 2,
        paddingRight: 4,
        backgroundColor: "secondary.main",
      }}
    >
      <Typography
        variant="h3"
        sx={{ mb: 5, fontWeight: 600, display: "flex", alignItems: "center" }}
      >
        <DashboardIcon sx={{ mr: 2, fontSize: "inherit" }} /> Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={3}>
          <TotalSalesComponent
            salesData={dashboardData?.dashboardSales}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={3}>
          <TotalOrdersComponent
            orderSummaryData={dashboardData?.orderSummaryDto}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={3}>
          <ProductsOverviewComponent
            productsOverviewData={dashboardData?.productsOverviewDto}
            isLoading={isLoading}
          />
        </Grid>
        <Grid size={3}>
          <TopSellingBrandsComponent
            topSellingBrandsData={dashboardData?.topSellingBrands}
            isLoading={isLoading}
          />
        </Grid>

        <Grid
          size={3}
          onClick={() => navigateToInventoryWithOrder("mostsold")}
          sx={{ cursor: "pointer" }}
        >
          <ProductMetricsTableComponent
            title="Top Selling Products"
            columnLabel="Sold"
            icon={
              <TrendingUpIcon
                sx={{ mr: 1.5, color: "success.main", fontSize: 28 }}
              />
            }
            data={normalizedTopSelling}
            isLoading={isLoading}
          />
        </Grid>

        <Grid
          size={3}
          onClick={() => navigateToInventoryWithOrder("mostpopular")}
          sx={{ cursor: "pointer" }}
        >
          <ProductMetricsTableComponent
            title="Most Visited Products"
            columnLabel="Visits"
            icon={
              <VisibilityIcon
                sx={{ mr: 1.5, color: "primary.main", fontSize: 28 }}
              />
            }
            data={normalizedMostVisited}
            isLoading={isLoading}
          />
        </Grid>

        <Grid size={3}>
          <ProductMetricsTableComponent
            title="Top Carted Products"
            columnLabel="In Cart"
            icon={
              <ShoppingCartIcon
                sx={{ mr: 1.5, color: "warning.main", fontSize: 28 }}
              />
            }
            data={normalizedTopCarted}
            isLoading={isLoading}
          />
        </Grid>

        <Grid
          size={3}
          onClick={() => navigateToInventoryWithOrder("lowstock")}
          sx={{ cursor: "pointer" }}
        >
          <ProductMetricsTableComponent
            title="Low Stock Products"
            columnLabel="Stock"
            icon={
              <WarningIcon
                sx={{ mr: 1.5, color: "error.main", fontSize: 28 }}
              />
            }
            data={normalizedLowStock}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
