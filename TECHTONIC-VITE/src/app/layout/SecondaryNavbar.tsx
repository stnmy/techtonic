import { AppBar, Box, Container, LinearProgress, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const brands = ["HP", "ASUS", "Apple", "Microsoft", "Dell", "Lenovo", "MSI", "Gigabyte", "Huawei", "Xiaomi"];

export default function SecondaryNavbar() {
  
  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        <Container sx={styles.container}>
          {brands.map((brand) => (
            <Typography
              
              key={brand}
              component={NavLink}
              to={`/offers`}
              variant="h6"
              sx={{
                ...styles.brandItem,
                fontWeight: "700"
              }}
            >
              {brand}
            </Typography>
          ))}
        </Container>
      </Toolbar>

    </AppBar>
  );
}

// Style objects extracted for reusability
const styles = {
  appBar: {
    backgroundColor: "#e9ecef",
    top: "90px",
    height: "40px"
  },
  toolbar: {
    minHeight: "40px !important",
    alignItems: "center"
  },
  container: {
    maxWidth: "1440px !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%"
  },
  brandItem: {
    textDecoration: "none",
    color: "primary.main",
    lineHeight: "40px",
    
  }
};