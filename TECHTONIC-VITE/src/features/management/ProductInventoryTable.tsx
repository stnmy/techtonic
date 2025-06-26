import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { AdminProductCardType } from "../../app/models/product";

interface Props {
  products: AdminProductCardType[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ProductInventoryTable({
  products,
  onEdit,
  onDelete,
}: Props) {
  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #acc" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>ID</strong>
            </TableCell>
            <TableCell>
              <strong>Image</strong>
            </TableCell>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Price</strong>
            </TableCell>
            <TableCell>
              <strong>Discount Price</strong>
            </TableCell>
            <TableCell>
              <strong>Units Sold</strong>
            </TableCell>
            <TableCell>
              <strong>In Stock</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 40, height: 40, objectFit: "cover" }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price.toLocaleString()}৳</TableCell>
              <TableCell>
                {product.discountPrice
                  ? `${product.discountPrice.toLocaleString()}৳`
                  : "—"}
              </TableCell>
              <TableCell>{product.unitsSold}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => onEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => onDelete(product.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
