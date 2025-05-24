import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  useAddItemToCartMutation,
  useDeleteItemFromCartMutation,
  useFetchCartQuery,
} from "./cartApi";
import CartItem from "./cartItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function cartPage() {
  const { data, isLoading } = useFetchCartQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  const [quantity, setQuantity] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (data && data.cartItems) {
      const initialQuantities: { [key: number]: number } = {};
      data.cartItems.forEach((item) => {
        initialQuantities[item.productId] = item.quantity;
      });
      setQuantity(initialQuantities);
    }
  }, [data]);

  if (isLoading) {
    return <Typography>Loading Cart...</Typography>;
  }
  if (!data) {
    return <Typography>Cart is Empty</Typography>;
  }

  const handleQuantityUp = (productId: number) => {
    setQuantity((prev: any) => ({
      ...prev,
      [productId]: (prev[productId] ?? 0) + 1,
    }));
    // call the api
    addItemToCart({ productId: productId, quantity: 1 });
  };

  const handleQuantityDown = (productId: number) => {
    setQuantity((prev: any) => {
      const currentQty = prev[productId] ?? 1;
      if (currentQty > 1) {
        // Decrement and update backend
        deleteItemFromCart({ productId: productId, quantity: 1 });
        return { ...prev, [productId]: currentQty - 1 };
      } else {
        // Optionally, remove the item from cart if quantity is 1
        // handleDeleteItemFromCart(productId, 1);
        return prev;
      }
    });
  };

  const handleDeleteItemFromCart = (productId: number, quantity: number) => {
    deleteItemFromCart({ productId: productId, quantity: quantity });
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: 600, mt: 5 }}>
        Shopping Cart
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10%" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Image
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "55%" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Product Name
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Quantity
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Unit Price
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "10%" }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total Price
                </Typography>
              </TableCell>
              <TableCell sx={{ width: "5%" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.cartItems.map((ci) => (
              <CartItem
                key={ci.productId}
                cartItem={ci}
                quantity={quantity[ci.productId] ?? ci.quantity}
                onQuantityUp={handleQuantityUp}
                onQuantityDown={handleQuantityDown}
                onDeleteButtonClick={handleDeleteItemFromCart}
              />
            ))}
            <TableRow>
              <TableCell colSpan={4} align="right">
                <Typography variant="body1">Total</Typography>
              </TableCell>
              <TableCell colSpan={4}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 900, color: "error.main" }}
                >
                  {data.cartItems.reduce(
                    (sum, item) =>
                      sum +
                      item.price * (quantity[item.productId] ?? item.quantity),
                    0
                  )}{" "}
                  BDT
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" sx={{ marginTop: 3 }} justifyContent="space-between">
        <Button component={Link} to="/productBrowser" variant="contained">
          Continue Browsing
        </Button>
        <Button variant="contained" component={Link} to="/checkout">
          Checkout
        </Button>
      </Box>
    </>
  );
}
