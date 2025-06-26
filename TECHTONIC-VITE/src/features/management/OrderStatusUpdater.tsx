import { useState, useEffect } from "react";
import { Select, MenuItem, Button, Box, CircularProgress } from "@mui/material";
import { useUpdateOrderStatusMutation } from "./managementApi";
import { useNavigate } from "react-router-dom";

const orderStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelRequested", label: "Cancel Requested" },
  { value: "refundRequested", label: "Refund Requested" },
  { value: "refunded", label: "Refunded" },
  { value: "canceled", label: "Canceled" },
];

interface Props {
  orderNumber: number;
  currentStatus: string;
}

export default function OrderStatusUpdater({
  orderNumber,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [hasChanged, setHasChanged] = useState(false);
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setHasChanged(status !== currentStatus);
  }, [status, currentStatus]);

  const handleUpdate = async () => {
    try {
      await updateOrderStatus({ orderNumber, status }).unwrap();
      setHasChanged(false); // explicitly reset
      setStatus(status); // align internal state
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Select
        size="small"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ width: 200 }}
      >
        {orderStatusOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        disabled={!hasChanged || isLoading}
      >
        {isLoading ? <CircularProgress size={20} /> : "Confirm"}
      </Button>
    </Box>
  );
}
