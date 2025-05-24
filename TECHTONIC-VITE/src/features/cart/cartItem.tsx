import {
  Box,
  IconButton,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { CartItem } from "../../app/models/cart";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  cartItem: CartItem;
  quantity: number;
  onQuantityUp: (productId: number) => void;
  onQuantityDown: (productId: number) => void;
  onDeleteButtonClick: (productId: number, quantity: number) => void;
};

export default function cartItem({
  cartItem,
  quantity,
  onQuantityUp,
  onQuantityDown,
  onDeleteButtonClick,
}: Props) {
  return (
    <TableRow>
      <TableCell>
        <img
          src={cartItem.pictureUrl}
          alt={cartItem.name}
          style={{
            width: 60,
            height: 60,
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 5,
            transform: "scale(1.25)",
          }}
        />
      </TableCell>
      <TableCell>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {cartItem.name}
        </Typography>
      </TableCell>
      <TableCell>
        {/* <TextField
          type="number"
          size="small"
          value={quantity}
          onChange={(e) =>
            onQuantityChange(cartItem.productId, Number(e.target.value))
          }
          inputProps={{ min: 1, style: { width: 45, textAlign: "center" } }}
        /> */}
        <Box sx={{ width: "110px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <IconButton
              onClick={() => onQuantityDown(cartItem.productId)}
              size="small"
              disabled={quantity === 0}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <TextField
              value={quantity}
              variant="standard"
              label="Quantity"
              slotProps={{
                htmlInput: {
                  style: {
                    textAlign: "center",
                  },
                },
              }}
              sx={{
                // textAlign: "center",
                width: "60px",
              }}
            />

            <IconButton
              onClick={() => onQuantityUp(cartItem.productId)}
              size="small"
              // disabled={quantity === 0}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{cartItem.price} BDT</TableCell>
      <TableCell>
        <Typography sx={{ fontWeight: 900 }}>
          {cartItem.price * quantity} BDT
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() =>
            onDeleteButtonClick(cartItem.productId, cartItem.quantity)
          }
        >
          <CancelIcon sx={{ fontSize: 35, color: "error.main" }} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
