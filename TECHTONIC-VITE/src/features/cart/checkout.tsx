import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { useState } from "react";
import { useFetchCartQuery } from "../cart/cartApi";
import { useCreateOrderMutation } from "../order/orderApi";
import { PaymentMethod } from "../../app/models/order";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { data: cart } = useFetchCartQuery();
  const [createOrder] = useCreateOrderMutation();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    line1: "",
    city: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("CashOnDelivery");

  const handleSubmit = () => {
    const order = {
      shippingAddress,
      isCustomShippingAddress: true,
      paymentMethod,
    };

    createOrder(order)
      .unwrap()
      .then((res) => {
        console.log("Order created:", res);

        navigate("/orders");
      })
      .catch((err) => {
        console.error("Order creation failed:", err);
      });
  };

  const subTotal =
    cart?.cartItems?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;
  const deliveryFee = 60;
  const total = subTotal + deliveryFee;

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      <Grid container spacing={2}>
        <Grid size={4} display="flex" flexDirection="column">
          {/* Shipping Address */}
          <Paper elevation={3} sx={{ flex: 1, minWidth: 300, p: 3 }}>
            <Typography variant="h6">Shipping Address</Typography>
            <TextField
              fullWidth
              label="Address Line"
              sx={{ mt: 2 }}
              value={shippingAddress.line1}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  line1: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              label="City"
              sx={{ mt: 2 }}
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Postal Code"
              sx={{ mt: 2 }}
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value,
                })
              }
            />
          </Paper>

          {/* Payment Method */}
          <Paper elevation={3} sx={{ flex: 1, minWidth: 300, p: 3 }}>
            <Typography variant="h6">Payment Method</Typography>
            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(e.target.value as PaymentMethod)
                }
              >
                <FormControlLabel
                  value="CashOnDelivery"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
                <FormControlLabel
                  value="Card"
                  control={<Radio />}
                  label="Card"
                />
                <FormControlLabel
                  value="Bkash"
                  control={<Radio />}
                  label="Bkash"
                />
                <FormControlLabel
                  value="Nagad"
                  control={<Radio />}
                  label="Nagad"
                />
                <FormControlLabel
                  value="Rocket"
                  control={<Radio />}
                  label="Rocket"
                />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
        <Grid size={8}>
          {/* Order Summary */}
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Box mt={2}>
              {cart?.cartItems.map((item) => (
                <Box
                  key={item.productId}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography>
                    {item.name} (x{item.quantity})
                  </Typography>
                  <Typography>৳{item.price * item.quantity}</Typography>
                </Box>
              ))}
              <Divider sx={{ my: 1 }} />
              <Typography>Sub-total: ৳{subTotal}</Typography>
              <Typography>Home Delivery: ৳{deliveryFee}</Typography>
              <Typography variant="h6" color="error">
                Total: ৳{total}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              Place Order
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
