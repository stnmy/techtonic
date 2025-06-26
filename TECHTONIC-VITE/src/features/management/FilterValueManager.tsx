import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AdminFilter } from "../../app/models/product";
import {
  useAddFilterValueMutation,
  useDeleteFilterValueMutation,
} from "./managementApi";
import { useState } from "react";

type Props = {
  filter: AdminFilter;
  onSnackbar: (msg: string) => void;
};

export default function FilterValueManager({ filter, onSnackbar }: Props) {
  const [addFilterValue] = useAddFilterValueMutation();
  const [deleteFilterValue] = useDeleteFilterValueMutation();
  const [newValue, setNewValue] = useState("");

  const handleAddValue = async () => {
    if (!newValue.trim()) return;
    try {
      await addFilterValue({ filterId: filter.id, value: newValue });
      setNewValue("");
      onSnackbar("Value added successfully");
    } catch {
      onSnackbar("Failed to add value");
    }
  };

  const handleDeleteValue = async (valueId: number) => {
    try {
      await deleteFilterValue(valueId);
      onSnackbar("Value deleted");
    } catch {
      onSnackbar("Failed to delete value");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Manage values for: <strong>{filter.filterName}</strong>
      </Typography>

      <Paper
        sx={{
          border: "1px solid #ccc",
          borderRadius: 1,
          mb: 2,
          p: 1,
          boxShadow: "none",
        }}
      >
        <List>
          {filter.values.map((val) => (
            <ListItem
              key={val.id}
              secondaryAction={
                <IconButton onClick={() => handleDeleteValue(val.id)}>
                  <Delete />
                </IconButton>
              }
            >
              {val.value}
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          fullWidth
          size="small"
          placeholder="Add new value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddValue();
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc",
              },
              "&:hover fieldset": {
                borderColor: "#999",
              },
            },
          }}
        />
        <Button variant="outlined" onClick={handleAddValue}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
