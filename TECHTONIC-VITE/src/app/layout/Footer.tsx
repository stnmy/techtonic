import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Container,
  SxProps,
  Theme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  // Common styles for navigation links
  const commonLinkSx: SxProps<Theme> = {
    color: "white",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
      color: "error.main",
    },
    display: "block",
    marginBottom: 0.5,
  };

  // Styles for section titles
  const sectionTitleSx: SxProps<Theme> = {
    color: "white",
    fontWeight: "bold",
    marginBottom: 2,
  };

  // Styles for contact information lines (e.g., "9 AM - 8 PM")
  const contactInfoSx: SxProps<Theme> = {
    color: "white",
    display: "flex",
    alignItems: "center",
    marginBottom: 1,
  };

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        marginTop: 10,
        py: 4, // Adjusted vertical padding of the outer Box
        // Removed px from here, as the inner Container will manage horizontal spacing
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Container
        // Applying Navbar's Container specific properties for exact alignment
        sx={{
          maxWidth: "1440px !important",
          marginTop: "8px", // Matching Navbar's Container marginTop
          marginBottom: "8px", // Matching Navbar's Container marginBottom
          // Container's default horizontal padding will now apply within this max width
          // which typically matches the AppBar's Toolbar internal padding.
        }}
      >
        <Grid container spacing={4}>
          {/* Support Section */}
          <Grid size={3}>
            <Typography variant="h6" sx={sectionTitleSx}>
              SUPPORT
            </Typography>
            {/* Phone contact box */}
            <Box
              sx={{
                backgroundColor: "#28303f",
                borderRadius: 1,
                p: 2,
                mb: 2,
                maxWidth: 250,
              }}
            >
              <Box sx={contactInfoSx}>
                <PhoneIcon sx={{ mr: 1, color: "secondary.main" }} />
                <Typography variant="body2">9 AM - 8 PM</Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{ color: "#d32f2f", fontWeight: "bold" }}
              >
                16793
              </Typography>
            </Box>
            {/* Store Locator box */}
            <Box
              sx={{
                backgroundColor: "#28303f",
                borderRadius: 1,
                p: 2,
                maxWidth: 250,
              }}
            >
              <Box sx={contactInfoSx}>
                <LocationOnIcon sx={{ mr: 1, color: "secondary.main" }} />
                <Typography variant="body2">Store Locator</Typography>
              </Box>
              <Link
                href="#"
                sx={{
                  ...commonLinkSx,
                  color: "secondary.main",
                  fontWeight: "bold",
                }}
              >
                Find Our Stores
              </Link>
            </Box>
          </Grid>

          {/* About Us Section - Column 1 */}
          <Grid size={3}>
            <Typography variant="h6" sx={sectionTitleSx}>
              ABOUT US
            </Typography>
            <Link href="#" sx={commonLinkSx}>
              Affiliate Program
            </Link>
            <Link href="#" sx={commonLinkSx}>
              Online Delivery
            </Link>
            <Link href="#" sx={commonLinkSx}>
              Refund and Return Policy
            </Link>
            <Link href="#" sx={commonLinkSx}>
              Blog
            </Link>
          </Grid>

          {/* About Us Section - Column 2 (aligned using a spacer on small screens) */}
          <Grid size={3} sx={{ marginTop: 6 }}>
            <Link href="#" sx={commonLinkSx}>
              EMI Terms
            </Link>
            <Link href="#" sx={commonLinkSx}>
              Privacy Policy
            </Link>
            <Link href="#" sx={commonLinkSx}>
              Star Point Policy
            </Link>
            <Link href="#" sx={commonLinkSx}>
              Contact Us
            </Link>
          </Grid>

          {/* Stay Connected Section */}
          <Grid size={3}>
            <Typography variant="h6" sx={sectionTitleSx}>
              STAY CONNECTED
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: "white", fontWeight: "bold", mb: 1 }}
            >
              TechTonic Ltd
            </Typography>
            <Typography variant="body2" sx={{ color: "white", mb: 1 }}>
              Kuratoli, Bisshoroad <br />
              Dhaka Bangaldesh
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "white", fontWeight: "bold", mt: 2 }}
            >
              Email:
            </Typography>
            <Link href="mailto:webteam@startechbd.com" sx={commonLinkSx}>
              techtonic@gmail.com
            </Link>
          </Grid>
        </Grid>

        {/* Horizontal Separator */}
        <Box
          sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)", my: 4 }}
        />

        {/* Bottom Section: Copyright and Social Media Icons */}
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid size={3}>
            <Typography variant="body2" sx={{ color: "white" }}>
              © 2025 TechTonic Ltd | All rights reserved
            </Typography>
          </Grid>
          <Grid
            size={3}
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <IconButton sx={{ color: "white" }} aria-label="WhatsApp">
              <WhatsAppIcon />
            </IconButton>
            <IconButton sx={{ color: "white" }} aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "white" }} aria-label="YouTube">
              <YouTubeIcon />
            </IconButton>
            <IconButton sx={{ color: "white" }} aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
          </Grid>
          <Grid size={3}>
            <Typography
              variant="body2"
              sx={{ color: "white", textAlign: "right", mt: 2 }}
            >
              Powered By: TechTonic
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
