import { useFetchOrdersQuery } from "./orderApi";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { data: orders, isLoading, isError } = useFetchOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Failed to load orders.</Typography>;

  const handleRowClick = (orderNumber: number) => {
    navigate(`/orders/${orderNumber}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
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
                <strong>Status</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.orderNumber}
                hover
                style={{ cursor: "pointer" }}
                onClick={() => handleRowClick(order.orderNumber)}
              >
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>
                  {new Date(order.orderDate).toLocaleString()}
                </TableCell>
                <TableCell>{order.subtotal.toLocaleString()}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
