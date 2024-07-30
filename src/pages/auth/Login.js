import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (value) => {
    const data = {
      email: value.email,
      password: value.password,
    };

    await axios
      .post("http://localhost:5000/api/v1/auth/login", data)
      .then((res) => {
        navigate("/chat");
        localStorage.setItem("token", res.data.data.token);
        reset();
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const apiErrors = error.response.data.errors; // Adjust according to your API response structure
          apiErrors.forEach((apiError) => {
            setError(apiError.path, { message: apiError.msg });
          });
        }
      });
  };

  return (
    <Grid item md={6}>
      <Paper sx={{ height: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={5}>
            <Typography variant="h4" gutterBottom color="primary">
              LOGIN
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  {...field}
                />
              )}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={!isValid}
            >
              LOGIN
            </Button>

            <Box sx={{ textAlign: "center" }} mt={5}>
              <Button variant="text" sx={{ width: "100%" }}>
                Forgot password
              </Button>
              <Typography>
                Don't have an account
                <Button variant="text" href="/register">
                  CREATE ACCOUNT
                </Button>
              </Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
