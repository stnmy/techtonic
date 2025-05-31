import { Box, LinearProgress } from "@mui/material";
import { useAppSelector } from "../store/store";

export default function LoadingBar() {
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  if (!isLoading) {
    return null;
  }
  return (
    <Box sx={{ width: "100%", position: "fixed", zIndex: 1201, marginTop: 11 }}>
      <LinearProgress variant="indeterminate" color="inherit" />
    </Box>
  );
}
