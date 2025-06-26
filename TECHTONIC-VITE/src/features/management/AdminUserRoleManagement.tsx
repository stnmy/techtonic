import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import debounce from "lodash/debounce";

import {
  useGetUsersByRoleQuery,
  useCreateAdminUserMutation,
  useUpdateUserRoleMutation,
  useDeleteCustomerOnlyUserMutation,
} from "./managementApi";

export default function AdminUserRoleManagement() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState("Customer");

  const roles = ["Customer", "Moderator", "Admin"];
  const role = roles[tab];

  const debouncedSearchInput = useMemo(
    () =>
      debounce((val: string) => {
        setDebouncedSearch(val);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedSearchInput(search);
    return () => {
      debouncedSearchInput.cancel();
    };
  }, [search, debouncedSearchInput]);

  const { data: users, refetch } = useGetUsersByRoleQuery({
    role,
    search: debouncedSearch,
  });
  const [createUser] = useCreateAdminUserMutation();
  const [updateRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteCustomerOnlyUserMutation();

  const handleTabChange = (_: any, newValue: number) => {
    setTab(newValue);
    setSearch("");
    setDebouncedSearch("");
  };

  const handleOpenDialog = () => {
    setFormData({ email: "", password: "" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreate = async () => {
    await createUser({ ...formData, role });
    refetch();
    handleCloseDialog();
  };

  const openEditRoleDialog = (userId: string) => {
    setEditUserId(userId);
    setNewRole("Customer");
    setEditRoleDialogOpen(true);
  };

  const handleUpdateRoleSubmit = async () => {
    if (!editUserId) return;
    await updateRole({ userId: editUserId, newRole });
    refetch();
    setEditRoleDialogOpen(false);
    setEditUserId(null);
  };

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
    refetch();
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Role Management
      </Typography>

      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Customers" />
        <Tab label="Moderators" />
        <Tab label="Admins" />
      </Tabs>

      <Box my={2} display="flex" gap={2}>
        <TextField
          fullWidth
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add {role}
        </Button>
      </Box>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }}>
                <strong>Email</strong>
              </TableCell>
              <TableCell sx={{ width: "25%" }}>
                <strong>Username</strong>
              </TableCell>
              <TableCell sx={{ width: "25%" }}>
                <strong>Roles</strong>
              </TableCell>
              <TableCell sx={{ width: "20%" }}>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.roles.join(", ")}</TableCell>
                <TableCell>
                  {(tab === 0 || tab === 1) && (
                    <IconButton onClick={() => openEditRoleDialog(user.id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {tab === 0 && (
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Create User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create {role}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            margin="dense"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCreate}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Role Dialog */}
      <Dialog
        open={editRoleDialogOpen}
        onClose={() => setEditRoleDialogOpen(false)}
      >
        <DialogTitle>Update User Role</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Select Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            margin="dense"
          >
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value="Moderator">Moderator</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditRoleDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateRoleSubmit}>
            Update Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
