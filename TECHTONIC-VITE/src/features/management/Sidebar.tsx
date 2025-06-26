import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import RuleIcon from "@mui/icons-material/Rule";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../features/account/accountApi";
import CommentIcon from "@mui/icons-material/Comment";
const navItems = [
  { label: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { label: "Products", path: "/admin/products", icon: <InventoryIcon /> },
  { label: "Orders", path: "/admin/orders", icon: <ShoppingBagOutlinedIcon /> },
  {
    label: "Unanswered Questions",
    path: "/admin/unansweredQuestions",
    icon: <QuestionAnswerIcon />,
  },
  { label: "Reviews", path: "/admin/reviews", icon: <CommentIcon /> },
  { label: "Criteria Management", path: "/admin/criteria", icon: <RuleIcon /> },
  {
    label: "Role Management",
    path: "/admin/roleManagement",
    icon: <AdminPanelSettingsIcon />,
  },
];

export default function Sidebar() {
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: {
          width: 300,
          boxSizing: "border-box",
          backgroundColor: "#212529",
          color: "#f8f9fa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
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
      </Box>

      {/* Bottom action buttons */}
      <Box>
        <Divider sx={{ backgroundColor: "gray", my: 1 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            pb: 2,
          }}
        >
          <ListItemButton
            onClick={() => {}}
            sx={{
              color: "white",
              borderRadius: 2,
              flexDirection: "column",
              maxWidth: "50%",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: "unset" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{ fontSize: "0.75rem" }}
            />
          </ListItemButton>

          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: "white",
              borderRadius: 2,
              flexDirection: "column",
              maxWidth: "50%",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white", minWidth: "unset" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{ fontSize: "0.75rem" }}
            />
          </ListItemButton>
        </Box>
      </Box>
    </Drawer>
  );
}
