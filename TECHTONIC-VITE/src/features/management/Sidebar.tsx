import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { label: "Products", path: "/admin/products", icon: <InventoryIcon /> },
];

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: {
          width: 300,
          boxSizing: "border-box",
          backgroundColor: "#212529", // matches Navbar
          color: "f8f9fa", // white text/icons
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "white", textAlign: "center" }}
        >
          TechTonic Admin
        </Typography>
      </Box>

      <List>
        {navItems.map(({ label, path, icon }) => (
          <ListItemButton
            key={path}
            component={NavLink}
            to={path}
            end={path === "/admin"}
            sx={{
              color: "white",
              "&.active": {
                backgroundColor: "primary.dark",
              },
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
