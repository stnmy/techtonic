import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useFetchBrandsQuery, useCreateBrandMutation } from "./managementApi";

export default function AdminBrandManagement() {
  const { data: brands, isLoading, isError } = useFetchBrandsQuery();
  const [createBrand, { isLoading: isCreating }] = useCreateBrandMutation();

  const [brandName, setBrandName] = useState("");

  const handleCreate = async () => {
    if (!brandName.trim()) return;
    await createBrand({ name: brandName });
    setBrandName("");
  };

  return (
    <Box display="flex" sx={{ width: 400 }}>
      <Paper
        sx={{
          width: 400,
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 3,
          boxShadow: "none",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Brand Management
        </Typography>

        <Box display="flex" gap={2} my={2}>
          <TextField
            fullWidth
            label="New Brand"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleCreate}
            disabled={isCreating}
          >
            Add
          </Button>
        </Box>

        {isLoading && <CircularProgress />}
        {isError && (
          <Typography color="error">Failed to load brands</Typography>
        )}
        {brands && (
          <List>
            {brands.map((brand) => (
              <ListItem key={brand.id}>{brand.name}</ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
}
