export interface SalesPeriodData {
    thisWeek: number;
    thisMonth: number;
    thisYear: number;
    allTime: number;
}

export interface DashboardSales {
    completedSales: SalesPeriodData;
    pendingSales: SalesPeriodData;
    cancelledSales: SalesPeriodData;
}

export interface ProductMetrics {
    productName: string;
    variableNumber: number;
}

export interface TopSellingProducts {
    thisWeek: ProductMetrics[];
    thisMonth: ProductMetrics[];
    thisYear: ProductMetrics[];
    allTime: ProductMetrics[];
}

export interface MostVisitedProducts {
    thisWeek: ProductMetrics[];
    thisMonth: ProductMetrics[];
    thisYear: ProductMetrics[];
    allTime: ProductMetrics[];
}

export interface TopCartedProducts {
    topProductsCurrentlyInActiveCarts: ProductMetrics[];
}

export interface ProductsOverviewDto {
    totalProductCount: number;
    addedThisMonthCount: number;
    addedThisWeekCount: number;
}

export interface OrderSummaryPeriodData {
    totalOrders: number;
    cancelledOrders: number;
    cancellationRate: number;
}

export interface OrderSummaryDto {
    thisWeek: OrderSummaryPeriodData;
    thisMonth: OrderSummaryPeriodData;
    thisYear: OrderSummaryPeriodData;
    allTime: OrderSummaryPeriodData;
}

export interface BrandMetrics {
    brandName: string;
    unitsSold: number;
}

export interface TopSellingBrands {
    thisWeek: BrandMetrics[];
    thisMonth: BrandMetrics[];
    thisYear: BrandMetrics[];
    allTime: BrandMetrics[];
}

// export interface LowStockProduct {
//     productId: number;
//     productName: string;
//     stockQuantity: number;
// }

export interface LowStockProducts {
    laptopsLowInStock: ProductMetrics[];
}

// Define the complete DashboardResponse interface
export interface DashboardResponse {
    dashboardSales: DashboardSales;
    topSellingProducts: TopSellingProducts;
    mostVisitedProducts: MostVisitedProducts;
    topCartedProducts: TopCartedProducts;
    productsOverviewDto: ProductsOverviewDto;
    orderSummaryDto: OrderSummaryDto;
    topSellingBrands: TopSellingBrands;
    lowStockProducts: LowStockProducts;
}