import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router";
import logo from "../assets/logo.svg";
import reactLogo from "../assets/reactIcon.svg";
import styles from "./Auth.module.scss";

const AuthLayout = () => {
  return (
    <Container maxWidth="md" className={styles.mainContainer}>
      <Grid container>
        <Grid item md={6}>
          <Paper
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box p={5} sx={{ textAlign: "center" }}>
              <Box mb={4}>
                <img src={logo} alt="logo" />
                <img
                  src={reactLogo}
                  alt="react-logo"
                  style={{ marginLeft: "15px" }}
                />
              </Box>
              <Typography variant="h4" gutterBottom>
                CHAT APP
              </Typography>
              <Typography variant="p">
                Lorem Ipsum is simply dummy industry. Lorem Ipsum standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Outlet />
      </Grid>
    </Container>
  );
};

export default AuthLayout;
