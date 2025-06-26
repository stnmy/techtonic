import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import AdminBrandManagement from "./AdminBrandManagement";
import AdminFilterManagement from "./AdminFilterManagement";

export default function CriteriarManagement() {
  const [tab, setTab] = useState<"brand" | "filter">("brand");

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Manage Product Criteria
      </Typography>

      {/* Tab Buttons Styled Like Red Boxes */}
      <Box display="flex" gap={2} mb={2}>
        <Button
          onClick={() => setTab("brand")}
          variant={tab === "brand" ? "contained" : "outlined"}
          sx={{
            minWidth: 180,
            borderRadius: 1,
            fontWeight: 600,
            boxShadow: tab === "brand" ? 2 : 0,
          }}
        >
          Brand Management
        </Button>
        <Button
          onClick={() => setTab("filter")}
          variant={tab === "filter" ? "contained" : "outlined"}
          sx={{
            minWidth: 180,
            borderRadius: 1,
            fontWeight: 600,
            boxShadow: tab === "filter" ? 2 : 0,
          }}
        >
          Filter Management
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        {tab === "brand" && <AdminBrandManagement />}
        {tab === "filter" && <AdminFilterManagement />}
      </Paper>
    </Box>
  );
}
