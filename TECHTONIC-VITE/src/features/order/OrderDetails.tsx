import {
  Typography,
  CircularProgress,
  Paper,
  Box,
  Divider,
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchOrderDetailsQuery } from "./orderApi";

export default function OrderDetails() {
  const { orderNumber } = useParams();
  const {
    data: order,
    isLoading,
    isError,
  } = useFetchOrderDetailsQuery(Number(orderNumber));

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Failed to load order details.</Typography>;
  if (!order) return null;

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Order #{order.orderNumber}
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="subtitle1">
          <strong>Order Date:</strong> {order.orderDate}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Shipping Address:</strong> {order.shippingAddress}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Payment Method:</strong> {order.paymentMethod}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Payment Status:</strong> {order.paymentStatus}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Subtotal:</strong> {order.subtotal.toLocaleString()}
        </Typography>
      </Paper>
      {/* 
      <Typography variant="h5" gutterBottom>
        Ordered Products
      </Typography> */}
      {/* <Divider sx={{ mb: 2 }} /> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Product</strong>
              </TableCell>
              <TableCell>
                <strong>Quantity</strong>
              </TableCell>
              <TableCell>
                <strong>Unit Price</strong>
              </TableCell>
              <TableCell>
                <strong>Total</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.orderItems.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    <img
                      src={item.productImageUrl}
                      alt={item.productName}
                      style={{ width: 60, height: 60, objectFit: "contain" }}
                    />
                    <Typography variant="body1">{item.productName}</Typography>
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.unitPrice.toLocaleString()}</TableCell>
                <TableCell>
                  <strong>{item.totalPrice.toLocaleString()}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
