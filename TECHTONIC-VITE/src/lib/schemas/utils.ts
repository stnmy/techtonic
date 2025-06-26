type MetricKey = "unitsSold" | "visitCount" | "stockQuantity" | "inCartCount";

const mapToProductMetrics = (
    rawList: any[] = [],
    key: MetricKey
): { productName: string; variableNumber: number }[] => {
    return rawList.map((item) => ({
        productName: item.productName,
        variableNumber: item[key] ?? 0,
    }));
};