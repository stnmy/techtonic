import {
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useFetchAdminOrdersQuery } from "./managementApi";
import { setAdminOrderPageNumber } from "./AdminOrderBrowserSlice";
import AppPagination from "../../app/layout/AppPagination";
import AdminOrderTopFilters from "./AdminOrderTopFilters";
import OrderStatusUpdater from "./OrderStatusUpdater";

export default function AdminOrders() {
  const dispatch = useAppDispatch();
  const adminParams = useAppSelector((state) => state.adminOrderBrowserSlice);
  const { data, isLoading, isError } = useFetchAdminOrdersQuery(adminParams);
  const navigate = useNavigate();

  const handleViewClick = (orderNumber: number) => {
    navigate(`/admin/orders/${orderNumber}`);
  };

  return (
    <Box sx={{ paddingRight: 2, marginTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Orders
      </Typography>

      <Box sx={{ mb: 2 }}>
        <AdminOrderTopFilters />
      </Box>

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Typography color="error">Failed to load admin orders.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Order #</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Payment Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Order Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>User Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.orders.map((order) => (
                  <TableRow key={order.orderNumber} hover>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleString()}
                    </TableCell>
                    <TableCell>{order.subtotal.toLocaleString()}</TableCell>
                    <TableCell>{order.paymentStatus}</TableCell>
                    <TableCell>
                      <OrderStatusUpdater
                        orderNumber={order.orderNumber}
                        currentStatus={String(order.status)}
                      />
                    </TableCell>
                    <TableCell>{order.userEmail}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewClick(order.orderNumber)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3 }}>
            <AppPagination
              paginationData={
                data?.paginationData ?? {
                  totalCount: 0,
                  start: 0,
                  end: 0,
                  pageSize: 10,
                  currentPage: 1,
                  totalPageNumber: 1,
                }
              }
              onPageChange={(page) => dispatch(setAdminOrderPageNumber(page))}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
