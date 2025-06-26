import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItemButton,
  Snackbar,
  CircularProgress,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useFetchFiltersQuery,
  useCreateFilterMutation,
  useDeleteFilterMutation,
} from "./managementApi";
import FilterValueManager from "./FilterValueManager";

export default function AdminFilterManagement() {
  const { data: filters, isLoading } = useFetchFiltersQuery();
  const [createFilter] = useCreateFilterMutation();
  const [deleteFilter] = useDeleteFilterMutation();
  const [newFilterName, setNewFilterName] = useState("");
  const [selectedFilterId, setSelectedFilterId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [filterToDelete, setFilterToDelete] = useState<number | null>(null);

  const handleCreateFilter = async () => {
    if (!newFilterName.trim()) return;
    try {
      await createFilter({ filterName: newFilterName });
      setNewFilterName("");
      setSnackbar("Filter created successfully");
    } catch {
      setSnackbar("Failed to create filter");
    }
  };

  const confirmDeleteFilter = (filterId: number) => {
    setFilterToDelete(filterId);
    setOpenDialog(true);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setFilterToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (filterToDelete === null) return;
    try {
      await deleteFilter(filterToDelete);
      if (selectedFilterId === filterToDelete) setSelectedFilterId(null);
      setSnackbar("Filter deleted");
    } catch {
      setSnackbar("Failed to delete filter");
    } finally {
      setOpenDialog(false);
      setFilterToDelete(null);
    }
  };

  const selectedFilter =
    filters?.find((f) => f.id === selectedFilterId) || null;

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Filter Management
      </Typography>

      <Grid container spacing={4}>
        {/* Row 1: Full width for New Filter input */}
        <Grid size={8}>
          <Paper
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              boxShadow: "none",
            }}
          >
            <Box display="flex" gap={2}>
              <TextField
                label="New Filter Name"
                fullWidth
                value={newFilterName}
                onChange={(e) => setNewFilterName(e.target.value)}
              />
              <Button
                variant="contained"
                disabled={!newFilterName.trim()}
                onClick={handleCreateFilter}
              >
                Create
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid size={4}></Grid>

        {/* Row 2: Two equal columns */}
        <Grid size={4}>
          <Paper
            sx={{
              padding: 2,
              height: "100%",
              border: "1px solid #ccc",
              borderRadius: 2,
              boxShadow: "none",
            }}
          >
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Box>
                <Typography sx={{ marginBottom: 2 }}>
                  Choose a Filter
                </Typography>
                <List
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 1,
                    maxHeight: 500,
                    overflowY: "auto",
                  }}
                >
                  {filters?.map((filter) => (
                    <ListItemButton
                      key={filter.id}
                      selected={selectedFilterId === filter.id}
                      onClick={() => setSelectedFilterId(filter.id)}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ flexGrow: 1 }}>
                        {filter.filterName}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeleteFilter(filter.id);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </ListItemButton>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid size={4}>
          <Paper
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              boxShadow: "none",
            }}
          >
            {selectedFilter ? (
              <FilterValueManager
                filter={selectedFilter}
                onSnackbar={(msg: string) => setSnackbar(msg)}
              />
            ) : (
              <Typography>Select a filter to manage values.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={!!snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(null)}
        message={snackbar}
      />

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Delete Filter</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this filter?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
