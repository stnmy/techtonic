import { Typography, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useFetchAdminProductsQuery } from "./managementApi";
import { setAdminPageNumber } from "./AdminProductBrowserSlice";
import ProductInventoryTable from "./ProductInventoryTable";
import AppPagination from "../../app/layout/AppPagination";
import { useDeleteProductMutation } from "./managementApi";
import AdminTopFilters from "./AdminTopFilters"; // ✅ Recommended

export default function Inventory() {
  const dispatch = useAppDispatch();
  const adminParams = useAppSelector((state) => state.adminProductBrowserSlice);

  const { data, isLoading, isError } = useFetchAdminProductsQuery(adminParams);
  const [deleteProduct] = useDeleteProductMutation();
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/admin/products/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id).unwrap();
        console.log(`✅ Deleted product with ID ${id}`);
        // Optionally refetch or invalidate cache
      } catch (error) {
        console.error("❌ Failed to delete product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const products = data?.productCardDtos ?? [];

  return (
    <Box sx={{ paddingRight: 2, marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Inventory
      </Typography>

      <Box sx={{ mb: 2 }}>
        <AdminTopFilters />
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Typography color="error">No Products Found.</Typography>
      ) : (
        <>
          <ProductInventoryTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Box sx={{ mt: 3 }}>
            <AppPagination
              paginationData={
                data?.paginationData ?? {
                  totalCount: 0,
                  start: 0,
                  end: 0,
                  pageSize: 5,
                  currentPage: 1,
                  totalPageNumber: 1,
                }
              }
              onPageChange={(page) => dispatch(setAdminPageNumber(page))} // ✅ Hook up admin dispatch
            />
          </Box>
        </>
      )}
    </Box>
  );
}
