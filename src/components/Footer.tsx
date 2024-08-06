import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "black",
        color: "white",
        py: 3, // padding y-axis
        mt: "auto",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <Container>
        <Typography variant="body1" color="inherit">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
        <Typography variant="body2" color="inherit">
          <Link href="/privacy-policy" color="inherit" underline="hover">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link href="/terms-of-service" color="inherit" underline="hover">
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
